import { create } from "zustand";

export type Extra = {
  id: number;
  name: string;
  price: number;
  currency: string;
};

interface SelectedExtrasState {
  selectedExtras: Extra[];
  addExtra: (extra: Extra) => void;
  removeExtra: (id: number) => void;
  toggleExtra: (extra: Extra) => void; // Add toggle method
}

export const useSelectedExtrasStore = create<SelectedExtrasState>((set) => ({
  selectedExtras: [],
  addExtra: (extra) =>
    set((state) => ({ selectedExtras: [...state.selectedExtras, extra] })),
  removeExtra: (id) =>
    set((state) => ({
      selectedExtras: state.selectedExtras.filter((extra) => extra.id !== id),
    })),
  toggleExtra: (extra) =>
    set((state) => {
      const exists = state.selectedExtras.some((e) => e.id === extra.id);
      return {
        selectedExtras: exists
          ? state.selectedExtras.filter((e) => e.id !== extra.id)
          : [...state.selectedExtras, extra],
      };
    }),
}));
