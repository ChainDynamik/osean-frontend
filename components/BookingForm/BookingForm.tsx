"use client";

import React, { Suspense, useState } from "react";
import { z } from "zod";
import clsx from "clsx";
import DatePicker from "react-datepicker";
// import "react-datepicker/dist/DatePicker.css";
// import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../Button/Button";
import { Staricon } from "../ui/icons/star-icon";
import PaymentModal from "../PaymentModal/PaymentModal";

interface BookingFormProps {
  price: number;
  averageRating: number;
  totalReviews: number;
  className?: string;
}

const list = [
  {
    title: "$215 * 3 nights",
    money: 762,
    type: "price",
  },
  {
    title: "Weekly discount",
    money: 117,
    type: "discount",
  },
  {
    title: "Cleaning fee",
    money: 52,
    type: "cleanfee",
  },
  {
    title: "Service fee",
    money: 65,
    type: "servicefee",
  },
  {
    title: "Total fee",
    money: 702,
    type: "total",
  },
];

const BookingSchema = z
  .object({
    startDate: z.date().min(new Date(), { message: "Invalid Start Date!" }),
    endDate: z.date().min(new Date(), { message: "Invalid End Date!" }),
    selected: z.object({
      adults: z.number().min(1, "Minimum 1 Adult required!"),
      child: z.number(),
      pets: z.boolean(),
    }),
  })
  .refine(({ startDate, endDate }) => startDate < endDate, {
    message: "End Date must be greater than Start Date.",
    path: ["startDate"],
  });

export default function BookingForm({
  price,
  averageRating,
  totalReviews,
  className,
}: BookingFormProps) {
  const [focus, setFocus] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  function handleBooking(data: any) {
    console.log(data);
  }

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={clsx(
        "rounded-xl border border-gray-lighter bg-white p-8 shadow-card",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3  ">
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

      <Suspense fallback={<p>loading...</p>}>
        <PaymentModal>
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
        {list.map((item) => (
          <li
            key={item.title}
            className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark first:pt-0 last:border-t last:border-gray-lighter last:pb-0"
          >
            <span className="font-normal">{item.title}</span>
            {item.type === "discount" ? (
              <span className="font-bold text-red">-${item.money}</span>
            ) : (
              <span className="font-bold">${item.money}</span>
            )}
          </li>
        ))}
      </ul>
    </form>
  );
}
