"use client";
import { useHandleResetPasswordMutation } from "@/app/apis/_user_index.api";
import { signOut } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

const ForgotPasswordVerifyForm = () => {
  const [handleResetPassword] = useHandleResetPasswordMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  useEffect(() => {
    const forceLogout = async () => {
      const url = new URL(window.location.href);
      if (url.searchParams.get("forceLogout")) {
        await signOut({ redirect: false });
      }
    };
    forceLogout();
  }, [searchParams]);

  useEffect(() => {
    if (!token) return;
    const handleAction = async () => {
      const res = await handleResetPassword(token);
      if (res.data.status === 200) {
        router.push(`/enter-new-password?email=${res?.data?.email}`);
        toast.success(res.data.message);
        return;
      }
      toast.success(res.data.message);
    };
    handleAction();
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

export default ForgotPasswordVerifyForm;
