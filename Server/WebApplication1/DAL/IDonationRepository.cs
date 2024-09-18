using WebApplication1.DTO;
using WebApplication1.Models;

namespace WebApplication1.DAL
{

    public interface IDonationRepository
        {
            Task<DonationModel> GetDonationByIdAsync(long donationId);
            Task CreateDonationAsync(DonationModel donation);
            Task UpdateDonationAsync(long donationId, DonationModel updatedDonation);
            Task DeleteDonationAsync(long donationId);

        }
    
}
