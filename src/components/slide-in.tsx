"use client";
import React from "react";
import { motion } from "framer-motion";

const SlideIn = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {children}{" "}
    </motion.div>
  );
};

export default SlideIn;
