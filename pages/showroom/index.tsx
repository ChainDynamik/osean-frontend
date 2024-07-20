"use client";
import Image from "next/image";
import Section from "../../components/Section/Section";
import YachtCard from "../../components/YachtCard/YachtCard";
import useYachts from "../../hooks/useYachts";
import OfferFilter from "../../components/OfferFilter/OfferFilter";

// function BoatGrid() {
//   const { yachts } = useYachts();

//   console.log(yachts);

//   return (
//     <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
//       {yachts?.map((item, index) => {
//         const slides = item.images.slice(0, 5).map((image) => image.url);

//         return (
//           <YachtCard
//             key={item.id}
//             id={item.id}
//             slides={slides}
//             // slides={item.images.map((image) => image.url)}
//             title={item.name}
//             caption={item.kind}
//             slug="slug"
//             location={item.homeBase}
//             price={item.deposit + "€"}
//             boatManufacturingDate={item.year.toString()}
//           />
//         );
//       })}
//     </div>
//   );
// }

function BoatGrid() {
  const { yachts } = useYachts();

  console.log(yachts);

  const getOrderedImages = (images) => {
    const mainImage = images.find(
      (image) => image.description === "Main image"
    );
    const interiorImage = images.find(
      (image) => image.description === "Interior image"
    );
    const otherImages = images.filter(
      (image) =>
        image.description !== "Main image" &&
        image.description !== "Interior image"
    );

    const orderedImages = [];
    if (mainImage) orderedImages.push(mainImage);
    if (interiorImage) orderedImages.push(interiorImage);
    orderedImages.push(...otherImages);

    return orderedImages.slice(0, 5).map((image) => image.url);
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:gap-y-10">
      {yachts?.map((item) => {
        const slides = getOrderedImages(item.images); // Get the ordered images
        console.log(item, "details");

        return (
          <YachtCard
            cabins={item.cabins}
            berths={item.berths}
            key={item.id}
            id={item.id}
            slides={slides}
            title={item.name}
            caption={item.kind}
            slug="slug"
            location={item.homeBase}
            price={item.deposit + "€"}
            boatManufacturingDate={item.year.toString()}
          />
        );
      })}
    </div>
  );
}

export default function TopBoatsPage() {
  return (
    <main className="!px-10 mt-[5.5rem]">
      <div className="yacht-page-header flex items-center  relative h-[calc(100vh-110px)] w-full">
        <OfferFilter isRoute className="absolute left-8 bottom-8" />
        {/* <BookingForm /> */}
        <div className="absolute right-0 bottom-0">
          <Image
            height={200}
            width={400}
            alt="discount banner"
            src="/discounts.jpg"
          />
        </div>
      </div>
      <section className="py-16 mt-2 px-4">
        <div className="mb-10">
          <h3>Top Boat Rentals</h3>
          <p>
            Unsatiable It Considered Invitation He Traveling Insensible.
          </p>{" "}
        </div>
        <BoatGrid />
      </section>
    </main>
  );
}
