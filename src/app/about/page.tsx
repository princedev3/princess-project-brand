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
          className="text-5xl font-extrabold text-teal-600 capitalize"
        >
          Welcome to <span className="">LUXUE</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-600 text-lg max-w-2xl leading-8"
        >
          More than a store — we&rsquo;re a movement of style, connection, and everyday luxury.
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
            <Image src="/journey.jpg" fill alt="Our Journey" className="object-cover" />
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }} 
            whileInView={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-4xl font-bold text-teal-600 capitalize">our journey</h2>
            <p className="text-gray-700 text-lg leading-8">
  What began as a modest ambition — to offer superior, distinctive products to all — has grown into a distinguished community built on excellence, individuality, and unwavering service.
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
          <h2 className="text-4xl font-bold text-teal-600 capitalize">our vision</h2>
          <p className="text-gray-700 text-lg leading-8 text-justify">
  At LUXUE&rsquo;s, we&rsquo;re on a vision to transform online shopping into a personalized and inspiring journey. 
  We believe in offering quality, style, and accessibility, creating a space where every purchase feels meaningful and every customer becomes part of a vibrant community celebrating individuality.
</p>

        </motion.div>

        <motion.div 
          initial={{ x: -50, opacity: 0 }} 
          whileInView={{ x: 0, opacity: 1 }} 
          transition={{ duration: 0.8 }}
          className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg order-1 md:order-2"
        >
          <Image src="/vision.jpg" fill alt="Our Vision" className="object-cover" />
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
            <Image src="/mission.jpg" fill alt="Our Mission" className="object-cover" />
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }} 
            whileInView={{ x: 0, opacity: 1 }} 
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <h2 className="text-4xl font-bold text-teal-600 capitalize">our mission</h2>
            <p className="text-gray-700 text-lg leading-8 text-justify">
  We believe shopping should spark confidence, creativity, and connection. That's why we deliver handpicked products that blend quality, style, and value — all with a bold commitment to redefining the online shopping experience through honesty, innovation, and a community-first mindset.
</p>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
