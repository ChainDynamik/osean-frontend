"use client";
import Image from "next/image";
import YachtCard from "../../components/YachtCard/YachtCard";
import useYachts from "../../hooks/useYachts";
import ReserveOffer from "../../components/ReserveOffer/ReserveOffer";
import SailYourWay from "../../components/SailYourWay/SailYourWay";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import useScreenSize from "../../util/hooks/useScreenSize";

const ITEMS_PER_PAGE = 12; // Number of items per page

function BoatGrid() {
  const { yachts } = useYachts();
  const [currentPage, setCurrentPage] = useState(0);
  const { isMobile } = useScreenSize();

  const getOrderedImages = (images: any) => {
    const mainImage = images.find((image: any) => image.description === "Main image");
    const interiorImage = images.find((image: any) => image.description === "Interior image");
    const otherImages = images.filter(
      (image: any) => image.description !== "Main image" && image.description !== "Interior image"
    );

    const orderedImages = [];
    if (mainImage) orderedImages.push(mainImage);
    if (interiorImage) orderedImages.push(interiorImage);
    orderedImages.push(...otherImages);

    return orderedImages.slice(0, 5).map((image) => image.url);
  };

  const isLoading = !yachts || yachts.length === 0;

  const loadingCards = Array.from({ length: 8 }, (_, index) => (
    <YachtCard
      key={index}
      loading={true}
      cabins={0}
      berths={0}
      id={index}
      slides={[]}
      title=""
      caption=""
      slug=""
      location=""
      price=""
      boatManufacturingDate=""
    />
  ));

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * ITEMS_PER_PAGE;
  const currentPageData = yachts?.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 3xl:gap-y-10">
        {isLoading
          ? loadingCards
          : currentPageData?.map((item) => {
              const slides = getOrderedImages(item.images); // Get the ordered images

              return (
                <YachtCard
                  loading={false}
                  cabins={item.cabins}
                  length={item.length}
                  berths={item.berths}
                  key={item.id}
                  id={item.id}
                  slides={slides}
                  title={item.kind}
                  name={item.name}
                  caption={item.model}
                  slug="slug"
                  location={item.homeBase}
                  price={item.deposit + "€"}
                  boatManufacturingDate={item.year.toString()}
                />
              );
            })}
      </div>
      {!isLoading && (
        <div className="flex justify-center pt-8 items-center">
          <ReactPaginate
            previousLabel={`${isMobile ? "←" : "← Previous"}`}
            nextLabel={`${isMobile ? "→" : "Next →"}`}
            pageCount={Math.ceil(yachts.length / ITEMS_PER_PAGE)}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
            marginPagesDisplayed={isMobile ? 1 : 2}
            pageRangeDisplayed={isMobile ? 2 : 5}
          />
        </div>
      )}
    </>
  );
}

export default function TopBoatsPage() {
  return (
    <main className="mt-[2.5rem] md:mt-[2.5rem]">
      <div className="yacht-page-header h-[calc(100vh-30px)]  md:h-[calc(100vh-65px)] w-full flex max-lg:items-center max-lg:justify-center">
        <div className="max-w-[1200px] mx-auto max-lg:pt-6 md:px-8 pb-8 flex items-end relative h-full w-full max-lg:items-center max-lg:justify-center max-lg:h-fit">
          <div className="flex w-full gap-8 max-lg:w-fit max-lg:items-center justify-between max-h-fit max-sm:w-[90%] items-end max-lg:flex-col">
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

        {/* <div className="mb-12">
          <h3>Top Boat Rentals</h3>
          <p>Unsatiable It Considered Invitation He Traveling Insensible.</p>
        </div>
        <BoatGrid /> */}
      </section>
    </main>
  );
}
