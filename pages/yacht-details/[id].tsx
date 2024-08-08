"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import GallaryBlock from "../../components/GallaryBlock/GallaryBlock";
import SubscriptionBlock from "../../components/SubscriptionBlock/SubscriptionBlock";
import YachtDetails from "../../components/YachtDetails";
import SimilarYacht from "../../components/SimilarYacht/SimilarYacht";
import useYachts from "../../hooks/useYachts";
import GridLayout from "../../components/GridLayout/GridLayout";
import ImageGridPreview from "../../components/ImageGridPreview/ImageGridPreview";
import { fetchBoatDataFromDb } from "../../helpers";
import axios from "axios";
import { Reservation } from "../offers";
import { useTripStore } from "../../util/store/tripStore";

const YachtDetailsPage: FC = () => {
  const router = useRouter();
  const { id, test } = router.query;

  const [yacht, setYacht] = useState<any>();

  const [offer, setOffer] = useState<Reservation | undefined>();

  const { tripStart, tripEnd, setTripStart, setTripEnd } = useTripStore();

  async function getYachtDetails() {
    console.log(`Fetching yacht details for ${id}`);

    const yachtDetails = await fetchBoatDataFromDb(id!.toString());

    // Format this URL for URL encoded query string

    // BACKEND https://www.booking-manager.com/api/v2/offers?dateFrom=2024-08-17T00%3A00%3A00&dateTo=2024-08-24T00%3A00%3A00

    console.log(`Date changed: ${tripStart?.toDateString()} - ${tripEnd?.toDateString()}`);

    // date format: yyyy-MM-ddTHH:mm:ss

    const tripStartStringFormat = tripStart?.toISOString();
    const tripEndStringFormat = tripEnd?.toISOString();

    const dateFromEncoded = encodeURIComponent(tripStartStringFormat as string);
    const dateToEncoded = encodeURIComponent(tripEndStringFormat as string);

    let queryString = `/api/fetchOffers?dateFrom=${dateFromEncoded}&dateTo=${dateToEncoded}`;

    console.log(queryString);

    const request = await axios.get(queryString, {
      headers: {
        Authorization: `Bearer ${process.env.BOOKING_MANAGER_API_KEY}`,
      },
    });
    // tsst
    const offers: Reservation[] = request.data;

    // Find the offers for this boatId

    const yachtOffers = offers.filter((offer) => offer.yachtId.toString() === id);

    console.log(yachtOffers);

    console.log(router);

    const isTestOrderEnabled = test === "true";

    if (isTestOrderEnabled) {
      console.log(`Test order enabled: ${isTestOrderEnabled}`);
      let queryString = `/api/fetchOffers?dateFrom=2024-08-17T00%3A00%3A00&dateTo=2024-08-24T00%3A00%3A00`;

      console.log(queryString);

      const request = await axios.get(queryString, {
        headers: {
          Authorization: `Bearer ${process.env.BOOKING_MANAGER_API_KEY}`,
        },
      });
      // tsst
      const offers: Reservation[] = request.data;
      const firstOffer = offers[0];
      firstOffer.startPrice = 2;
      firstOffer.price = 1;
      setOffer(firstOffer);
    } else {
      setOffer(yachtOffers[0]);
    }

    setYacht(yachtDetails);
  }

  useEffect(() => {
    if (id) getYachtDetails();
  }, [id, tripStart, tripEnd]);

  const isLoading = yacht === undefined || yacht.length === 0;

  const planImage = yacht?.images.find((image: any) => image.description === "Plan image")?.url || "";

  const mainImage = yacht?.images.find((image: any) => image.description === "Main image");
  const interiorImage = yacht?.images.find((image: any) => image.description === "Interior image");
  const otherImages = yacht?.images.filter(
    (image: any) => image.description !== "Main image" && image.description !== "Interior image"
  );

  const imagesToDisplay = [mainImage, interiorImage, ...(otherImages || [])]
    .filter(Boolean)
    .map((image: any) => image.url);

  const maxDisplay = 3; // Number of images to display initially
  const displayedImages = imagesToDisplay.slice(0, maxDisplay);
  const remainingCount = imagesToDisplay.length - maxDisplay;

  return (
    <>
      <div className="container-fluid relative !px-5 md:!px-10 pt-20 w-full max-w-[1280px]">
        <GallaryBlock
          loading={isLoading}
          images={imagesToDisplay.slice(0, 3)}
        />
        {/*  */}
        <ImageGridPreview images={yacht?.images.map((image: any) => image.url)}>
          <div className="flex gap-2 w-fit mx-auto mb-10 mt-4">
            {displayedImages.map((image, index) => (
              <div
                key={index}
                className="relative"
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded"
                />
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded">
                <span className="text-black text-sm">+{remainingCount}</span>
              </div>
            )}
          </div>
        </ImageGridPreview>
        {/*  */}
        <YachtDetails
          details={yacht}
          loading={isLoading}
          offer={offer}
        />
        <SimilarYacht />
        {/* {yacht?.images && (
          <GridLayout images={yacht?.images.map((image: any) => image.url)} />
        )} */}
      </div>
    </>
  );
};

export default YachtDetailsPage;
