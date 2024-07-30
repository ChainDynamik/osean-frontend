"use client";
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
import Icon from "../../components/icon-selector/icon-selector";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { cn } from "../../util";
import Overlay from "../../components/Overlay/overlay";
import Button from "../../components/Button/Button";
import ReactPaginate from "react-paginate";
import useScreenSize from "../../util/hooks/useScreenSize";
import { useMoralis } from "react-moralis";

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

const ITEMS_PER_PAGE = 5; // Number of items per page

export default function Offers() {
  const [offers, setOffers] = useState<OfferWithBoat[]>([]);
  const [sortOption, setSortOption] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const { yachts, getBoatById } = useYachts();
  const [currentPage, setCurrentPage] = useState(0);
  const { isMobile } = useScreenSize();

  const { Moralis, isInitialized } = useMoralis();

  async function fetchYachtDataFromDb(modelId: number) {
    const query = new Moralis.Query("Yacht");
    query.equalTo("modelId", modelId);
    const result = await query.first();

    if (result) {
      return result.toJSON();
    } else {
      return null;
    }
  }

  async function fetchYachtDataFromDbMultiple(modelIds: number[]) {
    const query = new Moralis.Query("Yacht");
    query.containedIn("bookingManagerId", modelIds);
    query.limit(100_000);
    const result = await query.find();

    if (result) {
      return result.map((res) => res.toJSON());
    } else {
      return null;
    }
  }

  const {
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

  const { tripStart, tripEnd } = useTripStore();

  async function fetchOffers() {
    const dateFrom = tripStart ? format(tripStart, "yyyy-MM-dd") : "2024-08-17";
    const dateTo = tripEnd ? format(tripEnd, "yyyy-MM-dd") : "2024-08-24";

    let queryString = `/api/fetchOffers?dateFrom=${dateFrom}T00%3A00%3A00&dateTo=${dateTo}T00%3A00%3A00`;

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
          Authorization: `Bearer ${process.env.BOOKING_MANAGER_API_KEY}`,
        },
      });
      // tsst
      const offers: Reservation[] = request.data;

      const allBoatIds = offers.map((offer) => offer.yachtId);
      const allBoats = await fetchYachtDataFromDbMultiple(allBoatIds);

      console.log(allBoats);

      const offersWithBoats = offers.map((offer) => {
        const boat = allBoats.find(
          (b: any) => b.bookingManagerId === offer.yachtId
        );

        return {
          offer: offer,
          boat: boat,
        };
      });

      console.log(offersWithBoats, "offersWithBoats");

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

  const mapOfferToProps = (
    offer: Reservation,
    boat: BookingManagerYacht
  ): OffersCardProps => {
    const productNames = boat?.products?.map((product) =>
      product.name.toLowerCase()
    );

    return {
      id: offer?.yachtId,
      products: productNames || [],
      yacht: offer?.yacht,
      startBase: offer?.startBase,
      endBase: offer?.endBase,
      price: offer?.price,
      startPrice: offer?.startPrice,
      currency: offer?.currency,
      dateFrom: offer?.dateFrom,
      dateTo: offer?.dateTo,
      kind: boat?.kind,
    };
  };

  const filteredOffers = offers.filter((data) => {
    const { berths, year, kind, length } = data.boat || {};

    const withinMinLength = minLength ? length >= minLength : true;
    const withinMaxLength = maxLength ? length <= maxLength : true;
    const withinMinBerths = minBerths ? berths >= minBerths : true;
    const withinMaxBerths = maxBerths ? berths <= maxBerths : true;
    const withinMinYear = minYear ? year >= minYear : true;
    const withinMaxYear = maxYear ? year <= maxYear : true;
    const matchesCurrencyFilter = data.offer.currency === currency;
    const matchesProductFilter =
      productFilters.length === 0 ||
      (data.boat?.products &&
        productFilters.some((filter) =>
          data.boat.products.some(
            (product) => product.name.toLowerCase() === filter
          )
        ));
    const matchesKindFilter =
      kindFilters.length === 0 || kindFilters.includes(kind?.toLowerCase());
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

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = sortedOffers.slice(offset, offset + ITEMS_PER_PAGE);

  // Log the current page data
  useEffect(() => {
    console.log("Pagination active items:", currentPageData);
  }, [currentPage, sortedOffers]);

  const [mobileFilterIsOpen, setMobileFilterIsOpen] = useState(false);

  return (
    <main className="!px-6 md:!px-10 pb-16 !mt-[9rem] lg:!mt-[5.5rem] relative">
      <Overlay
        isOpen={mobileFilterIsOpen}
        onClick={() => {
          setMobileFilterIsOpen(false);
        }}
      />

      <div className="flex gap-12 max-w-[1220px] mx-auto relative">
        <div
          className={cn(
            "max-lg:fixed max-lg:max-w-[450px] max-lg:translate-x-[300%] transition-all duration-300 ease-in-out max-lg:bottom-0 max-lg:min-h-dvh max-lg:z-[9999] max-lg:top-0 max-lg:right-0 max-lg:w-[90%] lg:w-[435px] lg:w[30%]  max-lg:overflow-scroll",
            {
              "max-lg:translate-x-[0]": mobileFilterIsOpen,
            }
          )}
        >
          <div
            onClick={() => {
              setMobileFilterIsOpen(false);
            }}
            className="lg:hidden absolute right-4 top-4"
          >
            <Icon iconType="cancel" className="w-7  text-black" />
          </div>
          <OfferApiFilter />
        </div>

        <div className="flex w-full lg:w-[calc(100%-435px)] items-center flex-col gap-1 md:gap-8 mx-auto max-w-[750px] relative">
          <div
            onClick={() => {
              setMobileFilterIsOpen(true);
            }}
            className="flex lg:hidden w-4/5 max-w-[400px] bg-white z-50 fixed top-24 left-1/2 -translate-x-1/2 items-center border border-primary rounded-xl w-"
          >
            <div className="py-2.5 px-3">
              <Icon
                iconType="search"
                className="w-5 text-primary
              "
              />
            </div>
            <p className="mb-0 w-full text-xs pr-3">
              Where would you like to cruise?
            </p>
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
              <p className="mb-0 text-black whitespace-nowrap">Sort by:</p>

              <Dropdown.Root modal={false}>
                <Dropdown.Trigger className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm">
                  <div>
                    {!sortOption ? "Default" : sortOption}
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
                  {sortOptions.map((option) => (
                    <Dropdown.Item
                      key={option.value}
                      className="block px-4 py-2 !bg-white text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left max-sm:text-sm"
                      onClick={() => setSortOption(option.value)}
                    >
                      {option.label}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Content>
              </Dropdown.Root>
            </div>
          </div>
          {!loading && sortedOffers.length === 0 && (
            <div className="flex flex-col gap-4">
              <p className="text-lg font-semibold mb-0 ">
                No results, please configure filters
              </p>
              <Button className="w-fit mx-auto">Get Quote</Button>
            </div>
          )}
          {loading && loadingCards}

          {!loading &&
            sortedOffers.length > 0 &&
            currentPageData.map((data, index) => {
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
          <ReactPaginate
            previousLabel={`${isMobile ? "←" : "← Previous"}`}
            nextLabel={`${isMobile ? "→" : "Next →"}`}
            pageCount={Math.ceil(sortedOffers.length / ITEMS_PER_PAGE)}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            marginPagesDisplayed={isMobile ? 1 : 2}
            pageRangeDisplayed={isMobile ? 2 : 5}
          />
        </div>
      </div>
    </main>
  );
}
