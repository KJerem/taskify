/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


export interface CreateWorkspaceState {
  isSucceed: boolean,
  workspaces: any ;
}

const initialState: CreateWorkspaceState = {
  isSucceed: false,
  workspaces: {},
};

const workspaceSlice = createSlice({
  name: "create_workspace",
  initialState,
  reducers: {
    onWorkspaceCreated: (
      state,
      action: PayloadAction<{ isSucceed: boolean, workspaces: any }>
    ) => {
      localStorage.setItem(
        "workspaces",
        JSON.stringify({
          isSucceed: action.payload.isSucceed,
          workspaces: action.payload.workspaces,
        })
      );
      state.isSucceed = action.payload.isSucceed;
      state.workspaces = action.payload.workspaces;
    },
    onWorkspacesFetched: (state, action: PayloadAction<{isSucceed: boolean, workspaces: any}>) => {
      localStorage.setItem(
        "workspaces",
        JSON.stringify({
          isSucceed: action.payload.isSucceed,
          workspaces: action.payload.workspaces,
        })
      );
      state.isSucceed = action.payload.isSucceed;
      state.workspaces = action.payload.workspaces;
    }
  },
});

export const selectAuth = (state: RootState) => state.auth;

export const { onWorkspaceCreated, onWorkspacesFetched } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;
