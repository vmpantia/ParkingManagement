using PM.Api.DataAccess.Master_Tables;
using PM.Api.Models;

namespace PM.Api.Contractors
{
    public interface ICustomerService
    {
        Task<IEnumerable<Customer>> GetCustomersAsync(FilterSetting filter);
        Task<Customer> GetCustomerByIdAsync(Guid customerId);
    }
}