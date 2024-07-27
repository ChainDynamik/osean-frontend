import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { BOOKING_MANAGER_API_ROOT } from "../../helpers";
import { BookingManagerYacht } from "../../types/booking-manager/core";
import useYachts from "../../hooks/useYachts";
import OffersCard, {
  OffersCardProps,
} from "../../components/OffersCard/OffersCard";
import OfferApiFilter from "../../components/OfferApiFilter/OfferApiFilter";
import { useTripStore } from "../../util/store/tripStore";
import { useOfferApiFilterState } from "../../util/store/useOfferApiFilterState";
import { CustomDropdown } from "../../components/CustomDropdown/CustomDropdown";
import Icon from "../../components/icon-selector/icon-selector";

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
  const [loading, setLoading] = useState<boolean>(true);
  const { yachts, fetchChrisBoats, getBoatById } = useYachts();

  const {
    startDate,
    endDate,
    amount,
    currency,
    minLength,
    maxLength,
    minBerths,
    maxBerths,
    minYear,
    maxYear,
    productFilters,
    kindFilters,
    passengersOnBoard,
    countries,
    priceRange,
  } = useOfferApiFilterState();

  const { tripStart, tripEnd, setTripStart, setTripEnd } = useTripStore();

  async function fetchOffers() {
    const dateFrom = tripStart ? format(tripStart, "yyyy-MM-dd") : "2024-08-17";
    const dateTo = tripEnd ? format(tripEnd, "yyyy-MM-dd") : "2024-08-24";
    console.log(dateFrom, dateTo, "date format-");

    let queryString = `${BOOKING_MANAGER_API_ROOT}/offers?dateFrom=${dateFrom}T00%3A00%3A00&dateTo=${dateTo}T00%3A00%3A00&companyId=2672`;

    if (currency) {
      queryString += `&currency=${currency}`;
    }
    if (minLength) {
      queryString += `&minLength=${minLength}`;
    }
    if (maxLength) {
      queryString += `&maxLength=${maxLength}`;
    }
    if (minBerths) {
      queryString += `&minBerths=${minBerths}`;
    }
    if (maxBerths) {
      queryString += `&maxBerths=${maxBerths}`;
    }
    if (minYear) {
      queryString += `&minYear=${minYear}`;
    }
    if (maxYear) {
      queryString += `&maxYear=${maxYear}`;
    }
    if (productFilters.length > 0) {
      queryString += `&product=${productFilters.join(",")}`;
    }
    if (kindFilters.length > 0) {
      queryString += `&kind=${kindFilters.join(",")}`;
    }
    if (passengersOnBoard) {
      queryString += `&passengersOnBoard=${passengersOnBoard}`;
    }
    if (countries.length > 0) {
      queryString += `&countries=${countries.join(",")}`;
    }

    try {
      const request = await axios.get(queryString, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BOOKING_MANAGER_API_KEY}`,
        },
      });

      const offers: Reservation[] = request.data;

      const offersWithBoats = offers.map((offer) => {
        const boat = getBoatById(offer.yachtId);

        return {
          offer: offer,
          boat: boat,
        };
      });

      setOffers(offersWithBoats);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  }

  useEffect(() => {
    if (yachts.length) fetchOffers();
  }, [
    yachts,
    tripStart,
    tripEnd,
    currency,
    minLength,
    maxLength,
    minBerths,
    maxBerths,
    minYear,
    maxYear,
    productFilters,
    kindFilters,
    passengersOnBoard,
    countries,
    priceRange,
  ]);

  console.log(offers, "query offers");
  console.log(+priceRange[0], +priceRange[1], "wakanda");

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
      people: boat.maxPeopleOnBoard,
      length: boat.length,
      name: boat.name,
      model: boat.model,
      company: boat.company,
      berths: boat.berths,
      cabins: boat.cabins,
      year: boat.year,
      kind: boat.kind,
    };
  };

  const filteredOffers = offers.filter((data) => {
    const { length, berths, year, kind } = data.boat;
    const withinMinLength = minLength ? length >= minLength : true;
    const withinMaxLength = maxLength ? length <= maxLength : true;
    const withinMinBerths = minBerths ? berths >= minBerths : true;
    const withinMaxBerths = maxBerths ? berths <= maxBerths : true;
    const withinMinYear = minYear ? year >= minYear : true;
    const withinMaxYear = maxYear ? year <= maxYear : true;
    const matchesCurrencyFilter = data.offer.currency === currency;
    const matchesProductFilter =
      productFilters.length === 0 ||
      productFilters.some((filter) =>
        data.boat.products.some(
          (product) => product.name.toLowerCase() === filter
        )
      );
    const matchesKindFilter =
      kindFilters.length === 0 || kindFilters.includes(kind.toLowerCase());
    const withinPriceRange = +data.offer.price >= priceRange[0];

    return (
      withinMinLength &&
      withinMaxLength &&
      withinMinBerths &&
      withinMaxBerths &&
      withinMinYear &&
      withinMaxYear &&
      matchesCurrencyFilter &&
      matchesProductFilter &&
      matchesKindFilter &&
      withinPriceRange
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

  const loadingCards = Array.from({ length: 4 }, (_, index) => (
    <OffersCard
      key={index}
      loading={true}
      id={index}
      yacht=""
      startBase=""
      endBase=""
      price={0}
      startPrice={0}
      currency=""
      imageUrl=""
      dateFrom=""
      dateTo=""
      cabins=""
      length={0}
      berths=""
      year=""
      products={[]}
      kind=""
      company=""
    />
  ));

  return (
    <main className="!px-6 md:!px-10 pb-16 !mt-[9rem] md:!mt-[5.5rem] relative">
      {/* <div className="flex md:w-[calc(100%-(30%+2rem))] ml-auto justify-between items-center !mb-7 gap-4 flex-wrap">
        <p className="mb-0">{sortedOffers.length} Boats</p>
        <div className="flex gap-4 items-center">
          <p className="mb-0 text-black">Sort by:</p>
          <CustomDropdown
            options={sortOptions}
            selectedOption={sortOption}
            onSelect={setSortOption}
          />
        </div>
      </div> */}
      <div className="flex gap-12 max-w-[1220px] mx-auto relative">
        <div className="max-lg:hidden min-w-[30%]">
          <OfferApiFilter />
        </div>
        <div className="flex w-full items-center flex-col gap-8 mx-auto max-w-[750px] relative">
          {!loading && sortedOffers.length === 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-lg font-semibold mb-0 ">
                No results, please configure filters
              </p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Get Quote
              </button>
            </div>
          )}
          <div className="flex md:hidden bg-white z-50 fixed top-24 left-1/2 -translate-x-1/2 items-center border border-primary rounded-xl w-max">
            <div className="py-2.5 px-3">
              <Icon
                iconType="search"
                className="w-5 text-primary
              "
              />
            </div>
            <p className="mb-0 text-xs pr-3">Where would you like to cruise?</p>
            <div className="py-2.5 px-2.5 border-l border-l-primary">
              <Icon
                iconType="filter"
                className="w-5 text-primary
              "
              />
            </div>
          </div>
          <div className="flex w-full ml-auto justify-between items-center !mb-7 gap-4 flex-wrap">
            <p className="mb-0">{sortedOffers.length} Boats</p>
            <div className="flex gap-4 items-center">
              <p className="mb-0 text-black">Sort by:</p>
              <CustomDropdown
                options={sortOptions}
                selectedOption={sortOption}
                onSelect={setSortOption}
                xx
              />
            </div>
          </div>
          {loading && loadingCards}

          {!loading &&
            sortedOffers.length > 0 &&
            sortedOffers.map((data, index) => {
              const boatObject = data.boat;
              const offerObject = data.offer;

              const offerBoatObject = mapOfferToProps(offerObject, boatObject);

              const mainImage = boatObject?.images.find(
                (image) => image.description === "Main image"
              );
              const imageUrl = mainImage ? mainImage.url : "";

              return (
                <OffersCard
                  key={index}
                  loading={false}
                  {...offerBoatObject}
                  imageUrl={imageUrl}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}
