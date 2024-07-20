import { create } from "zustand";

type OfferFilterState = {
  startDate: Date | null;
  endDate: Date | null;
  amount: number | null;
  currency: string;
  minLength: number | null;
  maxLength: number | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setAmount: (amount: number | null) => void;
  setCurrency: (currency: string) => void;
  setMinLength: (length: number | null) => void;
  setMaxLength: (length: number | null) => void;
};

export const useOfferFilterState = create<OfferFilterState>((set) => ({
  startDate: null,
  endDate: null,
  amount: null,
  currency: "EUR",
  minLength: null,
  maxLength: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setAmount: (amount) => set({ amount }),
  setCurrency: (currency) => set({ currency }),
  setMinLength: (length) => set({ minLength: length }),
  setMaxLength: (length) => set({ maxLength: length }),
}));
