using System.ComponentModel.DataAnnotations;

namespace PM.Api.DataAccess.Master_Tables
{
    public class Customer
    {
        [Key]
        public Guid CustomerId { get; set; }
        [Required, MaxLength(40)]
        public string FirstName { get; set; }
        [Required, MaxLength(40)]
        public string LastName { get; set; }
        [MaxLength(40)]
        public string MiddleName { get; set; }
        [Required, MaxLength(15)]
        public string ContactNo { get; set; }
        [Required, MaxLength(100)]
        public string Address { get; set; }
        [Required]
        public int Status { get; set; }
        [Required]
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public IEnumerable<Car> Cars { get; set; }
    }
}
