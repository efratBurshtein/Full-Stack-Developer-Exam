using System.Threading.Tasks;
using WebApplication1.DTO;
using WebApplication1.Models;

namespace WebApplication1.DAL
{
    public class DonationRepository : IDonationRepository
    {
        // Returns a dummy DonationModel object for the specified donationId
        public Task<DonationModel> GetDonationByIdAsync(long donationId)
        {
            return Task.FromResult(new DonationModel());
        }

        // Simulates the creation of a donation
        public Task CreateDonationAsync(DonationModel donation)
        {
            return Task.CompletedTask;
        }

        // Simulates updating a donation
        public Task UpdateDonationAsync(long donationId, DonationModel updatedDonation)
        {
            return Task.CompletedTask;
        }

        // Simulates deleting a donation
        public Task DeleteDonationAsync(long donationId)
        {
            return Task.CompletedTask;
        }
    }
}
