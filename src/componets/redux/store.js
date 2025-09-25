import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./auth/slice";
import gallaryReducer from "./gallary/slice";
import locationReducre from "./location/slice";
import groundReducre from "./ground/slice";

const store = configureStore({
  reducer: {
    Auth: userAuthReducer,
    gallary: gallaryReducer,
    location: locationReducre,
    ground: groundReducre
  },
});

export default store;