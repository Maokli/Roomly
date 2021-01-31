using System;
using System.Collections.Generic;

namespace API.DTOs
{
    public class MemberDto
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string PhotoUrl { get; set; }
        public int Age { get; set; }
        public DateTime Joined { get; set; }
        public DateTime LastActive { get; set; }
        public string Gender { get; set; }
        public string Description { get; set; }
        public string Interests { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int Budget { get; set; }
        public ICollection<PhotoDto> Photos { get; set; }
    }
}