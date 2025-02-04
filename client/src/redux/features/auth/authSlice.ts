/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./../../store";


export interface AuthState {
  isSucceed: boolean,
  token: string ;
  user: any ;
}

const initialState: AuthState = {
  isSucceed: false,
  token: "",
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegistration: (
      state,
      action: PayloadAction<{ isSucceed: boolean, user: any, accessToken: string }>
    ) => {
      localStorage.setItem(
        "registred_user",
        JSON.stringify({
          isSucceed: action.payload.isSucceed,
          token: action.payload.accessToken,
          user: action.payload.user,
        })
      );
      state.isSucceed = action.payload.isSucceed;
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedIn: (state, action: PayloadAction<{isSucceed: boolean, user: any, accessToken: string}>) => {
      localStorage.setItem(
        "logged_in_user",
        JSON.stringify({
          isSucceed: action.payload.isSucceed,
          token: action.payload.accessToken,
          user: action.payload.user,
        })
      );
      state.isSucceed = action.payload.isSucceed;
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      localStorage.clear();
      state.isSucceed = false;
      state.token = "";
      state.user = {};
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { userRegistration, userLoggedIn, userLoggedOut } =
  authSlice.actions;

export default authSlice.reducer;
