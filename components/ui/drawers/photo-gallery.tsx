"use client";

// import { vendorData } from 'public/data/listing-details';
import Image from "next/image";
import Text from "../../typography/text";
import { vendorData } from "../../../data/listing-details";
import { useGalleryModalStore } from "../../../util/store";

export default function PhotoGallery() {
  const { gallary } = vendorData;
  const { isGalleryOpen, toggleGalleryModal } = useGalleryModalStore();

  return (
    <div className="fixed z-[99999999] top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <div className="min-h-full w-full bg-white">
        <div className="m-auto w-full max-w-4xl px-4 py-4 pb-20 sm:py-6 md:py-10 lg:px-0 lg:py-16">
          <Text tag="h3" className="md:!text-xl">
            Photo Gallery
          </Text>
          <div className="mt-6 columns-2 gap-x-2 lg:gap-x-3">
            {gallary.map((item, index) => (
              <div
                className="group relative mb-2 cursor-pointer overflow-hidden rounded-md transition-all duration-300 md:rounded-xl lg:mb-3"
                key={`gallery-img-${index}`}
                // onClick={() => openGallery('MODAL_GALLERY', index)}
              >
                <Image
                  src={item}
                  alt="gallery-img"
                  fill
                  className="!static object-cover"
                />
                <span className="absolute left-0 top-0 z-10 h-full w-full bg-gray-dark opacity-0 transition-all duration-200 group-hover:opacity-10"></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
