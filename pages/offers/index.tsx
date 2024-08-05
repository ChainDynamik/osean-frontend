"use client";
import { useEffect, useState } from "react";
import axios from "axios";
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
import useScreenSize from "../../util/hooks/useScreenSize";
import { useMoralis } from "react-moralis";
import { useLastReturnedOffersStore } from "../../util/store/lastReturnedOffersStore";
import CurrencyDropdown from "../../components/CurrencyDropdown/CurrencyDropdown";
import { getModelFromYachtId } from "../../const/boat-models";
import { format } from "date-fns";
import { Pagination } from "antd"; // Import Ant Design's Pagination component

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

export type Reservation = {
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

export type OfferWithBoat = {
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
  const [currentPage, setCurrentPage] = useState(1);
  const { isMobile } = useScreenSize();

  const { setLastReturnedOffers } = useLastReturnedOffersStore();

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
    boatModels,
  } = useOfferApiFilterState();
  const minCabins = useOfferApiFilterState((state) => state.minCabins);
  const setMinCabins = useOfferApiFilterState((state) => state.setMinCabins);
  const { tripStart, tripEnd } = useTripStore();

  async function fetchOffers() {
    const dateFrom = format(tripStart, "yyyy-MM-dd");
    const dateTo = format(tripEnd, "yyyy-MM-dd");

    let queryString = `/api/fetchOffers?dateFrom=${dateFrom}T00%3A00%3A00&dateTo=${dateTo}T00%3A00%3A00`;

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
      queryString += `&minYearOfBuild=${minYear}`;
    }
    if (maxYear) {
      queryString += `&maxYearOfBuild=${maxYear}`;
    }
    if (productFilters) {
      queryString += `&productName=${productFilters}`;
    }
    if (kindFilters.length > 0) {
      queryString += `&kind=${kindFilters.join(",")}`;
    }
    if (passengersOnBoard) {
      queryString += `&passengersOnBoard=${passengersOnBoard}`;
    }
    if (minCabins) {
      queryString += `&minCabins=${minCabins}`;
    }
    if (countries.length > 0) {
      for (const country of countries) {
        if (!isNaN(Number(country))) {
          queryString += `&baseFromId=${country}`;
        } else queryString += `&country=${countries.join(",")}`;
      }
    }
    console.log(queryString, "new query");

    try {
      const request = await axios.get(queryString, {
        headers: {
          Authorization: `Bearer ${process.env.BOOKING_MANAGER_API_KEY}`,
        },
      });
      const offers: Reservation[] = request.data;
      console.log(offers, "my offers");

      setOffers(offers);
      setLastReturnedOffers(offers);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (yachts.length) fetchOffers();
    console.log("query string again");
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
    kindFilters.length,
    passengersOnBoard,
    countries,
    minCabins,
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
      startBaseId: offer?.startBaseId,
      endBase: offer?.endBase,
      price: offer?.price,
      startPrice: offer?.startPrice,
      currency: offer?.currency,
      dateFrom: offer?.dateFrom,
      dateTo: offer?.dateTo,
      kind: boat?.kind,
      rawOffer: offer,
    };
  };

  const filteredOffers = offers.filter((data) => {
    const withinPriceRange = +data.price >= priceRange[0];
    const withinPriceMaxRange = +data.price <= priceRange[1];
    const boatModel = getModelFromYachtId(data.yachtId.toString());
    const isBoatModelSelected =
      boatModels.length === 0 || boatModels.includes(boatModel);

    return withinPriceRange && withinPriceMaxRange && isBoatModelSelected;
  });

  const sortedOffers = [...filteredOffers].sort((a, b) => {
    if (sortOption === "lowestPrice") {
      return a.price - b.price;
    }
    if (sortOption === "highestPrice") {
      return b.price - a.price;
    }
    return 0;
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentPageData = sortedOffers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
          <div className="flex flex-col w-full mb-2">
            <div className="flex w-full ml-auto justify-between items-center !mb-6 gap-4 flex-wrap">
              <p className="mb-0">{sortedOffers.length} Boats</p>
              <div className="flex gap-4 items-center">
                <p className="mb-0 text-black whitespace-nowrap">Sort by:</p>

                <Dropdown.Root modal={false}>
                  <Dropdown.Trigger className="inline-flex justify-between capitalize rounded-md border border-gray-300 shadow-sm px-3 py-1 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-sm w-fit">
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
                        onClick={() => setSortOption(option.value)}
                      >
                        {option.label}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Content>
                </Dropdown.Root>
                <CurrencyDropdown />
              </div>
            </div>
            <div className="mr-auto">
              Previewing Yachts Available from{"  "}
              <span className="text-primary font-bold mx-2">
                {format(new Date(tripStart), "MMM dd, yyyy")}
              </span>{" "}
              to {"  "}
              <span className="text-primary font-bold ml-2">
                {format(new Date(tripEnd), "MMM dd, yyyy")}
              </span>
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
              const offerObject = data;

              const offerBoatObject = mapOfferToProps(offerObject);

              return (
                <OffersCard
                  filterCabins={minCabins}
                  key={index}
                  loading={false}
                  {...offerBoatObject}
                />
              );
            })}
          <Pagination
            current={currentPage}
            total={sortedOffers.length}
            pageSize={ITEMS_PER_PAGE}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </div>
      </div>
    </main>
  );
}
