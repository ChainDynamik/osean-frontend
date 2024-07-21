import { useState } from "react";
import { Box, Text, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { BookingManagerYacht } from "../../types/booking-manager/core";
import BookingForm from "../BookingForm/BookingForm";
import { Extra, useSelectedExtrasStore } from "../../util/store/extraStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import styles

interface YachtDetailsProps {
  details: BookingManagerYacht | null;
  loading: boolean;
}

export default function YachtDetails({ details, loading }: YachtDetailsProps) {
  const [isViewMore, setIsViewMore] = useState(false);

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
    { label: "Draught", value: details?.draught },
    { label: "Beam", value: details?.beam },
    { label: "Length", value: details?.length },
    { label: "Water Capacity", value: details?.waterCapacity },
    { label: "Fuel Capacity", value: details?.fuelCapacity },
    { label: "Engine", value: details?.engine },
    { label: "Deposit", value: details?.deposit },
    { label: "Deposit With Waiver", value: details?.depositWithWaiver },
    { label: "Currency", value: details?.currency },
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

  return (
    <div className="flex justify-between gap-5 lg:gap-8 xl:gap-12 4xl:gap-16">
      <div className="w-full">
        <div className="mx-auto py-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              {loading ? <Skeleton width={200} /> : details?.name}
            </h1>
            <p className="text-lg">
              {loading ? (
                <Skeleton width={300} />
              ) : (
                `${details?.maxPeopleOnBoard} guests • ${details?.cabins} cabins • ${details?.wc} bathrooms`
              )}
            </p>
          </div>
          <p className="mb-6">
            {loading ? (
              <Skeleton count={3} />
            ) : (
              details?.descriptions?.[0].text || "N/A"
            )}
          </p>
          <div>
            <h2 className="text-2xl font-semibold mb-4">On Board Equipment</h2>
            <div className="grid grid-cols-2 gap-4">
              {loading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Skeleton circle={true} height={24} width={24} />
                      <Skeleton width={150} />
                    </div>
                  ))
                : details?.equipment.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
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
        {/*  */}

        {/* Products Section */}
        <Box
          mt="10"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="6"
        >
          {loading
            ? Array.from({ length: 2 }).map((_, pIndex) => (
                <Box key={pIndex} mb="4">
                  <Skeleton width={200} />
                  <Stack pl="6" mt="1" spacing="1">
                    {Array.from({ length: 3 }).map((_, eIndex) => (
                      <Skeleton key={eIndex} height={20} />
                    ))}
                  </Stack>
                </Box>
              ))
            : details?.products.map((product, pIndex) => (
                <Box key={pIndex} mb="4">
                  <Text fontWeight="bold">{product.name}</Text>
                  <CheckboxGroup colorScheme="blue">
                    <Stack pl="6" mt="1" spacing="1">
                      {product.extras.map((extra) => (
                        <Checkbox
                          key={extra.id}
                          isChecked={selectedExtras.some(
                            (e) => e.id === extra.id
                          )}
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
                </Box>
              ))}
        </Box>

        {/* Selected Extras Section */}
        {/* <SelectedExtras /> */}

        {/* Owner Info Section */}
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4">Owner Info</h2>
          {loading ? (
            <>
              <Skeleton circle={true} height={64} width={64} />
              <Skeleton width={150} height={24} />
              <Skeleton width={100} height={20} />
            </>
          ) : (
            <div className="flex flex-col gap-10">
              <div className="flex gap-4 items-center">
                <img
                  src="/avatar.jpg"
                  alt="Owner"
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex flex-col">
                  <p className="font-semibold !mb-0">{details?.company}</p>
                  <div className="flex items-center">
                    <span className="text-yellow-500 flex">4.99★</span>
                    <span className="ml-2 text-gray-600">(20 reviews)</span>
                  </div>
                </div>
              </div>

              {/* <Button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded">Send a message</Button> */}
            </div>
          )}
        </div>
      </div>
      <div className="hidden w-full max-w-sm pb-11 lg:block xl:max-w-md 3xl:max-w-lg">
        {/* <div className="sticky right-0 top-28 4xl:top-40"> */}
        <div className="">
          <BookingForm price={500} averageRating={2.31} totalReviews={312} />
        </div>
      </div>
    </div>
  );
}
