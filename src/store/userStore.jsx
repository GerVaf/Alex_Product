// src/store/userStore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      userData: null,
      userToken: null,

      setUserData: (data) => {
        set({ userData: data.data, userToken: data.token });
      },
      isAuthenticated: () => {
        const state = JSON.parse(localStorage.getItem("user-store"));
        return !!state?.state?.userToken;
      },
      clearUserData: () => {
        set({ userData: null, userToken: null });
      },
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
