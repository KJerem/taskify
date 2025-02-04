/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect } from "react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

import { redirect } from "next/navigation";
import CreateWorkspaceForm from "@/features/workspaces/components/create-workspace-form";
// import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

export default function Home() {
  const { data, isLoading } = useLoadUserQuery(undefined);

  useEffect(() => {
    if (!data && !isLoading) {
      redirect("/sign-in");
    }
  }, [data, isLoading]);

  return (
    <div>
      <CreateWorkspaceForm onCancel={() => {}} />
    </div>
  );
}
