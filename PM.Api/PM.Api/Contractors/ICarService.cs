using PM.Api.DataAccess;
using PM.Api.DataAccess.Master_Tables;
using PM.Api.Models;
using PM.Api.Models.Request;

namespace PM.Api.Services
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetCarsAsync(FilterSetting filter);
        Task<Customer> GetCarByIdAsync(Guid carId);
        Task SaveCarsAsync(IEnumerable<Car> cars, Guid customerId, PMDbContext db);
        Task SaveCarAsync(CarRequest request);
    }
}