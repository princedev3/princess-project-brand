"use client";

import React from "react";
import { motion } from "framer-motion";
import { navbarHeaderItem } from "@/static-data/staticdata";

const NavbarHeader = () => {
  return (
    <div className="bg-[#FFFBF5] py-6">
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 100 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
      >
        {navbarHeaderItem.map((item) => (
          <div
            key={item.item}
            className="cursor-pointer bg-red-50/20 rounded-md p-3"
          >
            <div className="flex items-center gap-2 ">
              <item.icon
                size={26}
                color="#4FA88D"
                className="min-w-[35px] min-h-[35px]"
              />
              <h1 className="text-[18px] text-[#000000] font-semibold ">
                {item.item}{" "}
              </h1>
            </div>
            <span className="text-[17px] text-[#000000]/60 ">{item.desc} </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default NavbarHeader;
