using WebApplication1.DTO;
using WebApplication1.services;

namespace WebApplication1.Services.Interfaces
{
    public interface IDonationService
    {
        Task<ResultService> CreateDonationAsync(DonationDto donation);
        Task<ResultService> UpdateDonationAsync(long donationId, DonationDto updatedDonation);
        Task<ResultService> DeleteDonationAsync(long donationId);
    }
}
