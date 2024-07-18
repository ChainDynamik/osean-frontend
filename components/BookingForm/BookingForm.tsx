"use client";

import React, { Suspense, useState } from "react";
import clsx from "clsx";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { Staricon } from "../../assets/icons-components/star-icon";
import PaymentModal from "../PaymentModal/PaymentModal";

interface BookingFormProps {
  price: number;
  averageRating: number;
  totalReviews: number;
  className?: string;
}

export default function BookingForm({
  price,
  averageRating,
  totalReviews,
  className,
}: BookingFormProps) {
  const [focus, setFocus] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [nights, setNights] = useState<number>(1); // Initial number of nights

  const handleIncreaseNights = () => {
    setNights(nights + 1);
  };
  const handleReduceNights = () => {
    if (nights > 1) setNights(nights - 1);
  };

  const getTotalPrice = (price: number, nights: number) => {
    return price * nights;
  };

  const discount = 117; // Example value, update as needed
  const cleaningFee = 52; // Example value, update as needed
  const serviceFee = 65; // Example value, update as needed
  const totalFee =
    getTotalPrice(price, nights) - discount + cleaningFee + serviceFee;

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={clsx(
        "rounded-xl border border-gray-lighter bg-white p-8 shadow-card",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3">
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
      </div>
      <div
        className={clsx(
          "relative mt-6 grid grid-cols-2 gap-3 rounded-t-lg border border-b-0 border-gray-lighter",
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
          <span className="block mb-1 text-sm font-semibold uppercase text-gray-dark">
            Trip Start
          </span>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="w-full !border-none focus:!outline-none focus:!border-none !outline-none"
          />
        </div>
        <div className="p-2">
          <span className="block mb-1 text-sm font-semibold uppercase text-gray-dark">
            Trip End
          </span>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="w-full !ring-offset-0 !border-none focus:!outline-none focus:!border-none !outline-none"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-black mb-0">Nights: {nights}</p>
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            rounded="lg"
            type="button"
            variant="outline"
            className="hover:bg-gray-200"
            onClick={handleIncreaseNights}
          >
            Increase
          </Button>
          <Button
            size="sm"
            rounded="lg"
            type="button"
            variant="outline"
            className="hover:bg-gray-200"
            onClick={handleReduceNights}
          >
            Reduce
          </Button>
        </div>
      </div>

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
            size="xl"
            rounded="lg"
            type="submit"
            variant="solid"
            className="mt-4 w-full hover:!bg-black !py-[14px] text-base !font-bold uppercase tracking-widest"
          >
            reserve
          </Button>
        </PaymentModal>
      </Suspense>

      <ul className="mt-3 xl:mt-5">
        <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark first:pt-0 last:border-t last:border-gray-lighter last:pb-0">
          <span className="font-normal">
            ${price} * {nights} Nights
          </span>
          <span className="font-bold">${getTotalPrice(price, nights)}</span>
        </li>
        <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark first:pt-0 last:border-t last:border-gray-lighter last:pb-0">
          <span className="font-normal">Weekly discount</span>
          <span className="font-bold">${discount}</span>
        </li>
        <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark first:pt-0 last:border-t last:border-gray-lighter last:pb-0">
          <span className="font-normal">Cleaning fee</span>
          <span className="font-bold">${cleaningFee}</span>
        </li>
        <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark first:pt-0 last:border-t last:border-gray-lighter last:pb-0">
          <span className="font-normal">Service fee</span>
          <span className="font-bold">${serviceFee}</span>
        </li>
        <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark first:pt-0 last:border-t last:border-gray-lighter last:pb-0">
          <span className="font-normal">Total fee</span>
          <span className="font-bold">${totalFee}</span>
        </li>
      </ul>
    </form>
  );
}
