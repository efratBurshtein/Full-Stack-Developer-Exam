using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTO;
using WebApplication1.Services;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DonationController : Controller
    {
        // Injecting the IDonationService dependency
        private readonly IDonationService _donationService;

        // Constructor to initialize the _donationService
        public DonationController(IDonationService donationService)
        {
            _donationService = donationService;
        }

        // Endpoint to create a new donation
        [HttpPost]
        public async Task<IActionResult> CreateDonation([FromBody] DonationDto donation)
        {
            // Check if the model state is valid
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Call the service to create a donation
            var result = await _donationService.CreateDonationAsync(donation);

            // Return status based on result of creation
            if (!result.IsSuccess)
                return StatusCode(500, result.ErrorMessage);

            return Ok(result);
        }

        // Endpoint to update an existing donation
        [HttpPut("{donationId}")]
        public async Task<IActionResult> UpdateDonation(long donationId, [FromBody] DonationDto donation)
        {
            // Check if the model state is valid
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Call the service to update the donation
            var result = await _donationService.UpdateDonationAsync(donationId, donation);

            // Return status based on result of update
            if (!result.IsSuccess)
                return StatusCode(500, result.ErrorMessage);

            return Ok(result);
        }

        // Endpoint to delete a donation by ID
        [HttpDelete("{donationId}")]
        public async Task<IActionResult> DeleteDonation(long donationId)
        {
            // Call the service to delete the donation
            var result = await _donationService.DeleteDonationAsync(donationId);

            // Return status based on result of deletion
            if (!result.IsSuccess)
                return StatusCode(500, result.ErrorMessage);

            return Ok(result);
        }
    }
}
