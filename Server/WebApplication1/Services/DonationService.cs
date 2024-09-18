using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebApplication1.DAL;
using WebApplication1.DTO;
using WebApplication1.Services.Interfaces;

namespace WebApplication1.services
{
    public class DonationService : IDonationService
    {
        private readonly IDonationRepository _donationRepository;  
        private readonly IEmailService _emailService;     

        // Constructor injection of dependencies
        public DonationService(IDonationRepository donationRepository, IEmailService emailService)
        {
            _donationRepository = donationRepository;
            _emailService = emailService;
        }

        // Handles creation of a donation
        public async Task<ResultService> CreateDonationAsync(DonationDto donation)
        {
            // Validate Hebrew or English characters in specific fields
            if (!IsValidHebrewEnglish(donation.ForeignEntityName) || !IsValidHebrewEnglish(donation.DonationPurpose) || !IsValidHebrewEnglish(donation.DonationConditions))
            {
                return new ResultService { IsSuccess = false, ErrorMessage = "Some fields contain invalid characters." };
            }

            // Check if donation amount is greater than 10,000 and send an email alert
            if (decimal.TryParse(donation.DonationAmount, out decimal amount) && amount > 10000)
            {
                await _emailService.SendEmailAsync("efrat0583219078@gmail.com", "High Donation Alert", "A donation of over 10,000 was updated.");
            }

            //Mapping to model and Save the donation to the repository
            var donationModel = donation.ToModel();  
            await _donationRepository.CreateDonationAsync(donationModel);


            return new ResultService { IsSuccess = true };
        }

        // Handles updating an existing donation
        public async Task<ResultService> UpdateDonationAsync(long donationId, DonationDto updatedDonation)
        {
            // Retrieve the existing donation from the repository
            var donation = await _donationRepository.GetDonationByIdAsync(donationId);
            if (donation == null)
            {
                return new ResultService { IsSuccess = false, ErrorMessage = "Donation not found." };
            }

            // Validate Hebrew or English characters in specific fields
            if (!IsValidHebrewEnglish(updatedDonation.ForeignEntityName) || !IsValidHebrewEnglish(updatedDonation.DonationPurpose) || !IsValidHebrewEnglish(updatedDonation.DonationConditions))
            {
                return new ResultService { IsSuccess = false, ErrorMessage = "Some fields contain invalid characters." };
            }

            // Check if donation amount is greater than 10,000 and send an email alert
            if (decimal.TryParse(updatedDonation.DonationAmount, out decimal amount) && amount > 10000)
            {
                await _emailService.SendEmailAsync("efrat0583219078@gmail.com", "High Donation Alert", "A donation of over 10,000 was updated.");
            }

            // Update the donation in the repository
            var donationModel = updatedDonation.ToModel();  
            await _donationRepository.UpdateDonationAsync(donationId, donationModel);

            return new ResultService { IsSuccess = true };
        }

        // Handles deletion of a donation
        public async Task<ResultService> DeleteDonationAsync(long donationId)
        {
            // Retrieve the donation to be deleted
            var donation = await _donationRepository.GetDonationByIdAsync(donationId);
            if (donation == null)
            {
                return new ResultService { IsSuccess = false, ErrorMessage = "Donation not found." };
            }

            // Delete the donation from the repository
            await _donationRepository.DeleteDonationAsync(donationId);
            return new ResultService { IsSuccess = true };
        }

        // Helper method to validate if the input contains only Hebrew or English characters
        private bool IsValidHebrewEnglish(string input)
        {
            if (string.IsNullOrWhiteSpace(input)) return true;
            return Regex.IsMatch(input, @"^[a-zA-Z\u0590-\u05FF\s]+$");
        }
    }
}
