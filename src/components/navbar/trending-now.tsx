"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Trending = () => {
  return (
    <div className="py-14 px-5 bg-black">
      <h2 className="text-3xl text-white font-semibold text-center mb-10">Trending Now</h2>
       <p className="text-lg text-white  md:w-[60%] mx-auto break-words text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum pariatur sapiente quos eaque totam. Laudantium exercitationem dolorem voluptatum ullam doloremque, excepturi voluptatibus inventore saepe tempore, voluptatem assumenda optio, ducimus quo?</p>
      {/* Wrap all the cards in a motion div */}
      <motion.div
        initial={{ opacity: 0.3, scale: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }} 
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="grid md:grid-cols-3 gap-6 sm:grid-cols-1"
      >
        {/* Trending Card 1 */}
        <div className="bg-black/80 rounded-lg flex flex-col justify-center items-center shadow-md p-6">
          <div className="h-60 w-full relative  mb-4 rounded-md overflow-hidden">
            <Image src={"/watchone.jpg"} alt="" fill className="object-cover"/>
          </div>
          <h3 className="text-2xl text-white my-4 font-semibold ">Trending Product 2</h3>
          <p className="text-white text-xl mb-4">
          {new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(50000)}
</p>
<button className="text-black border w-[50%] bg-white p-3 cursor-pointer hover:bg-black hover:border hover:text-white hover:border-white">add to cart</button>
        </div>

        {/* Trending Card 2 */}
        <div className="bg-black/80 rounded-lg flex flex-col justify-center items-center shadow-md p-6">
        <div className="h-60 w-full relative bg-gray-300 mb-4 rounded-md overflow-hidden">
            <Image src={"/watchtwo.jpg"} alt="" fill className="object-cover"/>
          </div>
          <h3 className="text-2xl text-white my-4 font-semibold ">Trending Product 2</h3>
          <p className="text-white text-xl mb-4">
          {new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(50000)}
</p>
<button className="text-black border w-[50%] bg-white p-3 cursor-pointer hover:bg-black hover:border hover:text-white hover:border-white">add to cart</button>
        </div>

        {/* Trending Card 3 */}
        <div className="bg-black/80 rounded-lg  flex flex-col justify-center items-center shadow-md p-6">
        <div className="h-60 w-full relative bg-gray-300 mb-4 rounded-md overflow-hidden">
            <Image src={"/watchthree.jpg"} alt="" fill className="object-cover"/>
          </div>
          <h3 className="text-2xl text-white my-4 font-semibold ">Trending Product 2</h3>
          <p className="text-white text-xl mb-4">
          {new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(50000)}
</p>
<button  className="text-black border w-[50%] bg-white p-3 cursor-pointer hover:bg-black hover:border hover:text-white hover:border-white">
<Link href={"/product?brand=watch"}>
  add to cart
</Link>
  </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Trending;
