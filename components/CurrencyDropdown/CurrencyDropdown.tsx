// src/components/CurrencyDropdown/CurrencyDropdown.tsx

import React from "react";
import { Dropdown } from "../Dropdown/Dropdown";
import { useOfferApiFilterState } from "../../util/store/useOfferApiFilterState";

const currencyOptions = [
  { value: "EUR", label: "EUR" },
  { value: "USD", label: "USD" },
  { value: "ETH", label: "ETH" },
  { value: "BNB", label: "BNB" },
  { value: "OSEAN", label: "OSEAN" },
];

export default function CurrencyDropdown() {
  const currency = useOfferApiFilterState((state) => state.currency);
  const setCurrency = useOfferApiFilterState((state) => state.setCurrency);

  const handleCurrencyChange = (selectedValue: string) => {
    setCurrency(selectedValue);
  };

  return (
    <Dropdown.Root modal={false}>
      <Dropdown.Trigger className="inline-flex justify-between rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm w-fit">
        <div>
          {currency || "Select Currency"}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 011.414 0L10 13.414l3.293-3.707a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Content className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
        {currencyOptions.map((option) => (
          <Dropdown.Item
            key={option.value}
            onClick={() => handleCurrencyChange(option.value)}
          >
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown.Root>
  );
}
