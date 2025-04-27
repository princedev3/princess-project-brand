"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "../ui/button";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <Button
        type="button"
        variant={"outline"}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-30 w-10 h-10 rounded-full shadow-lg  transition"
        aria-label="Back to Top"
      >
        <ArrowUp
          size={35}
          className="min-w-[35px] min-h-[35px] cursor-pointer"
        />
      </Button>
    )
  );
}
