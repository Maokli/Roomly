using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  public class AccountController : BaseApiController
  {
    private readonly ITokenService _tokenService;
    private readonly IMapper _mapper;
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
     ITokenService tokenService, IMapper mapper)
    {
      _signInManager = signInManager;
      _userManager = userManager;
      _mapper = mapper;
      _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
      if (await UserExists(registerDto.UserName))
        return BadRequest("UserName is Taken");

      var user = _mapper.Map<AppUser>(registerDto);


      user.UserName = registerDto.UserName;

      var result = await _userManager.CreateAsync(user, registerDto.Password);

      if(!result.Succeeded) return BadRequest(result.Errors);

      var roleResult = await _userManager.AddToRoleAsync(user,"Member");

      if(!roleResult.Succeeded) return BadRequest(roleResult.Errors);

      return new UserDto
      {
        UserName = user.UserName,
        Token = await _tokenService.CreateToken(user),
        Country = user.Country
      };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
      var user = await _userManager.Users
        .Include(x => x.Photos)
        .SingleOrDefaultAsync(x => x.UserName == loginDto.UserName.ToLower());
      if (user == null)
        return Unauthorized("Invalid Username");

      var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

      if(!result.Succeeded) return Unauthorized("Invalid Password");
      return new UserDto
      {
        UserName = user.UserName,
        Token = await _tokenService.CreateToken(user),
        //PhotoUrl = user.Photos.FirstOrDefault(x => x.IsMain == true).Url,
        //Country = user.Country
      };
    }
    private async Task<bool> UserExists(string userName)
    {
      return await _userManager.Users.AnyAsync(x => x.UserName.ToLower() == userName.ToLower());
    }
  }
}