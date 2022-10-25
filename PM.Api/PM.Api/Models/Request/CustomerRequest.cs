using PM.Api.DataAccess.Master_Tables;

namespace PM.Api.Models.Request
{
    public class CustomerRequest
    {
        public Guid userId { get; set; }
        public Customer customerData { get; set; }
    }
}
