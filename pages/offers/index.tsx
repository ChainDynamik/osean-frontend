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
import { useOfferFilterState } from "../../util/store/offerFiltersStore";
import { CustomDropdown } from "../../components/CustomDropdown/CustomDropdown";

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
  const minBerths = useOfferFilterState((state) => state.minBerths);
  const maxBerths = useOfferFilterState((state) => state.maxBerths);
  const minYear = useOfferFilterState((state) => state.minYear);
  const maxYear = useOfferFilterState((state) => state.maxYear);
  const productFilter = useOfferFilterState((state) => state.productFilter);
  const kindFilter = useOfferFilterState((state) => state.kindFilter);

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
    if (yachts.length) fetchOffers();
  }, [yachts, currency, startDate, endDate]);

  const mapOfferToProps = (
    offer: Reservation,
    boat: BookingManagerYacht
  ): OffersCardProps => {
    const productNames = boat.products.map((product) =>
      product.name.toLowerCase()
    );

    return {
      id: offer.yachtId,
      products: productNames,
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
      year: boat.year,
      kind: boat.kind,
    };
  };

  const filterOffers = (offers: OfferWithBoat[], filters: any) => {
    if (filters.currency) {
      const fuse = new Fuse(offers, {
        keys: ["offer.currency"],
        threshold: 0, // Adjust based on the level of fuzzy matching required
        isCaseSensitive: true, // Make sure matching is case sensitive
      });

      const results = fuse.search(filters.currency);
      return results.map((result) => result.item);
    }
    return offers;
  };

  const filters = {
    currency: currency,
  };

  const filteredOffers = filterOffers(offers, filters).filter((data) => {
    const { length, berths, year, kind } = data.boat;
    const withinMinLength = minLength ? length >= minLength : true;
    const withinMaxLength = maxLength ? length <= maxLength : true;
    const withinMinBerths = minBerths ? berths >= minBerths : true;
    const withinMaxBerths = maxBerths ? berths <= maxBerths : true;
    const withinMinYear = minYear ? year >= minYear : true;
    const withinMaxYear = maxYear ? year <= maxYear : true;
    const matchesProductFilter =
      productFilter === "all products" ||
      data.boat.products.some(
        (product) => product.name.toLowerCase() === productFilter
      );
    const matchesKindFilter =
      kindFilter === "all kinds" || kind.toLowerCase() === kindFilter;

    return (
      withinMinLength &&
      withinMaxLength &&
      withinMinBerths &&
      withinMaxBerths &&
      withinMinYear &&
      withinMaxYear &&
      matchesProductFilter &&
      matchesKindFilter
    );
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

              console.log(
                // offerBoatObject,
                // boatObject,
                offerObject,
                "offer + boat data"
              );

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
