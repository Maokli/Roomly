using System.Linq;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers
{
  public class AutoMapperProfiles : Profile
  {
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>()
            .ForMember(dist => dist.PhotoUrl, opt => opt.MapFrom(src =>
             src.Photos.FirstOrDefault(p => p.IsMain).Url)) //Sets the ProfileUrl property to the url of the image where IsMain = true
            .ForMember(dist => dist.Age, opt => opt.MapFrom(src => 
            src.DateOfBirth.CalculateAge())); //Sets the age property
        CreateMap<Photo, PhotoDto>();
        CreateMap<Term, TermDto>();
    }
  }
}