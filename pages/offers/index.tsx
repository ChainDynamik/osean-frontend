import { useEffect, useState } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import { BOOKING_MANAGER_API_ROOT } from "../../helpers";
import { BookingManagerYacht } from "../../types/booking-manager/core";
import useYachts from "../../hooks/useYachts";
import OffersCard, {
  OffersCardProps,
} from "../../components/OffersCard/OffersCard";
import OfferFilter from "../../components/OfferFilter/OfferFilter";
import { CustomDropdown } from "../../components/CustomDropdown/CustomDropdown";
import { useOfferFilterState } from "../../util/store/offerFiltersStore";

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
  const currency = useOfferFilterState((state) => state.currency);
  const minLength = useOfferFilterState((state) => state.minLength);
  const maxLength = useOfferFilterState((state) => state.maxLength);

  async function fetchOffers() {
    const request = await axios.get(
      `${BOOKING_MANAGER_API_ROOT}/offers?dateFrom=2024-08-17T00%3A00%3A00&dateTo=2024-08-24T00%3A00%3A00&companyId=2672&currency=${currency}&showOptions=true&passengersOnBoard=1`,
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
    if (yachts.length) fetchOffers();
  }, [yachts, currency]);

  const mapOfferToProps = (
    offer: Reservation,
    boat: BookingManagerYacht
  ): OffersCardProps => {
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
      passengersOnBoard: boat.passengersOnBoard,
      length: boat.length,
      berths: boat.berths,
      cabins: boat.cabins,
    };
  };

  const filterOffers = (offers: OfferWithBoat[], filters: any) => {
    const fuse = new Fuse(offers, {
      keys: ["offer.currency"],
      threshold: 0, // Adjust based on the level of fuzzy matching required
      isCaseSensitive: true, // Make sure matching is case sensitive
    });

    const results = fuse.search(filters);
    return results.map((result) => result.item);
  };

  const filters = {
    "offer.currency": currency,
  };

  const filteredOffers = filterOffers(offers, filters).filter((data) => {
    const { length } = data.boat;
    const withinMinLength = minLength ? length >= minLength : true;
    const withinMaxLength = maxLength ? length <= maxLength : true;
    return withinMinLength && withinMaxLength;
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
    <main className="!px-10 pb-16 mt-[7.5rem]">
      <div className="flex w-[calc(100%-(30%+2rem))] ml-auto justify-between items-center mb-4">
        <p className="text-lg font-semibold">{filteredOffers.length} boats</p>
        <div className="flex gap-4 items-center">
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
              const boatObject = data.boat;
              const offerObject = data.offer;

              const offerBoatObject = mapOfferToProps(offerObject, boatObject);

              console.log(boatObject, "offer + boat data");

              const image = boatObject?.images[0]?.url;

              return (
                <OffersCard
                  key={index}
                  {...offerBoatObject}
                  imageUrl={image || ""}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}
