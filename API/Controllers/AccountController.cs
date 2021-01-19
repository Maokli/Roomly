using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class AccountController : BaseApiController
  {
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;
    public AccountController(DataContext context, ITokenService tokenService)
    {
      _tokenService = tokenService;
      _context = context;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegsiterDto regsiterDto)
    {
      if (await UserExists(regsiterDto.UserName))
        return BadRequest("UserName is Taken");
      using var hmac = new HMACSHA512();
      var user = new AppUser
      {
        UserName = regsiterDto.UserName,
        PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(regsiterDto.Password)),
        PasswordSalt = hmac.Key
      };
      _context.Users.Add(user);
      await _context.SaveChangesAsync();
      return new UserDto{
          UserName = user.UserName,
          Token = _tokenService.CreateToken(user)
      };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _context.Users.
      SingleOrDefaultAsync(x => x.UserName == loginDto.UserName);
      if (user == null)
        return Unauthorized("UserName is invalid");
      using var hmac = new HMACSHA512(user.PasswordSalt);
      var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
      for (int i = 0; i < computedHash.Length; i++)
      {
        if (computedHash[i] != user.PasswordHash[i])
          return Unauthorized("Password is invalid");
      }
      return new UserDto{
          UserName = user.UserName,
          Token = _tokenService.CreateToken(user)
      };
    }
    private async Task<bool> UserExists(string userName)
    {
      return await _context.Users.AnyAsync(x => x.UserName == userName.ToLower());
    }
  }
}