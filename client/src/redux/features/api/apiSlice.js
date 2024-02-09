/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://product-cart-biyt.onrender.com/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({}),
});
