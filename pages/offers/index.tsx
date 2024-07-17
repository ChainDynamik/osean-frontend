"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BOOKING_MANAGER_API_ROOT } from "../../helpers";
import { BookingManagerYacht } from "../../types/booking-manager/core";
import useYachts from "../../hooks/useYachts";
import OffersCard, {
  OffersCardProps,
} from "../../components/OffersCard/OffersCard";
import OfferFilter from "../../components/OfferFilter/OfferFilter";
import { useOfferFilterState } from "../../util/store";

// import React, { useState } from "react";

interface CustomDropdownProps {
  options: { value: string; label: string }[];
  selectedOption: string;
  onSelect: (value: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {options.find((option) => option.value === selectedOption)?.label ||
            "Sort by"}
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
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option.value}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                role="menuitem"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

type Extra = {
  id: number;
  name: string;
  price: number;
  currency: string;
  payableInBase: boolean;
  description: string;
};

type PaymentPlan = {
  date: string;
  amount: number;
};

type Reservation = {
  yachtId: number;
  yacht: string;
  startBaseId: number;
  endBaseId: number;
  startBase: string;
  endBase: string;
  dateFrom: string;
  dateTo: string;
  status: number;
  product: string;
  price: number;
  currency: string;
  startPrice: number;
  obligatoryExtrasPrice: number;
  obligatoryExtras: Extra[];
  paymentPlan: PaymentPlan[];
  securityDeposit: number;
  commissionPercentage: number;
  commissionValue: number;
  discountPercentage: number;
  myReservationId: number;
};

type OfferWithBoat = {
  offer: Reservation;
  boat: BookingManagerYacht | undefined;
};

const sortOptions = [
  { value: "", label: "Default" },
  { value: "lowestPrice", label: "Lowest Price" },
  { value: "highestPrice", label: "Highest Price" },
];

export default function Offers() {
  const [offers, setOffers] = useState<OfferWithBoat[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const { yachts, fetchChrisBoats, getBoatById } = useYachts();

  const startDate = useOfferFilterState((state) => state.startDate);
  const endDate = useOfferFilterState((state) => state.endDate);
  const filterAmount = useOfferFilterState((state) => state.amount);

  async function fetchOffers() {
    const request = await axios.get(
      `${BOOKING_MANAGER_API_ROOT}/offers?dateFrom=2024-08-17T00%3A00%3A00&dateTo=2024-08-24T00%3A00%3A00&companyId=2672&currency=EUR&showOptions=true&passengersOnBoard=1`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BOOKING_MANAGER_API_KEY}`,
        },
      }
    );

    const offers: Reservation[] = request.data;

    const offersWithBoats = offers.map((offer) => {
      const boat = getBoatById(offer.yachtId);

      return {
        offer: offer,
        boat: boat,
      };
    });

    setOffers(offersWithBoats);
  }

  useEffect(() => {
    if (yachts) fetchOffers();
  }, [yachts]);

  const mapOfferToProps = (offer: Reservation): OffersCardProps => {
    return {
      id: offer.yachtId,
      product: offer.product,
      yacht: offer.yacht,
      startBase: offer.startBase,
      endBase: offer.endBase,
      price: offer.price,
      startPrice: offer.startPrice,
      currency: offer.currency,
      dateFrom: offer.dateFrom,
      dateTo: offer.dateTo,
    };
  };

  const filteredOffers = offers.filter(({ offer }) => {
    if (!startDate || !endDate) {
      return true;
    }

    const offerStartDate = new Date(offer.dateFrom).getTime();
    const offerEndDate = new Date(offer.dateTo).getTime();
    const filterStartDate = startDate.getTime();
    const filterEndDate = endDate.getTime();

    const dateMatch =
      offerStartDate <= filterStartDate &&
      offerEndDate >= filterEndDate &&
      filterEndDate >= offerStartDate;

    return dateMatch;
  });

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (sortOption === "lowestPrice") {
      return a.offer.price - b.offer.price;
    }
    if (sortOption === "highestPrice") {
      return b.offer.price - a.offer.price;
    }
    return 0; // Default: no sorting
  });

  return (
    <main className="!px-10 mt-[7.5rem]">
      <div className="flex w-[calc(100%-(30%+2rem))] ml-auto justify-between items-center mb-4">
        <p className="text-lg font-semibold">{filteredOffers.length} boats</p>
        <div className="flex  gap-4 items-center">
          <p className="mb-0 text-black">Sort by:</p>
          <CustomDropdown
            options={sortOptions}
            selectedOption={sortOption}
            onSelect={setSortOption}
          />
        </div>
      </div>
      <div className="flex gap-8">
        <div className="w-[30%] min-w-[30%]">
          <OfferFilter />
        </div>
        <div className="flex w-full justify-center items-center flex-col gap-8">
          {sortedOffers.length === 0 && (
            <p className="text-2xl text-black w-full text-center mx-auto">
              No results, please configure filters
            </p>
          )}
          {sortedOffers.length !== 0 &&
            sortedOffers.map((data, index) => {
              const offerObject = mapOfferToProps(data.offer);

              const image = data?.boat?.images[0]?.url;

              return (
                <OffersCard
                  key={index}
                  {...offerObject}
                  imageUrl={image || ""}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}
