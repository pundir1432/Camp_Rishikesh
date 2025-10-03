import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Url from "../../helper/api/endpoint";
import { ownerApi } from "../../helper/api/apiCore";
import { showError, showSuccess } from "../../helper/Toast";

export const getVehicle = createAsyncThunk(
  "vehicle/getVehicle",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.get(`${Url.GET_VEHICLE}`, data);
      return res?.data;
    } catch (error) {
      showError(error);
      return rejectWithValue(error);
    }
  }
);

export const getRafting = createAsyncThunk(
  "rafting/getRafting",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.get(`${Url.GET_RAFTING}`,data);
      return res?.data;
    } catch (error) {
      showError(error);
      return rejectWithValue(error);
    }
  }
);







