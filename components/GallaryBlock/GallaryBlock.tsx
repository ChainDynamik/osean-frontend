"use client";

import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PreviewImage from "../PreviewImage/PreviewImage";

interface GallaryBlockProps {
  images: string[];
  loading: boolean;
}

export default function GallaryBlock({ images, loading }: GallaryBlockProps) {
  // Determine how many images to show based on the screen size
  const displayCount = images.length > 3 ? 3 : images.length;

  return (
    <div className="relative -mx-4 mb-8 sm:-mx-6 md:-mx-0 md:mt-4 lg:mb-8 lg:mt-6">
      <div className="grid h-[260px] grid-cols-1 grid-rows-2 gap-0 overflow-hidden transition-all duration-300 sm:h-[320px] md:h-[400px] md:grid-cols-[1fr_0.5fr] md:gap-1 md:rounded-xl lg:h-[500px] xl:h-[600px] xl:gap-2 3xl:h-[700px] 3xl:gap-3">
        {images.slice(0, displayCount).map((image, index) => (
          <div
            key={index}
            className={`relative h-full cursor-pointer ${
              index === 0 ? "row-start-1 row-end-3" : ""
            } ${index === 0 ? "" : "hidden md:block"}`}
          >
            {loading ? (
              <Skeleton height="100%" width="100%" />
            ) : (
              <PreviewImage src={image}>
                <Image
                  src={image}
                  alt={`pic-${index}`}
                  fill
                  priority
                  sizes="(min-width: 320px) 100vw, 100vw"
                  className="object-cover"
                />
              </PreviewImage>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
