namespace WebApplication1.Models
{
    
        public class DonationModel
        {
            public long DonationId { get; set; }
            public string ForeignEntityName { get; set; }
            public string ForeignEntityType { get; set; }
            public decimal DonationAmount { get; set; } 
            public string DonationPurpose { get; set; }
            public decimal ConversionRate { get; set; }  
            public string CurrencyType { get; set; }
            public string DonationConditions { get; set; }
        }
    }


