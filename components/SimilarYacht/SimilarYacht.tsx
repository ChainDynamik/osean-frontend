"use client";

import { topBoats } from "../../data/top-boats";
import Section from "../Section/Section";
import SeeMore from "../ui/see-more";
import YachtCard from "../YachtCard/YachtCard";

export default function SimilarYacht() {
  return (
    <Section
      className="pt-5 xl:pt-7"
      headerClassName="items-end gap-5"
      title="Similar yachts you may like"
      titleClassName="text-xl md:!text-[22px] 2xl:!text-2xl"
      // rightElement={<SeeMore className="hidden md:block" />}
    >
      <div className="grid grid-cols-1 gap-x-5 gap-y-8 pt-7 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 3xl:gap-y-10">
        {topBoats.slice(5, 9).map((item, index) => (
          <YachtCard
            key={`top-boat-grid-${index}`}
            {...item}
            id={`top-boat-grid-${index}`}
          />
        ))}
      </div>
    </Section>
  );
}
