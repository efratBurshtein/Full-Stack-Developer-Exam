
using WebApplication1.Models;
using WebApplication1.DTO;

public static class DonationMapper
{
    public static DonationModel ToModel(this DonationDto dto)
    {
        return new DonationModel
        {
            DonationId = dto.DonationId,
            ForeignEntityName = dto.ForeignEntityName,
            ForeignEntityType = dto.ForeignEntityType,
            DonationAmount = decimal.TryParse(dto.DonationAmount, out var amount) ? amount : 0,
            DonationPurpose = dto.DonationPurpose,
            ConversionRate = decimal.TryParse(dto.ConversionRate, out var rate) ? rate : 0,
            CurrencyType = dto.CurrencyType,
            DonationConditions = dto.DonationConditions
        };
    }

    public static DonationDto ToDto(this DonationModel model)
    {
        return new DonationDto
        {
            DonationId = model.DonationId,
            ForeignEntityName = model.ForeignEntityName,
            ForeignEntityType = model.ForeignEntityType,
            DonationAmount = model.DonationAmount.ToString(),
            DonationPurpose = model.DonationPurpose,
            ConversionRate = model.ConversionRate.ToString(),
            CurrencyType = model.CurrencyType,
            DonationConditions = model.DonationConditions
        };
    }
}


