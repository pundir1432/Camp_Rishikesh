import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Url from "../../helper/api/endpoint";
import { ownerApi } from "../../helper/api/apiCore";
import { showError, showSuccess } from "../../helper/Toast";

export const getEvent = createAsyncThunk(
  "event/getEvent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.get(`${Url.GET_EVENT}?type=${data}`);
      return res?.data;
    } catch (error) {
      showError(error);
      return rejectWithValue(error);
    }
  }
);

export const getEventBooking = createAsyncThunk(
  "event/getEventBooking",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.get(`${Url.GET_BOOKING_EVENT}/user/${data}`);
      return res?.data;
    } catch (error) {
      showError(error);
      return rejectWithValue(error);
    }
  }
);

export const bookEvent = createAsyncThunk(
  "event/bookEvent",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.post(`${Url.BOOK_EVENT}`, data);
      console.log({res});
      showSuccess(res?.data?.message);
      return res?.data;
    } catch (error) {
      showError(error);
      return rejectWithValue(error);
    }
  }
);






