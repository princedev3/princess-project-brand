"use client";
import { useGetCouponQuery } from "@/app/apis/_coupon_index_api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { motion, AnimatePresence } from "framer-motion";

const promoMessages = [
  "🔥 20% off all sunglasses this week only!",
  "🚚 Free shipping on orders over ₦50,000!",
  "🎉 Use code LOLLY10 for extra 10% off!",
  "🌟 New arrivals dropping every Friday!",
];

const animations = [
  { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 50 } },
  { initial: { opacity: 0, y: -50 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 50 } },
  { initial: { opacity: 0, scale: 0.5 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.5 } },
  { initial: { opacity: 0, rotate: -10 }, animate: { opacity: 1, rotate: 0 }, exit: { opacity: 0, rotate: 10 } },
];

const Notification = () => {
  const { data, isLoading } = useGetCouponQuery(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const [messageIndex, setMessageIndex] = useState(0);
  const [animationIndex, setAnimationIndex] = useState(0);

  useEffect(() => {
    if (!data?.existingCoupon?.expiryDate) return;

    const calculateTimeLeft = () => new Date(data.existingCoupon.expiryDate).getTime() - Date.now();
    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);
      if (updated <= 0) clearInterval(timer);
    }, 1000);

    return () => clearInterval(timer);
  }, [data]);

  useEffect(() => {
    const scrollListener = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", scrollListener);
    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % promoMessages.length);
      setAnimationIndex(Math.floor(Math.random() * animations.length));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentAnimation = animations[animationIndex];
  const hours = Math.floor((timeLeft / 3600000) % 24);
  const minutes = Math.floor((timeLeft / 60000) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  if (isLoading) return <div className="h-[60px] w-full"></div>;
if(timeLeft <= 0){
  return null
}
  return (
    <div className={`${isScrolled ? "bg-white" : "bg-slate-50"} overflow-hidden transition-all duration-100`}>
      <Marquee speed={20} className="h-[60px] overflow-y-hidden w-full">
        <div className="flex items-center gap-4 px-4">
          
          <AnimatePresence mode="wait">
            <motion.p
              key={messageIndex}
              initial={currentAnimation.initial}
              animate={currentAnimation.animate}
              exit={currentAnimation.exit}
              transition={{ duration: 0.8 }}
              className="text-md text-teal-500 font-bold min-w-[300px]"
            >
              {promoMessages[messageIndex]}
            </motion.p>
          </AnimatePresence>

          {timeLeft > 0 && (
            <>
              {/* <Image src="/promo.jpg" alt="promo" width={120} height={40} className="w-[120px] h-[40px]" /> */}
              <p className="text-gray-700">{`${hours}h ${minutes}m ${seconds}s`}</p>
            </>
          )}
        </div>
      </Marquee>
    </div>
  );
};

export default Notification;
