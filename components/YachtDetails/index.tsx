import { useState } from "react";
import { Box, Text, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { BookingManagerYacht } from "../../types/booking-manager/core";
import BookingForm from "../BookingForm/BookingForm";
import { Extra, useSelectedExtrasStore } from "../../util/store/extraStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import styles
import Icon from "../icon-selector/icon-selector";
import Image from "next/image";
import PreviewImage from "../PreviewImage/PreviewImage";
import { mmkEquipment } from "../../mmk-categories";

interface YachtDetailsProps {
  details: BookingManagerYacht | null;
  loading: boolean;
}

export default function YachtDetails({ details, loading }: YachtDetailsProps) {
  const [isViewMore, setIsViewMore] = useState(false);
  const [isViewMoreExtras, setIsViewMoreExtras] = useState(false);

  const selectedExtras = useSelectedExtrasStore(
    (state) => state.selectedExtras
  );
  const toggleExtra = useSelectedExtrasStore((state) => state.toggleExtra);

  const handleCheckboxChange = (extra: Extra) => {
    toggleExtra(extra);
  };

  const specifications = [
    { label: "Name", value: details?.name },
    { label: "Model", value: details?.model },
    { label: "Year", value: details?.year },
    { label: "Kind", value: details?.kind },
    { label: "Draught", value: details?.draught + " m" },
    { label: "Beam", value: details?.beam + " m" },
    { label: "Length", value: details?.boatLength + " m" },
    { label: "Water Capacity", value: details?.waterCapacity + " L" },
    { label: "Fuel Capacity", value: details?.fuelCapacity + " L" },
    { label: "Engine", value: details?.engine },
    {
      label: "Security Deposit",
      value: details?.deposit + " " + details?.currency,
    },
    {
      label: "Security Deposit With Waiver",
      value: details?.depositWithWaiver + " " + details?.currency,
    },
    // { label: "Currency", value: details?.currency },
    { label: "Berths", value: details?.berths },
    {
      label: "Required Skipper License",
      value: details?.requiredSkipperLicense ? "Yes" : "No",
    },
    {
      label: "Minimum Charter Duration",
      value: `${details?.minimumCharterDuration} days`,
    },
    {
      label: "Maximum Charter Duration",
      value: `${details?.maximumCharterDuration} days`,
    },
  ];

  const visibleSpecifications = isViewMore
    ? specifications
    : specifications.slice(0, 3);

  const extras = details?.products.flatMap((product) => product.extras) || [];
  const visibleExtras = isViewMoreExtras ? extras : extras.slice(0, 10);

  const planImage = details?.images.find(
    (image) => image.description === "Plan image"
  )?.url;

  console.log(details);

  return (
    <div className="flex justify-between gap-5 lg:gap-8 xl:gap-12 4xl:gap-16 mt-14 mb-16">
      <div className="w-full">
        <div className="mx-auto pb-10">
          <div className="mb-6">
            <h1 className="text-3xl text-primary font-bold">
              {loading ? <Skeleton width={200} /> : details?.model}
            </h1>
            <p className="text-lg">
              {loading ? (
                <Skeleton width={300} />
              ) : (
                <div className="flex gap-2 items-center">
                  <Icon iconType="location" className="w-4 text-black" />
                  <p className="mb-0">{details?.homeBase}</p>
                </div>
              )}
            </p>
          </div>
          <p className="mb-6">
            {loading ? (
              <Skeleton count={3} />
            ) : (
              details?.descriptions?.[0].text ||
              "This yacht has no description."
            )}
          </p>
          <div className="flex max-md:flex-col md:gap-8 justify-between">
            <div className="border-t border-b-black/50 pt-4 h-fit grid xl:grid-cols-2 gap-x-10 gap-y-4 mb-16 mt-4">
              {loading ? (
                <>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <Skeleton circle={true} height={24} width={24} />
                      <Skeleton width={100} />
                    </div>
                  ))}
                </>
              ) : (
                <>
                  <div className="flex gap-4 items-center">
                    <div>
                      <Icon iconType="cabin" className="w-4" />
                    </div>
                    <p className="mb-0 text-black">{details?.cabins} Cabins</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <Icon iconType="calendar" className="w-4" />
                    </div>
                    <p className="mb-0 text-black">{details?.year}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <Icon iconType="bed" className="w-4" />
                    </div>
                    <p className="mb-0 text-black">{details?.berths} Berths</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <Icon iconType="mainsail" className="w-4" />
                    </div>
                    <p className="mb-0 text-black">
                      {details?.mainsailType} mainsail
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <Icon iconType="shower" className="w-4" />
                    </div>
                    <p className="mb-0 text-black">4 showers</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <Icon iconType="breadth" className="w-4" />
                    </div>
                    <p className="mb-0 text-black">
                      {details?.length} ft ({details?.length * 0.3048} m)
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <Icon iconType="wc" className="w-4" />
                    </div>
                    <p className="mb-0 text-black">{details?.wc} wc</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <div>
                      <Icon iconType="length" className="w-4" />
                    </div>
                    <p className="mb-0 text-black">{details?.draught} m</p>
                  </div>
                </>
              )}
            </div>
            {loading ? (
              <Skeleton width={200} height={200} />
            ) : (
              planImage && (
                <div className="mt-4 w-4/5 md:w-1/2 xl:w-fit">
                  <h3 className="text-sm w-fit font-semibold mb-2">
                    Plan Image
                  </h3>
                  <PreviewImage src={planImage}>
                    <Image
                      width={200}
                      height={200}
                      src={planImage}
                      alt="Plan"
                      className="w-full xl:w-[22rem] h-auto"
                    />
                  </PreviewImage>
                </div>
              )
            )}
          </div>
          {details?.deposit && (
            <div className="lg:hidden mb-12">
              <BookingForm
                price={500}
                averageRating={2.31}
                totalReviews={312}
                securityDeposit={details?.deposit}
              />
            </div>
          )}
          <div>
            <h2 className="text-2xl font-semibold mb-4">On Board Equipment</h2>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-y-8 gap-4">
              {/* Static Data */}

              <div className="flex flex-col gap-2">
                {/* <p className="mb-0 font-bold text-black">Misc.</p> */}
                {details?.equipmentIds.map((id) => {
                  return (
                    <div className="flex gap-2 items-center" key={id}>
                      <Icon iconType="check" className="text-black w-4 " />
                      <p className="mb-0 font-extrabold text-black/80">
                        {mmkEquipment.find((e) => e.id === id)?.name}
                      </p>
                    </div>
                  );
                })}

                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    Safety equipment
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {visibleSpecifications.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
            <table className="w-full text-left">
              <tbody>
                {visibleSpecifications.map(({ label, value }, index) => (
                  <tr key={index} className={index !== 0 ? "border-t" : ""}>
                    <td className="py-2">{label}</td>
                    <td className="py-2">
                      {loading ? <Skeleton width={100} /> : value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="mt-2 text-blue-600 cursor-pointer"
              onClick={() => setIsViewMore(!isViewMore)}
            >
              {isViewMore ? "View Less" : "View More"}
            </div>
          </div>
        )}
        <Box mt="9" borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
          <Text fontWeight="bold" mb={3.5} className="text-black">
            OBLIGATORY EXTRAS
          </Text>
          <CheckboxGroup colorScheme="blue">
            <Stack mt="1" spacing="1">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Checkbox key={index} isChecked={false}>
                    <Skeleton width={250} />
                  </Checkbox>
                ))
              ) : (
                <Checkbox isChecked={true}>
                  Chorter packoge (end cleaning, bed linen & towels - one
                  sel/person/week - exiTo gos bottle Outboard Engine) - 250 EUR
                </Checkbox>
              )}
            </Stack>
          </CheckboxGroup>
        </Box>
        <Box
          mt="10"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="6"
        >
          {loading ? (
            Array.from({ length: 2 }).map((_, pIndex) => (
              <Box key={pIndex} mb="4">
                <Skeleton width={200} />
                <Stack pl="6" mt="1" spacing="1">
                  {Array.from({ length: 3 }).map((_, eIndex) => (
                    <Skeleton key={eIndex} height={20} />
                  ))}
                </Stack>
              </Box>
            ))
          ) : (
            <>
              <Text fontWeight="bold">EXTRAS</Text>
              <CheckboxGroup colorScheme="blue">
                <Stack pl="6" mt="1" spacing="1">
                  {visibleExtras.map((extra) => (
                    <Checkbox
                      key={extra.id}
                      isChecked={selectedExtras.some((e) => e.id === extra.id)}
                      onChange={() =>
                        handleCheckboxChange({
                          id: extra.id,
                          name: extra.name,
                          price: extra.price,
                          currency: extra.currency,
                        })
                      }
                    >
                      {extra.name} - {extra.price} {extra.currency}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
              {extras.length > 10 && (
                <div
                  className="mt-2 text-blue-600 cursor-pointer"
                  onClick={() => setIsViewMoreExtras(!isViewMoreExtras)}
                >
                  {isViewMoreExtras ? "View Less" : "View More"}
                </div>
              )}
            </>
          )}
        </Box>
      </div>
      <div className="hidden w-full max-w-sm pb-11 lg:block xl:max-w-md 3xl:max-w-lg">
        <div className="">
          <BookingForm price={500} averageRating={2.31} totalReviews={312} />
        </div>
      </div>
    </div>
  );
}
