"use client";

// import SpecificationBlock from '@/components/listing-details/specification-block';
// import BookingForm from "@/components/listing-details/booking-form/booking-form";
// import CalenderBlock from "@/components/listing-details/calendar/calender-block";
// import ListingDetailsHeroBlock from "@/components/listing-details/hero-block";
// import DescriptionBlock from "@/components/listing-details/descripton-block";
// import EquipmentBlock from "@/components/listing-details/equipment-block";
// import LocationBlock from "@/components/listing-details/location-block";
// import ReviewBlock from "@/components/listing-details/review-block";
// import VendorBlock from "@/components/listing-details/vendor-block";
// import ChatBlock from "@/components/listing-details/chat-block";
// import { useModal } from "@/components/modals/context";
// import Button from "@/components/ui/button";
import { vendorData } from "../../data/listing-details";
import { reviewsData } from "../../data/reviews";
import BookingForm from "../BookingForm/BookingForm";
import Button from "../Button/Button";
import SpecificationBlock from "../SpecificationBlock/SpecificationBlock";

export default function ListingDetails() {
  //   const { openModal } = useModal();
  return (
    <div className="flex justify-between gap-5 lg:gap-8 xl:gap-12 4xl:gap-16">
      {/* <div className="w-full">
          <ListingDetailsHeroBlock vendor={vendorData.vendor} />
          <DescriptionBlock description={vendorData.description} />
          <EquipmentBlock equipment={vendorData.equipment} />
          <SpecificationBlock specifications={vendorData.specifications} />
          <VendorBlock stats={reviewsData.stats} vendor={vendorData.vendor} />
          <LocationBlock />
          <CalenderBlock />
          <ReviewBlock reviewsData={reviewsData} />
          <ChatBlock />
        </div> */}
      <div className="w-full">
        <div className="mx-auto py-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              SPORT CRUISER — OCEANIS 35 (2017)
            </h1>
            <p className="text-lg">12 guests • 3 cabins • 2 bathrooms</p>
          </div>
          <p className="mb-6">
            Do not miss the opportunity to board this magnificent oceanis 35.
            Finot-Conq's sharp-edged boat hull and the slightly displaced mast
            will offer you great balance and comfort on the one hand, and on the
            other excellent performance and great stability in navigation. The
            large space inside, consisting of a fitted kitchen, three double
            cabins and a bathroom with shower will ensure you maximum comfort
            while the two helm stations and the wide stern platform from which
            you can dive into the crystal clear waters of sardinia will simplify
            the conduct of the boat and facilitate the descent into the sea.
            Come and discover capo san marco, a promontory in the southern part
            of the sinis peninsula that can be reached in just 40 minutes by
            boat or take this opportunity to visit an ancient settlement such as
            a phoenician city founded in the 8th century BC. Furthermore, about
            14 nautical miles from the tourist port of oristano, there is also
            mal di Ventre, in Sardinian Malu Etna, a small island facing the
            coast.
          </p>
          <div>
            <h2 className="text-2xl font-semibold mb-4">On Board Equipment</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <span className="inline-block w-6 h-6 bg-gray-200"></span>
                <span>Automatic Pilot</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-6 h-6 bg-gray-200"></span>
                <span>Deck Shower</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-6 h-6 bg-gray-200"></span>
                <span>Outboard Motor</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-6 h-6 bg-gray-200"></span>
                <span>Hot Water</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-6 h-6 bg-gray-200"></span>
                <span>GPS</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-block w-6 h-6 bg-gray-200"></span>
                <span>Cockpit Table</span>
              </div>
            </div>
          </div>
        </div>
        {/* Specifications Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-t">
                <td className="py-2">Engine Torque</td>
                <td className="py-2">111 ft-lb</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">Engine</td>
                <td className="py-2">Milwaukee-Eight 107</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">Fuel System</td>
                <td className="py-2">
                  Electronic Sequential Port Fuel Injection (ESPFI)
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-2">Bore x Stroke</td>
                <td className="py-2">3.937 in. x 4.375 in.</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">
                  Infotainment System (2018 model or newer)
                </td>
                <td className="py-2">Boom Box 4.3</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2 text-blue-600 cursor-pointer">View more</div>
        </div>

        {/*  */}
        {/* Owner Info Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Owner Info</h2>
          <div className="flex flex-col gap-10">
            <div className="flex gap-4 itemscenter">
              <img
                src="/avatar.jpg"
                alt="Owner"
                className="w-16 h-16 rounded-full"
              />
              <div className="flex flex-col">
                <p className="font-semibold !mb-0">Fabio Jaction</p>
                <div className="flex items-center">
                  <span className="text-yellow-500">★★★★☆</span>
                  <span className="ml-2 text-gray-600">(35)</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              {/* <div className="flex items-center"></div> */}
              <p className="text-gray-600">Member since: Jan 2014</p>
              <p className="text-gray-600">Response rate: More than 85%</p>
              <p className="text-gray-600">
                Languages spoken: English & Italian
              </p>
              <p className="text-gray-600">Response time: Within an hour</p>
            </div>
            <Button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">
              Send a message
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden w-full max-w-sm pb-11 lg:block xl:max-w-md 3xl:max-w-lg">
        <div className="sticky right-0 top-28 4xl:top-40">
          <BookingForm
            price={vendorData.price}
            averageRating={reviewsData.stats.averageRating}
            totalReviews={reviewsData.stats.totalReview}
          />
        </div>
      </div>
    </div>
  );
}
