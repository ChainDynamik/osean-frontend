"use client";
import ListingCard from "../../components/ListingCard/ListingCard";
import Section from "../../components/Section/Section";
import SeeMore from "../../components/ui/see-more";
import { topBoats } from "../../data/top-boats";

function BoatGrid() {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
      {topBoats.slice(0, 8).map((item, index) => (
        <ListingCard
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
      <div className="sub-page">
        <div className="page-header">
          <div className="img"></div>
          <div className="head-content container-fluid">
            <div className="container">
              <h1 className="page-title">Yachts</h1>

              <div className="breadcrumb">
                <a href="https://osean.online">Home</a> /
                <a className="current">Yatch</a>
              </div>
            </div>
          </div>
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
