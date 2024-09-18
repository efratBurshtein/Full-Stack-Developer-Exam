import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DonationFormFields from "./DonationFormFields";
import { useAppDispatch, useAppSelector } from "../redux/Hooks";
import { Donation } from "../interface/Donation.interface";
import { deleteDonation, updateDonation } from "../redux/DonationSlice";

interface DonationListProps {
  handleAddDonationClick: () => void;
}

const DonationList: React.FC<DonationListProps> = ({ handleAddDonationClick }) => {
  // State to manage the current donation being edited
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedDonation, setEditedDonation] = useState<Donation | null>(null);

  // Redux hooks
  const dispatch = useAppDispatch();
  const donations = useAppSelector((state) => state.donation.donations);

  // Start editing a donation
  const handleEdit = (donation: Donation) => {
    setIsEditing(donation.donationId);
    setEditedDonation({ ...donation });
  };

  // Save the edited donation
  const handleSave = () => {
    if (editedDonation) {
      dispatch(updateDonation(editedDonation));
      setIsEditing(null);
      setEditedDonation(null);
    }
  };

  // Update the state with changes from form fields
  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedDonation((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  // Delete a donation
  const handleDelete = (id: number) => {
    dispatch(deleteDonation(id));
  };

  return (
    <Box sx={{ marginTop: 2 }}>
      {donations.map((donation) => (
        <Accordion key={donation.donationId} sx={{ maxWidth: 900, padding: 1 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${donation.donationId}-content`}
            id={`panel-${donation.donationId}-header`}
          >
            <Box sx={{ flexGrow: 1 }}>
              {donation.foreignEntityName}{" "}
              {donation.donationAmount + donation.currencyType}
            </Box>
            <IconButton
              aria-label="edit"
              onClick={() => handleEdit(donation)}
              edge="end"
              sx={{ marginRight: 1 }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(donation.donationId)}
              edge="end"
              sx={{ marginRight: 1 }}
            >
              <DeleteIcon />
            </IconButton>
          </AccordionSummary>
          <AccordionDetails>
            <DonationFormFields
              formData={
                isEditing === donation.donationId && editedDonation
                  ? editedDonation
                  : donation
              }
              setFormData={setEditedDonation}
              handleInputChange={handleFieldChange}
              handleSave={handleSave}
              isEditing={isEditing === donation.donationId}
              lngItem={true}
            />
          </AccordionDetails>
        </Accordion>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddDonationClick}
        sx={{ marginTop: 2 }}
      >
          הוספת תרומה  
      </Button>
    </Box>
  );
};

export default DonationList;
