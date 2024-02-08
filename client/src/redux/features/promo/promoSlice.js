import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPromoActive: false,
  discount: 0,
  id: null,
};

const promoSlice = createSlice({
  name: "promo",
  initialState,
  reducers: {
    setPromo: (state, action) => {
      state.isPromoActive = action.payload.isPromoActive;
      state.discount = action.payload.discount;
      state.id = action.payload.id;
    },
  },
});

export const { setPromo } = promoSlice.actions;

export default promoSlice.reducer;
