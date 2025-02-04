"use client";

import { useEffect } from "react";
import { SignInCard } from "@/features/auth/components/sign-in-card";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { redirect } from "next/navigation";

const SignIn = () => {
  const { data, isSuccess } = useLoadUserQuery(undefined);

  useEffect(() => {
    if (data && isSuccess) {
      redirect("/");
    }
  }, [data, isSuccess]);
  return <SignInCard />;
};

export default SignIn;
