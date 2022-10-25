using Microsoft.EntityFrameworkCore;
using PM.Api.DataAccess.Master_Tables;

namespace PM.Api.DataAccess
{
    public class PMDbContext : DbContext
    {
        public PMDbContext() : base() { }
        public PMDbContext(DbContextOptions options) : base(options) { }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Car> Cars { get; set; }
    }
}
