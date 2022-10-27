using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PM.Api.Contractors;
using PM.Api.DataAccess;
using PM.Api.Exceptions;
using PM.Api.Models;
using PM.Api.Models.Request;

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

        [HttpGet("GetCustomerById/{customerId}")]
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


        [HttpPost("SaveCustomer")]
        public async Task<ActionResult> SaveCustomerAsync(CustomerRequest request)
        {
            try
            {
                await _customer.SaveCustomerAsync(request);

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
