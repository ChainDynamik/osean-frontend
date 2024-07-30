import { create } from "zustand";
import { Reservation } from "../../pages/offers";

interface LastReturnedOffersStore {
  lastReturnedOffers: Reservation[];
  setLastReturnedOffers: (offers: Reservation[]) => void;
}

export const useLastReturnedOffersStore = create<LastReturnedOffersStore>((set) => ({
  lastReturnedOffers: [],
  setLastReturnedOffers: (offers) => set({ lastReturnedOffers: offers }),
}));
