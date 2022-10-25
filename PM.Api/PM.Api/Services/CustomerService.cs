using Microsoft.EntityFrameworkCore;
using PM.Api.Contractors;
using PM.Api.DataAccess;
using PM.Api.DataAccess.Master_Tables;
using PM.Api.Exceptions;
using PM.Api.Models;

namespace PM.Api.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly PMDbContext _db;
        public CustomerService(PMDbContext dbContext)
        {
            _db = dbContext;
        }

        public async Task<IEnumerable<Customer>> GetCustomersAsync(FilterSetting filter)
        {
            return await _db.Customers.ToListAsync();
        }

        public async Task<Customer> GetCustomerByIdAsync(Guid customerId)
        {
            //Get data based on parameter id
            var customer = await _db.Customers.FindAsync(customerId);

            if (customer == null)
                return null;

            //Get related data based on paramater id
            customer.Cars = await _db.Cars.Where(data => data.CustomerId == customerId).ToListAsync();

            return customer;
        }
    }
}
