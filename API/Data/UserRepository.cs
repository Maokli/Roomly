using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class UserRepository : IUserRepository
  {
    private readonly DataContext _context;
    private readonly IMapper _mapper;
    public UserRepository(DataContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    //A better Approach to free up more memory space
    public async Task<MemberDto> GetMemberAsync(string username)
    {
      return await _context.Users
        .Where(x => x.UserName == username) //Selects a user based on its Username
        .ProjectTo<MemberDto>(_mapper.ConfigurationProvider) //Projects the result to a MemberDto, thus does not store the password hash and salt in memory
        .SingleOrDefaultAsync(); //Executes the query
    }

    public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
    {
      var query = _context.Users.AsQueryable();

      query = query.Where(u => u.UserName != userParams.CurrentUsername);

      if(userParams.Country != "All")
        query = query.Where(u => u.Country == userParams.Country);

      if(!string.IsNullOrEmpty(userParams.Gender))
        query = query.Where(u => u.Gender == userParams.Gender);

      var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
      var maxDob = DateTime.Today.AddYears(-userParams.MinAge);

      query = query.Where(u => u.DateOfBirth <= maxDob && u.DateOfBirth >= minDob);

      query = userParams.OrderBy switch
      {
          "created" => query.OrderByDescending(u => u.Joined),
          _ => query.OrderByDescending(u => u.LastActive)
      };

      return await PagedList<MemberDto>.CreateAsync(query.ProjectTo<MemberDto>(_mapper
        .ConfigurationProvider).AsNoTracking(),
           userParams.PageNumber, userParams.PageSize);
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
      return await _context.Users.FindAsync(id);
    }

    public async Task<AppUser> GetUserByUsernameAsync(string username)
    {
      return await _context.Users
      .Include(p => p.Photos)
      .SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
      return await _context.Users
      .Include(p => p.Photos)
      .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
      return await _context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser user)
    {
      _context.Entry(user).State = EntityState.Modified;
    }
  }
}