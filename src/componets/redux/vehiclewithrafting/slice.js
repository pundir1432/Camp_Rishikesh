import { createSlice } from "@reduxjs/toolkit";
import { getRafting, getVehicle } from "./thunk";

const initialState = {
  loading: false,
  vehicle: [],
  rafting:[],
  error: null,
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    resetAuth(state) {
      state.loading = false;
      state.vehicle = null;
      state.rafting = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVehicle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVehicle.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicle = action.payload;
      })
      .addCase(getVehicle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getRafting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRafting.fulfilled, (state, action) => {
        state.loading = false;
        state.rafting = action.payload;
      })
      .addCase(getRafting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default vehicleSlice.reducer;
