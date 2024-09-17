import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type userObject = {
  USERNAME: string;
  LCTNBRIF: string;
  LCTNCODE: string;
  DPTMNAME: string;
  JOB_NAME: string;
  LCTNNAME: string;
  USERIMGE: string;
  PSTNNAME: string;
};

type storeUser = {
  tokenInitial: string;
  tokenUser: string;
  tokenLocation: string;
  currentUser: userObject | null;
  setTokenInitial: (token: string) => void;
  setTokenUser: (token: string) => void;
  setTokenLocation: (token: string) => void;
  removeTokenUser: () => void;
  setCurrentUser: (user: userObject) => void;
  logoutUser: () => void;
};

export const useUserStore = create<storeUser>()(
  persist(
    (set) => ({
      tokenInitial: "",
      tokenUser: "",
      tokenLocation: "",
      currentUser: null,
      setTokenInitial: (token) => set(() => ({ tokenInitial: token })),
      setTokenUser: (token) => set(() => ({ tokenUser: token })),
      removeTokenUser: () => set(() => ({ tokenUser: "" })),
      setTokenLocation: (token) => set(() => ({ tokenLocation: token })),
      setCurrentUser: (user) => set(() => ({ currentUser: user })),
      logoutUser: () =>
        set(() => ({
          tokenUser: "",
          tokenLocation: "",
          currentUser: null,
        })),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
