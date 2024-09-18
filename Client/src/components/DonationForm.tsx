import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Donation } from "../interface/Donation.interface";
import DonationFormFields from "./DonationFormFields";
import { useAppDispatch } from "../redux/Hooks";
import { addDonation } from "../redux/DonationSlice";

interface DonationFormProps {
  onClose: () => void;
}

const DonationForm: React.FC<DonationFormProps> = ({ onClose }) => {
  // Redux hook
  const dispatch = useAppDispatch();

  // State to manage form data
  const [formData, setFormData] = useState<Donation>({
    donationId: 0,
    foreignEntityName: "",
    foreignEntityType: "",
    donationAmount: "",
    donationPurpose: "",
    donationConditions: "",
    conversionRate: "",
    currencyType: "",
  });

  // Update form data state on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save new donation and close the form
  const handleSave = () => {
    const newDonation = {
      ...formData,
      donationId: Date.now(), // Generate a unique ID for the new donation
    };
    dispatch(addDonation(newDonation));
    onClose();
  };

  return (
    <Box
      sx={{
        maxWidth: 1000,
        margin: "auto",
        padding: 2,
        borderRadius: 2,
        border: "1px solid #ccc",
      }}
    >
      <Typography variant="h6" gutterBottom>
        הוספת דיווח על עמותה
      </Typography>
      <DonationFormFields
        formData={formData}
        setFormData={setFormData}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        isEditing={formData.donationId === 0}
        lngItem={false}
      />
    </Box>
  );
};

export default DonationForm;
