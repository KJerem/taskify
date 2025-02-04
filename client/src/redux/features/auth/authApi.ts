/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut, userRegistration } from "./authSlice";

type RegistrationResponse = {
  isSucceed: boolean;
  message: string;
  user: any;
  accessToken: string;
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  isSucceed: boolean;
  user: any;
  accessToken: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // registration endpoint
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(
            userRegistration({
              isSucceed: true,
              user: result.data.user,
              accessToken: result.data.accessToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    // login endpoint
    login: builder.mutation<LoginResponse, LoginData>({
      query: ({ email, password }) => ({
        url: "auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(
            userLoggedIn({
              isSucceed: true,
              user: result.data.user,
              accessToken: result.data.accessToken,
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),

    // logout endpoint
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(userLoggedOut());
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } =
  authApi;
