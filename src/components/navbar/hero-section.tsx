"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { heroCards } from "@/static-data/staticdata";




const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev === heroCards.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? heroCards.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="relative bg-[#16181E] py-12 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-5 mx-auto justify-center items-center"
        >
 
          <div className="flex justify-end">
            <div className="flex flex-col gap-6 text-white md:pl-5 max-w-xl">
              <div className="text-[32px] text-center md:text-left md:text-[50px] font-light leading-tight">
                <p>{heroCards[current].title}</p>
              </div>
              <p className="text-lg text-center md:text-left text-gray-300">
                {heroCards[current].desc}
              </p>
              <motion.button
  whileTap={{ scale: 0.95 }}
  className="text-2xl border w-full cursor-pointer capitalize py-3 rounded-md transition-transform duration-200"
>
 <Link href={heroCards[current].brand}>Shop now</Link>
</motion.button>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex md:justify-start justify-center">
            <Image
              src={heroCards[current].img}
              alt={heroCards[current].title}
              width={400}
              height={400}
              className="object-cover w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-2xl shadow-lg"
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
        {heroCards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-6 h-[6px] rounded-sm  ${
              idx === current ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
