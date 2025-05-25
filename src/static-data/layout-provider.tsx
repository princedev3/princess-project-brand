"use client";
import Navbar from "@/components/navbar/navbar";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./rtk-store";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/navbar/footer";
const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [readyState, setReadyState] = useState(false);
  const authRoute = [
    "/register",
    "/login",
    "/forgot-password",
    "/enter-new-password",
    "/verify-email",
  ];
  const pathName = usePathname();
  useEffect(() => {
    setReadyState(true);
  }, []);
  if (readyState) {
    return (
        <Provider store={store}>
          <div className="sticky top-0 left-0  w-full z-50">
            <div className="mx-auto w-full grid max-w-8xl">
              {!authRoute.includes(pathName) && <Navbar />}
            </div>
          </div>

          {children}
          {!authRoute.includes(pathName) && <Footer />}
          <Toaster position="bottom-right" />
        </Provider>
    );
  }
};

export default LayoutProvider;
