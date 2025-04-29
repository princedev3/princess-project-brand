"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);

        const newBottom = 24;
        setBottomOffset(newBottom);
      } else {
        setIsVisible(false);
      }
    };

    const handleResizeOrScroll = () => {
      if (window.scrollY > 300) {
        const newBottom = 24;
        setBottomOffset(newBottom);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResizeOrScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResizeOrScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "fixed",
            right: 24,
            bottom: bottomOffset,
            zIndex: 30,
          }}
        >
          <Button
            type="button"
            variant="outline"
            onClick={scrollToTop}
            className="w-10 h-10 text-[35px] rounded-full shadow-lg"
            aria-label="Back to Top"
          >
            <ArrowUp size={35} className="!w-[30px] !h-[30px] " />
          </Button>
        </motion.div>
      )}
    </>
  );
}
