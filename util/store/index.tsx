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

// export default useYachtSearchStore;

// interface OfferFilterState {
//   startDate: Date | null;
//   endDate: Date | null;
//   amount: number | null; // Add the amount field
//   setStartDate: (date: Date | null) => void;
//   setEndDate: (date: Date | null) => void;
//   setAmount: (amount: number | null) => void; // Add the setAmount function
//   clearDates: () => void;
// }

// export const useOfferFilterState = create<OfferFilterState>((set) => ({
//   startDate: null,
//   endDate: null,
//   amount: null, // Initialize the amount field
//   setStartDate: (date) => set({ startDate: date }),
//   setEndDate: (date) => set({ endDate: date }),
//   setAmount: (amount) => set({ amount }), // Implement the setAmount function
//   clearDates: () => set({ startDate: null, endDate: null, amount: null }), // Reset the amount as well
// }));

// import { create } from "zustand";

interface OfferFilterState {
  startDate: Date | null;
  endDate: Date | null;
  amount: number | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setAmount: (amount: number | null) => void;
  clearDates: () => void;
}

export const useOfferFilterState = create<OfferFilterState>((set) => ({
  startDate: new Date("2024-08-18"), // Initialize with 17th August 2024
  endDate: new Date("2024-08-21"), // Initialize with 21st August 2024
  amount: null,
  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setAmount: (amount) => set({ amount }),
  clearDates: () =>
    set({
      startDate: new Date("2024-08-17"),
      endDate: new Date("2024-08-21"),
      amount: null,
    }), // Reset to specific dates
}));
