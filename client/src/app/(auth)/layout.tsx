"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";
import { Providers } from "@/redux/provider";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignIn = pathname === "/sign-in";
  return (
    <Providers>
      <main className="bg-neutral-100 min-h-screen">
        <div className="mx-auto max-w-screen-2xl p-4">
          <nav className="flex justify-between items-center">
            <Image src="/logo.svg" height={48} width={45} alt={""} className="cursor-pointer" />
            <Button asChild variant="secondary">
              <Link href={isSignIn ? "/sign-up" : "/sign-in"}>
                {isSignIn ? "Sign Up" : "Login"}
              </Link>
            </Button>
          </nav>
          <Suspense fallback={<Loading />}>
            <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
              {children}
            </div>
          </Suspense>
        </div>
      </main>
    </Providers>
  );
};

export default AuthLayout;
