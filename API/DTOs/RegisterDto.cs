using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required] public string FirstName { get; set; }
        [Required] public string LastName { get; set; }
        [Required] public string UserName { get; set; }
        [Required] public string Gender { get; set; }
        [Required] public DateTime DateOfBirth { get; set; }
        [Required] public string City { get; set; }
        [Required] public string Country { get; set; }
        [Required] public int Budget { get; set; }
        [Required] public bool DoesDrink { get; set; }
        [Required] public bool DoesSmoke { get; set; }
        [Required] public bool HasPets { get; set; }
        [Required] public bool HasLivedWithSomeoneBefore { get; set; }
        [Required] public bool HasAllergies { get; set; }
        [Required] public bool IsMovingAlone { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 8)]
        public string Password { get; set; }
    }
}