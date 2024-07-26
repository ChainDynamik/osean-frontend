import { useState } from "react";
import { Box, Text, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { BookingManagerYacht } from "../../types/booking-manager/core";
import BookingForm from "../BookingForm/BookingForm";
import { Extra, useSelectedExtrasStore } from "../../util/store/extraStore";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import styles
import Icon from "../icon-selector/icon-selector";

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

  const extras = details?.products.flatMap((product) => product.extras) || [];
  const visibleExtras = isViewMoreExtras ? extras : extras.slice(0, 10);

  const planImage = details?.images.find(
    (image) => image.description === "Plan image"
  )?.url;

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
              details?.descriptions?.[0].text || "N/A"
            )}
          </p>
          {/*  */}
          <div className="flex gap-8 justify-between">
            <div className="border-t border-b-black/50 pt-4 h-fit grid grid-cols-2 gap-x-10 gap-y-4 mb-16 mt-4">
              <div className="flex gap-4 items-center">
                <div>
                  <Icon iconType="cabin" className="w-4" />
                </div>
                <p className="mb-0 text-black">4 Cabins</p>
              </div>
              <div className="flex gap-4 items-center">
                <div>
                  <Icon iconType="calendar" className="w-4" />
                </div>
                <p className="mb-0 text-black">2023</p>
              </div>
              <div className="flex gap-4 items-center">
                <div>
                  <Icon iconType="bed" className="w-4" />
                </div>
                <p className="mb-0 text-black">8 + 2 Berths</p>
              </div>
              <div className="flex gap-4 items-center">
                <div>
                  <Icon iconType="mainsail" className="w-4" />
                </div>
                <p className="mb-0 text-black">Battened mainsail</p>
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
                <p className="mb-0 text-black">38 ft (11.73 m)</p>
              </div>
              <div className="flex gap-4 items-center">
                <div>
                  <Icon iconType="wc" className="w-4" />
                </div>
                <p className="mb-0 text-black">4 wc</p>
              </div>
              <div className="flex gap-4 items-center">
                <div>
                  <Icon iconType="length" className="w-4" />
                </div>
                <p className="mb-0 text-black">1.50 m</p>
              </div>
            </div>
            {/*  */}
            {planImage && (
              <div className="mt-4 w-fit">
                <h3 className="text-sm w-fit font-semibold mb-2">Plan Image</h3>
                <img src={planImage} alt="Plan" className="w-[22rem] h-auto" />
              </div>
            )}
            {/*  */}
          </div>

          {/*  */}

          <div>
            <h2 className="text-2xl font-semibold mb-4">On Board Equipment</h2>
            <div className="grid grid-cols-3 gap-y-8 gap-4">
              {/*  */}
              <div className="flex flex-col gap-2">
                <p className="mb-0 font-bold text-black">Misc.</p>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    {" "}
                    Guides & Maps
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    Safety equipment
                  </p>
                </div>
              </div>
              {/*  */}
              {/*  */}
              <div className="flex flex-col gap-2">
                <p className="mb-0 font-bold text-black">Leisure</p>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    {" "}
                    Snorkeling gears
                  </p>
                </div>
              </div>
              {/*  */}
              {/*  */}
              <div className="flex flex-col gap-2">
                <p className="mb-0 font-bold text-black">Kitchen</p>

                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    {" "}
                    Electric refrigerator
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80"> Stove</p>
                </div>
              </div>
              {/*  */}
              {/*  */}
              <div className="flex flex-col gap-2">
                <p className="mb-0 font-bold text-black">Electronics</p>

                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    {" "}
                    220V converter
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    Anemometer
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    {" "}
                    Autopilot
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    Chart plotter
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80"> GPS</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">Sounder</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    {" "}
                    Speedometer
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">VHF DSC</p>
                </div>
              </div>
              {/*  */}
              {/*  */}

              <div className="flex flex-col gap-2">
                <p className="mb-0 font-bold text-black">Deck equipment</p>

                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80"> Bimini</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    Cockpit table
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80"> Bimini</p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    Deck hand shower
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    Electric Windlass
                  </p>
                </div>
              </div>
              {/*  */}
              {/*  */}
              <div className="flex flex-col gap-2">
                <p className="mb-0 font-bold text-black">Comfort</p>

                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">
                    {" "}
                    Fans in cabins
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon iconType="check" className="text-black w-4 " />
                  <p className="mb-0 font-extrabold text-black/80">Hot water</p>
                </div>
              </div>
              {/*  */}
            </div>
            {/* <div className="grid grid-cols-2 gap-4">
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
            </div> */}
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

        <Box mt="9" borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
          <Text fontWeight="bold" mb={3.5} className="text-black">
            OBLIGATORY EXTRAS
          </Text>
          <CheckboxGroup colorScheme="blue">
            <Stack mt="1" spacing="1">
              <Checkbox isChecked={true}>
                Chorter packoge (end cleaning, bed linen & towels - one
                sel/person/week - exiTo gos bottle Outboard Engine) - 250 EUR
              </Checkbox>
            </Stack>
          </CheckboxGroup>
        </Box>
        {/*  */}

        {/* Products Section */}
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

        {/* Selected Extras Section */}
        {/* <SelectedExtras /> */}

        {/* Owner Info Section */}
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
