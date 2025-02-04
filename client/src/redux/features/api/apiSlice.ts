/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {userLoggedIn} from "@/redux/features/auth/authSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: () => ({
        url: "auth/me",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          
          dispatch(
              userLoggedIn({
                isSucceed: true,
                user: result.data.user,
                accessToken: result.data.accessToken,
              })
          );
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {useRefreshTokenQuery, useLoadUserQuery} = apiSlice;
