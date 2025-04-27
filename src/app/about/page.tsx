"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="flex flex-col gap-24 py-10">
      {/* Hero Section */}
      <section className="container mx-auto flex flex-col items-center gap-6 px-6 md:px-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-baseGreen capitalize"
        >
          Welcome to Lolly's
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 text-lg max-w-2xl leading-8"
        >
          More than a store — we’re a movement of style, connection, and everyday luxury.
        </motion.p>
      </section>

      {/* Journey Section */}
      <section className="bg-[#FFFBF5] py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-12">
          <motion.div 
            initial={{ x: -50, opacity: 0 }} 
            whileInView={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg"
          >
            <Image src="/woman.png" fill alt="Our Journey" className="object-cover" />
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }} 
            whileInView={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-4xl font-bold text-baseGreen capitalize">our journey</h2>
            <p className="text-gray-700 text-lg leading-8">
              What started as a simple idea — to bring better, bolder products to everyday people — has grown into a passionate movement of style, substance, and service.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-12">
        <motion.div 
          initial={{ x: 50, opacity: 0 }} 
          whileInView={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
          className="flex flex-col gap-6 order-2 md:order-1"
        >
          <h2 className="text-4xl font-bold text-baseGreen capitalize">our vision</h2>
          <p className="text-gray-700 text-lg leading-8 text-justify">
            At lolly&rsquo;s, our vision is to redefine the online shopping experience by combining quality, style, and accessibility. 
            We aim to create a destination where every click feels personal, every purchase adds value, and every customer joins a thriving community of individuality and inspiration.
          </p>
        </motion.div>

        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          whileInView={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
          className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2"
        >
          <Image src="/trendy.png" fill alt="Our Vision" className="object-cover" />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="bg-[#FFFBF5] py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-12">
          <motion.div 
            initial={{ x: -50, opacity: 0 }} 
            whileInView={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg"
          >
            <Image src="/mission.png" fill alt="Our Mission" className="object-cover" />
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }} 
            whileInView={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-4xl font-bold text-baseGreen capitalize">our mission</h2>
            <p className="text-gray-700 text-lg leading-8 text-justify">
              To empower individuals through thoughtfully curated products blending quality, style, and affordability — creating a seamless shopping experience that celebrates confidence, expression, and everyday luxury. 
              We&rsquo;re here to redefine what it means to shop online: with honest service, intentional design, and a community-first mindset.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
