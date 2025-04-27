import ForgotPasswordVerifyForm from "@/components/registration/forgot-password-verify-form";
import SlideIn from "@/components/slide-in";
import Image from "next/image";
import React from "react";

const ForgotPassword = () => {
  return (
    <SlideIn>
      <div className=" min-h-screen w-full flex justify-center items-center ">
        <div className="grid gap-y-4 w-full max-w-5xl mx-auto shadow p-7 rounded-2xl">
          <Image
            src={"/logo.svg"}
            alt=""
            width={50}
            height={50}
            className="w-[50px] h-[50px] mx-auto"
          />
          <ForgotPasswordVerifyForm />
        </div>
      </div>
    </SlideIn>
  );
};

export default ForgotPassword;
