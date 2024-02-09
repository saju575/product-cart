import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: ({ items_price }) => ({
        url: "/orders/create",
        method: "POST",
        body: { items_price },
      }),

      invalidatesTags: ["Orders"],
    }),

    getAllOrders: builder.query({
      query: ({ status }) => ({
        url: status ? `/orders?status=${status}` : "/orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ id, data }) => ({
        url: `/orders/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useCheckoutMutation,
  useGetAllOrdersQuery,
  useUpdateOrderMutation,
} = authApi;
