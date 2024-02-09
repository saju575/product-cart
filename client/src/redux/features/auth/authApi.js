import { apiSlice } from "../api/apiSlice";
import { clearUserData, setUserData } from "../user/userSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserData(data.payload.user));
        } catch (error) {
          // do nothing
        }
      },
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/users/signup",
        method: "POST",
        body: credentials,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserData(data.payload.user));
        } catch (error) {
          // do nothing
        }
      },
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          await queryFulfilled;
          dispatch(clearUserData());
        } catch (error) {
          // do nothing
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
