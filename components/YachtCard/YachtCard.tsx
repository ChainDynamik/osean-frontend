"use client";

import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";

import {
  Swiper,
  SwiperSlide,
  Navigation,
  Pagination,
} from "../../util/libs/slider";
import AddToWishlist from "../../assets/icons-components/add-to-wishlist";
import { ChevronLeftIcon } from "../../assets/icons-components/chevronLeft";
import { ChevronRightIcon } from "../../assets/icons-components/chevronRight";
import ActionIcon from "../../assets/icons-components/action-icon";

export type ListingItemTypes = {
  id: number;
  slides: string[];
  caption: string;
  title: string;
  slug: string;
  location: string;
  price: string;
  cabins: number;
  berths: number;
  boatManufacturingDate: string;
};

export default function YachtCard({
  id,
  slides,
  caption,
  title,
  location,
  price,
  boatManufacturingDate,
  cabins,
  berths,
}: ListingItemTypes) {
  console.log(price, "id of yacht");

  return (
    <div className="listing-card shadow-card ring-offset-2 hover:bg-primary/15 ring-primary hover:ring-1 transition-all duration-300 ease-in-out border-[1px] border-black/20 rounded-xl px-2.5 group/item relative inline-flex w-full flex-col">
      <div className="relative w-full overflow-hidden rounded-xl">
        {/* <AddToWishlist
          isWishListed={false}
          onClick={(data) => console.log("Item added to Wishlist.", data)}
        /> */}
        <div className="listing-item after:absolute after:bottom-0 after:left-0 after:z-[1] after:h-1/4 after:w-full after:bg-gradient-to-t after:from-black/25">
          <Swiper
            className="!static"
            modules={[Pagination, Navigation]}
            pagination={{
              clickable: true,
            }}
            loop
            slidesPerView={1}
            navigation={{
              nextEl: `.boat_${id}-listing-item-button-next`,
              prevEl: `.boat_${id}-listing-item-button-prev`,
            }}
          >
            {slides?.map((slide, index) => (
              <SwiperSlide key={`slide-${index}`}>
                <Image
                  className="aspect-[34/20] pt-2 !rounded-[0.5rem] aspectvideo bg-gray-lighter"
                  src={slide}
                  width={816}
                  height={600}
                  alt="boat"
                  priority
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            onClick={() => {
              console.log("I was clicked");
            }}
            className={clsx(
              `!border-gray-200 !bg-gray-100 !text-gray-400 cursor-pointer px-2.5 py-2 aspect-square rounded-full boat_${id}-listing-item-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 opacity-80 shadow-md !transition-all duration-300 focus:!ring-0 items-center justify-center md:flex md:group-hover/item:opacity-100`
            )}
          >
            <div>
              <ChevronLeftIcon className="-mr-0.5 text-black h-auto w-[7px]" />
            </div>{" "}
          </div>
          {/*  */}
          <div
            onClick={() => {
              console.log("I was clicked");
            }}
            className={clsx(
              ` !border-gray-200 !bg-gray-100 !text-gray-400 cursor-pointer px-2.5 py-2 aspect-square rounded-full boat_${id}-listing-item-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 opacity-80 shadow-md !transition-all duration-300 focus:!ring-0 items-center justify-center md:flex md:group-hover/item:opacity-100`
            )}
          >
            <div>
              <ChevronRightIcon className="-mr-0.5 text-black h-auto w-[7px]" />
            </div>{" "}
          </div>
        </div>
      </div>
      {/*  */}
      <Link href={`/yacht-details/${id}`}>
        <div className="content pt-3 text-black">
          <div className=" text-blue-800 text-lg mb-0.5 flex items-center gap-5">
            <span className="font-bold">
              {caption} ({boatManufacturingDate})
            </span>
          </div>
          <h4 className="text-ellipsis mb-0.5 text-gray-dark !text-lg 2xl:mb-1.5">
            {title}
          </h4>
          <div className="flex gap-3 items-center">
            <p className="mb-0 text-black ">{cabins} cabins</p>{" "}
            <span className="bg-gray-400 rounded-full size-1.5"></span>
            <p className="mb-0 text-black ">{berths} berths</p>
            <span className="bg-gray-400 rounded-full size-1.5"></span>
            <p className="mb-0 text-black ">37 ft</p>
          </div>
          {/* <p className="mb-3 text-gray-light xl:mb-3">{location}</p> */}
          <div className="flex mt-2 flex-wrap items-center justify-between gap-3">
            <p className="text-gray-light">
              <span className="inline-block mr-1.5">From</span>
              <span className="font-bold text-black xl:text-xl 3xl:text-xl">
                {price}
              </span>{" "}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
