import { create } from "zustand";

type TabState = "nfts" | "listings" | "bookings";

interface ProfileTabsStore {
  tab: TabState;
  setTab: (newTab: TabState) => void;
}

export const useProfileTabsStore = create<ProfileTabsStore>((set) => ({
  tab: "nfts", // default state
  setTab: (newTab) => set({ tab: newTab }),
}));
