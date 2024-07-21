"use client";
import { vendorData } from "../../data/listing-details";
import GallaryBlock from "../../components/GallaryBlock/GallaryBlock";
import SubscriptionBlock from "../../components/SubscriptionBlock/SubscriptionBlock";

import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import YachtDetails, {
  YachtDetailsDataType,
} from "../../components/YachtDetails";
import SimilarYacht from "../../components/SimilarYacht/SimilarYacht";
import axios from "axios";
import { BOOKING_MANAGER_API_ROOT } from "../../helpers";
import useYachts from "../../hooks/useYachts";

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
    equipment: [
      "Automatic Pilot",
      "Deck Shower",
      "Outboard Motor",
      "Hot Water",
      "GPS",
      "Cockpit Table",
    ],
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
    equipment: [
      "Automatic Pilot",
      "Deck Shower",
      "Outboard Motor",
      "Hot Water",
      "GPS",
      "Cockpit Table",
    ],
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

// src/pages/yacht-details/[slug].tsx

const YachtDetailsPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const listing = YachtDetailsData[0];

  const [yacht, setYacht] = useState<any>();

  const { yachts } = useYachts();

  // Find the listing that matches the id when integrating
  // const listing = YachtDetailsData.find((listing) =>
  //   listing.title.toLowerCase().includes((slug as string).toLowerCase())
  // );

  async function getYachtDetails() {
    console.log(`Fetching yacht details for ${id}`);
    console.log(yachts);
    const yachtDetails = yachts.find((yacht) => yacht.id === Number(id));
    console.log(yachtDetails, yachts, id, "logging");

    setYacht(yachtDetails);
  }

  // console.log(yacht);

  useEffect(() => {
    if (yachts && id) getYachtDetails();
  }, [yachts, id]);

  console.log(yacht, "my yacht");

  if (!listing) {
    return <p>Listing not found</p>;
  }

  const isLoading = yacht === undefined;

  return (
    <>
      <div className="container-fluid relative !px-10 pt-20 w-full">
        {/* {yacht && (
          <GallaryBlock
            images={yacht.images.map((image: any) => {
              return image.url;
            })}
          />
        )} */}
        <YachtDetails details={yacht} loading={isLoading} />
        {/* {yacht && <YachtDetails details={yacht} />} */}
        <SimilarYacht />
      </div>
      {/* <SubscriptionBlock sectionClassName="3xl:!px-12 4xl:!px-12" /> */}
    </>
  );
};

export default YachtDetailsPage;
