import { ChakraProvider, useFocusEffect } from "@chakra-ui/react";
import {
  ThirdwebSDKProvider,
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  embeddedWallet,
  useAddress,
  useWallet,
} from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import ChainContext from "../cost/chain";
import { OseanFooter } from "../components/oseanFooter";
import { OseanHeader, OseanHeaderLinks } from "../components/oseanHeader";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { SwapContextProvider } from "../cost/SwapContextBNB";
import { SwapContextProviderETH } from "../cost/SwapContextETH";
import NextNProgress from "nextjs-progressbar";
import "styles/globals.scss";
import useYachts from "../hooks/useYachts";
// import GallaryBlock from "../components/GallaryBlock/GallaryBlock";
import { MoralisProvider, useMoralis } from "react-moralis";
import Moralis from "moralis-v1";
import { createThirdwebClient } from "thirdweb";

const ThirdwebMoralisLinker = () => {
  const { user, authenticate, isInitialized } = useMoralis();
  const address = useAddress();

  const wallet = useWallet();

  async function checkLink() {
    if (user) return;

    // Get message to sign from the auth api
    const { message } = await Moralis.Cloud.run("requestMessage", {
      address,
      chain: parseInt("1", 16),
      networkType: "evm",
    });

    // const signedMessage = await wallet?.signMessage(message);

    await authenticate({
      signingMessage: message,
      throwOnError: true,
    });

    // if(user && address) {
    //   const provider = new
    //   const signer = provider.getSigner();
    //   const address = await signer.getAddress();
    //   console.log("address", address);
    // }
  }

  console.log(user);

  useEffect(() => {
    if (address && isInitialized) checkLink();
  }, [address, user, isInitialized]);

  return <>p</>;
};

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedChain, setSelectedChain] = useState("sepolia");

  const client = createThirdwebClient({
    clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID as string,
  });

  const { fetchChrisBoats } = useYachts();

  useEffect(() => {
    fetchChrisBoats();
  }, []);

  return (
    <MoralisProvider
      serverUrl={process.env.NEXT_PUBLIC_PARSE_SERVER_URL as string}
      appId={process.env.NEXT_PUBLIC_PARSE_APP_ID as string}
    >
      <ChainContext.Provider value={{ selectedChain, setSelectedChain }}>
        <ThirdwebProvider
          clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}
          secretKey={process.env.NEXT_PUBLIC_TEMPLATE_SECRET_KEY}
          activeChain={selectedChain}
          supportedWallets={[
            metamaskWallet(),
            coinbaseWallet(),
            walletConnect(),
            trustWallet(),
            embeddedWallet({
              auth: {
                options: ["email", "google", "facebook", "apple"],
              },
            }),
          ]}
          sdkOptions={{
            gatewayUrls: ["https://ipfs.io/ipfs/"],
          }}
        >
          <ChakraProvider>
            <ThirdwebMoralisLinker />
            {/* <GallaryBlock /> */}
            <Head>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
              />
              <meta
                name="description"
                content="Osean is a crypto currency project designed to invest in Yachting industry"
              />
              <meta
                name="theme-color"
                content="#1FC7D4"
              />
              <meta
                name="twitter:image"
                content="https://osean.online/osean200.png"
              />
              <meta
                name="twitter:description"
                content="Osean is a crypto currency project designed to invest in Yachting industry"
              />
              <meta
                name="twitter:card"
                content="summary_large_image"
              />
              <meta
                name="twitter:title"
                content="🌊 OSEAN DAO - Osean DAO dapp"
              />
              <title>Osean DAO</title>
            </Head>
            {/* <PhotoGallery /> */}
            <OseanHeaderLinks />

            <OseanHeader />
            {/* Progress bar when navigating between pages */}
            <NextNProgress
              color="var(--color-tertiary)"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              showOnShallow={true}
            />
            <SwapContextProvider>
              <SwapContextProviderETH>
                <Component {...pageProps} />
              </SwapContextProviderETH>
            </SwapContextProvider>
            <OseanFooter />
          </ChakraProvider>
        </ThirdwebProvider>
      </ChainContext.Provider>
    </MoralisProvider>
  );
}

export default MyApp;
