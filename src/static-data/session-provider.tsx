"use client";
import { useEffect } from "react";
import { userStore } from "./user-session";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const setSession = userStore((state) => state.setSession);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    // if (!session) {
    //   return router.push("/login");
    // }
    if (session) setSession(session);
  }, [session]);
  return <>{children}</>;
};

export default SessionProvider;
