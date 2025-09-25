import { createSlice } from "@reduxjs/toolkit";
import { addDistance, createGallary, createLocation, deleteGallary, deleteLocation, getGallary, getLocation, updateGallary, updateLocation } from "./thunk";

const initialState = {
  loading: false,
  location: [],
  error: null,
};

const locationSlice = createSlice({
  name: "lacation",
  initialState,
  reducers: {
    resetAuth(state) {
      state.loading = false;
      state.location = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLocation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload;
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  },
});

export default locationSlice.reducer;
