import { useState } from "react";
import { Button, Box, TextField } from "@mui/material";
import DonationForm from "./components/DonationForm";
import DonationList from "./components/DonationList";

function App() {
  
  const [openDonationForm, setOpenDonationForm] = useState(false);

  const handleAddDonationClick = () => {
    setOpenDonationForm(true);
  };

  const handleCloseForm = () => {
    setOpenDonationForm(false);
  };

  return ( 
    <Box sx={{ maxWidth: 1000, margin: "auto", padding: 2 }}>      
      {openDonationForm && <DonationForm onClose={handleCloseForm} />}
      <DonationList handleAddDonationClick={handleAddDonationClick} />
    </Box>
  );
}

export default App;
