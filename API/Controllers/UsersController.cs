using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [Authorize]
  public class UsersController : BaseApiController
  {
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;
    private readonly IPhotoService _photoService;
    public UsersController(IUserRepository userRepository, IMapper mapper, IPhotoService photoService)
    {
      _photoService = photoService;
      _mapper = mapper;
      _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers([FromQuery]UserParams userParams)
    {
      var user = await _userRepository.GetUserByUsernameAsync(User.getUsername());
      userParams.CurrentUsername = user.UserName;

      if(string.IsNullOrEmpty(userParams.Country))
        userParams.Country = user.Country;


      var users = await _userRepository.GetMembersAsync(userParams);

      Response.AddPaginationHeader(users.CurrentPage, users.PageSize,
       users.TotalCount, users.TotalPages);

      return Ok(users);
    }

    [HttpGet("{username}", Name = "GetUser")]
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
      return await _userRepository.GetMemberAsync(username);
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
      var user = await _userRepository.GetUserByUsernameAsync(User.getUsername());

      _mapper.Map(memberUpdateDto, user);

      _userRepository.Update(user);

      if (await _userRepository.SaveAllAsync()) return NoContent();

      return BadRequest("Failed to update User");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
      var user = await _userRepository.GetUserByUsernameAsync(User.getUsername());

      var result = await _photoService.AddPhotoAsync(file);

      if(result.Error != null) return BadRequest(result.Error.Message);

      DeleteOldPhoto(user);

      var photo = CreatePhoto(result);

      AddPhotoToDb(photo, user);
      
      if(await _userRepository.SaveAllAsync())
      {
        return CreatedAtRoute("GetUser", new {username = user.UserName}, _mapper.Map<PhotoDto>(photo));
      }

      return BadRequest("problem adding photo");
    }

    private Photo CreatePhoto(ImageUploadResult result)
    {
      return new Photo {
        Url = result.SecureUrl.AbsoluteUri,
        PublicId = result.PublicId,
        IsMain = true
      };
    }

    private void AddPhotoToDb(Photo photo, AppUser user)
    {
      if(user.Photos.Count > 0)
      {
        var currentPhoto = user.Photos.FirstOrDefault(p => p.IsMain);
        user.Photos.Remove(currentPhoto);
      } 

      user.Photos.Add(photo);
    }

    private async void DeleteOldPhoto(AppUser user)
    {
      if(user.Photos.Count > 0)
      {
        var currentPhoto = user.Photos.FirstOrDefault(p => p.IsMain);
        user.Photos.Remove(currentPhoto);
        await _photoService.DeletePhotoAsync(currentPhoto.PublicId);
      } 
    }
  }
}