import {
  Box,
  Card,
  Flex,
  Select,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useAddress, useSwitchChain } from "@thirdweb-dev/react";
import React, { useContext, useEffect, useState } from "react";
import WertWidget from "@wert-io/widget-initializer";
import { useMoralis } from "react-moralis";
import { encodeFunctionData } from "viem";
import { oseanOrderManagementABI } from "../../abi";
import { Options } from "@wert-io/widget-initializer/types";
import { useCurrencyConverter } from "../../util/hooks/useCurrencyConverter";
import { BSC_OOM_CONTRACT_ADDRESS, ETH_OOM_CONTRACT_ADDRESS, IS_TESTNET } from "../../const/contractAddresses";
import { Binance, BinanceTestnet, Ethereum, Sepolia } from "@thirdweb-dev/chains";

function generateFunctionCall(ethAddress: string) {
  const data = encodeFunctionData({
    abi: oseanOrderManagementABI,
    functionName: "buyOseanTokenWithEth",
    args: [BigInt(5), ethAddress],
  });

  console.log(`buying Osean token with ETH, slippage 5%, destination: ${ethAddress}`);

  return data;
}

const OseanOnRamping = () => {
  const [chain, setChain] = useState("none");
  const [amount, setAmount] = useState("");

  const { Moralis, user } = useMoralis();
  const { convertEurToCurrency } = useCurrencyConverter();

  const switchChain = useSwitchChain();

  async function handleSwitchChain(chain: string) {
    if (chain === "eth" && IS_TESTNET) {
      await switchChain(Sepolia.chainId);
    } else if (chain === "eth" && !IS_TESTNET) {
      await switchChain(Ethereum.chainId);
    } else if (chain === "bsc" && IS_TESTNET) {
      await switchChain(BinanceTestnet.chainId);
    } else if (chain === "bsc" && !IS_TESTNET) {
      await switchChain(Binance.chainId);
    }
  }

  const getNetwork = () => {
    if (chain === "eth") {
      return IS_TESTNET ? "sepolia" : "ethereum";
    } else {
      return IS_TESTNET ? "bsc" : "bsc";
    }
  };

  async function attemptOseanTopup() {
    const sc_address = chain === "eth" ? ETH_OOM_CONTRACT_ADDRESS : BSC_OOM_CONTRACT_ADDRESS;

    const eurPriceFloat = parseFloat(amount);

    console.log(eurPriceFloat);

    const requiredEth = convertEurToCurrency({
      eurPrice: eurPriceFloat,
      currency: chain === "eth" ? "eth" : "bnb",
      maxDecimal: 8,
    });

    const sc_input_data = generateFunctionCall(user?.get("ethAddress"));

    // const { commodity, network, commodity_amount, sc_address, sc_input_data } = request.params;
    const signedData = await Moralis.Cloud.run("signWertPaymentRequest", {
      commodity: chain === "eth" ? "ETH" : "BNB",
      network: getNetwork(),
      commodity_amount: requiredEth.toString(),
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

  // useEffect onChainChange

  useEffect(() => {
    if (chain) handleSwitchChain(chain);
  }, [chain]);

  return (
    <Card
      p={6}
      bg="linear-gradient(135deg, #1F86FF, #0052CC)"
      color="white"
      borderRadius="xl"
      boxShadow="xl"
      maxWidth="600px"
      mx="auto"
      my={8}
    >
      <VStack
        spacing={6}
        align="stretch"
      >
        <Heading
          as="h2"
          size="xl"
          textAlign="center"
        >
          $OSEAN On-Ramping
        </Heading>
        <Text
          textAlign="center"
          className="text-gray-200"
        >
          Quickly and easily purchase $OSEAN tokens directly with fiat currency.
        </Text>
        <Select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          bg="white"
          color="black"
        >
          <option value="none">Select chain</option>
          <option value="eth">Ethereum</option>
          <option value="bsc">Binance</option>
        </Select>

        <InputGroup>
          <Input
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            bg="white"
            color="black"
          />
          <InputRightAddon
            bg="white"
            color="black"
            className="uppercase"
          >
            EUR
          </InputRightAddon>
        </InputGroup>
        <Button
          onClick={attemptOseanTopup}
          colorScheme="blue"
          size="lg"
          fontWeight="bold"
          _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
          transition="all 0.2s"
        >
          Buy $OSEAN with {"EUR".toUpperCase()}
        </Button>
      </VStack>
    </Card>
  );
};

export default OseanOnRamping;
