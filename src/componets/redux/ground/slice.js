import { createSlice } from "@reduxjs/toolkit";
import { createGround, deleteGround, getGround, updateGround } from "./thunk";

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

  },
});

export default groundSlice.reducer;
