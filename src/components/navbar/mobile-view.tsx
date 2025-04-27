"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const navItems = [
  { id: 1, title: "Home", href: "/" },
  { id: 2, title: "Shop", href: "/shop" },
  { id: 3, title: "Contact", href: "/contact" },
];

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden flex items-center relative z-50">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="text-white" size={32} /> : <Menu className="text-white" size={32} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed top-[150px] left-0 h-full w-full bg-white shadow-md flex flex-col items-center py-6 gap-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="text-lg font-semibold text-black"
                onClick={() => setIsOpen(false)} // Close on click
              >
                {item.title}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileMenu;
