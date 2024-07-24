// src/components/OfferApiFilter/OfferApiFilter.tsx

"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { useRouter } from "next/navigation";
import { cn } from "../../util";
import { useTripStore } from "../../util/store/tripStore";
import { useOfferApiFilterState } from "../../util/store/useOfferApiFilterState";
import Select from "react-select";
import { COUNTRIES_DATA } from "../../data/countries-data";
import CountriesDropdown from "../CountriesDropdown/CountriesDropdown";
import * as Switch from "@radix-ui/react-switch";
import CustomSlider from "../CustomSlider/CustomSlider";

const kindOptions = [
  { value: "sail boat", label: "Sailboat" },
  { value: "motorboat", label: "Motorboat" },
  { value: "catamaran", label: "Catamaran" },
  { value: "gulet", label: "Gulet" },
  { value: "motorsailer", label: "Motorsailer" },
  { value: "motoryacht", label: "Motoryacht" },
  { value: "woodenboat", label: "Woodenboat" },
  { value: "cruiser", label: "Cruiser" },
  { value: "powercatamaran", label: "Power Catamaran" },
  { value: "trimaran", label: "Trimaran" },
  { value: "houseboat", label: "Houseboat" },
  { value: "rubberboat", label: "Rubberboat" },
];

const countryOptions = COUNTRIES_DATA.map((country) => ({
  value: country.shortName,
  label: country.name,
}));

interface BookingFormProps {
  className?: string;
  isRoute?: boolean;
}

export default function OfferApiFilter({
  className,
  isRoute,
}: BookingFormProps) {
  const router = useRouter();

  // Zustand state
  const amount = useOfferApiFilterState((state) => state.amount);
  const currency = useOfferApiFilterState((state) => state.currency);
  const minLength = useOfferApiFilterState((state) => state.minLength);
  const maxLength = useOfferApiFilterState((state) => state.maxLength);
  const minBerths = useOfferApiFilterState((state) => state.minBerths);
  const maxBerths = useOfferApiFilterState((state) => state.maxBerths);
  const minYear = useOfferApiFilterState((state) => state.minYear);
  const maxYear = useOfferApiFilterState((state) => state.maxYear);
  const productFilters = useOfferApiFilterState(
    (state) => state.productFilters
  );
  const kindFilters = useOfferApiFilterState((state) => state.kindFilters);
  const passengersOnBoard = useOfferApiFilterState(
    (state) => state.passengersOnBoard
  );
  const countries = useOfferApiFilterState((state) => state.countries);

  // Zustand actions
  const setStoreAmount = useOfferApiFilterState((state) => state.setAmount);
  const setCurrency = useOfferApiFilterState((state) => state.setCurrency);
  const setStoreMinLength = useOfferApiFilterState(
    (state) => state.setMinLength
  );
  const setStoreMaxLength = useOfferApiFilterState(
    (state) => state.setMaxLength
  );
  const setStoreMinBerths = useOfferApiFilterState(
    (state) => state.setMinBerths
  );
  const setStoreMaxBerths = useOfferApiFilterState(
    (state) => state.setMaxBerths
  );
  const setStoreMinYear = useOfferApiFilterState((state) => state.setMinYear);
  const setStoreMaxYear = useOfferApiFilterState((state) => state.setMaxYear);
  const toggleProductFilter = useOfferApiFilterState(
    (state) => state.toggleProductFilter
  );
  const setKindFilters = useOfferApiFilterState(
    (state) => state.setKindFilters
  );
  const setPassengersOnBoard = useOfferApiFilterState(
    (state) => state.setPassengersOnBoard
  );
  const setCountries = useOfferApiFilterState((state) => state.setCountries);

  const { tripStart, tripEnd, setTripStart, setTripEnd } = useTripStore();

  const [localTripStart, setLocalTripStart] = useState<Date | null>(tripStart);
  const [localTripEnd, setLocalTripEnd] = useState<Date | null>(tripEnd);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);

  const handleUpdateTripDates = () => {
    setTripStart(localTripStart);
    setTripEnd(localTripEnd);
  };

  const handleReserve = () => {
    if (isRoute) {
      router.push("/offers");
    }
  };

  const handleKindChange = (selectedOptions: any) => {
    const selectedKinds = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setKindFilters(selectedKinds);
  };

  const handleCountryChange = (selectedOptions: any) => {
    const selectedCountries = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setCountries(selectedCountries);
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

      <div className="mt-4 flex flex-col gap-2">
        <p className="mb-0 text-black text-lg">Destination</p>
        <CountriesDropdown />
      </div>
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
        type="button"
        variant="secondary"
        onClick={handleUpdateTripDates}
        className="mt-4 mb-7 w-full flex flex-col gap-2 hover:!bg-black text-base !font-bold uppercase"
      >
        Filter Dates
      </Button>
      <div className="flex flex-col gap-4 border-t-2 mt-6 border-t-gray-300">
        <div className="mt-4 flex flex-col gap-2">
          <p className="mb-0 text-black text-lg">Types of boat:</p>
          <Select
            options={kindOptions}
            onChange={handleKindChange}
            isClearable
            isMulti
            isSearchable
            placeholder="Select kinds"
          />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          <p className="mb-0 text-black text-lg">Products:</p>
          <div className="flex gap-4 flex-col">
            <div className="flex items-center gap-2 justify-between">
              <label
                className="Label"
                htmlFor="bareboat"
                style={{ paddingRight: 15 }}
              >
                Bareboat (Without Skipper)
              </label>
              <Switch.Root
                className="SwitchRoot"
                id="bareboat"
                checked={productFilters.includes("bareboat")}
                onCheckedChange={() => toggleProductFilter("bareboat")}
              >
                <Switch.Thumb className="SwitchThumb" />
              </Switch.Root>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <label
                className="Label"
                htmlFor="crewed"
                style={{ paddingRight: 15 }}
              >
                Crewed (With Skipper)
              </label>
              <Switch.Root
                className="SwitchRoot"
                id="crewed"
                checked={productFilters.includes("crewed")}
                onCheckedChange={() => toggleProductFilter("crewed")}
              >
                <Switch.Thumb className="SwitchThumb" />
              </Switch.Root>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm font-semibold uppercase text-gray-dark">
          Price Range
        </label>
        <CustomSlider
          min={100}
          max={1000}
          step={100}
          defaultValue={priceRange}
          onValueChange={(value) => setPriceRange(value)}
        />
        <div className="flex justify-between mt-2">
          <span>{priceRange[0]} EUR</span>
          <span>{priceRange[1]} EUR</span>
        </div>
      </div>
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
      <div className="flex justify-between gap-4 items-center">
        <div className="mt-4">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            Passengers On Board
          </label>
          <input
            type="number"
            value={passengersOnBoard || ""}
            onChange={(e) => setPassengersOnBoard(Number(e.target.value))}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </form>
  );
}
