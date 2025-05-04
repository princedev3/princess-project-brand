"use client";
import React from "react";
import { motion } from "framer-motion";

import {useGetProductByTrendingQuery } from "@/app/apis/_product_index.api";
import TrendingProduct from "./trending-product";

const Trending = ({page}:{page:string}) => {

    const { data, isLoading, isError } = useGetProductByTrendingQuery(null);
  if(isLoading){
    return null
  }

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
