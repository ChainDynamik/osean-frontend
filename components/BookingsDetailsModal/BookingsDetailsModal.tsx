import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";
import { useMoralis } from "react-moralis";
import Moralis from "moralis-v1";
import Icon from "../icon-selector/icon-selector";
import { Offer } from "../BookingsTable/BookingsTable";
import { generateBlockExplorerLink, truncateAddress } from "../../helpers";
import { IS_TESTNET } from "../../const/contractAddresses";
import Button from "../Button/Button";

type DetailsComponentProps = {
  children: ReactNode;
  id: string;
  offer: Offer;
  image: string;
};

const BookingsDetailsModal: React.FC<DetailsComponentProps> = ({ children, id, offer, image }) => {
  console.log(offer);

  return (
    <Modal.Root>
      <Modal.Trigger asChild>{children}</Modal.Trigger>
      <Modal.Content className="w-full max-w-[90%] lg:max-w-4xl mx-auto rounded-lg overflow-hidden shadow-2xl">
        <div className="relative bg-white w-full">
          <div className="relative h-80 bg-blue-600 w-full">
            <Modal.Close>
              <button className="absolute px-1 py-0.5 rounded-md bg-black z-50 top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors">
                <Icon
                  iconType="cancel"
                  className="w-6 h-6 text-white"
                />
              </button>
            </Modal.Close>
            <Image
              src={image}
              layout="fill"
              objectFit="cover"
              alt="Booking image"
              className="opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Image
                  src="/logo.png"
                  width={80}
                  height={80}
                  alt="GRSA logo"
                  className="mx-auto mb-4"
                />
                <h1 className="text-3xl font-bold text-white">Booking Details</h1>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-blue-600 uppercase">TRIP INFORMATION</h2>
                <InfoItem
                  label="Trip Start"
                  value={new Date(offer?.offer?.dateFrom).toLocaleString()}
                />
                <InfoItem
                  label="Trip End"
                  value={new Date(offer?.offer?.dateTo).toLocaleString()}
                />
                <InfoItem
                  label="Base Trip Price"
                  value={`${offer?.offer?.price} ${offer?.offer?.currency}`}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-blue-600 uppercase">PAYMENT DETAILS</h2>

                {offer?.quote?.chain ? (
                  <>
                    <InfoItem
                      label="Paid Amount"
                      value={`${offer?.quote?.amountInQuote.toFixed(5)} ${offer?.quote?.currency}`}
                    />
                    <InfoItem
                      label="Exchange Rate"
                      value={`1 ${offer?.quote?.currency} = $${offer?.quote?.quoteUnitPrice}`}
                    />
                    <InfoItem
                      label="TX"
                      value={`${truncateAddress(offer?.quote?.txHash)}`}
                      link={generateBlockExplorerLink(offer?.quote?.txHash, offer?.quote?.chain)}
                    />
                    <InfoItem
                      label="Invoice Status"
                      value="Pending admin approval"
                    />
                  </>
                ) : (
                  <>
                    <InfoItem
                      label="Paid Amount"
                      value={`${offer?.quote?.amountEur?.toFixed(3)} EUR `}
                    />

                    <InfoItem
                      label="Invoice Status"
                      value="Pending admin approval"
                    />
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold mb-4 text-blue-600 uppercase">OBLIGATORY EXTRAS</h2>
                {offer?.offer?.obligatoryExtras && offer.offer.obligatoryExtras.length > 0 ? (
                  offer.offer.obligatoryExtras.map((extra) => (
                    <div
                      key={extra.id}
                      className="flex items-center justify-between mb-2"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked
                          readOnly
                          className="mr-2"
                        />
                        <span>{extra.name}</span>
                      </div>
                      <span className="font-bold">{`${extra.price} ${extra.currency}`}</span>
                    </div>
                  ))
                ) : (
                  <p>No obligatory extras</p>
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-4 text-blue-600 uppercase">SELECTED EXTRAS</h2>
                {offer?.quote?.selectedExtras && offer.quote.selectedExtras.length > 0 ? (
                  offer.quote.selectedExtras.map((extra: any) => (
                    <div
                      key={extra.id}
                      className="flex items-center justify-between mb-2"
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked
                          readOnly
                          className="mr-2"
                        />
                        <span>{extra.name}</span>
                      </div>
                      <span className="font-bold">{`${extra.price} ${extra.currency}`}</span>
                    </div>
                  ))
                ) : (
                  <p>No selected extras</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full mx-3">
          <Button className="w-full bg-blue-600 text-white rounded-b-lg py-3 font-bold">Booking Confirmation</Button>
          <Button className="w-full bg-blue-600 text-white rounded-b-lg py-3 font-bold">Click to fill Crew list</Button>
          <Button className="w-full bg-blue-600 text-white rounded-b-lg py-3 font-bold">Base Information</Button>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
};

const InfoItem: React.FC<{ label: string; value: string; link?: string }> = ({ label, value, link }) => (
  <div className="mb-2">
    <span className="font-bold text-gray-600">{label}: </span>
    {link ? (
      <a
        href={link}
        className="text-blue-600 hover:underline"
      >
        {value}
      </a>
    ) : (
      <span className="text-gray-800">{value}</span>
    )}
  </div>
);
export default BookingsDetailsModal;
