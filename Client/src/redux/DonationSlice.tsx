import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Donation } from "../interface/Donation.interface";

// State shape for the donation slice
interface DonationState {
  donations: Donation[];
  error: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
}

// Initial state of the donation slice
const initialState: DonationState = {
  donations: [],
  error: null,
  status: "idle",
};

// Interface for rejected actions to include optional payload
interface RejectedAction {
  payload?: string;
}

// Asynchronous thunk to add a donation
export const addDonation = createAsyncThunk<Donation, Donation>("donation/addDonation",async (donation: Donation, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://localhost:7040/donation", donation);
      if (response.data.isSuccess) {
        return donation;
      } else {
        return rejectWithValue(response.data.errorMessage);
      }
    } catch (error) {
      return rejectWithValue("Error creating donation");
    }
  }
);

// Asynchronous thunk to update a donation
export const updateDonation = createAsyncThunk<Donation, Donation>("donation/updateDonation",async (donation: Donation, { rejectWithValue }) => {
    try {
      const response = await axios.put(`https://localhost:7040/donation/${donation.donationId}`, donation);
      if (response.data.isSuccess) {
        return donation;
      } else {
        return rejectWithValue(response.data.errorMessage);
      }
    } catch (error) {
      return rejectWithValue("Error updating donation");
    }
  }
);

// Asynchronous thunk to delete a donation
export const deleteDonation = createAsyncThunk<void, number>("donation/deleteDonation",async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`https://localhost:7040/donation/${id}`);
      if (response.data.isSuccess) {
        return;
      } else {
        return rejectWithValue(response.data.errorMessage);
      }
    } catch (error) {
      return rejectWithValue("Error deleting donation");
    }
  }
);

// Slice to manage donation state
const donationSlice = createSlice({
  name: "donation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle successful addition of a donation
    builder.addCase(addDonation.fulfilled, (state, action: PayloadAction<Donation>) => {
      state.donations.push(action.payload);
      state.status = "succeeded";
    });
    
    // Handle successful update of a donation
    builder.addCase(updateDonation.fulfilled, (state, action: PayloadAction<Donation>) => {
      const index = state.donations.findIndex((d) => d.donationId === action.payload.donationId);
      if (index !== -1) {
        state.donations[index] = action.payload;
      }
      state.status = "succeeded";
    });

    // Handle successful deletion of a donation
    builder.addCase(deleteDonation.fulfilled, (state, action) => {
      const donationId = action.meta.arg;
      state.donations = state.donations.filter((donation) => donation.donationId !== donationId);
      state.status = "succeeded";
    });

    // General matcher for pending states
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.status = "loading";
        state.error = null;
      }
    );

    // General matcher for rejected states
    builder.addMatcher(
      (action): action is RejectedAction => action.type.endsWith("/rejected"),
      (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Unknown error occurred";
        console.error("Error:", action.payload);
      }
    );
  },
});

export default donationSlice.reducer;
