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
        ///<summary>
        ///Maps from an AppUser object to a MemberDto object
        ///This function takes care of the picture Url and the age
        ///</summary>
        CreateMap<AppUser, MemberDto>()
            .ForMember(dist => dist.PhotoUrl, opt => opt.MapFrom(src =>
             src.Photos.FirstOrDefault(p => p.IsMain).Url)) //Sets the ProfileUrl property to the url of the image where IsMain = true
            .ForMember(dist => dist.Age, opt => opt.MapFrom(src => 
            src.DateOfBirth.CalculateAge())); //Sets the age property

        ///<summary>
        ///Maps from a Photo object to a PhotoDto object
        ///</summary>
        CreateMap<Photo, PhotoDto>();

        ///<summary>
        ///Maps from a Term object to a TermDto object
        ///</summary>
        CreateMap<Term, TermDto>();
    }
  }
}