using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
  public class AppUser : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Joined { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string Gender { get; set; }
        public string Description { get; set; }
        public string Interests { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int Budget { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<UserLike> LikedByUsers { get; set; }
        public ICollection<UserLike> LikedUsers { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesRecieved { get; set; }

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