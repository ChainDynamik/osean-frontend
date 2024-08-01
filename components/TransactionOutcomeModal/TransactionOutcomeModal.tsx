"use client";

import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";
import CheckAnimation from "../../assets/lottie/check.json";
import dynamic from "next/dynamic";
import Modal from "../Modal/Modal";
import Image from "next/image";
import Button from "../Button/Button";
import { cn } from "../../util";
import { OSMQuote } from "../OseanModal/OseanModal";
import { truncateAddress } from "../../helpers";
import Link from "next/link";
import { useAddress } from "@thirdweb-dev/react";

// Dynamically import Lottie
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type TransactionOutcomeModalProps = {
  quote: OSMQuote | undefined;
  isLoading?: boolean | null;
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  txHash: string;
};

export default function TransactionOutcomeModal({ isOpen, quote, onOpenChange, txHash }: TransactionOutcomeModalProps) {
  const address = useAddress();

  return (
    <Modal.Root
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <Modal.Trigger>
        {/* Optional: Trigger element can be placed here if needed */}
        <div style={{ display: "none" }}></div>
      </Modal.Trigger>

      <Modal.Content
        className={cn("max-[500px]:w-[90%] max-[500px]:max-w-none w-fit max-w-fit !min-w-[500px] rounded-lg", {
          // "!hidden": isLoading,
        })}
      >
        <div className="relative bg-white pt-4 pb-10 px-8 rounded-md shadow-lg w-full">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16">
            <Lottie
              animationData={CheckAnimation}
              loop={false}
            />
          </div>
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
          <div className="flex flex-col items-center gap-5 mt-12">
            <h1 className="text-[1.4rem] !mb-0  text-black font-bold uppercase text-center">Payment was successful</h1>
            <p className="text-sm text-center !mb-0  text-gray-700">
              Payment has been received successfully. Thank you for your payment.
            </p>
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-1 text-gray-800">
              <Image
                src={quote?.currency === "ETH" ? "/eth.svg" : "/logo.png"}
                width={24}
                height={24}
                alt="logo"
                className="mr-2"
              />
              <span>
                {quote?.amountInQuote} {quote?.currency}
              </span>
            </div>
            <p className="text-green-600 !mb-0 font-semibold">Discount: 1%</p>
            <div className="mt-6 w-full">
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Network</span>
                <span>{quote?.chain === "eth" ? "Ethereum" : "Binance Smart Chain"}</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Paid in</span>
                <span>{quote?.currency}</span>
              </div>

              <div className="flex justify-between text-gray-700 mb-2">
                <span>Transaction Time</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-gray-700 mb-2">
                <span>Transaction Hash</span>
                <Link
                  href={
                    quote?.chain === "eth"
                      ? `https://sepolia.etherscan.io/tx/${txHash}`
                      : `https://testnet.bscscan.com/tx/${txHash}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-indigo-600">{txHash && truncateAddress(txHash)}</span>
                </Link>
              </div>
            </div>
            <div className="flex ">
              {/* <button className="bg-gray-200 text-gray-700 rounded-md px-4 py-2">Download invoice</button> */}
              <Button
                className="text-white rounded-md w-full mx-3"
                onClick={() => {
                  console.log("test");
                  window.location.href = `/usergov/${address}`;
                }}
              >
                View reservation
              </Button>
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
