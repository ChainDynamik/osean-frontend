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

import { FC, useState } from "react";
import { reviewsData } from "../../data/reviews";
import BookingForm from "../BookingForm/BookingForm";
import Button from "../Button/Button";
import { BookingManagerYacht } from "../../types/booking-manager/core";
import Rate from "rc-rate";
import { Box, Text, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";

interface YachtDetailsProps {
  details: BookingManagerYacht;
}

const YachtDetails: FC<YachtDetailsProps> = ({ details }) => {
  const [isViewMore, setIsViewMore] = useState(false);

  const [selectedExtras, setSelectedExtras] = useState<number[]>([]);

  const handleCheckboxChange = (extraId: number) => {
    setSelectedExtras((prev) => {
      if (prev.includes(extraId)) {
        return prev.filter((id) => id !== extraId);
      } else {
        return [...prev, extraId];
      }
    });
  };

  return (
    <div className="flex justify-between gap-5 lg:gap-8 xl:gap-12 4xl:gap-16">
      <div className="w-full">
        <div className="mx-auto py-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{details.name}</h1>
            <p className="text-lg">{`${details.maxPeopleOnBoard} guests • ${details.cabins} cabins • ${details.wc} bathrooms`}</p>
          </div>
          <p className="mb-6">{details.descriptions?.[0].text || "N/A"}</p>
          <div>
            <h2 className="text-2xl font-semibold mb-4">On Board Equipment</h2>
            <div className="grid grid-cols-2 gap-4">
              {details.equipment.map((item, index) => (
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
                <td className="py-2">Name</td>
                <td className="py-2">{details.name}</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">Model</td>
                <td className="py-2">{details.model}</td>
              </tr>

              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Year</td>
                <td className="py-2">{details.year}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Kind</td>
                <td className="py-2">{details.kind}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Draught</td>
                <td className="py-2">{details.draught}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Beam</td>
                <td className="py-2">{details.beam}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Length</td>
                <td className="py-2">{details.length}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Water Capacity</td>
                <td className="py-2">{details.waterCapacity}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Fuel Capacity</td>
                <td className="py-2">{details.fuelCapacity}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Engine</td>
                <td className="py-2">{details.engine}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Deposit</td>
                <td className="py-2">{details.deposit}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Deposit With Waiver</td>
                <td className="py-2">{details.depositWithWaiver}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Currency</td>
                <td className="py-2">{details.currency}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Berths</td>
                <td className="py-2">{details.berths}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Required Skipper License</td>
                <td className="py-2">{details.requiredSkipperLicense ? "Yes" : "No"}</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Minimum Charter Duration</td>
                <td className="py-2">{details.minimumCharterDuration} days</td>
              </tr>
              <tr className={isViewMore ? "visible" : "hidden"}>
                <td className="py-2">Maximum Charter Duration</td>
                <td className="py-2">{details.maximumCharterDuration} days</td>
              </tr>
            </tbody>
          </table>
          <div
            className="mt-2 text-blue-600 cursor-pointer"
            onClick={() => setIsViewMore(!isViewMore)}
          >
            {isViewMore ? "View Less" : "View More"}
          </div>
        </div>

        {/* Products Section */}
        <Box
          mt="10"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="6"
        >
          <Text
            fontSize="2xl"
            fontWeight="semibold"
            mb="4"
          >
            Available Products and Extras
          </Text>
          {details.products.map((product, pIndex) => (
            <Box
              key={pIndex}
              mb="4"
            >
              <Text fontWeight="bold">{product.name}</Text>
              <CheckboxGroup colorScheme="blue">
                <Stack
                  pl="6"
                  mt="1"
                  spacing="1"
                >
                  {product.extras.map((extra) => (
                    <Checkbox
                      key={extra.id}
                      isChecked={selectedExtras.includes(extra.id)}
                      onChange={() => handleCheckboxChange(extra.id)}
                    >
                      {extra.name} - {extra.price} {extra.currency}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </Box>
          ))}
        </Box>

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
                <p className="font-semibold !mb-0">{details.company}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500 flex flex">4.99★</span>
                  <span className="ml-2 text-gray-600">(20 reviews)</span>
                </div>
              </div>
            </div>

            {/* <Button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Send a message</Button> */}
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
