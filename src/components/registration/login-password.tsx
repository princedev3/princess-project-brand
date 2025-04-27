"use client";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

const LoginPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full">
      <input
        required
        type={showPassword ? "password" : "text"}
        name="password"
        className="py-1 px-2 text-gray-700 outline-none border border-gray-400 w-full  rounded-2xl"
      />
      {showPassword ? (
        <Eye
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-6 top-0 text-gray-500 translate-y-[20%] cursor-pointer"
        />
      ) : (
        <EyeOff
          onClick={() => setShowPassword(!showPassword)}
          className="absolute text-gray-500 right-6 top-0 translate-y-[20%] cursor-pointer"
        />
      )}
    </div>
  );
};

export default LoginPassword;
