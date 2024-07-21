"use client";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface GallaryBlockProps {
  images: string[];
  loading: boolean;
}

export default function GallaryBlock({ images, loading }: GallaryBlockProps) {
  return (
    <div className="relative -mx-4 mb-8 sm:-mx-6 md:-mx-0 md:mt-4 lg:mb-14 lg:mt-6">
      <div className="grid h-[260px] grid-cols-1 grid-rows-2 gap-0 overflow-hidden transition-all duration-300 sm:h-[320px] md:h-[400px] md:grid-cols-[1fr_0.5fr] md:gap-1 md:rounded-xl lg:h-[500px] xl:h-[600px] xl:gap-2 3xl:h-[700px] 3xl:gap-3">
        <div className="relative row-start-1 row-end-3 h-full cursor-pointer">
          {loading ? (
            <Skeleton height="100%" width="100%" />
          ) : (
            <Image
              src={images[0]}
              alt="pic"
              fill
              priority
              sizes="(min-width: 320) 100vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div className="relative hidden h-full cursor-pointer md:block">
          {loading ? (
            <Skeleton height="100%" width="100%" />
          ) : (
            <Image
              src={images[1]}
              alt="pic"
              fill
              priority
              sizes="(min-width: 320) 100vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
        <div className="relative hidden h-full cursor-pointer md:block">
          {loading ? (
            <Skeleton height="100%" width="100%" />
          ) : (
            <Image
              src={images[2]}
              alt="pic"
              fill
              priority
              sizes="(min-width: 320) 100vw, 100vw"
              className="object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
