import { createSlice } from "@reduxjs/toolkit";
import { createGallary, deleteGallary, getGallary, updateGallary } from "./thunk";

const initialState = {
  loading: false,
  gallary: [],
  error: null,
};

const gallarySlice = createSlice({
  name: "gallary",
  initialState,
  reducers: {
    logout(state) {
      state.gallary = null;
      state.error = null;
    },
    resetAuth(state) {
      state.loading = false;
      state.gallary = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGallary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGallary.fulfilled, (state, action) => {
        state.loading = false;
        state.gallary = action.payload;
      })
      .addCase(getGallary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export default gallarySlice.reducer;
