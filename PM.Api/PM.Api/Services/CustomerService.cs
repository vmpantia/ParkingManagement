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
                throw new ServiceException(Constants.ERR_DATE_NOT_FOUND);

            return result;
        }

        public async Task<Customer> GetCustomerByIdAsync(Guid customerId)
        {
            if (customerId == Guid.Empty)
                return new Customer();

            //Get data based on parameter id
            var customer = await _db.Customers.FindAsync(customerId);

            if (customer == null)
                throw new ServiceException(Constants.ERR_DATE_NOT_FOUND);

            //Get related data based on paramater id
            customer.Cars = await _db.Cars.Where(data => data.CustomerId == customerId).ToListAsync();

            return customer;
        }

        public async Task SaveCustomerAsync(CustomerRequest request)
        {
            if(request == null)
            {
                throw new ServiceException(Constants.ERR_REQUEST_NULL);
            }

            var isAdd = request.customerData.CustomerId == Guid.Empty;

            //Backend Validation of Customer
            var errorMessage = await ValidateCustomer(request.customerData, isAdd);
            if (!string.IsNullOrEmpty(errorMessage))
                throw new ServiceException(errorMessage);

            if(isAdd)
            {
                request.customerData.CreatedDate = DateTime.Now;
                request.customerData.ModifiedDate = DateTime.Now;
                await InsertCustomer(request.customerData);
            }
            else
            {
                request.customerData.ModifiedDate = DateTime.Now;
                await UpdateCustomer(request.customerData);
                if (request.customerData.Cars != null && request.customerData.Cars.Count() > 0)
                {
                    await _car.SaveCars(_db, request.customerData.CustomerId, request.customerData.Cars);
                }
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
                throw new ServiceException(Constants.ERR_DATE_NOT_FOUND);

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

        private async Task<string> ValidateCustomer(Customer customer, bool isAdd)
        {
            if (customer == null)
                //Throw an Error if Customer NULL
                return Constants.ERR_CUSTOMER_NULL;

            if (!isAdd)
            {
                var oldCustomer = await _db.Customers.FindAsync(customer.CustomerId);
                if (oldCustomer == null)
                    //Throw an Error if old customer data can't be found
                    return Constants.ERR_DATE_NOT_FOUND;

                //Check if there are changes made
                if (customer.FirstName == oldCustomer.FirstName &&
                    customer.LastName == oldCustomer.LastName &&
                    customer.MiddleName == oldCustomer.MiddleName &&
                    customer.ContactNo == oldCustomer.ContactNo &&
                    customer.Address == oldCustomer.Address)
                {
                    var isChange = false;

                    if (customer.Cars != null)
                    {
                        foreach (var car in customer.Cars)
                        {
                            if (car.CustomerId == Guid.Empty)
                            {
                                isChange = true;
                                continue;
                            }

                            var oldCar = await _db.Cars.FindAsync(car.CarId);
                            if (oldCar == null)
                            {
                                isChange = true;
                                continue;
                            }

                            if (car.PlateNo == oldCar.PlateNo &&
                               car.Type == oldCar.Type &&
                               car.YearModel == oldCar.YearModel &&
                               car.Make == oldCar.Make &&
                               car.Color == oldCar.Color)
                            {
                                isChange = false;
                                continue;
                            }
                        }
                    }

                    if (isChange)
                        return String.Empty;

                    return Constants.ERR_NO_CHANGES;

                }
            }

            var customers = await _db.Customers.Where(data => data.FirstName == customer.FirstName &&
                                                              data.LastName == customer.LastName).ToListAsync();

            if(customers.Any())
            {
                var isActive = customers.First().Status == Constants.STATUS_ENABLED;
                if(isActive)
                    return Constants.ERR_CUSTOMER_EXIST_ENABLE;

                return Constants.ERR_CUSTOMER_EXIST_NOT_ENABLE;
            }

            return String.Empty;
        }
    }
}
