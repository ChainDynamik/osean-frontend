"use client";

import React, { Suspense, useState } from "react";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { Staricon } from "../../assets/icons-components/star-icon";
import PaymentModal from "../PaymentModal/PaymentModal";
import Icon from "../icon-selector/icon-selector";
import { Box, Checkbox, CheckboxGroup, Stack, Text } from "@chakra-ui/react";
import { useSelectedExtrasStore } from "../../util/store/extraStore";
import { useTripStore } from "../../util/store/tripStore";

interface BookingFormProps {
  price: number;
  averageRating: number;
  totalReviews: number;
  className?: string;
  securityDeposit: number;
}

export default function BookingForm({
  price,
  averageRating,
  totalReviews,
  className,
  securityDeposit,
}: BookingFormProps) {
  const [focus, setFocus] = useState<boolean>(false);
  const [nights, setNights] = useState<number>(1); // Initial number of nights

  const { tripStart, tripEnd, setTripStart, setTripEnd } = useTripStore();
  const selectedExtras = useSelectedExtrasStore((state) => state.selectedExtras);
  const toggleExtra = useSelectedExtrasStore((state) => state.toggleExtra);

  const handleIncreaseNights = () => {
    setNights(nights + 1);
  };
  const handleReduceNights = () => {
    if (nights > 1) setNights(nights - 1);
  };

  const getTotalPrice = (price: number, nights: number, selectedExtras: { price: number }[]) => {
    const extrasTotal = selectedExtras.reduce((total, extra) => total + extra.price, 0);
    return price * nights + extrasTotal;
  };

  const discount = 117; // Example value, update as needed
  const cleaningFee = 100; // Example value, update as needed
  const serviceFee = 65; // Example value, update as needed
  const totalFee = getTotalPrice(price, nights, selectedExtras) - discount + cleaningFee + serviceFee;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={clsx("rounded-xl border border-gray-lighter bg-white p-4 md:p-8 shadow-card", className)}
    >
      {/* <div className="flex items-center justify-between gap-3">
        <p className="text-xl font-bold text-gray-dark xl:text-[22px]">
          ${price} <span className="text-base">/ night</span>
        </p>
        <p className="inline-flex flex-shrink-0 items-center gap-2">
          <Staricon className="xl:w-h-5 h-4 w-4 xl:h-5" />
          <span className="text-base font-bold text-gray-dark">
            {averageRating}
          </span>
          <span className="flex-shrink-0 text-sm font-normal text-gray-dark xl:text-base">
            ({" "}
            <a href="#reviews" rel="noopener noreferer" className="underline">
              {totalReviews} reviews
            </a>{" "}
            )
          </span>
        </p>
      </div> */}
      <div
        className={clsx(
          "relative grid grid-cols-2 gap-3 rounded-t-lg border border-b-0 border-gray-lighter",
          focus && "!border-b !border-gray-dark ring-[1px] ring-gray-900/20"
        )}
        onBlur={() => setFocus(false)}
      >
        <span
          className={clsx(
            "absolute inset-y-0 left-1/2 translate-x-1/2 border-r border-gray-lighter",
            focus && "!border-gray-dark"
          )}
        ></span>
        <div className="p-2">
          <span className="block mb-1 text-sm font-semibold uppercase text-gray-dark">Trip Start</span>
          <DatePicker
            selected={tripStart}
            onChange={(date) => setTripStart(date)}
            className="w-full !border-none focus:!outline-none focus:!border-none !outline-none"
          />
        </div>
        <div className="p-2">
          <span className="block mb-1 text-sm font-semibold uppercase text-gray-dark">Trip End</span>
          <DatePicker
            selected={tripEnd}
            onChange={(date) => setTripEnd(date)}
            className="w-full !ring-offset-0 !border-none focus:!outline-none focus:!border-none !outline-none"
          />
        </div>
      </div>

      {/* <div className="flex justify-between items-center mt-4">
        <p className="text-black mb-0">Nights: {nights}</p>
        <div className="flex items-center gap-4">
          <button
            className="hover:bg-gray-200 bg-transparent border border-gray-300 hover:brightness-110 hover:shadow-lg hover:shadow-black/30 hov:border-gray-1000 focus:enabled:border-gray-1000 focus:ring-gray-900/30 px-2 rounded-lg"
            onClick={handleIncreaseNights}
          >
            Increase
          </button>
          <button
            className="hover:bg-gray-200 bg-transparent border border-gray-300 hover:brightness-110 hover:shadow-lg hover:shadow-black/30 hov:border-gray-1000 focus:enabled:border-gray-1000 focus:ring-gray-900/30 px-2 rounded-lg"
            onClick={handleReduceNights}
          >
            Reduce
          </button>
        </div>
      </div> */}

      <Box
        className="mt-3 xl:mt-5"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="4"
        // pl="4"
      >
        <ul className="">
          <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark first:pt-0 last:border-t last:border-gray-lighter last:pb-0">
            <span className="font-normal">Weekly discount</span>
            <span className="font-bold">$782</span>
          </li>
          <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark first:pt-0 last:border-t last:border-gray-lighter last:pb-0">
            <span className="font-normal">Discount</span>
            <span className="font-bold">$23</span>
          </li>

          <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark first:pt-0 last:border-t last:border-gray-lighter last:pb-0">
            <span className="font-normal">Total fee</span>
            <span className="font-bold">${totalFee}</span>
          </li>
        </ul>
        <Suspense fallback={<p>loading...</p>}>
          <PaymentModal
            price={price}
            nights={nights}
            discount={discount}
            cleaningFee={cleaningFee}
            serviceFee={serviceFee}
            totalFee={totalFee}
          >
            <Button
              type="submit"
              className="mt-4 w-full !pb-[14px] text-lg !font-bold uppercase relative pt-3 tracking-widest"
            >
              BOOK ONLINE{" "}
              <span className="bg-negative top-0 right-0 absolute text-white px-2 rounded-md inline-block text-xs">
                up to -30%
              </span>
            </Button>
          </PaymentModal>
        </Suspense>
        <Button
          type="submit"
          className="mt-3 w-full !py-[14px] text-lg !font-bold uppercase tracking-widest"
        >
          GET QUOTE
        </Button>
        <div className="flex gap-2 mt-4">
          <span className="w-2.5 h-1.5 mt-2  aspect-square rounded-full bg-black"></span>
          <p className="list-disc text-xs font-extrabold text-center text-black">
            Pay online or with Cryptocurrencies and save up t0 30%
          </p>
        </div>
      </Box>
      <Box
        mt="9"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="6"
      >
        <Text
          fontWeight="bold"
          mb={3.5}
          className="text-black"
        >
          OBLIGATORY EXTRAS
        </Text>
        <CheckboxGroup colorScheme="blue">
          <Stack
            mt="1"
            spacing="1"
          >
            <Checkbox isChecked={true}>
              Chorter packoge (end cleaning, bed linen & towels - one sel/person/week - exiTo gos bottle Outboard
              Engine) - 250 EUR
            </Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
      {selectedExtras.length > 0 && (
        <ul className="flex flex-col gap-2 pt-4">
          <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p="2"
            pl="4"
          >
            <p className="text-lg mb-2.5 mt-1.5 font-bold text-black">EXTRAS</p>
            <CheckboxGroup colorScheme="blue">
              <Stack
                mt="1"
                spacing="1"
              >
                {selectedExtras.map((extra) => (
                  <Checkbox
                    key={extra.id}
                    isChecked={true}
                    onChange={() => toggleExtra(extra)}
                  >
                    {extra.name} - {extra.price} {extra.currency}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </Box>
          <div className="flex gap-2 mt-4">
            <span className="w-2.5 h-2 mt-2 inline-block aspect-square rounded-full bg-black"></span>
            <p className="list-disc text-xs font-extrabold text-center text-black">
              All Extras ore payable ot operator&apos;s base
            </p>
          </div>
        </ul>
      )}
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="2"
        pl="4"
        mt="5"
        className="text-sm font-extrabold bg-black/5"
      >
        A {securityDeposit?.toLocaleString()} EUR security deposit will be required by the renter at the base
      </Box>
    </form>
  );
}
