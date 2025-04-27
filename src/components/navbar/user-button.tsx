"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChevronDown } from "lucide-react";
import { signOut } from "next-auth/react";
import { userStore } from "@/static-data/user-session";

export const UserButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login` });

    router.push("/login");
  };

  const session = userStore((state) => state.session);
  const nameAbrev = session?.user?.name?.split("").splice(0, 2).join("");
  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            asChild
            variant={"outline"}
            size={"default"}
            className="rounded-full"
          >
            <span className="flex space-x-2">
              <Avatar className="size-8">
                <AvatarFallback className="uppercase">
                  {nameAbrev}
                </AvatarFallback>
              </Avatar>

              <div className="xl:flex flex-col justify-end hidden">
                <span>{session?.user?.name}</span>
                <span className="line-clamp-1 text-xs text-gray-600">
                  {session?.user?.email}
                </span>
              </div>
              <div>
                <ChevronDown className="w-4 h-4" />
              </div>
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-2">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={"/like"} className="cursor-pointer">
              Likes
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <div className="flex space-x-2 justify-end w-full">
      <Button className="text-white cursor-pointer hover:bg-baseGreen bg-baseGreen text-xl py-6 px-6 motion-preset-shake motion-duration-1000">
        <Link href={"/login"}>Sign in</Link>
      </Button>
    </div>
  );
};
