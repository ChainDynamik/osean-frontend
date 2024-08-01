import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import Moralis from "moralis-v1";
import Icon from "../icon-selector/icon-selector";
import { Offer } from "../BookingsTable/BookingsTable";

type DetailsComponentProps = {
  children: ReactNode;
  id: string;
  offer: Offer;
};

const BookingsDetailsModal: React.FC<DetailsComponentProps> = ({ children, id, offer }) => {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      <Modal.Content className="flex lg:!w-[60vw] md:!min-w-[60vw] !rounded-3xl h-[85vh] overflow-y-auto justify-center items-center ">
        <Modal.Close>
          <div className="absolute z-[99] top-6 right-6 md:top-6 text-white hover:text-primary bg-secondary p-2 rounded-md md:right-8">
            <Icon
              iconType="cancel"
              className="w-5"
            />
          </div>
        </Modal.Close>
        <div className="relative w-full p-2 overflow-y-auto">
          <div className="w-[100%] rounded-3xl mx-auto overflow-y-auto">
            <div className="w-full text-white bg-blue-600 max-md:pb-1 max-md:pt-10 px-6 py-8 rounded-t-3xl">
              <div className="flex items-center gap-3 md:gap-6 mb-4">
                <Image
                  src="/logo.png"
                  width={120}
                  height={120}
                  alt="grsa blue logo"
                  className="size-[40px] md:size-[60px] lg:size-[8` 0px]"
                />
                <h1 className=" text-xl md:text-2xl lg:text-3xl font-bold">Booking Details</h1>
              </div>
            </div>
            <div className="w-full bg-white text-black px-6 py-8 rounded-b-3xl">
              <div className="mb-4 border-b pb-4">
                <p className="mb-2">
                  <strong>Full Name:</strong>
                </p>
                <p className="mb-2">
                  <strong>Email:</strong>
                </p>
                <p className="mb-2">
                  <strong>Contact Number:</strong>
                </p>
                <p className="mb-2">
                  <strong>Trip Start Date:</strong> {new Date(offer?.offer.dateFrom).toLocaleString()} (local time)
                </p>
                <p className="mb-2">
                  <strong>Trip End Date:</strong> {new Date(offer?.offer.dateTo).toLocaleString()} (local time)
                </p>
                <p className="mb-2">
                  <strong>Base Trip Price: </strong> {offer?.offer.price} {offer?.offer.currency}
                </p>
                <p className="mb-2">
                  <strong>Paid Amount:</strong> {offer?.quote?.amountInQuote?.toLocaleString()} {offer?.quote?.currency}
                </p>
                <p className="mb-2">
                  <strong>Exchange Rate</strong> 1 {offer?.quote?.currency} = ${offer?.quote?.quoteUnitPrice}
                </p>

                <p className="mb-2">
                  <strong>Obligatory Extras:</strong>
                </p>

                {offer?.offer?.obligatoryExtras?.map((extra) => (
                  <p
                    key={extra.id}
                    className="mb-2"
                  >
                    {extra.name}: {extra.price} {extra.currency}
                  </p>
                ))}

                <p className="mb-2">
                  <strong>Invoice Issued</strong>: Not yet &mdash; pending admin approval
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};

export default BookingsDetailsModal;
