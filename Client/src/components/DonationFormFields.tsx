import React, { useState } from "react";
import { TextField, MenuItem, Grid, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

// Styled component for red asterisk
const RedAsterisk = styled("span")({
  color: "red",
  marginLeft: 4,
});

interface DonationFieldsProps {
  formData: {
    foreignEntityName: string;
    foreignEntityType: string;
    donationAmount: string;
    donationPurpose: string;
    donationConditions: string;
    conversionRate: string;
    currencyType: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  isEditing: boolean;
  lngItem: boolean;
}

const DonationFormFields: React.FC<DonationFieldsProps> = ({
  formData,
  setFormData,
  handleInputChange,
  handleSave,
  isEditing,
  lngItem,
}) => {
  // Handle change for donation amount input with validation
  const handleDonationAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      handleInputChange(event);
    }
  };

  // Handle change for foreign entity name input with validation
  const handleforeignEntityNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (/^[\u0590-\u05FFa-zA-Z\s]+$/.test(value)) {
      handleInputChange(event);
    }
  };

  // State to manage form validation errors
  const [errors, setErrors] = useState({
    foreignEntityName: false,
    foreignEntityType: false,
    donationAmount: false,
    currencyType: false,
    conversionRate: false,
    donationPurpose: false,
  });

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {
      foreignEntityName: formData.foreignEntityName === "",
      foreignEntityType: formData.foreignEntityType === "",
      donationAmount: formData.donationAmount === "",
      currencyType: formData.currencyType === "",
      conversionRate: formData.conversionRate === "",
      donationPurpose: formData.donationPurpose === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  // Clear the form and reset errors
  const handleClearForm = () => {
    setFormData({
      donationId: 0,
      foreignEntityName: "",
      foreignEntityType: "",
      donationAmount: "",
      donationPurpose: "",
      donationConditions: "",
      conversionRate: "",
      currencyType: "",
    });
    setErrors({
      foreignEntityName: false,
      foreignEntityType: false,
      donationAmount: false,
      currencyType: false,
      conversionRate: false,
      donationPurpose: false,
    });
  };

  // Save the form data with validation
  const handleSaveWithValidation = () => {
    if (validateForm()) {
      handleSave();
    } else {
      alert("אנא מלא את כל השדות החיוניים.");
    }
  };

  return (
    <Grid container spacing={lngItem ? 1 : 2}>
      {/* Foreign Entity Name Field */}
      <Grid item xs={12} sm={lngItem ? 12 : 3}>
        <TextField
          fullWidth
          label={
            <>
              שם הישות המדינית הזרה <RedAsterisk>*</RedAsterisk>
            </>
          }
          variant="outlined"
          value={formData.foreignEntityName}
          onChange={handleforeignEntityNameChange}
          name="foreignEntityName"
          inputProps={{ style: { textAlign: "right", direction: "rtl" } }}
          disabled={!isEditing}
        />
      </Grid>
      
      {/* Donation Amount Field */}
      <Grid item xs={12} sm={lngItem ? 12 : 3}>
        <TextField
          fullWidth
          label={
            <>
              סכום התרומה בש״ח <RedAsterisk>*</RedAsterisk>
            </>
          }
          type="text"
          value={formData.donationAmount}
          onChange={handleDonationAmountChange}
          name="donationAmount"
          variant="outlined"
          disabled={!isEditing}
        />
      </Grid>
      
      {/* Foreign Entity Type Field */}
      <Grid item xs={12} sm={lngItem ? 12 : 6}>
        <TextField
          fullWidth
          select
          label={
            <>
              סוג הישות המדינית הזרה <RedAsterisk>*</RedAsterisk>
            </>
          }
          value={formData.foreignEntityType}
          onChange={handleInputChange}
          name="foreignEntityType"
          variant="outlined"
          disabled={!isEditing}
        >
          <MenuItem value="type1">סוג 1</MenuItem>
          <MenuItem value="type2">סוג 2</MenuItem>
        </TextField>
      </Grid>
      
      {/* Donation Purpose Field */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label={
            <>
              יעוד התרומה <RedAsterisk>*</RedAsterisk>
            </>
          }
          value={formData.donationPurpose}
          onChange={handleInputChange}
          name="donationPurpose"
          variant="outlined"
          disabled={!isEditing}
        />
      </Grid>
      
      {/* Donation Conditions Field */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="התנאים לתרומה"
          value={formData.donationConditions}
          onChange={handleInputChange}
          name="donationConditions"
          variant="outlined"
          disabled={!isEditing}
        />
      </Grid>
      
      {/* Currency Type Field */}
      <Grid item xs={12} sm={lngItem ? 12 : 3}>
        <TextField
          fullWidth
          select
          label={
            <>
              סוג המטבע <RedAsterisk>*</RedAsterisk>
            </>
          }
          value={formData.currencyType}
          onChange={handleInputChange}
          name="currencyType"
          variant="outlined"
          disabled={!isEditing}
        >
          <MenuItem value="₪">₪ (ש״ח)</MenuItem>
          <MenuItem value="$">$ (דולר)</MenuItem>
        </TextField>
      </Grid>
      
      {/* Conversion Rate Field */}
      <Grid item xs={12} sm={lngItem ? 12 : 3}>
        <TextField
          fullWidth
          label={
            <>
              שער ההמרה <RedAsterisk>*</RedAsterisk>
            </>
          }
          type="number"
          value={formData.conversionRate}
          onChange={handleInputChange}
          name="conversionRate"
          variant="outlined"
          style={{ direction: "rtl" }}
          disabled={!isEditing}
        />
      </Grid>

      {/* Action Buttons */}
      <Grid item xs={12}>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", sm: "flex-end" }, 
            gap: 2,
            mt: 2, 
          }}
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearForm}
            sx={{ minWidth: "200px", borderRadius: 20 }}
          >
            ניקוי
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveWithValidation}
            sx={{ minWidth: "200px", borderRadius: 20 }}
          >
            שמירה
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DonationFormFields;
