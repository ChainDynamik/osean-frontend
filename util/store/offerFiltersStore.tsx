import { create } from "zustand";

interface OfferFilterState {
  startDate: Date | null;
  endDate: Date | null;
  amount: number | null;
  currencies: string[];
  minLength: number | null;
  maxLength: number | null;
  minBerths: number | null;
  maxBerths: number | null;
  minYear: number | null;
  maxYear: number | null;
  productFilters: string[];
  kindFilters: string[];
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setAmount: (amount: number | null) => void;
  toggleCurrency: (currency: string) => void;
  setMinLength: (length: number | null) => void;
  setMaxLength: (length: number | null) => void;
  setMinBerths: (berths: number | null) => void;
  setMaxBerths: (berths: number | null) => void;
  setMinYear: (year: number | null) => void;
  setMaxYear: (year: number | null) => void;
  toggleProductFilter: (product: string) => void;
  toggleKindFilter: (kind: string) => void;
}

const initialCurrencies = ["EUR", "USD"];
const initialProducts = ["bareboat", "crewed"];
const initialKinds = ["sail boat"];

export const useOfferFilterState = create<OfferFilterState>((set) => ({
  startDate: null,
  endDate: null,
  amount: null,
  currencies: initialCurrencies,
  minLength: null,
  maxLength: null,
  minBerths: null,
  maxBerths: null,
  minYear: null,
  maxYear: null,
  productFilters: initialProducts,
  kindFilters: initialKinds,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setAmount: (amount) => set({ amount }),
  toggleCurrency: (currency) =>
    set((state) => ({
      currencies: state.currencies.includes(currency)
        ? state.currencies.filter((c) => c !== currency)
        : [...state.currencies, currency],
    })),
  setMinLength: (length) => set({ minLength: length }),
  setMaxLength: (length) => set({ maxLength: length }),
  setMinBerths: (berths) => set({ minBerths: berths }),
  setMaxBerths: (berths) => set({ maxBerths: berths }),
  setMinYear: (year) => set({ minYear: year }),
  setMaxYear: (year) => set({ maxYear: year }),
  toggleProductFilter: (product) =>
    set((state) => ({
      productFilters: state.productFilters.includes(product)
        ? state.productFilters.filter((p) => p !== product)
        : [...state.productFilters, product],
    })),
  toggleKindFilter: (kind) =>
    set((state) => ({
      kindFilters: state.kindFilters.includes(kind)
        ? state.kindFilters.filter((k) => k !== kind)
        : [...state.kindFilters, kind],
    })),
}));
