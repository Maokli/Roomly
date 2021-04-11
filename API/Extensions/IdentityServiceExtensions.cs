using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public static class IdentityServiceExtensions
    {
        ///<summary>
        ///Injects extra Identity services into the startup class.
        ///Takes an IConfiguration as a parameter.
        ///Mainly used to keep the startup class clean
        ///</summary>
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config){
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opts=>{
                    opts.TokenValidationParameters = new TokenValidationParameters{
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                    ValidateIssuer = false,
                    ValidateAudience = false
                    };
                });
                
            return services;
        }
    }
}