"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { cn } from "../../util";
import { useOfferFilterState } from "../../util/store/offerFiltersStore";
import { useTripStore } from "../../util/store/tripStore";

interface BookingFormProps {
  className?: string;
  isRoute?: boolean;
}

export default function OfferFilter({ className, isRoute }: BookingFormProps) {
  const router = useRouter();

  // Zustand state
  const amount = useOfferFilterState((state) => state.amount);
  const currencies = useOfferFilterState((state) => state.currencies);
  const minLength = useOfferFilterState((state) => state.minLength);
  const maxLength = useOfferFilterState((state) => state.maxLength);
  const minBerths = useOfferFilterState((state) => state.minBerths);
  const maxBerths = useOfferFilterState((state) => state.maxBerths);
  const minYear = useOfferFilterState((state) => state.minYear);
  const maxYear = useOfferFilterState((state) => state.maxYear);
  const productFilters = useOfferFilterState((state) => state.productFilters);
  const kindFilters = useOfferFilterState((state) => state.kindFilters);

  // Zustand actions
  const setStoreAmount = useOfferFilterState((state) => state.setAmount);
  const toggleCurrency = useOfferFilterState((state) => state.toggleCurrency);
  const setStoreMinLength = useOfferFilterState((state) => state.setMinLength);
  const setStoreMaxLength = useOfferFilterState((state) => state.setMaxLength);
  const setStoreMinBerths = useOfferFilterState((state) => state.setMinBerths);
  const setStoreMaxBerths = useOfferFilterState((state) => state.setMaxBerths);
  const setStoreMinYear = useOfferFilterState((state) => state.setMinYear);
  const setStoreMaxYear = useOfferFilterState((state) => state.setMaxYear);
  const toggleProductFilter = useOfferFilterState(
    (state) => state.toggleProductFilter
  );
  const toggleKindFilter = useOfferFilterState(
    (state) => state.toggleKindFilter
  );

  const { tripStart, tripEnd, setTripStart, setTripEnd } = useTripStore();

  const [localTripStart, setLocalTripStart] = useState<Date | null>(tripStart);
  const [localTripEnd, setLocalTripEnd] = useState<Date | null>(tripEnd);

  const handleUpdateTripDates = () => {
    setTripStart(localTripStart);
    setTripEnd(localTripEnd);
  };

  const handleReserve = () => {
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
      <Button
        size="sm"
        rounded="lg"
        type="button"
        variant="solid"
        onClick={handleUpdateTripDates}
        className="mt-4 mb-7 w-full flex flex-col gap-2 hover:!bg-black text-base !font-bold uppercase"
      >
        Get Yachts
        {/* <p className="text-white">Get Yachts from </p> */}
        {/* <p className="text-white">
            {`${localTripStart?.toLocaleDateString()} to ${localTripEnd?.toLocaleDateString()}`}
          </p> */}
      </Button>
      {/*  */}
      <div className="flex flex-col gap-4 border-t-2 mt-6 border-t-gray-300">
        <div className="mt-4 flex flex-col gap-2">
          <p className="mb-0 text-black text-lg">Currencies:</p>
          <div className="flex gap-4 items-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={currencies.includes("EUR")}
                onChange={() => toggleCurrency("EUR")}
                className="form-checkbox"
              />
              <span className="ml-2">EUR</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={currencies.includes("USD")}
                onChange={() => toggleCurrency("USD")}
                className="form-checkbox"
              />
              <span className="ml-2">USD</span>
            </label>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <p className="mb-0 text-black text-lg">Products:</p>
          <div className="flex gap-4 items-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={productFilters.includes("bareboat")}
                onChange={() => toggleProductFilter("bareboat")}
                className="form-checkbox"
              />
              <span className="ml-2">Bareboat</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={productFilters.includes("crewed")}
                onChange={() => toggleProductFilter("crewed")}
                className="form-checkbox"
              />
              <span className="ml-2">Crewed</span>
            </label>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <p className="mb-0 text-black text-lg">Kinds:</p>
          <div className="flex gap-4 items-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={kindFilters.includes("sail boat")}
                onChange={() => toggleKindFilter("sail boat")}
                className="form-checkbox"
              />
              <span className="ml-2">Sail Boat</span>
            </label>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex justify-between gap-4 items-center">
        <div className="mt-4">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            Min Length
          </label>
          <input
            type="number"
            value={minLength || ""}
            onChange={(e) => setStoreMinLength(Number(e.target.value))}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            Max Length
          </label>
          <input
            type="number"
            value={maxLength || ""}
            onChange={(e) => setStoreMaxLength(Number(e.target.value))}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="flex justify-between gap-4 items-center">
        <div className="mt-4">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            Min Berths
          </label>
          <input
            type="number"
            value={minBerths || ""}
            onChange={(e) => setStoreMinBerths(Number(e.target.value))}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            Max Berths
          </label>
          <input
            type="number"
            value={maxBerths || ""}
            onChange={(e) => setStoreMaxBerths(Number(e.target.value))}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="flex justify-between gap-4 items-center">
        <div className="mt-4">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            Min Year
          </label>
          <input
            type="number"
            value={minYear || ""}
            onChange={(e) => setStoreMinYear(Number(e.target.value))}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            Max Year
          </label>
          <input
            type="number"
            value={maxYear || ""}
            onChange={(e) => setStoreMaxYear(Number(e.target.value))}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </form>
  );
}
