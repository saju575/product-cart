import { apiSlice } from "../api/apiSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ name }) => {
        return name ? `/products/?name=${name}` : `/products/`;
      },
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products/create",
        method: "POST",

        body: data,
        formData: true,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
