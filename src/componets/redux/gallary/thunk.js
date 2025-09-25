import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Url from "../../helper/api/endpoint";
import { ownerApi } from "../../helper/api/apiCore";
import { showError, showSuccess } from "../../helper/Toast";

export const getGallary = createAsyncThunk(
  "gallary/getGallary",
  async (data, { rejectWithValue }) => {
    try {
      const res = await ownerApi.get(`${Url.GET_GALLARY}?type=${data}`);
      return res?.data;
    } catch (error) {
      showError(error);
      return rejectWithValue(error);
    }
  }
);



