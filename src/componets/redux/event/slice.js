import { createSlice } from "@reduxjs/toolkit";
import { bookEvent, createGround, deleteGround, getEvent, getEventBooking, getGround, updateGround } from "./thunk";

const initialState = {
  loading: false,
  event: [],
  error: null,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    resetAuth(state) {
      state.loading = false;
      state.event = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


       .addCase(getEventBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(getEventBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(bookEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.event = action.payload;
      })
      .addCase(bookEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default eventSlice.reducer;
