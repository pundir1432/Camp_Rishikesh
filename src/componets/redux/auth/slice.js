import { createSlice } from "@reduxjs/toolkit";
import {
  getUserFromSession,
  setLoggedInUser,
} from "../../helper/api/apiCore";
import { loginOwner, userSignUp, verifyOtp } from "./thunk";

const initialState = {
  loading: false,
  user: getUserFromSession(),
  otp: null,
  sentOTP: null,
  verifyEmailData: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      setLoggedInUser(null);
      localStorage.removeItem("camp_booking");
      sessionStorage.clear();
      window.location.href = "/account/login";
    },
    resetAuth(state) {
      state.loading = false;
      state.user = null;
      state.otp = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginOwner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginOwner.fulfilled, (state, action) => {
        console.log({action});
        state.loading = false;
        state.user = action.payload;
        const response = action.payload;
        localStorage.setItem('camp_booking', JSON.stringify(response));
        setLoggedInUser(response);
      })
      .addCase(loginOwner.rejected, (state, action) => {
        console.log({action});
        state.loading = false;
        state.error = action.payload;
        console.log('Login error:', action.payload);
      })
      .addCase(userSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.sentOTP = action.payload;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyEmailData = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetAuth } = authSlice.actions;
export default authSlice.reducer;