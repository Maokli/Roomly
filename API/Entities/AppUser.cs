using System;
using System.Collections.Generic;
using API.Extensions;

namespace API.Entities
{
  public class AppUser
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Joined { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string Gender { get; set; }
        public string Description { get; set; }
        public string Interests { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int Budget { get; set; }
        public ICollection<Photo> Photos { get; set; }

        //Living Information
        public bool DoesDrink { get; set; }
        public bool DoesSmoke { get; set; }
        public bool HasPets { get; set; }
        public bool HasLivedWithSomeoneBefore { get; set; }
        public bool HasAllergies { get; set; }
        public bool IsMovingAlone { get; set; }
        public ICollection<Term> TermsAndConditions { get; set; }
    }
}