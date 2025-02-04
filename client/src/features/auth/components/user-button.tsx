"use client";
// import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { Loader, LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DottedSeparator } from "@/components/dotted-separator";
export const UserButton = () => {
  // const router = useRouter();
  const [logout] = useLogoutMutation();
  const { data, isLoading } = useLoadUserQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center size-10 rounded-full bg-neutral-200 border border-neutral-300">
        <Loader className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!data?.user) {
    return null;
  }

  const { name, email } = data?.user;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  const handleLogout = async () => {
    try {
      await logout(undefined).unwrap(); // Déclencher la mutation logout
      window.location.reload(); // Recharger la page après la déconnexion
      // router.refresh(); 
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="relative outline-none">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300">
          <AvatarFallback className="flex items-center justify-cente bg-neutral-200 font-medium text-neutral-500">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-10  border border-neutral-300">
            <AvatarFallback className="flex items-center justify-center text-xl bg-neutral-200 font-medium text-neutral-500">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm text-neutral-900 font-medium">
              {name || "User"}
            </p>
            <p className="text-xs text-neutral-500">{email || ""}</p>
          </div>
        </div>

        <DottedSeparator className="mb-1" />
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center justify-center h-10 text-amber-700 font-medium cursor-pointer"
        >
          <LogOut className="size-4 mr-2" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
