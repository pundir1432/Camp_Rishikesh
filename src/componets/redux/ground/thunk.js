import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Url from "../../helper/api/endpoint";
import { ownerApi } from "../../helper/api/apiCore";
import { showError, showSuccess } from "../../helper/Toast";

export const getGround = createAsyncThunk(
  "ground/getGround",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.get(`${Url.GET_GROUND}`, data);
      return res?.data;
    } catch (error) {
      showError(error);
      return rejectWithValue(error);
    }
  }
);

export const getGroundBooking = createAsyncThunk(
  "ground/getGroundBooking",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.get(`${Url.GET_BOOKING_GROUND}/user/${data}`);
      console.log({res});
      return res?.data;
    } catch (error) {
      showError(error);
      return rejectWithValue(error);
    }
  }
);

export const bookGround = createAsyncThunk(
  "ground/bookGround",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.post(`${Url.BOOK_GROUND}`, data);
      console.log({res});
      showSuccess(res?.data?.message);
      return res?.data;
    } catch (error) {
      showError(error);
      return rejectWithValue(error);
    }
  }
);






