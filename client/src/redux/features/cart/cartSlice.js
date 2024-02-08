import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      // Check if the item already exists in the cart
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === newItem._id
      );
      if (existingItemIndex === -1) {
        state.items.push(newItem);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.quantity++;
      }
    },
    decreaseItemQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
