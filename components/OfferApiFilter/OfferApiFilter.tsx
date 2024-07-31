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
import * as Slider from "@radix-ui/react-slider";
import { Dropdown } from "../Dropdown/Dropdown";
import Icon from "../icon-selector/icon-selector";

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

const yearOptions = [{ value: "all", label: "All" }].concat(
  Array.from({ length: 30 }, (_, i) => 1990 + i).map((year) => ({
    value: year,
    label: year.toString(),
  }))
);

const lengthOptions = [{ value: "all", label: "All" }].concat(
  Array.from({ length: 16 }, (_, i) => 5 + i).map((length) => ({
    value: length,
    label: length.toString() + " m",
  }))
);

const passengersOptions = [{ value: "all", label: "All" }].concat(
  Array.from({ length: 10 }, (_, i) => 1 + i).map((passengers) => ({
    value: passengers,
    label: passengers.toString(),
  }))
);

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
  const priceRange = useOfferApiFilterState((state) => state.priceRange);

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
  const setProductFilter = useOfferApiFilterState(
    (state) => state.setProductFilter
  );
  const setKindFilters = useOfferApiFilterState(
    (state) => state.setKindFilters
  );
  const setPassengersOnBoard = useOfferApiFilterState(
    (state) => state.setPassengersOnBoard
  );
  const setCountries = useOfferApiFilterState((state) => state.setCountries);
  const setPriceRange = useOfferApiFilterState((state) => state.setPriceRange);

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

  const handleYearChange = (year: number | string, type: "min" | "max") => {
    if (type === "min") {
      setStoreMinYear(year === "all" ? null : year);
    } else {
      setStoreMaxYear(year === "all" ? null : year);
    }
  };

  const handleLengthChange = (length: number | string, type: "min" | "max") => {
    if (type === "min") {
      setStoreMinLength(length === "all" ? null : length);
    } else {
      setStoreMaxLength(length === "all" ? null : length);
    }
  };

  const handlePassengersChange = (passengers: number | string) => {
    setPassengersOnBoard(passengers === "all" ? null : passengers);
  };

  const minCabins = useOfferApiFilterState((state) => state.minCabins);
  const setMinCabins = useOfferApiFilterState((state) => state.setMinCabins);

  const handleCabinChange = (cabins: number) => {
    setMinCabins(cabins === minCabins ? null : cabins);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleReserve();
      }}
      className={cn(
        "rounded-xl border border-gray-lighter bg-white p-8 shadow-card",
        className
      )}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 w-4/5">
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
                checked={productFilters === "bareboat"}
                onCheckedChange={() => {
                  if (productFilters !== "bareboat") {
                    setProductFilter("bareboat");
                  }
                  if (productFilters === "bareboat") {
                    setProductFilter(null);
                  }
                }}
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
                checked={productFilters === "crewed"}
                // onCheckedChange={() => setProductFilter("crewed")}
                onCheckedChange={() => {
                  if (productFilters !== "crewed") {
                    setProductFilter("crewed");
                  }
                  if (productFilters === "crewed") {
                    setProductFilter(null);
                  }
                }}
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
        <Slider.Root
          className="SliderRoot"
          min={2000}
          max={30000}
          step={100}
          defaultValue={priceRange}
          onValueChange={(value) => setPriceRange(value)}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" aria-label="Price" />
        </Slider.Root>

        <div className="flex justify-between mt-2">
          <span>{priceRange[0]} EUR</span>
          <span>{priceRange[1]} EUR</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="mt-4 w-full">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            Min Length
          </label>
          <Dropdown.Root modal={false}>
            <Dropdown.Trigger className="w-full mt-1 p-2 border-l border-t border-b border-gray-300 rounded-l-md bg-white">
              <div className="flex items-center justify-between">
                <p className="mb-0 text-black">
                  {"< "}
                  {minLength ? `${minLength} m` : "All"}
                </p>
                <div>
                  <Icon iconType="chevron" className="w-3 text-black" />
                </div>
              </div>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {lengthOptions.map((option) => (
                <Dropdown.Item
                  key={option.value}
                  onSelect={() => handleLengthChange(option.value, "min")}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
        <div className="mt-4 w-full">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            Max Length
          </label>
          <Dropdown.Root modal={false}>
            <Dropdown.Trigger className="w-full mt-1 p-2 border-r border-t border-b  border-gray-300 rounded-r-md bg-white">
              <div className="flex items-center justify-between">
                <p className="mb-0 text-black">
                  {"> "}
                  {maxLength ? `${maxLength} m` : "All"}
                </p>
                <div>
                  <Icon iconType="chevron" className="w-3 text-black" />
                </div>
              </div>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {lengthOptions.map((option) => (
                <Dropdown.Item
                  key={option.value}
                  onSelect={() => handleLengthChange(option.value, "max")}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="mt-4 w-full">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            Min Year
          </label>
          <Dropdown.Root modal={false}>
            <Dropdown.Trigger className="w-full mt-1 p-2 border-l border-t border-b border-gray-300 rounded-l-md bg-white">
              <div className="flex items-center justify-between">
                <div>≥</div>
                <p className="mb-0 text-black">{minYear || "All"}</p>
                <div>
                  <Icon iconType="chevron" className="w-3 text-black" />
                </div>
              </div>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {yearOptions.map((option) => (
                <Dropdown.Item
                  key={option.value}
                  onSelect={() => handleYearChange(option.value, "min")}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
        <div className="mt-4 w-full">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            Max Year
          </label>
          <Dropdown.Root modal={false}>
            <Dropdown.Trigger className="w-full mt-1 p-2 border-r border-t border-b  border-gray-300 rounded-r-md bg-white">
              <div className="flex items-center justify-between">
                <div>≤</div>
                <p className="mb-0 text-black">{maxYear || "All"}</p>
                <div>
                  <Icon iconType="chevron" className="w-3 text-black" />
                </div>
              </div>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {yearOptions.map((option) => (
                <Dropdown.Item
                  key={option.value}
                  onSelect={() => handleYearChange(option.value, "max")}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-black text-lg mb-2">Cabin Number</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5, 6].map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => handleCabinChange(number)}
              className={cn(
                "w-1/5 aspect-square border rounded-lg",
                minCabins === number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black border-gray-300"
              )}
            >
              {number === 6 ? "6+" : number}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between gap-4 items-center">
        <div className="mt-4 w-full">
          <label className="block text-sm font-semibold uppercase text-gray-dark">
            People
          </label>
          <Dropdown.Root modal={false}>
            <Dropdown.Trigger className="w-full mt-1 p-2 border border-gray-300 rounded-md bg-white">
              <div className="flex items-center justify-between">
                <p className="mb-0 text-black">{passengersOnBoard || "All"}</p>
                <div>
                  <Icon iconType="chevron" className="w-3 text-black" />
                </div>
              </div>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {passengersOptions.map((option) => (
                <Dropdown.Item
                  key={option.value}
                  onSelect={() => handlePassengersChange(option.value)}
                >
                  {option.label}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown.Root>
        </div>
      </div>
    </form>
  );
}
