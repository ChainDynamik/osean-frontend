"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Image from "next/image";
import { useTransactionStore } from "../../util/store";
import TransactionOutcomeModal from "../TransactionOutcomeModal/TransactionOutcomeModal";
import { Spinner } from "../../src/components/Spinner";
import { motion } from "framer-motion";
import { sleep } from "../../helpers";
import Moralis from "moralis-v1";
import { getContract, prepareContractCall, sendAndConfirmTransaction, toWei } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { sendTransaction } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { useContract, useContractWrite, useSigner, useWallet } from "@thirdweb-dev/react";
import { client } from "../../pages/_app";
import chain from "../../cost/chain";
import { oseanOrderManagementABI } from "../../abi";
import { ethereum, sepolia } from "thirdweb/chains";
import { ethers5Adapter } from "thirdweb/adapters/ethers5";

const options = [
  {
    value: "Ethereum",
    label: "Ethereum",
    icon: "/eth.svg",
  },
  {
    value: "Binance",
    label: "BSC",
    icon: "/bsc.svg",
  },
];

export default function OseanModal({
  children,
  enrollId,
  fee,
}: {
  children?: ReactNode;
  enrollId?: string;
  fee: number;
}) {
  const [network, setNetwork] = useState(options[0]);
  const [coin, setCoin] = useState("$OSEAN");
  const [showNetworkDropdown, setShowNetworkDropdown] = useState(false);
  const [showCoinDropdown, setShowCoinDropdown] = useState(false);
  const { transactionOpen, setOseanModalIsOpen, oseanModalIsOpen } = useTransactionStore();
  // const [isLoading, setIsLoading] = useState<null | boolean>(null);
  // console.log(options);

  const { contract: oom } = useContract(process.env.NEXT_PUBLIC_OOM_CONTRACT_ADDRESS);
  const { mutateAsync: payOrder } = useContractWrite(oom, "payOrder");

  const amountUsd = 10;

  const [loadingText, setLoadingText] = useState("Preparing quote... | Queue: 1/1");

  const [quote, setQuote] = useState<any>(null);

  async function startQuoteStatusDaemon(quoteId: string) {
    while (true) {
      const query = new Moralis.Query("QuoteQueue");
      query.equalTo("objectId", quoteId);
      const result = await query.first();

      if (result?.get("status") === "processed") {
        setQuote(result);
        break;
      }

      await sleep(4000);
    }
  }

  async function fetchQuote() {
    const quote = await Moralis.Cloud.run("generateQuoteEth", { amountUsd });

    const { objectId } = quote;

    startQuoteStatusDaemon(objectId);
  }

  async function pay() {
    try {
      const txValue = toWei(quote?.get("requiredEthAmount"));
      const uid = quote?.get("smartContractQuoteUid") as bigint;

      await payOrder({
        args: [uid],
        overrides: { value: txValue },
      });
    } catch (e: any) {
      console.error(e);
    }
  }

  const [isFetchingQuote, setIsFetchingQuote] = useState(true);

  // Calculate the 20% discount and the amount to pay
  const discount = fee * 0.2;
  const discountedFee = fee - discount;

  useEffect(() => {
    async function checkIfQuoteReceived() {
      if (quote && quote.get("status") === "processed") {
        await sleep(2000);
        setIsFetchingQuote(false);
      }
    }

    checkIfQuoteReceived();
  }, [quote]);

  useEffect(() => {
    if (oseanModalIsOpen) {
      fetchQuote();
    }
  }, [oseanModalIsOpen]);

  return (
    <Modal.Root
      open={oseanModalIsOpen}
      onOpenChange={setOseanModalIsOpen}
    >
      <Modal.Trigger>{children}</Modal.Trigger>

      <Modal.Content
        className={`max-[500px]:w-[90%] max-[500px]:max-w-none max-md:w-4/5 w-fit max-w-fit !min-w-fit ${
          transactionOpen && "!hidden"
        }`}
      >
        <div className="relative bg-white pt-4 pb-10 px-8 rounded-md shadow-lg w-[600px]">
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
          <div className="flex flex-col gap-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl mx-auto w-fit flex font-semibold text-gray-900">
                Pay with{" "}
                <div className="flex gap-1 ml-2 items-center">
                  <Image
                    src="/logo.png"
                    height={50}
                    width={50}
                    alt="osean"
                    className="w-6 -translate-y-0.5"
                  />
                  <p className="font-bold inline-block !mb-0 !text-black !text-2xl ">$OSEAN </p>
                </div>
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {isFetchingQuote ? (
                <div className="flex ">
                  <Spinner />
                  <motion.div
                    // left-right animation breathe
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex gap-2 ml-2"
                  >
                    <p className="my-auto text-xl">{loadingText}</p>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">Network and Coin</label>
                    <div className="flex gap-2 justify-between">
                      <div className="relative">
                        <button
                          type="button"
                          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full flex justify-between items-center"
                          onClick={() => setShowNetworkDropdown(!showNetworkDropdown)}
                        >
                          <span className="flex items-center">
                            <Image
                              src={network.icon}
                              height={20}
                              width={20}
                              alt={network.label}
                              className="mr-2"
                            />
                            {network.label}
                          </span>
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </button>
                        {showNetworkDropdown && (
                          <ul className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            {options.map((option) => (
                              <li
                                key={option.value}
                                className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                                onClick={() => {
                                  setNetwork(option);
                                  setShowNetworkDropdown(false);
                                }}
                              >
                                <div className="flex items-center">
                                  <Image
                                    src={option.icon}
                                    height={20}
                                    width={20}
                                    alt={option.label}
                                    className="mr-2"
                                  />
                                  <span className="font-normal block truncate">{option.label}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="relative">
                        <button
                          type="button"
                          className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full flex justify-between items-center"
                          onClick={() => setShowCoinDropdown(!showCoinDropdown)}
                        >
                          <span className="flex items-center">
                            <Image
                              src="/logo.png"
                              height={20}
                              width={20}
                              alt="osean"
                              className="mr-2"
                            />
                            {coin}
                          </span>
                          <svg
                            className="w-4 h-4 ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M19 9l-7 7-7-7"
                            ></path>
                          </svg>
                        </button>
                        {showCoinDropdown && (
                          <ul className="absolute mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                            <li
                              className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                              onClick={() => {
                                setCoin("$OSEAN");
                                setShowCoinDropdown(false);
                              }}
                            >
                              <div className="flex items-center">
                                <Image
                                  src="/logo.png"
                                  height={20}
                                  width={20}
                                  alt="osean"
                                  className="mr-2"
                                />
                                <span className="font-normal block truncate">$OSEAN</span>
                              </div>
                            </li>
                            <li
                              className="text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100"
                              onClick={() => {
                                setCoin("$OSEAN");
                                setShowCoinDropdown(false);
                              }}
                            >
                              <div className="flex items-center">
                                <Image
                                  src="/logo.png"
                                  height={20}
                                  width={20}
                                  alt="osean"
                                  className="mr-2"
                                />
                                <span className="font-normal block truncate">$OSEAN</span>
                              </div>
                            </li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">Currency conversion</label>
                    <p className="text-sm text-gray-500">
                      1 ETH = ${quote?.get("ethereumUnitPrice")?.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">Discounts:</label>
                    <p className="text-sm !font-bold text-green-500">20% Discount (${discount.toFixed(2)})</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="block text-sm font-medium text-gray-700">Amount to pay</label>
                    <p className="text-sm text-gray-900">{quote?.get("requiredEthAmount")?.toFixed(6)} ETH</p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <TransactionOutcomeModal
                      network={network.label}
                      fee={discountedFee}
                      discount={discount}
                    >
                      <Button
                        // onClick={() => {
                        //   setIsLoading(true);
                        //   setTimeout(() => {
                        //     setIsLoading(false);
                        //     setTimeout(() => {
                        //       console.log(isLoading, "loading");
                        //     }, 1000);
                        //   }, 1000);
                        // }}
                        // className={`${isLoading && "opacity-50"}`}
                        onClick={pay}
                      >
                        Pay {quote?.get("requiredEthAmount")?.toFixed(6)} ETH
                        {/* {isLoading ? "Loading..." : `Pay ${discountedFee.toFixed(2)}`} */}
                        {/* <div className="flex gap-1 ml-2 items-center">
                          <Image
                            src="/logo.png"
                            height={50}
                            width={50}
                            alt="osean"
                            className="w-5 -translate-y-0.5"
                          />
                          <p className="font-bold inline-block !mb-0 !text-white">$OSEAN </p>
                        </div> */}
                      </Button>
                    </TransactionOutcomeModal>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
