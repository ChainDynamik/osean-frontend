"use client";

import { Image } from "@chakra-ui/react";
import { useChainId, useContract, useContractWrite, useSwitchChain } from "@thirdweb-dev/react";
import { motion } from "framer-motion";
import Moralis from "moralis-v1";
import { ReactNode, useContext, useEffect, useState } from "react";
import { Web3 } from "web3";
import { Spinner } from "../../src/components/Spinner";
import { useTransactionStore } from "../../util/store";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import TransactionOutcomeModal from "../TransactionOutcomeModal/TransactionOutcomeModal";

import { useBalance } from "@thirdweb-dev/react";
import Countdown from "react-countdown";
import toast from "react-hot-toast";
import { useMoralis } from "react-moralis";
import { cn } from "../../util";
import { useSelectedExtrasStore } from "../../util/store/extraStore";
import { useSelectedOfferStore } from "../../util/store/useSelectedOfferStore";
import { Dropdown } from "../Dropdown/Dropdown";
import { WertOseanTopUp } from "../WertOseanTopUp/WertOseanTopUp";
import { useCurrencyConverter } from "../../util/hooks/useCurrencyConverter";
import { IS_TESTNET } from "../../const/contractAddresses";
import { Binance, BinanceTestnet, Ethereum, Sepolia } from "@thirdweb-dev/chains";
import ChainContext from "../../cost/chain";

type optionsType = {
  value: string;
  label: string;
  icon: string;
};

const options: optionsType[] = [
  {
    value: "ETH",
    label: "Ethereum",
    icon: "/eth.svg",
  },
  {
    value: "BSC",
    label: "BSC",
    icon: "/bsc.svg",
  },
];

export const oseanDiscount = 15;
export const ethDiscount = 10;
export const bnbDiscount = 10;

export type OSMQuote = {
  amountUsd: number;
  amountInWei: string;
  amountInQuote: number;
  quoteUnitPrice: number;
  expirationTime: number;
  requiredSigner: string;
  signature: string;
  message: string;
  signatureRaw: {
    message: string;
    messageHash: string;
    v: string;
    r: string;
    s: string;
    signature: string;
  };
  currency: string;
  chain: string;
  createdAt: string;
  updatedAt: string;
  objectId: string;
};

const renderer = ({ hours, minutes, seconds, completed }: any) => {
  const hoursPadded = hours.toString().padStart(2, "0");
  const minutesPadded = minutes.toString().padStart(2, "0");
  const secondsPadded = seconds.toString().padStart(2, "0");

  if (completed) {
    return <p>Transaction expired</p>;
  } else {
    return (
      <p>
        {hoursPadded}:{minutesPadded}:{secondsPadded}
      </p>
    );
  }
};

