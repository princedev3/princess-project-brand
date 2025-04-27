"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";
import { useGetCouponQuery } from "@/app/apis/_coupon_index_api";

export default function DiscountOverlay() {
  const { data } = useGetCouponQuery(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!data?.existingCoupon?.code) return;

    const expiryTime = new Date(data?.expiryDate).getTime();
    const now = Date.now();

    if (now >= expiryTime) {
      localStorage.removeItem("hasSeenDiscount");
      return;
    }

    const hasSeen = localStorage.getItem("hasSeenDiscount");
    if (!hasSeen) {
      localStorage.setItem("hasSeenDiscount", "true");
      setIsVisible(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 0.95, y: 0.05 },
        angle: 180,
        startVelocity: 40,
      });
    }
  }, [data]);

  const handleClose = () => setIsVisible(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(data.existingCoupon.code)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={handleClose}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold text-baseGreen mb-2">
              {data.existingCoupon.code}{" "}
            </h2>
            <p className="text-gray-700 mb-4">
              Here&rsquo;s a special{" "}
              {parseInt(
                data?.existingCoupon?.code.match(/[0-9]/g)?.join("") || "0",
                10
              )}
              % off code just for you:
            </p>
            <div
              className="bg-baseGreen text-white font-semibold py-2 px-4 rounded-md mb-3 select-all cursor-pointer"
              onClick={handleCopy}
            >
              {isCopied ? (
                <div className="text-center flex items-center justify-center gap-1">
                  <Check className="text-white" size={20} />
                  <span className="text-white">Copied!</span>
                </div>
              ) : (
                "WELCOME10"
              )}
            </div>
            <p className="text-sm text-gray-500">Use it at checkout 🎁</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
