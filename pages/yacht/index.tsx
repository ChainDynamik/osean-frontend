"use client";
import Image from "next/image";
import Section from "../../components/Section/Section";
import { topBoats } from "../../data/top-boats";
import YachtCard from "../../components/YachtCard/YachtCard";

function BoatGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
      {topBoats.slice(0, 8).map((item, index) => (
        <YachtCard
          key={`top-boat-grid-${index}`}
          {...item}
          id={`top-boat-grid-${index}`}
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
