"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "../apis/_user_index.api";

const LoginForgotPasswordForm = () => {
  const [open, setOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const handleSubmit = async () => {
    try {
      if (!verifyEmail) {
        toast.warning("enter email");
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(verifyEmail)) {
        toast.warning("Please enter a valid email address");
        return;
      }
      const res = await forgotPassword(verifyEmail);

      if (res.data.status === 200) {
        toast.success(res.data.message);
        setVerifyEmail("");
        setOpen(false);
        return;
      }
      toast.error(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <span
        onClick={() => setOpen(!open)}
        className="text-gray-600 text-sm cursor-pointer hover:text-[#17CF97] transition"
      >
        Forgot Password?
      </span>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid md:grid-cols-[1fr_auto] gap-4 mt-4 p-4 bg-white shadow-lg rounded-xl"
        >
          <input
            type="email"
            required
            value={verifyEmail}
            onChange={(e) => setVerifyEmail(e.target.value)}
            placeholder="Enter your email"
            className="p-2 border rounded-lg text-gray-800 outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSubmit}
            type="button"
            disabled={isLoading || !verifyEmail.trim()}
            className="bg-[#17CF97] hover:bg-[#17CF97] text-white font-medium px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </motion.div>
      )}
    </>
  );
};

export default LoginForgotPasswordForm;
