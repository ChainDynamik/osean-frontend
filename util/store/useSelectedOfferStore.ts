import { create } from "zustand";
import { Reservation } from "../../pages/offers";

interface SelectedOfferStore {
  selectedOffer: Reservation | null;
  setSelectedOffer: (offer: Reservation) => void;
}

export const useSelectedOfferStore = create<SelectedOfferStore>((set) => ({
  selectedOffer: null,
  setSelectedOffer: (offer) => set({ selectedOffer: offer }),
}));
