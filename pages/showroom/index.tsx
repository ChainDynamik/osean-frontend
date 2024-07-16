"use client";
import Image from "next/image";
import Section from "../../components/Section/Section";
import { topBoats } from "../../data/top-boats";
import YachtCard from "../../components/YachtCard/YachtCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { BOOKING_MANAGER_API_ROOT } from "../../helpers";
import { BookingManagerYacht } from "../../types/booking-manager/core";
import useYachts from "../../hooks/useYachts";

function BoatGrid() {
  const { boats } = useYachts();

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
      {boats.map((item, index) => (
        <YachtCard
          key={item.id.toString()}
          id={"boat_" + item.id.toString()}
          slides={item.images.map((image) => image.url)}
          title={item.name}
          caption={item.kind}
          slug="slug"
          location={item.homeBase}
          price={item.deposit + "€"}
          boatManufacturingDate={item.year.toString()}
        />
      ))}
    </div>
  );
}

export default function TopBoatsPage() {
  return (
    <main className="!px-10 mt-[7.5rem]">
      <div className="yacht-page-header relative h-[500px] w-full">
        <div className="absolute right-0 bottom-0">
          <Image
            height={200}
            width={400}
            alt="discount banner"
            src="/discounts.jpg"
          />
        </div>
      </div>

      <Section
        className="group/section container-fluid pt-[2rem] !px-0 mt-4 overflow-hidden lg:mt-16"
        title="Top boat rentals"
        description="Unsatiable it considered invitation he traveling insensible."
        headerClassName="items-end mb-4 md:mb-5 xl:mb-6 gap-5"
        // rightElement={<SeeMore />}
      >
        {/* {!state && <ListingCardLoader />} */}
        {/* {state && <BoatGrid />}
         */}
        <BoatGrid />
      </Section>
    </main>
  );
}
