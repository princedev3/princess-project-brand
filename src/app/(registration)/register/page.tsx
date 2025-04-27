import RegistrationForm from "@/components/registration/registration-form";
import SlideIn from "@/components/slide-in";
import { Badge } from "@/components/ui/badge";
import { auth, signIn } from "@/static-data/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const Register = async () => {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <div className="grid md:grid-cols-2 ">
      <div className="z-40 hidden md:block relative">
        <Image src={"/sun.jpg"} alt="" className="object-cover" fill />
      </div>
      <SlideIn>
        <div className=" min-h-screen w-full flex justify-center items-center    ">
          <div className="grid w-full max-w-5xl mx-auto shadow md:shadow-none p-7  rounded-2xl ">
            <Image
              src={"/logo.svg"}
              alt=""
              width={50}
              height={50}
              className="w-[50px] h-[50px] mx-auto"
            />
            <RegistrationForm />
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
                  or continue with google
                </p>
                <div className=" flex-grow border-b border-zinc-400"></div>
              </div>
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
            </form>
          </div>
        </div>
      </SlideIn>
    </div>
  );
};

export default Register;
