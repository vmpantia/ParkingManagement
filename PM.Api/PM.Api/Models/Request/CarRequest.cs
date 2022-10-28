using PM.Api.DataAccess.Master_Tables;

namespace PM.Api.Models.Request
{
    public class CarRequest
    {
        public Guid userId { get; set; }
        public Car carData { get; set; }
    }
}
