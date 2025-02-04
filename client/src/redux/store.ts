"use client";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authSlice from "./features/auth/authSlice";
import { setupListeners } from "@reduxjs/toolkit/query/react";


export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
  },
  devTools: false,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);

// call the refresh token function on every page load
const initializeApp = async () => {
  await store.dispatch(apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch: true}));
  await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch: true}));
}

initializeApp()
