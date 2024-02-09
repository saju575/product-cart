import { apiSlice } from "../api/apiSlice";
import { setPromo } from "./promoSlice";

export const productsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkPromo: builder.mutation({
      query: ({ code }) => ({
        url: `/promos/check-code`,
        method: "POST",
        body: { code },
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        // set promo if is success
        try {
          const promoData = await queryFulfilled;

          if (promoData?.data?.success) {
            dispatch(
              setPromo({
                isPromoActive: true,
                discount: promoData.data.payload.discount_rate,
                id: promoData.data.payload._id,
              })
            );
          }
        } catch (error) {
          dispatch(setPromo({ isPromoActive: false, discount: 0, id: null }));
          // do nothing
        }
      },
    }),

    getPromos: builder.query({
      query: () => ({
        url: `/promos`,
        method: "GET",
      }),
      providesTags: ["Promos"],
    }),

    updatePromo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/promos/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Promos"],
    }),

    decrasePromo: builder.mutation({
      query: ({ id }) => ({
        url: `/promos/decrease-usages/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Promos"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setPromo({ isPromoActive: false, discount: 0, id: null }));
        } catch (error) {
          //
        }
      },
    }),

    createPromo: builder.mutation({
      query: (data) => ({
        url: `/promos/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Promos"],
    }),

    getPromo: builder.query({
      query: (id) => ({
        url: `/promos/${id}`,
        method: "GET",
      }),
      providesTags: ["Promos"],
    }),
  }),
});

export const {
  useCheckPromoMutation,
  useGetPromosQuery,
  useUpdatePromoMutation,
  useDecrasePromoMutation,
  useCreatePromoMutation,
  useGetPromoQuery,
} = productsApi;
