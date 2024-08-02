import { create } from "zustand";

interface OfferApiFilterState {
  startDate: Date | null;
  endDate: Date | null;
  amount: number | null;
  currency: string;
  minLength: number | null;
  maxLength: number | null;
  minBerths: number | null;
  maxBerths: number | null;
  minYear: number | null;
  maxYear: number | null;
  productFilters: string | null;
  kindFilters: string[];
  passengersOnBoard: number | null;
  countries: string[];
  boatModels: string[];
  priceRange: number[];
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setAmount: (amount: number | null) => void;
  setCurrency: (currency: string) => void;
  setMinLength: (length: number | null) => void;
  setMaxLength: (length: number | null) => void;
  setMinBerths: (berths: number | null) => void;
  setMaxBerths: (berths: number | null) => void;
  setMinYear: (year: number | null) => void;
  setMaxYear: (year: number | null) => void;
  setProductFilter: (product: string | null) => void;
  setKindFilters: (kinds: string[]) => void;
  setPassengersOnBoard: (passengers: number | null) => void;
  setCountries: (countries: string[]) => void;
  setBoatModels: (models: string[]) => void;
  setPriceRange: (range: number[]) => void;
  minCabins: number | null;
  setMinCabins: (cabins: number | null) => void;
}

export const useOfferApiFilterState = create<OfferApiFilterState>((set) => ({
  startDate: null,
  endDate: null,
  amount: null,
  currency: "EUR",
  minLength: null,
  maxLength: null,
  minBerths: null,
  maxBerths: null,
  minYear: null,
  maxYear: null,
  productFilters: null,
  kindFilters: [],
  passengersOnBoard: null,
  countries: [],
  boatModels: [],
  priceRange: [0, 200000],
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
  setProductFilter: (product) =>
    set({
      productFilters: product,
    }),
  setKindFilters: (kinds) => set({ kindFilters: kinds }),
  setPassengersOnBoard: (passengers) => set({ passengersOnBoard: passengers }),
  setCountries: (countries) => set({ countries }),
  setBoatModels: (models) => set({ boatModels: models }),
  setPriceRange: (range) => set({ priceRange: range }),
  minCabins: null,
  setMinCabins: (cabins) => set({ minCabins: cabins }),
}));
