using Microsoft.EntityFrameworkCore;
using PM.Api.DataAccess;
using PM.Api.DataAccess.Master_Tables;
using PM.Api.Exceptions;
using PM.Api.Models;
using PM.Api.Models.Request;

namespace PM.Api.Services
{
    public class CarService : ICarService
    {
        private readonly PMDbContext _db;
        public CarService(PMDbContext dbContext)
        {
            _db = dbContext;
        }

        public async Task<IEnumerable<Car>> GetCarsAsync(FilterSetting filter)
        {
            var result = await _db.Cars.ToListAsync();

            if (result == null)
                throw new ServiceException(Constants.ERR_DATE_NOT_FOUND);

            return result;
        }

        public async Task<Customer> GetCarByIdAsync(Guid carId)
        {
            if (carId == Guid.Empty)
                return new Customer();

            //Get data based on parameter id
            var customer = await _db.Customers.FindAsync(carId);

            if (customer == null)
                throw new ServiceException(Constants.ERR_DATE_NOT_FOUND);

            return customer;
        }

        public async Task SaveCarsAsync(IEnumerable<Car> cars, Guid customerId, PMDbContext db)
        {
            foreach(var car in cars)
            {
                car.CustomerId = customerId;
                await SaveCar(car, db);
            }
        }

        public async Task SaveCarAsync(CarRequest request)
        {
            if (request == null)
                throw new ServiceException(Constants.ERR_REQUEST_NULL);

            await SaveCar(request.carData);
        }

        private async Task SaveCar(Car car, PMDbContext db = null)
        {
            if (db == null)
                db = _db;

            var isAdd = car.CarId == Guid.Empty;

            if (isAdd)
            {
                car.CreatedDate = DateTime.Now;
                car.ModifiedDate = DateTime.Now;
                await InserCar(car, db);
            }
            else
            {
                car.ModifiedDate = DateTime.Now;
                await UpdateCar(car, db);
            }
            await _db.SaveChangesAsync();
        }

        private async Task InserCar(Car car, PMDbContext db)
        {
            await db.Cars.AddAsync(car);
        }

        private async Task UpdateCar(Car car, PMDbContext db)
        {
            var result = await db.Cars.FindAsync(car.CarId);

            if (result == null)
                throw new ServiceException(Constants.ERR_DATE_NOT_FOUND);

            db.Entry(result).CurrentValues.SetValues(new
            {
                car.CustomerId,
                car.PlateNo,
                car.Type,
                car.YearModel,
                car.Make,
                car.Color,
                car.Status,
                car.ModifiedDate
            });
        }
    }
}
