using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PM.Api.DataAccess.Master_Tables
{
    public class Car
    {
        [Key]
        public Guid CarId { get; set; }
        [ForeignKey("FK_Customer")]
        public Guid CustomerId { get; set; }
        [Required, MaxLength(20)]
        public string PlateNo { get; set; }
        [Required, MaxLength(20)]
        public string Type { get; set; }
        [Required, MaxLength(4)]
        public string YearModel { get; set; }
        [Required, MaxLength(20)]
        public string Make { get; set; }
        [Required, MaxLength(20)]
        public string Color { get; set; }
        [Required]
        public int Status { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}
