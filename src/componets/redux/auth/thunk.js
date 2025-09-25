import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Url from "../../helper/api/endpoint";
import { ownerApi } from "../../helper/api/apiCore";
import { showError, showSuccess } from "../../helper/Toast";

export const loginOwner = createAsyncThunk(
  "auth/loginOwner",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ownerApi.post(Url.USER_LOGIN, data);
      console.log({ response });
      const { user, token } = response?.data;
      showSuccess(response?.data?.message);
      const userData = {
        id: user.id,
        firstName: user.name,
        email: user.email,
        phoneNumber: user.phone,
        token: token,
        status: response?.data?.status
      };
      return userData;
    } catch (error) {
      console.log('Login thunk error:', error);
      const errorMsg = error?.response?.data?.msg || error?.message || 'Login failed';
      console.log('Error message:', errorMsg);
      showError(errorMsg);
      return rejectWithValue({ msg: errorMsg });
    }
  }
);

export const userSignUp = createAsyncThunk(
  "auth/userSignUp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.post(Url.USER_SIGNUP, data);
      showSuccess(res?.data?.message);
      return res?.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.msg || error?.message || 'Signup failed';
      showError(errorMsg);
      return rejectWithValue({ msg: errorMsg });
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.post(Url.VERIFYOTP, data);
      showSuccess(res?.data?.message);
      return res?.data;
    } catch (error) {
      const errorMsg = error?.response?.data?.msg || error?.message || 'OTP verification failed';
      showError(errorMsg);
      return rejectWithValue({ msg: errorMsg });
    }
  }
);