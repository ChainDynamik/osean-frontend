"use client";

import React, { useState } from "react";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import useYachtSearchStore from "../../util/store";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  className?: string;
}

export default function YachtSearch({ className }: BookingFormProps) {
  const [focus, setFocus] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [nights, setNights] = useState<number>(1); // Initial number of nights

  const router = useRouter();
  const setStoreStartDate = useYachtSearchStore((state) => state.setStartDate);
  const setStoreEndDate = useYachtSearchStore((state) => state.setEndDate);

  const handleIncreaseNights = () => {
    setNights(nights + 1);
  };
  const handleReduceNights = () => {
    if (nights > 1) setNights(nights - 1);
  };

  const handleReserve = () => {
    setStoreStartDate(startDate);
    setStoreEndDate(endDate);
    // Add additional logic for reserving if needed
    console.log("Reservation made:", { startDate, endDate });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleReserve();
      }}
      className={clsx(
        "absolute left-8 bottom-8 max-w-md rounded-xl border border-gray-lighter bg-white p-8 shadow-card",
        className
      )}
    >
      <h2 className="text-3xl font-bold mb-6 w-4/5">
        Book your <span className="text-yellow-500">Yacht Charter</span> with{" "}
        <span className="text-blue-500">confidence</span>
      </h2>
      <div
        className={clsx(
          "relative mt-6 grid grid-cols-2 gap-3 rounded-t-lg border border-b-0 border-gray-lighter",
          focus && "!border-b !border-gray-dark ring-[1px] ring-gray-900/20"
        )}
        onBlur={() => setFocus(false)}
      >
        <span
          className={clsx(
            "absolute inset-y-0 left-1/2 translate-x-1/2 border-r border-gray-lighter",
            focus && "!border-gray-dark"
          )}
        ></span>
        <div className="p-2">
          <span className="block mb-1 text-sm font-semibold uppercase text-gray-dark">
            Trip Start
          </span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full !border-none focus:!outline-none focus:!border-none !outline-none"
          />
        </div>
        <div className="p-2">
          <span className="block mb-1 text-sm font-semibold uppercase text-gray-dark">
            Trip End
          </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="w-full !ring-offset-0 !border-none focus:!outline-none focus:!border-none !outline-none"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-black mb-0">Nights: {nights}</p>
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            rounded="lg"
            type="button"
            variant="outline"
            className="hover:bg-gray-200"
            onClick={handleIncreaseNights}
          >
            Increase
          </Button>
          <Button
            size="sm"
            rounded="lg"
            type="button"
            variant="outline"
            className="hover:bg-gray-200"
            onClick={handleReduceNights}
          >
            Reduce
          </Button>
        </div>
      </div>

      <Button
        onClick={() => {
          router.push("/offers");
        }}
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
