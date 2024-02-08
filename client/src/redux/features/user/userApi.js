import { apiSlice } from "../api/apiSlice";
import { clearUserData, setUserData } from "./userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        // set promo if is success
        try {
          const userData = await queryFulfilled;

          if (userData?.data?.success) {
            dispatch(setUserData(userData.data.payload));
          }
        } catch (error) {
          dispatch(clearUserData());
          // do nothing
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
