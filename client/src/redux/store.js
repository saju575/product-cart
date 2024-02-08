import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import cartSlice from "./features/cart/cartSlice";
import filterSlice from "./features/filter/filterSlice";
import promoSlice from "./features/promo/promoSlice";
import userSlice from "./features/user/userSlice";

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    if (serializedCart === null) {
      return undefined;
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    return undefined;
  }
};

// const fetchInitialUserProfile = async () => {
//   try {
//     const response = await fetch("http://localhost:5000/api/users/profile", {
//       credentials: "include",
//     });
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching initial data:", error);
//     return undefined;
//   }
// };

const intialState = () => {
  // const initialData = await fetchInitialUserProfile();
  return {
    cart: loadCartFromLocalStorage(),
    // user: initialData,
  };
};

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    filter: filterSlice,
    cart: cartSlice,
    promo: promoSlice,
    user: userSlice,
  },
  // preloadedState: async () => {
  //   const previousPreloadedState = {
  //     cart: loadCartFromLocalStorage(),
  //   };
  //   // const initialData = await fetchInitialUserProfile();
  //   return {
  //     ...previousPreloadedState,
  //     // user: initialData,
  //   };
  // },
  preloadedState: intialState(),
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
});
