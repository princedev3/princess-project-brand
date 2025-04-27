import { Session } from "next-auth";
import { create } from "zustand";

type userStoreType = {
  session: Session | null;
  setSession: (session: Session) => void;
};

export const userStore = create<userStoreType>((set) => ({
  session: null,
  setSession: (session) => set({ session }),
}));
