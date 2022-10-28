using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM.Api.Exceptions;
using PM.Api.Models;
using PM.Api.Models.Request;
using PM.Api.Services;

namespace PM.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _car;
        public CarController(ICarService car)
        {
            _car = car;
        }

        [HttpGet("GetCars")]
        public async Task<ActionResult> GetCarsAsync()
        {
            try
            {
                //Get data from database using service
                var filter = new FilterSetting();
                var result = await _car.GetCarsAsync(filter);

                //Check if the  result is NULL
                if (result == null)
                    return NotFound();

                return Ok(result);
            }
            //Handle Custom Exception
            catch (ServiceException ex)
            {
                return Conflict(ex.Message);
            }
            //Handle Unexpected Exception
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetCarById/{carId}")]
        public async Task<ActionResult> GetCarByIdAsync(Guid carId)
        {
            try
            {
                var result = await _car.GetCarByIdAsync(carId);

                //Check if the result is NULL
                if (result == null)
                    return NotFound();

                return Ok(result);
            }
            //Handle Custom Exception
            catch (ServiceException ex)
            {
                return Conflict(ex.Message);
            }
            //Handle Unexpected Exception
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("SaveCar")]
        public async Task<ActionResult> SaveCustomerAsync(CarRequest request)
        {
            try
            {
                await _car.SaveCarAsync(request);

                return Ok();
            }
            //Handle Custom Exception
            catch (ServiceException ex)
            {
                return Conflict(ex.Message);
            }
            //Handle Unexpected Exception
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
