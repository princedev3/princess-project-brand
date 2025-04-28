"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, LogIn, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { eyeglassBrands, navbarItems } from "@/static-data/staticdata";
import { userStore } from "@/static-data/user-session";
import { useCartStore } from "@/static-data/cart-store";
import { motion, AnimatePresence } from "framer-motion";
import CartIcon from "@/icons/cart-icon";
import UserIcon from "@/icons/user-icon";
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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};
const Navbar = () => {
 
  const pathName = usePathname();
  const [openMenu, setOpenMenu] = useState(false);
  const [openCollection, setOpenCollection] = useState(false);
  const collectionRef = useRef<HTMLDivElement>(null);
  const session = userStore((state) => state.session);
  const [activeItem, setActiveItem] = useState<string>(pathName);
  const router = useRouter();
  const fadeInVariant = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: (idx: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.05 * idx,
      },
    }),
  };

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        collectionRef.current &&
        !collectionRef.current.contains(event.target as Node)
      ) {
        setOpenCollection(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
            src={"/logo.svg"}
            alt=""
            width={50}
            height={50}
            className="min-w-[63px] min-h-[63px] object-cover"
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

        <AnimatePresence>
          {openCollection && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-24 bg-white overflow-y-auto custom-scroll-bar max-h-[250px] text-black w-full p-4 rounded shadow-lg"
            >
              <div className="flex h-full gap-4 items-center font-semibold mb-8 capitalize text-baseGreen">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
                  Brand
                </h1>
                <h1 className="text-4xl  font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                  Collections
                </h1>
              </div>
              <div className="grid grid-cols-4  h-full gap-7">
                {eyeglassBrands.map((item, index) => (
                  <motion.div
                    variants={fadeInVariant}
                    initial="initial"
                    viewport={{ once: true }}
                    custom={index}
                    whileInView="animate"
                    key={index}
                    className=" capitalize  cursor-pointer "
                  >
                    <Link
                      href={`/product?search=${item.toLocaleLowerCase()}`}
                      className="w-full h-full text-gray-700"
                    >
                      {" "}
                      {item}{" "}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-3">
          {/* <SearchIcon
            size={25}
            color="#ffffff"
            onClick={() => {
              console.log("Cart icon clicked");
            }}
          /> */}

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
                      <LogIn
                        size={30}
                        className="text-white min-w-[30px] min-h-[30px]"
                      />
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
