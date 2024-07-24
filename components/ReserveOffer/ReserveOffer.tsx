"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { cn } from "../../util";
import { useTripStore } from "../../util/store/tripStore";
import CountriesDropdown from "../CountriesDropdown/CountriesDropdown";

interface BookingFormProps {
  className?: string;
  isRoute?: boolean;
}

export default function ReserveOffer({ className, isRoute }: BookingFormProps) {
  const router = useRouter();

  const { setTripStart, setTripEnd } = useTripStore();

  const [localTripStart, setLocalTripStart] = useState<Date | null>(
    new Date("2024-08-17")
  );
  const [localTripEnd, setLocalTripEnd] = useState<Date | null>(
    new Date("2024-08-24")
  );

  const handleReserve = () => {
    setTripStart(localTripStart);
    setTripEnd(localTripEnd);

    if (isRoute) {
      router.push("/offers");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleReserve();

        console.log("Trip Start:", localTripStart);
        console.log("Trip End:", localTripEnd);
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
            selected={localTripStart}
            onChange={(date) => setLocalTripStart(date)}
            dateFormat="dd/MM/yyyy"
            className="w-full !border-none focus:!outline-none focus:!border-none !outline-none"
          />
        </div>
        <div className="p-2">
          <span className="block mb-1 text-sm font-semibold uppercase text-gray-dark">
            Trip End
          </span>
          <DatePicker
            selected={localTripEnd}
            onChange={(date) => setLocalTripEnd(date)}
            dateFormat="dd/MM/yyyy"
            className="w-full !ring-offset-0 !border-none focus:!outline-none focus:!border-none !outline-none"
          />
        </div>
      </div>
      <div className="mt-4">
        <CountriesDropdown />
      </div>
      <Button
        type="submit"
        variant="secondary"
        className="mt-4 w-full hover:!bg-black !py-[14px] text-base !font-bold uppercase tracking-widest"
      >
        reserve
      </Button>
    </form>
  );
}
