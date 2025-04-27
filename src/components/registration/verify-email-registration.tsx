"use client";
import { useVerifyRegisterEmailMutation } from "@/app/apis/_user_index.api";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const VerifyEmailRegistration = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") as string;
  const [VerifyEmailRegistration, { isLoading, isSuccess }] =
    useVerifyRegisterEmailMutation();

  useEffect(() => {
    const verifyEmail = async () => {
      const res = await VerifyEmailRegistration({ token });
      if (res.data.status === 200) {
        toast.success(res.data.message);
        router.push("/login");
        return;
      }
      if (res.data.status !== 200) {
        toast.error(res.data.message);
        router.push("/register");
      }
    };
    verifyEmail();
  }, [token]);

  return (
    <form action="" className="grid mx-auto">
      <div className="flex items-center gap-1">
        <span className="font-semibold text-[#17CF97] text-xl">
          Verifying Email
        </span>
        <BeatLoader size={10} color="#17CF97" />
      </div>
    </form>
  );
};

export default VerifyEmailRegistration;
