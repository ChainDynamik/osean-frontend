"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import GallaryBlock from "../../components/GallaryBlock/GallaryBlock";
import SubscriptionBlock from "../../components/SubscriptionBlock/SubscriptionBlock";
import YachtDetails, { YachtDetailsDataType } from "../../components/YachtDetails";
import SimilarYacht from "../../components/SimilarYacht/SimilarYacht";
import useYachts from "../../hooks/useYachts";
import GridLayout from "../../components/GridLayout/GridLayout";
import ImageGridPreview from "../../components/ImageGridPreview/ImageGridPreview";

export const YachtDetailsData: YachtDetailsDataType[] = [
  {
    title: "SPORT CRUISER — OCEANIS 35 (2017)",
    guests: 12,
    cabins: 3,
    bathrooms: 2,
    description: `Do not miss the opportunity to board this magnificent oceanis 35.
  Finot-Conq's sharp-edged boat hull and the slightly displaced
  mast will offer you great balance and comfort on the one hand, and
  on the other excellent performance and great stability in
  navigation. The large space inside, consisting of a fitted kitchen,
  three double cabins and a bathroom with shower will ensure you
  maximum comfort while the two helm stations and the wide stern
  platform from which you can dive into the crystal clear waters of
  sardinia will simplify the conduct of the boat and facilitate the
  descent into the sea. Come and discover capo san marco, a promontory
  in the southern part of the sinis peninsula that can be reached in
  just 40 minutes by boat or take this opportunity to visit an ancient
  settlement such as a phoenician city founded in the 8th century BC.
  Furthermore, about 14 nautical miles from the tourist port of
  oristano, there is also mal di Ventre, in Sardinian Malu Etna, a
  small island facing the coast.`,
    equipment: ["Automatic Pilot", "Deck Shower", "Outboard Motor", "Hot Water", "GPS", "Cockpit Table"],
    specifications: [
      { label: "Engine Torque", value: "111 ft-lb" },
      { label: "Engine", value: "Milwaukee-Eight 107" },
      {
        label: "Fuel System",
        value: "Electronic Sequential Port Fuel Injection (ESPFI)",
      },
      { label: "Bore x Stroke", value: "3.937 in. x 4.375 in." },
      {
        label: "Infotainment System (2018 model or newer)",
        value: "Boom Box 4.3",
      },
    ],
    owner: {
      name: "Fabio Jaction",
      rating: "★★★★☆",
      reviewsCount: 35,
      memberSince: "Jan 2014",
      responseRate: "More than 85%",
      languages: "English & Italian",
      responseTime: "Within an hour",
    },
    totalReview: 35,
    averageRating: 4.5,
    price: 700,
  },
  {
    title: "SPORT CRUISER — OCEANIS 35 (2017)",
    guests: 12,
    cabins: 3,
    bathrooms: 2,
    description: `Do not miss the opportunity to board this magnificent oceanis 35.
  Finot-Conq's sharp-edged boat hull and the slightly displaced
  mast will offer you great balance and comfort on the one hand, and
  on the other excellent performance and great stability in
  navigation. The large space inside, consisting of a fitted kitchen,
  three double cabins and a bathroom with shower will ensure you
  maximum comfort while the two helm stations and the wide stern
  platform from which you can dive into the crystal clear waters of
  sardinia will simplify the conduct of the boat and facilitate the
  descent into the sea. Come and discover capo san marco, a promontory
  in the southern part of the sinis peninsula that can be reached in
  just 40 minutes by boat or take this opportunity to visit an ancient
  settlement such as a phoenician city founded in the 8th century BC.
  Furthermore, about 14 nautical miles from the tourist port of
  oristano, there is also mal di Ventre, in Sardinian Malu Etna, a
  small island facing the coast.`,
    equipment: ["Automatic Pilot", "Deck Shower", "Outboard Motor", "Hot Water", "GPS", "Cockpit Table"],
    specifications: [
      { label: "Engine Torque", value: "111 ft-lb" },
      { label: "Engine", value: "Milwaukee-Eight 107" },
      {
        label: "Fuel System",
        value: "Electronic Sequential Port Fuel Injection (ESPFI)",
      },
      { label: "Bore x Stroke", value: "3.937 in. x 4.375 in." },
      {
        label: "Infotainment System (2018 model or newer)",
        value: "Boom Box 4.3",
      },
    ],
    owner: {
      name: "Fabio Jaction",
      rating: "★★★★☆",
      reviewsCount: 35,
      memberSince: "Jan 2014",
      responseRate: "More than 85%",
      languages: "English & Italian",
      responseTime: "Within an hour",
    },
    totalReview: 35,
    averageRating: 4.5,
    price: 700,
  },
];

const YachtDetailsPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const listing = YachtDetailsData[0];

  const [yacht, setYacht] = useState<any>();

  const { yachts } = useYachts();

  async function getYachtDetails() {
    console.log(`Fetching yacht details for ${id}`);
    const yachtDetails = yachts.find((yacht) => yacht.id === Number(id));
    console.log(yachtDetails, yachts, id, "logging");

    setYacht(yachtDetails);
  }

  useEffect(() => {
    if (yachts && id) getYachtDetails();
  }, [yachts, id]);

  if (!listing) {
    return <p>Listing not found</p>;
  }

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
      <div className="container-fluid relative !px-5 md:!px-10 pt-20 w-full max-w-[1200px]">
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
