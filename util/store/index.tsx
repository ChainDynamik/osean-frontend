import { create } from "zustand";

interface TransactionStoreType {
  transactionOpen: boolean;
  toggleTransactionModal: (state: boolean) => void;
  oseanModalIsOpen: boolean;
  setOseanModalIsOpen: (state: boolean) => void;
  paymentModalIsOpen: boolean;
  setPaymentModal: (state: boolean) => void;
}

interface GalleryStoreType {
  isGalleryOpen: boolean;
  toggleGalleryModal: () => void;
}

export const useTransactionStore = create<TransactionStoreType>((set) => ({
  transactionOpen: false,
  toggleTransactionModal: (state) => set({ transactionOpen: state }),
  oseanModalIsOpen: false,
  setOseanModalIsOpen: (state) => set({ oseanModalIsOpen: state }),
  paymentModalIsOpen: false,
  setPaymentModal: (state) => set({ paymentModalIsOpen: state }),
}));

export const useGalleryModalStore = create<GalleryStoreType>((set) => ({
  isGalleryOpen: false,
  toggleGalleryModal: () =>
    set((state) => ({ isGalleryOpen: !state.isGalleryOpen })),
}));

interface YachtSearchStore {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const useYachtSearchStore = create<YachtSearchStore>((set) => ({
  startDate: null,
  endDate: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
}));

export default useYachtSearchStore;
