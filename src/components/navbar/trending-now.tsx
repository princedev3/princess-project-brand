"use client";
import React from "react";
import { motion } from "framer-motion";
import TrendingProduct from "./trending-product";
import { Product } from "@prisma/client";

const Trending = ({page,data}:{page:string,data: {
    message: Product[];
} }) => {
  return (
    <div className="py-14 px-5 bg-black">
      <h2 className="text-3xl text-white font-semibold text-center mb-10">Trending Now</h2>
       <p className="text-lg text-white  md:w-[60%] mx-auto break-words text-center">
       Our latest arrivals are more than just products — they’re moments of joy waiting to happen. Explore what’s new today.
        </p>
         <motion.div
         initial={{ opacity: 0.3, scale: 0.2 }}
         whileInView={{ opacity: 1, scale: 1 }}
         viewport={{ once: true }} 
         transition={{ duration: 0.4, ease: "easeOut" }}
         className="grid md:grid-cols-3 gap-6 sm:grid-cols-1"
       >
     {
     data?.message.map((item)=>(
<TrendingProduct key={item.id} {...item} />
     ))
     }
      </motion.div>
    </div>
  );
};

export default Trending;
