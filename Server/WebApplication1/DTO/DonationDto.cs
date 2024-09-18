using System.ComponentModel.DataAnnotations;

namespace WebApplication1.DTO
{
    public class DonationDto
    {
        public long DonationId { get; set; }

        [Required(ErrorMessage = "ForeignEntityName is required.")]
        public string ForeignEntityName { get; set; }

        [Required(ErrorMessage = "ForeignEntityType is required.")]
        public string ForeignEntityType { get; set; }

        [Required(ErrorMessage = "DonationAmount is required.")]
        public string DonationAmount { get; set; }

        [Required(ErrorMessage = "DonationPurpose is required.")]
        public string DonationPurpose { get; set; }

        [Required(ErrorMessage = "ConversionRate is required.")]
        public string ConversionRate { get; set; }

        [Required(ErrorMessage = "CurrencyType is required.")]
        public string CurrencyType { get; set; }

        public string DonationConditions { get; set; }
    }
}
