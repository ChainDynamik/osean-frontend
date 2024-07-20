import { create } from "zustand";

type OfferFilterState = {
  startDate: Date | null;
  endDate: Date | null;
  amount: number | null;
  currency: string | null;
  minLength: number | null;
  maxLength: number | null;
  minBerths: number | null;
  maxBerths: number | null;
  minYear: number | null;
  maxYear: number | null;
  productFilter: string;
  kindFilter: string;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setAmount: (amount: number | null) => void;
  setCurrency: (currency: string | null) => void;
  setMinLength: (length: number | null) => void;
  setMaxLength: (length: number | null) => void;
  setMinBerths: (berths: number | null) => void;
  setMaxBerths: (berths: number | null) => void;
  setMinYear: (year: number | null) => void;
  setMaxYear: (year: number | null) => void;
  setProductFilter: (product: string) => void;
  setKindFilter: (kind: string) => void;
};

export const useOfferFilterState = create<OfferFilterState>((set) => ({
  startDate: null,
  endDate: null,
  amount: null,
  currency: null,
  minLength: null,
  maxLength: null,
  minBerths: null,
  maxBerths: null,
  minYear: null,
  maxYear: null,
  productFilter: "all products",
  kindFilter: "all kinds",
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setAmount: (amount) => set({ amount }),
  setCurrency: (currency) => set({ currency }),
  setMinLength: (length) => set({ minLength: length }),
  setMaxLength: (length) => set({ maxLength: length }),
  setMinBerths: (berths) => set({ minBerths: berths }),
  setMaxBerths: (berths) => set({ maxBerths: berths }),
  setMinYear: (year) => set({ minYear: year }),
  setMaxYear: (year) => set({ maxYear: year }),
  setProductFilter: (product) => set({ productFilter: product }),
  setKindFilter: (kind) => set({ kindFilter: kind }),
}));
