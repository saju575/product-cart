import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ name }) => {
        return name ? `/products/?name=${name}` : `/products/`;
      },
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
