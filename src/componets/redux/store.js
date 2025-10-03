import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./auth/slice";
import gallaryReducer from "./gallary/slice";
import locationReducre from "./location/slice";
import groundReducre from "./ground/slice";
import eventReducer from "./event/slice";
import vehicleReducer from "./vehiclewithrafting/slice";
import raftingReducer from "./vehiclewithrafting/slice";


const store = configureStore({
  reducer: {
    Auth: userAuthReducer,
    gallary: gallaryReducer,
    location: locationReducre,
    ground: groundReducre,
    event: eventReducer,
    vehicle: vehicleReducer,
    rafting: raftingReducer
  },
});

export default store;