/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import { onWorkspaceCreated } from "./workspaceSlice";

export const workspaceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWorkspace: builder.mutation({
      query: (data) => ({
        url: "workspaces/create",
        method: "POST",
        body: data,
        credentials: "include"
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(
            onWorkspaceCreated({
              isSucceed: true,
              workspaces: result.data.workspace
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
    getWorkspaces: builder.query({
      query: () => ({
        url: "workspaces/",
        method: "GET",
        credentials: "include" as const,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(
            onWorkspaceCreated({
              isSucceed: true,
              workspaces: result.data.workspaces
            })
          );
        } catch (error: any) {
          console.log(error);
        }
      },
    }),
  }),
});
export const { useCreateWorkspaceMutation } = workspaceApi;
