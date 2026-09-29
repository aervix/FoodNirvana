import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  userCity: null,
  userState: null,
  currentAddress: null,
  cartItems: [],
  totalAmount: 0,
  myOrders: [],
};

// CartItem Structure :
// {  id: null,
//   name: null,
//   price: 0,
//   image: null,
//   shop: null,
//   quantity: null,
//   foodType: null,
// },

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserCity: (state, action) => {
      state.userCity = action.payload;
    },
    setUserState: (state, action) => {
      state.userCity = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.userCity = action.payload;
    },
    addToCart: (state, action) => {
      const cartItem = action.payload;
      const existind = state.cartItems.find((i) => i.id == cartItem.id);
      if (existind) {
        existind.quantity += cartItem.quantity;
      } else {
        state.cartItems.push(cartItem);
      }

      // console.log("Cart Items: ", state.cartItems);
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.id == id);

      if (item) {
        item.quantity = quantity;
      }
    },

    deleteItemFromCart: (state, action) => {
      const id = action.payload;
      console.log(id);

      if (id) {
        state.cartItems = state.cartItems.filter((i) => i.id !== id);
      }
      console.log(state.cartItems);
    },

    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },

    setMyOrders: (state, action) => {
      state.myOrders = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, shopId, status } = action.payload;
      const order = state.myOrders.find((order) => order._id === orderId);

      if (order) {
        if (order.shopOrders && order.shopOrders.shop._id === shopId) {
          order.shopOrders.status = status;
        }
      }
    },
  },
});

export const {
  setUserData,
  setUserCity,
  setUserState,
  setCurrentAddress,
  addToCart,
  updateQuantity,
  deleteItemFromCart,
  setTotalAmount,
  setMyOrders,
  updateOrderStatus
} = userSlice.actions;
export default userSlice.reducer;
