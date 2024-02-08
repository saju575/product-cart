import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export default filterSlice.reducer;

export const { setSearchName } = filterSlice.actions;
