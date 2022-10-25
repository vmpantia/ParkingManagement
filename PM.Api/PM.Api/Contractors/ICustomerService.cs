using PM.Api.DataAccess.Master_Tables;
using PM.Api.Models;
using PM.Api.Models.Request;

namespace PM.Api.Contractors
{
    public interface ICustomerService
    {
        Task<IEnumerable<Customer>> GetCustomersAsync(FilterSetting filter);
        Task<Customer> GetCustomerByIdAsync(Guid customerId);
        Task SaveCustomerAsync(CustomerRequest request);
    }
}