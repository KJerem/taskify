"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { SignUpCard } from "@/features/auth/components/sign-up-card";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

const SignUp = () => {
  const { data, isSuccess } = useLoadUserQuery(undefined);

  useEffect(() => {
    if (data && isSuccess) {
      redirect("/");
    }
  }, [data, isSuccess]);
  return <SignUpCard />;
};

export default SignUp;

