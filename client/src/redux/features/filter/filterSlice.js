import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  orderStatus: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchName: (state, action) => {
      state.name = action.payload;
    },
    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
  },
});

export default filterSlice.reducer;

export const { setSearchName, setOrderStatus } = filterSlice.actions;
