import LoginPassword from "@/components/registration/login-password";
import SlideIn from "@/components/slide-in";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LoginForgotPasswordForm from "../login-forgot-password-form";
import { auth, signIn } from "@/static-data/auth";
import { redirect } from "next/navigation";
import ClientLoginForm from "@/components/registration/client-login";

const Login = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }

  return (
    <div className="grid md:grid-cols-2">
      <div className="z-40 hidden md:block relative">
        <Image src={"/sun.jpg"} alt="" className="object-cover" fill />
      </div>
      <SlideIn>
        <div className="min-h-screen w-full flex justify-center items-center">
          <div className="grid w-full max-w-5xl mx-auto shadow md:shadow-none p-7 rounded-2xl ">
            <Image
              src={"/logo.png"}
              alt=""
              width={80}
              height={80}
              className="w-[80px] object-cover rounded-full h-[80px] mx-auto"
            />
            <ClientLoginForm />
            <div className="w-full">
              <LoginForgotPasswordForm />
            </div>
            <form
              action={async () => {
                "use server";
                const res = await signIn("google");
              
              }}
              className="grid gap-y-7 mt-7"
            >
              <div className="flex justify-center items-center gap-1">
                <div className=" flex-grow border-b border-zinc-400 "></div>
                <p className="uppercase text-sm font-semibold text-zinc-500">
                  or continue with
                </p>
                <div className=" flex-grow border-b border-zinc-400"></div>
              </div>
              <div className="">
                <button className="w-full cursor-pointer">
                  <Badge
                    variant="outline"
                    className="text-zinc-700 w-full !rounded-lg p-2 hover:bg-gray-100 text-center flex items-center justify-center "
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={"/google.png"}
                        width={13}
                        height={13}
                        alt=""
                        className="w-5 h-5 object-cover"
                      />
                      Google
                    </div>
                  </Badge>
                </button>
                <Link
                  href={"/register"}
                  className="text-[12px] text-gray-500 cursor-pointer text-center flex items-center justify-center"
                >
                  dont have an account? Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </SlideIn>
    </div>
  );
};

export default Login;
