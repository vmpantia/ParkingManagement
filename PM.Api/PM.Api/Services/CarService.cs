using PM.Api.DataAccess;
using PM.Api.DataAccess.Master_Tables;
using PM.Api.Exceptions;
using PM.Api.Models;

namespace PM.Api.Services
{
    public class CarService : ICarService
    {
        private readonly PMDbContext _db;
        public CarService(PMDbContext dbContext)
        {
            _db = dbContext;
        }

        public async Task SaveCars(PMDbContext db, Guid customerId, IEnumerable<Car> cars)
        {
            foreach(Car car in cars)
            {
                var isAdd = car.CarId == Guid.Empty;
                if (isAdd)
                {
                    car.CustomerId = customerId;
                    car.CreatedDate = DateTime.Now;
                    car.ModifiedDate = DateTime.Now;
                    await InserCar(db, car);
                }
                else
                {
                    car.ModifiedDate = DateTime.Now;
                    await UpdateCar(db, car);
                }
            }
        }
        private async Task InserCar(PMDbContext db, Car car)
        {
            await db.Cars.AddAsync(car);
        }

        private async Task UpdateCar(PMDbContext db, Car car)
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
