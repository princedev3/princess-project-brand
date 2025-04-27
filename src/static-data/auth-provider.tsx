"use client";
import React, { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (mounted) {
    return <SessionProvider>{children}</SessionProvider>;
  }
};

export default AuthProvider;
