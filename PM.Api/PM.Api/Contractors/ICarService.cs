using PM.Api.DataAccess;
using PM.Api.DataAccess.Master_Tables;

namespace PM.Api.Services
{
    public interface ICarService
    {
        Task SaveCars(PMDbContext db, Guid customerId, IEnumerable<Car> cars);
    }
}