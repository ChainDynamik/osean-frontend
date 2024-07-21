"use client";

import React, { ReactNode, useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Image from "next/image";
import BlueCardAnimation from "../../assets/lottie/blue-coin.json";
import OseanModal from "../OseanModal/OseanModal";
import dynamic from "next/dynamic";
import CardModal from "../CardModal/CardModal";
import { useTransactionStore } from "../../util/store";
import { useSelectedExtrasStore } from "../../util/store/extraStore";

// Dynamically import Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

interface PaymentModalProps {
  children?: ReactNode;
  enrollId?: string;
  price: number;
  nights: number;
  discount: number;
  cleaningFee: number;
  serviceFee: number;
  totalFee: number;
}

export default function PaymentModal({
  children,
  enrollId,
  price,
  nights,
  discount,
  cleaningFee,
  serviceFee,
  totalFee,
}: PaymentModalProps) {
  type PaymentMethodType = "card" | "wire";
  const [paymentMethod, setPaymentMethod] = useState<null | PaymentMethodType>(
    null
  );

  const handlePaymentChoice = (choice: PaymentMethodType) => {
    setPaymentMethod(choice);
  };
  const {
    transactionOpen,
    toggleTransactionModal,
    paymentModalIsOpen,
    setPaymentModal,
  } = useTransactionStore();
  const selectedExtras = useSelectedExtrasStore(
    (state) => state.selectedExtras
  );

  return (
    <Modal.Root open={paymentModalIsOpen} onOpenChange={setPaymentModal}>
      <Modal.Trigger>{children}</Modal.Trigger>

      <Modal.Content
        className={`max-[500px]:w-[90%] max-[500px]:max-w-none max-md:w-4/5  w-fit max-w-fit !min-w-fit`}
      >
        <div className="relative bg-white pt-4 pb-10 px-20 rounded-md shadow-lg w-full">
          <Modal.Close className="z-[99] absolute right-4 top-3 text-white hover:text-primary bg-secondary p-2 rounded-md">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-4"
            >
              <path
                d="M9.63989 8.64556C9.77198 8.77765 9.84619 8.9568 9.84619 9.1436C9.84619 9.33041 9.77198 9.50956 9.63989 9.64165C9.5078 9.77374 9.32865 9.84795 9.14185 9.84795C8.95504 9.84795 8.77589 9.77374 8.6438 9.64165L4.92368 5.92036L1.20239 9.64048C1.0703 9.77257 0.891149 9.84678 0.704345 9.84678C0.517541 9.84678 0.338388 9.77257 0.206298 9.64048C0.0742076 9.50839 1.9683e-09 9.32924 0 9.14243C-1.9683e-09 8.95563 0.0742076 8.77647 0.206298 8.64438L3.92759 4.92427L0.20747 1.20298C0.0753793 1.07089 0.0011719 0.891734 0.0011719 0.704931C0.0011719 0.518127 0.0753793 0.338974 0.20747 0.206884C0.33956 0.0747935 0.518713 0.000585841 0.705517 0.000585839C0.89232 0.000585837 1.07147 0.0747935 1.20356 0.206884L4.92368 3.92817L8.64497 0.206298C8.77706 0.0742074 8.95621 -3.11215e-09 9.14302 0C9.32982 3.11215e-09 9.50898 0.0742074 9.64106 0.206298C9.77316 0.338388 9.84736 0.517541 9.84736 0.704345C9.84736 0.891148 9.77316 1.0703 9.64106 1.20239L5.91978 4.92427L9.63989 8.64556Z"
                fill="currentColor"
              />
            </svg>
          </Modal.Close>
          {paymentMethod !== null && (
            <div
              onClick={() => {
                setPaymentMethod(null);
              }}
              className="z-[99] cursor-pointer absolute left-4 top-3 p-2"
            >
              <svg
                className="w-2.5 text-secondary rotate-180"
                width="100%"
                height="100%"
                viewBox="0 0 6 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.75 10.275L0 9.525L4.425 5.13749L0 0.75L0.75 0L5.925 5.13749L0.75 10.275Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          )}
          {!paymentMethod && (
            <div className="flex flex-col mt-4 items-center">
              <div className="flex gap-2 items-center mt-4 mb-4">
                <h3 className="text-3xl !mb-0 font-bold text-gray-900">
                  Payment Method
                </h3>
                <Lottie
                  animationData={BlueCardAnimation}
                  loop={false}
                  className="w-20 -translate-y-1"
                />
              </div>
              <div className="flex gap-4 flex-col">
                <OseanModal fee={totalFee}>
                  <Button className="mb-2 whitespace-nowrap font-bold">
                    <span>
                      <Image
                        src="/logo.png"
                        height={50}
                        width={50}
                        alt="osean"
                        className="w-8 mr-2"
                      />
                    </span>
                    <span className="font-bold inline-block mr-2">$OSEAN </span>{" "}
                    <span className="text-green-400 !font-bold">
                      (20% DISCOUNT)
                    </span>
                  </Button>
                </OseanModal>

                <CardModal>
                  <Button className="mb-2 !px-0 whitespace-nowrap font-bold">
                    CARD (0% DISCOUNT)
                  </Button>
                </CardModal>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">
              Booking Summary
            </h4>
            <ul>
              <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark">
                <span className="font-normal">Price per night</span>
                <span className="font-bold">${price}</span>
              </li>
              <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark">
                <span className="font-normal">Nights</span>
                <span className="font-bold">{nights}</span>
              </li>
              <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark">
                <span className="font-normal">Weekly discount</span>
                <span className="font-bold">${discount}</span>
              </li>
              <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark">
                <span className="font-normal">Cleaning fee</span>
                <span className="font-bold">${cleaningFee}</span>
              </li>
              <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark">
                <span className="font-normal">Service fee</span>
                <span className="font-bold">${serviceFee}</span>
              </li>
              <li className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark">
                <span className="font-normal">Total fee</span>
                <span className="font-bold">${totalFee}</span>
              </li>
            </ul>
          </div>
          {selectedExtras.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-bold text-gray-900 mb-2">
                Selected Extras
              </h4>
              <ul>
                {selectedExtras.map((extra) => (
                  <li
                    key={extra.id}
                    className="flex items-center justify-between py-1.5 text-base capitalize text-gray-dark"
                  >
                    {extra.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
