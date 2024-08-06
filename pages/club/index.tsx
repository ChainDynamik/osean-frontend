"use client";
import Image from "next/image";
import YachtCard from "../../components/YachtCard/YachtCard";
import useYachts from "../../hooks/useYachts";
import ReserveOffer from "../../components/ReserveOffer/ReserveOffer";
import SailYourWay from "../../components/SailYourWay/SailYourWay";
import { useEffect, useState } from "react";
import useScreenSize from "../../util/hooks/useScreenSize";
import axios from "axios";
import { OfferWithBoat, Reservation } from "../offers";
import { fetchBoatDataFromDb } from "../../helpers";
import { Pagination } from "antd"; // Import Ant Design's Pagination component
import Icon from "../../components/icon-selector/icon-selector"; // Assuming the Icon component is available
import CurrencyDropdown from "../../components/CurrencyDropdown/CurrencyDropdown";
import dynamic from "next/dynamic";
import LoadingLottie from "../../assets/lottie/loading.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ITEMS_PER_PAGE = 12; // Number of items per page

function RandomBoatsGrid() {
  const { yachts } = useYachts();
  const [currentPage, setCurrentPage] = useState(1);
  const { isMobile } = useScreenSize();

  const [offersWithBoats, setOffersWithBoats] = useState<OfferWithBoat[]>([]);

  async function fetchOffers() {
    const dateFrom = "2024-11-17";
    const dateTo = "2024-11-24";

    let queryString = `/api/fetchOffers?dateFrom=${dateFrom}T00%3A00%3A00&dateTo=${dateTo}T00%3A00%3A00`;

    try {
      const request = await axios.get(queryString, {
        headers: {
          Authorization: `Bearer ${process.env.BOOKING_MANAGER_API_KEY}`,
        },
      });
      const offers: Reservation[] = request.data;
      offers.sort(() => Math.random() - 0.5);

      // Only take the first 9 offers
      offers.splice(9);

      let offersWithBoatBuffer: OfferWithBoat[] = [];

      for (const offer of offers) {
        const boatInfo = await fetchBoatDataFromDb(offer.yachtId.toString());
        offersWithBoatBuffer.push({ offer, boat: boatInfo });
      }

      setOffersWithBoats(offersWithBoatBuffer);
      console.log(offersWithBoatBuffer);
    } catch (error) {
      console.error("Error fetching offers:", error);
    } finally {
      // setLoading(false); // Set loading state to false after fetching
    }
  }

  useEffect(() => {
    fetchOffers();
  }, []);

  const getOrderedImages = (images: any) => {
    if (!images) return [];
    const mainImage = images.find(
      (image: any) => image.description === "Main image"
    );
    const interiorImage = images.find(
      (image: any) => image.description === "Interior image"
    );
    const otherImages = images.filter(
      (image: any) =>
        image.description !== "Main image" &&
        image.description !== "Interior image"
    );

    const orderedImages = [];
    if (mainImage) orderedImages.push(mainImage);
    if (interiorImage) orderedImages.push(interiorImage);
    orderedImages.push(...otherImages);

    return orderedImages.slice(0, 5).map((image) => image.url);
  };

  const isLoading = !yachts || yachts.length === 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentPageData = offersWithBoats?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Function to customize the pagination item rendering
  const itemRender = (
    _: number,
    type: "page" | "prev" | "next",
    originalElement: React.ReactNode
  ) => {
    if (type === "prev") {
      return (
        <a className="flex max-sm:py-2 hover:bg-primary group transition-all duration-300 ease-in-out items-center gap-1 px-2  border border-black/50 rounded-md">
          <div>
            <Icon
              iconType={"chevron"}
              className="rotate-90 w-4 text-black group-hover:!text-white transition-all duration-300 ease-in-out"
            />
          </div>
          <p className="mb-0 max-sm:hidden group-hover:!text-white transition-all duration-300 ease-in-out">
            Previous
          </p>
        </a>
      );
    }
    if (type === "next") {
      return (
        <a className="flex max-sm:py-2 hover:bg-primary group transition-all duration-300 ease-in-out items-center gap-1 px-2  border border-black/50 rounded-md">
          <p className="mb-0 max-sm:hidden group-hover:!text-white transition-all duration-300 ease-in-out">
            Next
          </p>
          <div>
            <Icon
              iconType={"chevron"}
              className="-rotate-90 w-4 text-black group-hover:!text-white transition-all duration-300 ease-in-out"
            />
          </div>
        </a>
      );
    }
    return originalElement;
  };

  return (
    <>
      {currentPageData.length < 1 && (
        <div className="flex mx-auto py-32 pb-40 justify-center items-center">
          <Lottie animationData={LoadingLottie} loop={true} className="w-80 " />
        </div>
      )}
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 3xl:gap-y-10">
        {currentPageData.length > 0 &&
          currentPageData?.map((item, index) => {
            const slides = getOrderedImages(item.boat?.images); // Get the ordered images

            const startPrice = item.offer?.startPrice;
            const currentPrice = item.offer?.price;

            const discountPercentage = Math.round(
              ((startPrice - currentPrice) / startPrice) * 100
            );

            console.log(item);

            return (
              <YachtCard
                id={item.boat?.bookingManagerId}
                loading={false}
                cabins={item.boat?.cabins}
                length={item.boat?.boatLength}
                berths={item.boat?.berths}
                base={item.boat?.homeBase}
                baseId={item.offer?.startBaseId}
                key={`single-boat-${index}`}
                slides={slides}
                title={item.boat?.kind}
                name={item.boat?.name}
                caption={item.boat?.model}
                slug="slug"
                location={item.boat?.homeBase}
                price={item.offer?.price + "€"}
                discount={discountPercentage}
                boatManufacturingDate={item.boat?.year?.toString()}
              />
            );
          })}
      </div>
      {currentPageData.length > 0 && (
        <div className="flex justify-center pt-8 items-center">
          <Pagination
            current={currentPage}
            total={offersWithBoats.length}
            pageSize={ITEMS_PER_PAGE}
            onChange={handlePageChange}
            showSizeChanger={false}
            itemRender={itemRender} // Use the custom item render function
          />
        </div>
      )}
    </>
  );
}

export default function TopBoatsPage() {
  return (
    <main className="mt-[2.5rem]">
      <div className="yacht-page-header lg:h-[calc(100vh-30px)] lg:max-h-[700px] h-fit w-full flex max-lg:items-center max-lg:justify-center">
        <div className="max-w-[1200px] mx-auto max-lg:pt-6 md:px-8 pb-8 flex items-end relative h-full w-full max-lg:items-center max-lg:justify-center max-lg:h-fit">
          <div className="flex w-full gap-8 max-lg:w-fit lg:items-end justify-between max-h-fit max-sm:w-[90%] items-center max-lg:flex-col">
            <ReserveOffer isRoute />
            <div>
              <Image
                height={200}
                width={400}
                quality={100}
                alt="discount banner"
                src="/discount-image.jpg"
                className="rounded-xl h-fit shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="py-16 mt-0 px-4 max-w-[1200px] mx-auto">
        <SailYourWay />

        <div className="mb-12 flex items-center justify-between">
          <div className="">
            <h3>Top Boat Rentals</h3>
            <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>
          </div>
          <CurrencyDropdown />
        </div>
        <RandomBoatsGrid />
      </section>
    </main>
  );
}
