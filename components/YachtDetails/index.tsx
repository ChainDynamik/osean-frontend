// src/data/YachtDetailsDataType.ts
import { vendorData } from "../../data/listing-details";

export interface Specification {
  label: string;
  value: string;
}

export interface OwnerInfo {
  name: string;
  rating: string;
  reviewsCount: number;
  memberSince: string;
  responseRate: string;
  languages: string;
  responseTime: string;
}

export interface YachtDetailsDataType {
  title: string;
  guests: number;
  cabins: number;
  bathrooms: number;
  description: string;
  equipment: string[];
  specifications: Specification[];
  owner: OwnerInfo;
  totalReview: number;
  averageRating: number;
  price: number;
}

import { FC } from "react";
import { reviewsData } from "../../data/reviews";
import BookingForm from "../BookingForm/BookingForm";
import Button from "../Button/Button";
import { BookingManagerYacht } from "../../types/booking-manager/core";

interface YachtDetailsProps {
  details: BookingManagerYacht;
}

const YachtDetails: FC<YachtDetailsProps> = ({ details }) => {
  const { maxPeopleOnBoard, cabins, wc, name, descriptions, equipment, beam } = details;

  return (
    <div className="flex justify-between gap-5 lg:gap-8 xl:gap-12 4xl:gap-16">
      <div className="w-full">
        <div className="mx-auto py-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{name}</h1>
            <p className="text-lg">{`${maxPeopleOnBoard} guests • ${cabins} cabins • ${wc} bathrooms`}</p>
          </div>
          <p className="mb-6">{descriptions?.[0].text || "N/A"}</p>
          <div>
            <h2 className="text-2xl font-semibold mb-4">On Board Equipment</h2>
            <div className="grid grid-cols-2 gap-4">
              {equipment.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2"
                >
                  <span className="inline-block w-6 h-6 bg-gray-200"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Specifications Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-t">
                <td className="py-2">Beam</td>
                <td className="py-2">{beam}</td>
              </tr>
            </tbody>
          </table>
          {/* <div className="mt-2 text-blue-600 cursor-pointer">View more</div> */}
        </div>
        {/* Owner Info Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Owner Info</h2>
          <div className="flex flex-col gap-10">
            <div className="flex gap-4 items-center">
              <img
                src="/avatar.jpg"
                alt="Owner"
                className="w-16 h-16 rounded-full"
              />
              <div className="flex flex-col">
                <p className="font-semibold !mb-0">{"owner.name"}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500">{"owner.rating"}</span>
                  <span className="ml-2 text-gray-600">({"owner.reviewsCount"})</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <p className="text-gray-600">Member since: {"owner.memberSince"}</p>
              <p className="text-gray-600">Response rate: {"owner.responseRate"}</p>
              <p className="text-gray-600">Languages spoken: {"owner.languages"}</p>
              <p className="text-gray-600">Response time: {"owner.responseTime"}</p>
            </div>
            <Button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Send a message</Button>
          </div>
        </div>
      </div>
      <div className="hidden w-full max-w-sm pb-11 lg:block xl:max-w-md 3xl:max-w-lg">
        <div className="sticky right-0 top-28 4xl:top-40">
          <BookingForm
            price={500}
            averageRating={2.31}
            totalReviews={312}
          />
        </div>
      </div>
    </div>
  );
};

export default YachtDetails;
