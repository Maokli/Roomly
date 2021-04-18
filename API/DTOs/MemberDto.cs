using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }

        [Required]
        public string UserName { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string PhotoUrl { get; set; }

        public int Age { get; set; }
        
        public DateTime DateOfBirth { get; set; }

        public DateTime Joined { get; set; }

        public DateTime LastActive { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required]
        [StringLength(180)]
        public string Description { get; set; }

        [Required]
        public string Interests { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string City { get; set; }

        [Required]
        public int Budget { get; set; }

        public ICollection<PhotoDto> Photos { get; set; }

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