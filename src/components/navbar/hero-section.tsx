"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const heroCards = [
  {
    title: "Step Into Style – Premium Footwear",
    desc: "From casual strolls to statement moments, our shoes are crafted to support your stride with elegance and comfort. Walk with purpose, walk with class.",
    img: "/shoe.jpg",
  },
  {
    title: "Elevate Your Gaze – Signature Eyewear",
    desc: "Sleek, bold, and unapologetically you — our eyewear turns every glance into a style statement. See the world differently, look unforgettable.",
    img: "/heroimage.png",
  },
  {
    title: "Everyday Cool – Essential Tees & Shirts",
    desc: "Designed for comfort, tailored for confidence. Whether layered or solo, our shirts redefine effortless style for every day of the week.",
    img: "/shirt.jpg",
  },
  {
    title: "Tailored Movement – Modern Trousers",
    desc: "Fit meets function in our collection of versatile trousers. From boardrooms to city streets, they move with you and your ambition.",
    img: "/trouser.jpg",
  },
];

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
    <div className="relative bg-[#16181E] py-12 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-5 items-center"
        >
          {/* Text Section */}
          <div className="flex justify-end">
            <div className="flex flex-col gap-6 text-white md:pl-5 max-w-xl">
              <div className="text-[32px] text-center md:text-left md:text-[50px] font-light leading-tight">
                <p>{heroCards[current].title}</p>
              </div>
              <p className="text-lg text-center md:text-left text-gray-300">
                {heroCards[current].desc}
              </p>
              <button className="text-2xl border w-full cursor-pointer capitalize py-3 rounded-md ">
                Shop now
              </button>
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
            className={`w-3 h-3 rounded-full ${
              idx === current ? "bg-white" : "bg-gray-500"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
