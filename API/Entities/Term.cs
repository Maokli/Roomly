using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
  [Table("Terms")]
  public class Term {
        public int Id { get; set; }
        public string TermContent { get; set; }
        public AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}