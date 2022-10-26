using Microsoft.EntityFrameworkCore;
using PM.Api.Contractors;
using PM.Api.DataAccess;
using PM.Api.DataAccess.Master_Tables;
using PM.Api.Exceptions;
using PM.Api.Models;
using PM.Api.Models.Request;

namespace PM.Api.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly PMDbContext _db;
        private readonly ICarService _car;
        public CustomerService(PMDbContext dbContext, ICarService carService)
        {
            _db = dbContext;
            _car = carService;
        }

        public async Task<IEnumerable<Customer>> GetCustomersAsync(FilterSetting filter)
        {
            var result = await _db.Customers.ToListAsync();

            if (result == null)
                throw new ServiceException("Data not found in database");

            return result;
        }

        public async Task<Customer> GetCustomerByIdAsync(Guid customerId)
        {
            if (customerId == Guid.Empty)
                return new Customer();

            //Get data based on parameter id
            var customer = await _db.Customers.FindAsync(customerId);

            if (customer == null)
                throw new ServiceException("Data not found in database");

            //Get related data based on paramater id
            customer.Cars = await _db.Cars.Where(data => data.CustomerId == customerId).ToListAsync();

            return customer;
        }

        public async Task SaveCustomerAsync(CustomerRequest request)
        {
            if(request == null)
            {
                throw new ServiceException("Request cannot be NULL");
            }

            var isAdd = request.customerData.CustomerId == Guid.Empty;

            if(isAdd)
            {
                request.customerData.CustomerId = Guid.NewGuid();
                request.customerData.CreatedDate = DateTime.Now;
                request.customerData.ModifiedDate = DateTime.Now;
                await InsertCustomer(request.customerData);
            }
            else
            {
                request.customerData.ModifiedDate = DateTime.Now;
                await UpdateCustomer(request.customerData);
            }

            if(request.customerData.Cars != null && request.customerData.Cars.Count() > 0)
            {
                await _car.SaveCars(_db, request.customerData.Cars);
            }

            await _db.SaveChangesAsync();
        }

        private async Task InsertCustomer(Customer customer)
        {
            await _db.Customers.AddAsync(customer);
        }

        private async Task UpdateCustomer(Customer customer)
        {
            var result = await _db.Customers.FindAsync(customer.CustomerId);

            if (result == null)
                throw new ServiceException("Data not found in database");

            _db.Entry(result).CurrentValues.SetValues(new
            {
                customer.FirstName,
                customer.LastName,
                customer.MiddleName,
                customer.ContactNo,
                customer.Address,
                customer.Status,
                customer.ModifiedDate
            });
        }
    }
}
