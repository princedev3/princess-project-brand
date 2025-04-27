"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import LoginPassword from "@/components/registration/login-password";
import SlideIn from "@/components/slide-in";
import { Badge } from "@/components/ui/badge";
import React, { useState } from "react";
import { LoaderCircle } from "lucide-react";

const ClientLoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setLoading(true);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.ok && !res.error) {
      toast.success("Login successful!");
      router.push("/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <SlideIn>
      <form onSubmit={handleSubmit} className="w-full grid gap-y-5 bg-white">
        <div className="grid gap-y-1">
          <label className="text-xl capitalize text-gray-600">email:</label>
          <input
            type="email"
            name="email"
            required
            className="py-1 px-2 text-gray-700 outline-none border border-gray-400 rounded-2xl"
          />
        </div>
        <div className="grid gap-y-1">
          <label className="text-xl capitalize text-gray-600">password:</label>
          <div className="w-full">
            <LoginPassword />
          </div>
        </div>
        <div className="w-full">
          <button
            className="w-full bg-[#17CF97] py-2 cursor-pointer rounded-2xl text-white font-semibold capitalize"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle
                className="animate-spin grid mx-auto"
                color="white"
                size={22}
              />
            ) : (
              "Login"
            )}
          </button>
        </div>
      </form>
    </SlideIn>
  );
};

export default ClientLoginForm;
