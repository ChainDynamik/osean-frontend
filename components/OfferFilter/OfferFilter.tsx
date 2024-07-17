"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { cn } from "../../util";
import { useOfferFilterState } from "../../util/store";

interface BookingFormProps {
  className?: string;
  isRoute?: boolean;
}

export default function OfferFilter({ className, isRoute }: BookingFormProps) {
  const router = useRouter();

  // Zustand state
  const startDate = useOfferFilterState((state) => state.startDate);
  const endDate = useOfferFilterState((state) => state.endDate);
  const amount = useOfferFilterState((state) => state.amount);

  // Zustand actions
  const setStoreStartDate = useOfferFilterState((state) => state.setStartDate);
  const setStoreEndDate = useOfferFilterState((state) => state.setEndDate);
  const setStoreAmount = useOfferFilterState((state) => state.setAmount);

  const handleReserve = () => {
    // Add additional logic for reserving if needed
    console.log(
      "Reservation made:",
      startDate ? format(startDate, "dd/MM/yyyy") : "",
      endDate ? format(endDate, "dd/MM/yyyy") : "",
      amount
    );
    if (isRoute) {
      router.push("/offers");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleReserve();
      }}
      className={cn(
        "max-w-md rounded-xl border border-gray-lighter bg-white p-8 shadow-card",
        className
      )}
    >
      <h2 className="text-3xl font-bold mb-6 w-4/5">
        Book your <span className="text-yellow-500">Yacht Charter</span> with{" "}
        <span className="text-blue-500">confidence</span>
      </h2>
      <div
        className={cn(
          "relative mt-6 grid grid-cols-2 gap-3 rounded-t-lg border border-b-0 border-gray-lighter"
        )}
        // onBlur={() => setFocus(false)}
      >
        <span
          className={cn(
            "absolute inset-y-0 left-1/2 translate-x-1/2 border-r border-gray-lighter"
          )}
        ></span>
        <div className="p-2">
          <span className="block mb-1 text-sm font-semibold uppercase text-gray-dark">
            Trip Start
          </span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStoreStartDate(date)}
            dateFormat="dd/MM/yyyy"
            className="w-full !border-none focus:!outline-none focus:!border-none !outline-none"
          />
        </div>
        <div className="p-2">
          <span className="block mb-1 text-sm font-semibold uppercase text-gray-dark">
            Trip End
          </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setStoreEndDate(date)}
            dateFormat="dd/MM/yyyy"
            className="w-full !ring-offset-0 !border-none focus:!outline-none focus:!border-none !outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <span className="block mb-1 text-sm font-semibold uppercase text-gray-dark">
          Amount
        </span>
        <input
          type="number"
          value={amount || ""}
          onChange={(e) => setStoreAmount(Number(e.target.value))}
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      <Button
        size="xl"
        rounded="lg"
        type="submit"
        variant="solid"
        className="mt-4 w-full hover:!bg-black !py-[14px] text-base !font-bold uppercase tracking-widest"
      >
        reserve
      </Button>
    </form>
  );
}
