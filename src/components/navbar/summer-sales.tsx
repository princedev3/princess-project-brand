"use client"
import React from "react";
import { motion } from "framer-motion";

const SummerSales = () => {
  return (

    <div
      className="
        h-[450px] 
        bg-[url('/summersales.png')] 
        bg-cover 
        bg-center 
        flex 
        items-center 
        justify-center
      "
    >
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col gap-5 items-center"
      >
        <h1 className="text-white text-3xl md:text-5xl font-light">
          Big Summer <b>Sale</b>
        </h1>
        <span className="text-white/80 text-center text-xl md:text-2xl">
          Commodo fames vitae vitae leo mauris in
        </span>
        <button className="cursor-pointer text-white border border-white text-2xl py-3 px-5">
          Shop Now
        </button>
      </motion.div>
    </div>
 )    
};

export default SummerSales;