export default function OseanModal({ children, offer }: { children?: ReactNode; offer: any }) {
  const [network, setNetwork] = useState<optionsType | string>("Select network");
  const [coin, setCoin] = useState("Select currency");

  const [transactionModalOpen, setTransactionModalOpen] = useState(false);

  const { transactionOpen, toggleTransactionModal, setOseanModalIsOpen, oseanModalIsOpen } = useTransactionStore();
  const { selectedChain, setSelectedChain } = useContext(ChainContext);

  const selectedExtras = useSelectedExtrasStore((state) => state.selectedExtras);

  const { convertEurToCurrency } = useCurrencyConverter();

  const { contract: ethUsdt } = useContract(process.env.NEXT_PUBLIC_ETH_USDT_CONTRACT_ADDRESS);
  const { contract: ethOsean } = useContract(process.env.NEXT_PUBLIC_ETH_OSEAN_CONTRACT_ADDRESS);
  const { contract: ethOom } = useContract(process.env.NEXT_PUBLIC_ETH_OOM_CONTRACT_ADDRESS);

  const { mutateAsync: ethUsdtApprove } = useContractWrite(ethUsdt, "approve");
  const { mutateAsync: ethOseanApprove } = useContractWrite(ethOsean, "approve");

  const { mutateAsync: ethFullfillOrderEth } = useContractWrite(ethOom, "fullfillOrderEth");
  const { mutateAsync: ethFullfillOrderOsean } = useContractWrite(ethOom, "fullfillOrderOsean");
  const { mutateAsync: ethFullfillOrderUsdt } = useContractWrite(ethOom, "fullfillOrderUsdt");

  const { contract: bscUsdt } = useContract(process.env.NEXT_PUBLIC_BSC_USDT_CONTRACT_ADDRESS);
  const { contract: bscOsean } = useContract(process.env.NEXT_PUBLIC_BSC_OSEAN_CONTRACT_ADDRESS);
  const { contract: bscOom } = useContract(process.env.NEXT_PUBLIC_BSC_OOM_CONTRACT_ADDRESS);

  const { mutateAsync: bscUsdtApprove } = useContractWrite(bscUsdt, "approve");
  const { mutateAsync: bscOseanApprove } = useContractWrite(bscOsean, "approve");

  const { mutateAsync: bscFullfillOrderEth } = useContractWrite(bscOom, "fullfillOrderEth");
  const { mutateAsync: bscFullfillOrderOsean } = useContractWrite(bscOom, "fullfillOrderOsean");
  const { mutateAsync: bscFullfillOrderUsdt } = useContractWrite(bscOom, "fullfillOrderUsdt");

  const { data: oseanBalanceEth, refetch: refreshOseanBalanceEth } = useBalance(
    process.env.NEXT_PUBLIC_ETH_OSEAN_CONTRACT_ADDRESS
  );
  const { data: oseanBalanceBnb, refetch: refreshOseanBalanceBnb } = useBalance(
    process.env.NEXT_PUBLIC_BNB_OSEAN_CONTRACT_ADDRESS
  );

  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState("Preparing quote...");
  const [isLoading, setIsLoading] = useState(false);
  const [quote, setQuote] = useState<OSMQuote>();
  const { user } = useMoralis();

  const chainId = useChainId();
  const switchChain = useSwitchChain();

  console.log(selectedChain);

  async function verifyQuoteSettled(quote: OSMQuote) {
    const query = new Moralis.Query("Quote");
    query.equalTo("objectId", quote.objectId);
    const result = await query.first();

    if (result?.get("status") === "settled") {
      console.log("Quote settled");
      setIsLoading(false);
      setTransactionModalOpen(true);
      setQuote(result?.toJSON());
    }

    const expiryDate = new Date(quote.expirationTime * 1000);
    const now = new Date();

    if (expiryDate < now) {
      toast.error("Quote expired. Please try again.");
      setIsLoading(false);
      setTransactionModalOpen(false);
      setOseanModalIsOpen(false);
    }
  }

  async function handleSwitchChainIfNecessary() {
    console.log(`Network: ${network.value}`);
    console.log(`ChainId: ${chainId}`);

    console.log(`Selected chain: ${selectedChain}`);

    // @ts-ignore
    const networkValue = network.value as string;

    if (networkValue === "ETH" && IS_TESTNET && chainId != Sepolia.chainId) {
      setSelectedChain(Sepolia.slug);
      await switchChain(Sepolia.chainId);
    }
    if (networkValue === "ETH" && !IS_TESTNET && chainId != Ethereum.chainId) {
      setSelectedChain(Ethereum.slug);
      await switchChain(Ethereum.chainId);
    }
    if (networkValue === "BSC" && IS_TESTNET && chainId != BinanceTestnet.chainId) {
      setSelectedChain(BinanceTestnet.slug);
      await switchChain(BinanceTestnet.chainId);
    }
    if (networkValue === "BSC" && !IS_TESTNET && chainId != Binance.chainId) {
      setSelectedChain(Binance.slug);
      await switchChain(Binance.chainId);
    }
  }

  async function fetchQuote() {
    if (coin === "Select currency") {
      console.log("Currency not selected");
      return;
    }
    if (typeof network === "string") {
      console.log("Network not selected");
      return;
    }
    // if (transactionHash) return;

    await handleSwitchChainIfNecessary();

    const amountEur = offer?.price;
    const discountPercentage = coin === "ETH" ? ethDiscount : coin === "OSEAN" ? oseanDiscount : bnbDiscount;

    const amountMinusDiscount = amountEur - (amountEur * discountPercentage) / 100;

    const amountUsd = convertEurToCurrency({
      eurPrice: amountMinusDiscount,
      currency: "usd",
      maxDecimal: 5,
    });

    console.log(`Original amount: ${amountEur} EUR`);
    console.log(`Amount after discount: ${amountMinusDiscount} EUR`);
    console.log(`Amount in USD: ${amountUsd}`);

    const quote = await Moralis.Cloud.run("generateQuote", {
      amountUsd,
      currency: coin,
      network: network.value,
      selectedExtras,
      selectedOffer: offer,
    });
    setQuote(quote);
    setIsFetchingQuote(false);
  }

  async function pay() {
    setIsLoading(true);

    // @ts-ignore
    const networkValue = network.value as string;

    try {
      if (coin === "ETH" || coin === "BNB") {
        const txValue = quote?.amountInWei as string;
        const message = quote?.message as string;
        const messageHash = quote?.signatureRaw.messageHash;
        const v = quote?.signatureRaw.v;
        const r = quote?.signatureRaw.r;
        const s = quote?.signatureRaw.s;
        const referenceQuoteId = quote?.objectId;

        if (networkValue === "ETH") {
          console.log("ETH ETH payment");
          const tx = await ethFullfillOrderEth({
            args: [message, messageHash, v, r, s, referenceQuoteId],
            overrides: { value: txValue },
          });

          setTransactionHash(tx.receipt.transactionHash);
        } else {
          console.log(`BSC BNB payment`);
          const tx = await bscFullfillOrderEth({
            args: [message, messageHash, v, r, s, referenceQuoteId],
            overrides: { value: txValue },
          });

          setTransactionHash(tx.receipt.transactionHash);
        }
      } else if (coin === "OSEAN") {
        const txValue = quote?.amountInWei as string;
        const message = quote?.message as string;
        const messageHash = quote?.signatureRaw.messageHash;
        const v = quote?.signatureRaw.v;
        const r = quote?.signatureRaw.r;
        const s = quote?.signatureRaw.s;
        const referenceQuoteId = quote?.objectId;

        if (networkValue === "ETH") {
          console.log(`ETH OSEAN payment`);
          // Increase allowance for the contract
          await ethOseanApprove({
            args: [process.env.NEXT_PUBLIC_ETH_OOM_CONTRACT_ADDRESS, txValue],
          });

          const tx = await ethFullfillOrderOsean({
            args: [message, messageHash, v, r, s, referenceQuoteId],
          });

          setTransactionHash(tx.receipt.transactionHash);
        } else {
          console.log(`BSC OSEAN payment`);

          // Increase allowance for the contract
          await bscOseanApprove({
            args: [process.env.NEXT_PUBLIC_BSC_OOM_CONTRACT_ADDRESS, txValue],
          });

          const tx = await bscFullfillOrderOsean({
            args: [message, messageHash, v, r, s, referenceQuoteId],
          });

          setTransactionHash(tx.receipt.transactionHash);
        }
      } else if (coin === "USDT") {
        const txValue = quote?.amountInWei as string;
        const message = quote?.message as string;
        const messageHash = quote?.signatureRaw.messageHash;
        const v = quote?.signatureRaw.v;
        const r = quote?.signatureRaw.r;
        const s = quote?.signatureRaw.s;
        const referenceQuoteId = quote?.objectId;

        if (networkValue === "ETH") {
          console.log(`ETH USDT payment`);
          // Increase allowance for the contract
          await ethUsdtApprove({
            args: [process.env.NEXT_PUBLIC_ETH_OOM_CONTRACT_ADDRESS, txValue],
          });

          const tx = await ethFullfillOrderUsdt({
            args: [message, messageHash, v, r, s, referenceQuoteId],
          });

          setTransactionHash(tx.receipt.transactionHash);
        } else {
          console.log(`BSC USDT payment`);

          // Increase allowance for the contract
          await bscUsdtApprove({
            args: [process.env.NEXT_PUBLIC_BSC_OOM_CONTRACT_ADDRESS, txValue],
          });

          const tx = await bscFullfillOrderUsdt({
            args: [message, messageHash, v, r, s, referenceQuoteId],
          });

          setTransactionHash(tx.receipt.transactionHash);
        }
      }
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  const [isFetchingQuote, setIsFetchingQuote] = useState(true);

  useEffect(() => {
    if (coin && network) fetchQuote();
  }, [coin, network]);

  useEffect(() => {
    const interval = setInterval(() => {
      quote && verifyQuoteSettled(quote);
    }, 1000);

    return () => {
      clearInterval(interval);
      console.log("cleared");
    };
  }, [quote]);

  console.log(`selectedChain: ${selectedChain}`);

  return (
    <Modal.Root
      open={oseanModalIsOpen}
      onOpenChange={setOseanModalIsOpen}
    >
      <Modal.Trigger>{children}</Modal.Trigger>

      <Modal.Content
        className={cn(`max-[500px]:w-[90%] max-[500px]:max-w-[90%] max-md:w-4/5 md:!min-w-[700px] max-w-fit`, {
          "max-md:w-[400px] max-md:max-w-[400px]  xs:!min-w-[400px] md:!min-w-[400px]": coin === "Select currency",
        })}
      >
        <div
          className={cn("relative bg-white pt-4 pb-10 px-8 rounded-md shadow-lg w-full ", {
            "min-h-[200px]": coin === "Select currency",
          })}
        >
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
              <h2 className="text-xl xs:text-2xl mx-auto w-fit flex font-semibold text-gray-900">
                Pay with{" "}
                <div className="flex gap-1 ml-2 items-center">
                  <Image
                    src="/logo.png"
                    height={30}
                    width={30}
                    alt="osean"
                    className="w-3 xs:w-6 -translate-y-0.5"
                  />
                  <p className="font-bold inline-block !mb-0 !text-black text-xl xs:text-2xl ">OSEAN</p>
                </div>
              </h2>
            </div>
            <div className="flex flex-col gap-4">
              {false ? (
                <div className="flex ">
                  <Spinner />
                  <motion.div
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex gap-2 ml-2"
                  >
                    <TransactionOutcomeModal
                      quote={quote}
                      isOpen={transactionModalOpen}
                      onOpenChange={setTransactionModalOpen}
                    />
                    <p className="my-auto text-xl">{loadingText}</p>
                  </motion.div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    {/* <p>current osean balance: {oseanBalanceEth?.displayValue} $OSEAN</p>
                    <WertOseanTopUp /> */}
                    <label className="block text-sm font-medium text-gray-700">Network and Coin</label>

                    <div
                      className={cn("flex gap-2 justify-between max-xs:flex-col", {
                        "flex-col": coin === "Select currency",
                      })}
                    >
                      <Dropdown.Root>
                        <Dropdown.Trigger>
                          <button
                            type="button"
                            className={cn(
                              "px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-fit flex justify-between items-center max-xs:w-full",
                              {
                                "w-full": coin === "Select currency",
                              }
                            )}
                          >
                            <span className="flex items-center">
                              {typeof network !== "string" && network.icon && (
                                <Image
                                  src={network.icon}
                                  height={5}
                                  width={5}
                                  alt={network.label}
                                  className="mr-2"
                                />
                              )}
                              {typeof network !== "string" ? network.label : "Select network"}
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
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                          {options.map((option) => (
                            <Dropdown.Item
                              key={option.value}
                              onClick={() => setNetwork(option)}
                            >
                              <div className="flex items-center">
                                {option.icon && (
                                  <Image
                                    src={option.icon}
                                    height={5}
                                    width={5}
                                    alt={option.label}
                                    className="mr-2"
                                  />
                                )}
                                <span className="font-normal block truncate">{option.label}</span>
                              </div>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Content>
                      </Dropdown.Root>

                      <Dropdown.Root>
                        <Dropdown.Trigger>
                          <button
                            type="button"
                            className={cn(
                              "px-3 w-fit py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 flex justify-between items-center  max-xs:w-full",
                              {
                                "w-full": coin === "Select currency",
                              }
                            )}
                          >
                            <span className="flex items-center">
                              {coin !== "Select currency" && (
                                <Image
                                  src={
                                    coin === "ETH"
                                      ? "/eth.svg"
                                      : coin === "BNB"
                                      ? "/bsc.svg"
                                      : coin === "USDT"
                                      ? "/usd.png"
                                      : "/logo.png"
                                  }
                                  height={5}
                                  width={5}
                                  alt="osean"
                                  className="mr-2"
                                />
                              )}

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
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                          {network.value === "ETH" ? (
                            <Dropdown.Item onClick={() => setCoin("ETH")}>
                              <div className="flex items-center">
                                <Image
                                  src="/eth.svg"
                                  height={5}
                                  width={5}
                                  alt="osean"
                                  className="mr-2"
                                />
                                <span className="font-normal block truncate">ETH</span>
                              </div>
                            </Dropdown.Item>
                          ) : (
                            <Dropdown.Item onClick={() => setCoin("BNB")}>
                              <div className="flex items-center">
                                <Image
                                  src="/bsc.svg"
                                  height={5}
                                  width={5}
                                  alt="bsc"
                                  className="mr-2"
                                />
                                <span className="font-normal block truncate">BNB</span>
                              </div>
                            </Dropdown.Item>
                          )}
                          <Dropdown.Item onClick={() => setCoin("OSEAN")}>
                            <div className="flex items-center">
                              <Image
                                src="/logo.png"
                                height={5}
                                width={5}
                                alt="osean"
                                className="mr-2"
                              />
                              <span className="font-normal block truncate">OSEAN</span>
                            </div>
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => setCoin("USDT")}>
                            <div className="flex items-center">
                              <Image
                                src="/usd.png"
                                height={5}
                                width={5}
                                alt="usd"
                                className="mr-2"
                              />
                              <span className="font-normal block truncate">USDT</span>
                            </div>
                          </Dropdown.Item>
                        </Dropdown.Content>
                      </Dropdown.Root>
                    </div>
                  </div>
                  {coin !== "Select currency" && typeof network !== "string" && (
                    <>
                      <div className="flex flex-col my-0">
                        <label className="block text-sm font-medium text-gray-700">Currency conversion</label>
                        <p className="text-sm text-gray-500 ">
                          1 {coin} = ${quote?.quoteUnitPrice}
                        </p>
                        {quote && (
                          <div className="text-sm text-gray-500">
                            Quote expires in{" "}
                            <Countdown
                              date={quote?.expirationTime * 1000}
                              renderer={renderer}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col ">
                        <label className="block text-sm font-medium text-gray-700">Discounts:</label>
                        <p className="text-sm !font-bold text-green-500">
                          {coin === "ETH"
                            ? ethDiscount
                            : coin === "BNB"
                            ? bnbDiscount
                            : coin === "OSEAN"
                            ? oseanDiscount
                            : 0}
                          % Discount Applied for {coin} payments
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="block text-sm font-medium text-gray-700">Amount to pay</label>
                        <p className="text-sm text-gray-900">
                          {quote?.amountInQuote} {coin}
                        </p>
                      </div>
                      <div className="flex flex-col gap-4">
                        {transactionHash && (
                          <TransactionOutcomeModal
                            quote={quote}
                            isOpen={transactionModalOpen}
                            onOpenChange={setTransactionModalOpen}
                            txHash={transactionHash || "0x0"}
                            discount={
                              coin === "ETH"
                                ? ethDiscount
                                : coin === "BNB"
                                ? bnbDiscount
                                : coin === "OSEAN"
                                ? oseanDiscount
                                : 0
                            }
                          />
                        )}
                        <Button
                          isLoading={isLoading}
                          onClick={async (e: any) => {
                            e.preventDefault();

                            await pay();
                          }}
                        >
                          Pay {quote?.amountInQuote.toFixed(6)} {coin}
                        </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
