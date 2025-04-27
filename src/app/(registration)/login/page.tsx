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

  // if (session) {
  //   redirect("/");
  // }
  return (
    <div className="grid md:grid-cols-2">
      <div className="z-40 hidden md:block relative">
        <Image src={"/sun.jpg"} alt="" className="object-cover" fill />
      </div>
      <SlideIn>
        <div className="min-h-screen w-full flex justify-center items-center">
          <div className="grid w-full max-w-5xl mx-auto shadow md:shadow-none p-7 rounded-2xl ">
            <Image
              src={"/logo.svg"}
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] mx-auto"
            />
            <ClientLoginForm />
            <div className="w-full">
              <LoginForgotPasswordForm />
            </div>
            {/* <form
                action={async (formData) => {
                  "use server";
                  const password = formData.get("password");
                  const email = formData.get("email");
                  await signIn("credentials", {
                    email,
                    password,
                    redirect: true,
                    callbackUrl: "/",
                  });
                }}
                className="w-full grid gap-y-5 bg-white"
              >
                <div className="grid gap-y-1">
                  <label
                    htmlFor=""
                    className="text-xl capitalize text-gray-600"
                  >
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
                  <label
                    htmlFor=""
                    className="text-xl capitalize text-gray-600"
                  >
                    password:
                  </label>
                  <div className="w-full">
                    <LoginPassword />
                    <LoginForgotPasswordForm />
                  </div>
                </div>

                <div className="w-full">
                  <button
                    className="w-full bg-[#17CF97] py-2 cursor-pointer rounded-2xl text-white font-semibold capitalize "
                    type="submit"
                  >
                    Login
                  </button>
                  <Link
                    href={"/register"}
                    className="text-[12px] text-gray-500 cursor-pointer text-center flex items-center justify-center"
                  >
                    dont have an account? Register
                  </Link>
                </div>
              </form> */}
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
