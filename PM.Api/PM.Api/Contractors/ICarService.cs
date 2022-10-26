using PM.Api.DataAccess;
using PM.Api.DataAccess.Master_Tables;

namespace PM.Api.Services
{
    public interface ICarService
    {
        Task SaveCars(PMDbContext db, IEnumerable<Car> cars);
    }
}