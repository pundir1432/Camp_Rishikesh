import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Url from "../../helper/api/endpoint";
import { showError, showSuccess } from "../../helper/Toast";
import { ownerApi } from "../../helper/api/apiCore";

export const getLocation = createAsyncThunk(
  "location/getLocation",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.get(`${Url.GET_LOCATION}`,data);
      return res?.data;
    } catch (error) {
      showError(error);
      return rejectWithValue(error);
    }
  }
);


