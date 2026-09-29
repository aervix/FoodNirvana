import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import shopReducer from "../features/shopSlice";
import mapReducer from "../features/mapSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    map: mapReducer,
  },
});
