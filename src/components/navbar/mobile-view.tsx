"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { navbarItems } from "@/static-data/staticdata";
import { userStore } from "@/static-data/user-session";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";



const MobileMenu = () => {
  const router= useRouter()
  const [isOpen, setIsOpen] = useState(false);
  const session = userStore((state) => state.session);
  const handleLogout = async () => {
   setIsOpen(false)
    await signOut({ redirect: false });
    await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/login` });
    router.push("/login");
  };
  return (
    <div className="md:hidden flex items-center relative z-50">
      <button onClick={() => setIsOpen(!isOpen)}>
 <Menu className="text-white" size={32} />
      </button>

      <AnimatePresence>
        {isOpen && (
      <motion.div
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full h-screen bg-gradient-to-br from-teal-500 to-teal-700 z-50 flex flex-col items-center justify-center px-6"
    >
      <div className="flex flex-col gap-5 text-center">
        {navbarItems
          .filter(
            (item) =>
              item.pathName !== "/admin" ||
              (session?.user && session?.user?.role === "ADMIN")
          )
          .map((item) => (
            <Link
              key={item.id}
              onClick={() => setIsOpen(false)}
              href={item.pathName}
              className="text-white capitalize hover:text-gray-200 text-xl font-semibold transition-colors duration-200"
            >
              {item.title}
            </Link>
          ))}
<p className="text-xl text-white cursor-pointer hover:text-gray-200 font-semibold transition-colors duration-200" onClick={handleLogout}>
                    Log Out
                  </p>
      </div>
    
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-5 right-5 p-2 rounded-full hover:bg-teal-600 transition"
        aria-label="Close menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
    
       
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
