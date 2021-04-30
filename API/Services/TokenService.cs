using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
  
  ///<summary>
  ///Injects extra application services into the startup class.
  ///Takes an IConfiguration as a parameter.
  ///Mainly used to keep the startup class clean
  ///</summary>
  public class TokenService : ITokenService
  {
      private readonly SymmetricSecurityKey _key;
    public TokenService(IConfiguration config)
    {
        _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
    }

    ///<summary>
    ///Creates a Jwt Token.
    ///Takes an AppUser object as a parameter.
    ///Returns a stringified Jwt Token holding the userName in the claims
    ///</summary>
    public string CreateToken(AppUser user)
    {
      //Initializes the claims
      var claims = new List<Claim>{

          new Claim(JwtRegisteredClaimNames.UniqueName, user.UserName),
          new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
      };

      //Creates a signing credentials
      var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

      //Initializes a SecurityTokenDescriptor
      var tokenDescriptor = new SecurityTokenDescriptor{

          //Applies the claims
          Subject = new ClaimsIdentity(claims),

          //Sets an expiry date of 7 days
          Expires = DateTime.Now.AddDays(7),

          //Signs the token
          SigningCredentials = creds
      };
      var tokenHandler = new JwtSecurityTokenHandler();

      //Creates the token
      var token = tokenHandler.CreateToken(tokenDescriptor);

      return tokenHandler.WriteToken(token);
    }
  }
}