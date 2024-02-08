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
      query: () => ({
        url: "/orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    updateOrder: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}`,
        method: "PUT",
        body: { status },
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
