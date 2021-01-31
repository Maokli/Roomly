using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegsiterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [StringLength(15, MinimumLength = 8)]
        public string Password { get; set; }
    }
}