import { createSlice } from "@reduxjs/toolkit";
import { bookGround, createGround, deleteGround, getGround, getGroundBooking, updateGround } from "./thunk";

const initialState = {
  loading: false,
  ground: [],
  error: null,
};

const groundSlice = createSlice({
  name: "ground",
  initialState,
  reducers: {
    resetAuth(state) {
      state.loading = false;
      state.ground = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGround.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGround.fulfilled, (state, action) => {
        state.loading = false;
        state.ground = action.payload;
      })
      .addCase(getGround.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getGroundBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroundBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.ground = action.payload;
      })
      .addCase(getGroundBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(bookGround.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookGround.fulfilled, (state, action) => {
        state.loading = false;
        state.ground = action.payload;
      })
      .addCase(bookGround.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default groundSlice.reducer;
