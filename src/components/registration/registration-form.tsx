"use client";
import { useCreateUserMutation } from "@/app/apis/_user_index.api";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [createUser, { isLoading, isSuccess }] = useCreateUserMutation();
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const formdata = new FormData(e.target as HTMLFormElement);

      const res = await createUser(formdata);
      if (res.data.status === 200) {
        toast.success(res.data.message);
        return;
      }
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleRegister} className="grid gap-y-4">
      <div className="grid gap-y-1">
        <label htmlFor="" className="text-xl capitalize text-gray-600">
          name:
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Enter your name"
          className="py-1 px-2 text-gray-700 outline-none border border-gray-400  rounded-2xl"
        />
      </div>
      <div className="grid gap-y-1">
        <label htmlFor="" className="text-xl capitalize text-gray-600">
          email:
        </label>
        <input
          type="email"
          name="email"
          required
          className="py-1 px-2 text-gray-700 outline-none border border-gray-400  rounded-2xl"
        />
      </div>
      <div className="grid gap-y-1">
        <label htmlFor="" className="text-xl capitalize text-gray-600">
          password:
        </label>
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
      </div>
      <div className="grid gap-y-1">
        <label htmlFor="" className="text-xl capitalize text-gray-600">
          image:
        </label>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="py-1 px-2 text-gray-700 outline-none border border-gray-400  rounded-2xl"
        />
      </div>
      <div className="w-full">
        <button
          disabled={isLoading}
          className="w-full disabled:bg-[#17CF97]/50 disabled:cursor-not-allowed bg-[#17CF97] py-2 cursor-pointer rounded-2xl text-white font-semibold capitalize "
          type="submit"
        >
          {isLoading ? (
            <LoaderCircle
              className="animate-spin grid mx-auto"
              color="white"
              size={22}
            />
          ) : (
            "Register"
          )}
        </button>
        <Link
          href={"/login"}
          className="text-[12px] text-gray-500 cursor-pointer text-center flex items-center justify-center"
        >
          have an account? Login
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
