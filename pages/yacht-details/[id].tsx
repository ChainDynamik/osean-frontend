"use client";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import GallaryBlock from "../../components/GallaryBlock/GallaryBlock";
import SubscriptionBlock from "../../components/SubscriptionBlock/SubscriptionBlock";
import YachtDetails from "../../components/YachtDetails";
import SimilarYacht from "../../components/SimilarYacht/SimilarYacht";
import useYachts from "../../hooks/useYachts";
import GridLayout from "../../components/GridLayout/GridLayout";
import ImageGridPreview from "../../components/ImageGridPreview/ImageGridPreview";
import { fetchBoatDataFromDb } from "../../helpers";

const YachtDetailsPage: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [yacht, setYacht] = useState<any>();

  async function getYachtDetails() {
    console.log(`Fetching yacht details for ${id}`);

    const yachtDetails = await fetchBoatDataFromDb(id!.toString());

    setYacht(yachtDetails);
  }

  useEffect(() => {
    if (id) getYachtDetails();
  }, [id]);

  const isLoading = yacht === undefined || yacht.length === 0;

  const planImage = yacht?.images.find((image: any) => image.description === "Plan image")?.url || "";

  const mainImage = yacht?.images.find((image: any) => image.description === "Main image");
  const interiorImage = yacht?.images.find((image: any) => image.description === "Interior image");
  const otherImages = yacht?.images.filter(
    (image: any) => image.description !== "Main image" && image.description !== "Interior image"
  );

  const imagesToDisplay = [mainImage, interiorImage, ...(otherImages || [])]
    .filter(Boolean)
    .map((image: any) => image.url);

  const maxDisplay = 3; // Number of images to display initially
  const displayedImages = imagesToDisplay.slice(0, maxDisplay);
  const remainingCount = imagesToDisplay.length - maxDisplay;

  return (
    <>
      <div className="container-fluid relative !px-5 md:!px-10 pt-20 w-full max-w-[1280px]">
        <GallaryBlock
          loading={isLoading}
          images={imagesToDisplay.slice(0, 3)}
        />
        {/*  */}
        <ImageGridPreview images={yacht?.images.map((image: any) => image.url)}>
          <div className="flex gap-2 w-fit mx-auto mb-10 mt-4">
            {displayedImages.map((image, index) => (
              <div
                key={index}
                className="relative"
              >
                <img
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded"
                />
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="relative flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 bg-gray-200 rounded">
                <span className="text-black text-sm">+{remainingCount}</span>
              </div>
            )}
          </div>
        </ImageGridPreview>
        {/*  */}
        <YachtDetails
          details={yacht}
          loading={isLoading}
        />
        <SimilarYacht />
        {/* {yacht?.images && (
          <GridLayout images={yacht?.images.map((image: any) => image.url)} />
        )} */}
      </div>
    </>
  );
};

export default YachtDetailsPage;
