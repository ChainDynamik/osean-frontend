import { useWertWidget } from "@wert-io/module-react-component";
import type { GeneralOptions, ReactiveOptions } from "@wert-io/module-react-component";
import { useState } from "react";
import { useMoralis } from "react-moralis";
import { Web3 } from "web3";
import WertWidget from "@wert-io/widget-initializer";
import { useChainId } from "@thirdweb-dev/react";
import { encodeFunctionData } from "viem";
import { oseanOrderManagementABI } from "../../abi";
import { Options } from "@wert-io/widget-initializer/types";
const web3 = new Web3();

function generateFunctionCall(ethAddress: string) {
  const data = encodeFunctionData({
    abi: oseanOrderManagementABI,
    functionName: "buyOseanTokenWithEth",
    args: [BigInt(5), ethAddress],
  });

  console.log(`buying Osean token with ETH, slippage 5%, destination: ${ethAddress}`);

  return data;
}

export const WertOseanTopUp = ({ chain }: { chain: "eth" | "bnb" }) => {
  const isTestnet = true;

  const { Moralis, user } = useMoralis();

  const getNetwork = () => {
    if (chain === "eth") {
      return isTestnet ? "sepolia" : "mainnet";
    } else {
      return isTestnet ? "bsc" : "mainnet";
    }
  };

  async function attemptOseanTopup() {
    const sc_address =
      chain === "eth"
        ? process.env.NEXT_PUBLIC_ETH_OOM_CONTRACT_ADDRESS
        : process.env.NEXT_PUBLIC_BNB_OOM_CONTRACT_ADDRESS;

    const sc_input_data = generateFunctionCall(user?.get("ethAddress"));

    // const { commodity, network, commodity_amount, sc_address, sc_input_data } = request.params;
    const signedData = await Moralis.Cloud.run("signWertPaymentRequest", {
      commodity: chain === "eth" ? "ETH" : "BNB",
      network: getNetwork(),
      commodity_amount: "0.001",
      sc_address,
      sc_input_data,
    });

    const options: Options = {
      partner_id: process.env.NEXT_PUBLIC_WERT_PARTNER_ID as string,
      origin: "https://sandbox.wert.io",
      // origin: "https://example.com",
      // ...
      listeners: {
        close: () => {
          console.log("Widget closed");
        },
        error: (error: any) => {
          console.error("Widget error", error);
        },
      },
    };

    const wertPluginProps = {
      ...signedData,
      ...options,
    };

    console.log(wertPluginProps);

    const wertWidget = new WertWidget({
      ...wertPluginProps,
      extra: {
        item_info: {
          name: "$OSEAN Top Up",
          image_url: "https://osean.online/osean200.png",
        },
      },
    });

    wertWidget.open();
  }

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          attemptOseanTopup();
        }}
      >
        Topup
      </button>
    </>
  );
};
