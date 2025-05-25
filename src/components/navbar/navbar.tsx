"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect,useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import {  navbarItems } from "@/static-data/staticdata";
import { userStore } from "@/static-data/user-session";
import { useCartStore } from "@/static-data/cart-store";
import UserIcon from "@/icons/user-icon";
import { LuLogOut } from "react-icons/lu";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "next-auth/react";
import MobileMenu from "./mobile-view";
import CartSheet from "./cart-sheet";


const Navbar = () => {
   const pathName = usePathname();
    const session = userStore((state) => state.session);
  const [activeItem, setActiveItem] = useState<string>(pathName);
  const router = useRouter();
   useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);
  useEffect(() => {
    setActiveItem(pathName);
  }, [pathName]);
  const handleLogout = async () => {
    await signOut({ redirect: false });
    await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login` });
    router.push("/login");
  };
  return (
    <>
      <div className="grid grid-flow-col mx-auto bg-baseBlack relative justify-between  items-center w-full h-[108px]">
        <Link href={"/"}>
          <Image
            src={"/logo.png"}
            alt=""
            width={50}
            height={50}
            className="min-w-[63px] min-h-[63px] rounded-full object-cover"
          />
        </Link>
        <div className="relative gap-6 items-center rounded-lg hidden md:flex">
          {navbarItems
            .filter(
              (item) =>
                item.pathName !== "/admin" ||
                (session?.user && session?.user?.role === "ADMIN")
            )
            .map((item) => {
              return     <Link
                  key={item.id}
                  href={item.pathName}
                  className={`${
                    activeItem === item.pathName
                      ? "text-teal-600"
                      : "text-white"
                  } relative capitalize flex items-center gap-2 text-[22px] z-10`}
                >
                  {item.title}
                </Link>
                    })}
        </div>
         <div className="flex items-center gap-3">
           <CartSheet/>
          {
            session?.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button
                    asChild
                    variant={"outline"}
                    size={"default"}
                    className="rounded-full"
                  >
                    <div className="flex space-x-1 bg-black hover:bg-black">
                      {session?.user ? (
                        <Image
                          width={30}
                          height={30}
                          src={session?.user?.image || "/noavatar.png"}
                          alt=""
                          className="w-[30px] rounded-full object-cover h-[30px] "
                        />
                      ) : (
                        <UserIcon
                          size={35}
                          className="min-w-[30px] min-h-[30px]"
                          color="#fff"
                        />
                      )}
                      <ChevronDown className="w-4 h-4 text-white" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-2">
                  <DropdownMenuLabel className="text-xl">
                    My Account
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-xl" onClick={handleLogout}>
                    Log Out
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={"/like"} className="cursor-pointer text-xl">
                      Likes
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={"/login"}>
                    <LuLogOut  className="text-white min-w-[30px] min-h-[30px]"/>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Login</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )
        
          }
        <MobileMenu/>
        </div>
      </div>
    
    </>
  );
};

export default Navbar;
