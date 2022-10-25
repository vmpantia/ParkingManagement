using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM.Api.Contractors;
using PM.Api.DataAccess;
using PM.Api.Models;

namespace PM.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customer;
        public CustomerController(ICustomerService customer)
        {
            _customer = customer;
        }

        [HttpGet("GetCustomers")]
        public async Task<ActionResult> GetCustomersAsync()
        {
            try
            {
                //Get data from database using service
                var filter = new FilterSetting();
                var result = await _customer.GetCustomersAsync(filter);

                //Check if the  result is NULL
                if(result == null)
                    return NotFound();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetCustomerById")]
        public async Task<ActionResult> GetCustomerByIdAsync(Guid customerId)
        {
            try
            {
                var result = await _customer.GetCustomerByIdAsync(customerId);

                //Check if the result is NULL
                if (result == null)
                    return NotFound();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


    }
}
