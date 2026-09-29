import { createSlice } from "@reduxjs/toolkit";

const shopSlice = createSlice({
  name: "shop",
  initialState: {
    myShopData: null,
    myShopItems: null,
  },
  reducers: {
    setMyShopData: (state, action) => {
      state.myShopData = action.payload;
    },
  },
});

export const { setMyShopData } = shopSlice.actions;

export default shopSlice.reducer;
