"use client";
import { useGetCouponQuery } from "@/app/apis/_coupon_index_api";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const Notification = () => {
  const { data, isLoading } = useGetCouponQuery(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!data?.existingCoupon?.expiryDate) {
      setTimeLeft(0);
      return;
    }

    const calculateTimeLeft = () =>
      new Date(data.existingCoupon.expiryDate).getTime() - Date.now();

    setTimeLeft(calculateTimeLeft());

    const interval = setInterval(() => {
      const updated = calculateTimeLeft();
      setTimeLeft(updated);

      if (updated <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isLoading) {
    return <div className="h-[60px] w-full"></div>;
  }

  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return (
    <Marquee
      speed={20}
      className={`${isScrolled ? "bg-white" : "bg-slate-50"} h-[60px] w-full transition-all duration-100`}
    >
      <div className="flex items-center gap-4 px-4">
        <Image
          src={"/sun1.png"}
          alt="sun logo"
          width={120}
          height={50}
          className="w-[120px] h-[50px] object-contain"
        />
        <div className="wave-text text-gray-700 text-lg flex gap-1">
          {[
            "Life",
            "is",
            "too",
            "bright-",
            "wear",
            "better",
            "wear",
            "shades",
          ].map((word, idx) => (
            <span key={idx} className="wave">
              {word}
            </span>
          ))}
        </div>

        {timeLeft && timeLeft > 0 ? (
          <>
            <Image
              src={"/promo.jpg"}
              alt="promo"
              width={120}
              height={40}
              className="w-[120px] h-[40px] object-cover"
            />
            <p className="text-gray-700">
              {`${hours}h ${minutes}m ${seconds}s`}
            </p>
          </>
        ) : null}
      </div>
    </Marquee>
  );
};

export default Notification;
