import { create } from "zustand";

interface TripState {
  tripStart: Date;
  tripEnd: Date;
  setTripStart: (date: Date) => void;
  setTripEnd: (date: Date) => void;
}

export const useTripStore = create<TripState>((set) => ({
  tripStart: new Date("2024-08-17"),
  tripEnd: new Date("2024-08-24"),
  setTripStart: (date) => set({ tripStart: date }),
  setTripEnd: (date) => set({ tripEnd: date }),
}));
