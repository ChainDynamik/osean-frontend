"use client";

import { useEffect, useState } from "react";
import { topBoats } from "../../data/top-boats";
import { Reservation } from "../../pages/offers";
import { useLastReturnedOffersStore } from "../../util/store/lastReturnedOffersStore";
import Section from "../Section/Section";
import YachtCard from "../YachtCard/YachtCard";
import { fetchBoatsDataFromDb } from "../../helpers";
import { useMoralis } from "react-moralis";

type ReservationWithBoat = Reservation & {
  boat: any;
};

export default function SimilarYacht() {
  const { lastReturnedOffers } = useLastReturnedOffersStore();
  const [randomizedOffers, setRandomizedOffers] = useState<ReservationWithBoat[]>([]);

  const { isInitialized } = useMoralis();

  async function shuffleAndFetchBoats() {
    const shuffledOffers = lastReturnedOffers.sort(() => 0.5 - Math.random());
    const first4Offers = shuffledOffers.slice(0, 4);

    const boatDetails = await fetchBoatsDataFromDb(first4Offers.map((offer) => offer.yachtId));

    const boatDetailsWithOffers = first4Offers.map((offer, index) => ({
      ...offer,
      boat: boatDetails![index],
    }));

    setRandomizedOffers(boatDetailsWithOffers);

    console.log(boatDetails);
  }

  useEffect(() => {
    isInitialized && shuffleAndFetchBoats();
  }, [lastReturnedOffers, isInitialized]);

  if (lastReturnedOffers.length === 0) {
    return null;
  }

  return (
    <Section
      className="pt-5 xl:pt-7 pb-20"
      headerClassName="items-end gap-5"
      title="Similar yachts you may like"
      titleClassName="text-xl md:!text-[22px] 2xl:!text-2xl"
      // rightElement={<SeeMore className="hidden md:block" />}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 pt-7 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:gap-y-10">
        {randomizedOffers.slice(0, 5).map((item, index) => (
          <YachtCard
            key={item.boat.bookingManagerId}
            id={item.boat.bookingManagerId}
            loading={false}
            cabins={item.boat.cabins}
            length={item.boat.boatLength}
            berths={item.boat.berths}
            slides={item.boat.images.map((image: any) => image.url)}
            title={item.boat.kind}
            name={item.boat.name}
            caption={item.boat.model}
            slug="slug"
            location={item.boat.homeBase}
            price={item.boat.deposit + "€"}
            boatManufacturingDate={item.boat.year.toString()}
          />
        ))}
      </div>
    </Section>
  );
}
