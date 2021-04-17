using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class MemberUpdateDto
    {
        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Gender { get; set; }

        public string Description { get; set; }

        public string Interests { get; set; }

        public string Country { get; set; }

        public string City { get; set; }

        public int Budget { get; set; }

        //Living Information
        public bool DoesDrink { get; set; }
        public bool DoesSmoke { get; set; }
        public bool HasPets { get; set; }
        public bool HasLivedWithSomeoneBefore { get; set; }
        public bool HasAllergies { get; set; }
        public bool IsMovingAlone { get; set; }
        public ICollection<TermDto> TermsAndConditions { get; set; }
    }
}