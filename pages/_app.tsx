import { ChakraProvider } from "@chakra-ui/react";
import {
  ThirdwebSDKProvider,
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  trustWallet,
  embeddedWallet,
} from "@thirdweb-dev/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import ChainContext from "../cost/chain";
import { OseanFooter } from "../components/oseanFooter";
import { OseanHeader, OseanHeaderLinks } from "../components/oseanHeader";
import { useState } from "react";
import { ethers } from "ethers";
import { SwapContextProvider } from "../cost/SwapContextBNB";
import { SwapContextProviderETH } from "../cost/SwapContextETH";
import NextNProgress from "nextjs-progressbar";
import "styles/globals.scss";
// import GallaryBlock from "../components/GallaryBlock/GallaryBlock";

function MyApp({ Component, pageProps }: AppProps) {
  const [selectedChain, setSelectedChain] = useState("binance");
  return (
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
            <meta name="theme-color" content="#1FC7D4" />
            <meta
              name="twitter:image"
              content="https://osean.online/osean200.png"
            />
            <meta
              name="twitter:description"
              content="Osean is a crypto currency project designed to invest in Yachting industry"
            />
            <meta name="twitter:card" content="summary_large_image" />
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
  );
}

export default MyApp;
