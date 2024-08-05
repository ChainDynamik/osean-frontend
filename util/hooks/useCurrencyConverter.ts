import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const useCurrencyConverter = () => {
  const [ethUnitPrice, setEthUnitPrice] = useState<number>(0);
  const [bnbUnitPrice, setBnbUnitPrice] = useState<number>(0);
  const [oseanUnitPrice, setOseanUnitPrice] = useState<number>(0);
  const [eurUnitUsdPrice, setEurUnitUsdPrice] = useState<number>(0);
  const [usdUnitPrice, setUsdUnitPrice] = useState<number>(0);

  const { Moralis, isInitialized } = useMoralis();

  async function fetchGlobalSetting(value: string, key: string) {
    try {
      const query = new Moralis.Query("Global");
      query.equalTo("key", key);
      const result = await query.first();
      return result?.get(value);
    } catch (error) {
      // Find the value from local storage
      switch (key) {
        case "eth-unit-price":
          return localStorage.getItem("eth-unit-price");
        case "bnb-unit-price":
          return localStorage.getItem("bnb-unit-price");
        case "osean-unit-price":
          return localStorage.getItem("osean-unit-price");
        case "eur-unit-usd":
          return localStorage.getItem("eur-unit-usd");
        case "usd-unit-eur":
          return localStorage.getItem("usd-unit-eur");
        default:
          return 0;
      }
    }
  }

  async function updateAllPrices() {
    // Check if the values are in local storage and how old they are
    // If they are older than 2 minutes,  update them

    const ethPriceUpdatedAt = localStorage.getItem("eth-unit-price-updated-at");
    const bnbPriceUpdatedAt = localStorage.getItem("bnb-unit-price-updated-at");
    const oseanPriceUpdatedAt = localStorage.getItem("osean-unit-price-updated-at");
    const eurUsdPriceUpdatedAt = localStorage.getItem("eur-unit-usd-updated-at");
    const usdPriceUpdatedAt = localStorage.getItem("usd-unit-eur-updated-at");

    const now = new Date().getTime();
    const valueExpirationDate = 120_000;

    if (ethPriceUpdatedAt && now - Number(ethPriceUpdatedAt) < valueExpirationDate) {
      setEthUnitPrice(Number(localStorage.getItem("eth-unit-price")));
      return;
    }

    if (bnbPriceUpdatedAt && now - Number(bnbPriceUpdatedAt) < valueExpirationDate) {
      setBnbUnitPrice(Number(localStorage.getItem("bnb-unit-price")));
      return;
    }

    if (oseanPriceUpdatedAt && now - Number(oseanPriceUpdatedAt) < valueExpirationDate) {
      setOseanUnitPrice(Number(localStorage.getItem("osean-unit-price")));
      return;
    }

    if (eurUsdPriceUpdatedAt && now - Number(eurUsdPriceUpdatedAt) < valueExpirationDate) {
      setEurUnitUsdPrice(Number(localStorage.getItem("eur-unit-usd")));
      return;
    }

    if (usdPriceUpdatedAt && now - Number(usdPriceUpdatedAt) < valueExpirationDate) {
      setUsdUnitPrice(Number(localStorage.getItem("usd-unit-eur")));
      return;
    }

    const ethPrice = await fetchGlobalSetting("value", "eth-unit-price");
    const bnbPrice = await fetchGlobalSetting("value", "bnb-unit-price");
    const oseanPrice = await fetchGlobalSetting("value", "osean-unit-price");
    const eurUsdPrice = await fetchGlobalSetting("value", "eur-unit-usd");
    const usdPrice = await fetchGlobalSetting("value", "usd-unit-eur");

    setEthUnitPrice(Number(ethPrice));
    setBnbUnitPrice(Number(bnbPrice));
    setOseanUnitPrice(Number(oseanPrice));
    setEurUnitUsdPrice(Number(eurUsdPrice));
    setUsdUnitPrice(Number(usdPrice));

    // Save all of this in localstorage
    localStorage.setItem("eth-unit-price", ethPrice);
    localStorage.setItem("bnb-unit-price", bnbPrice);
    localStorage.setItem("osean-unit-price", oseanPrice);
    localStorage.setItem("eur-unit-usd", eurUsdPrice);
    localStorage.setItem("usd-unit-eur", usdPrice);

    localStorage.setItem("eth-unit-price-updated-at", now.toString());
    localStorage.setItem("bnb-unit-price-updated-at", now.toString());
    localStorage.setItem("osean-unit-price-updated-at", now.toString());
    localStorage.setItem("eur-unit-usd-updated-at", now.toString());
    localStorage.setItem("usd-unit-eur-updated-at", now.toString());
  }

  function convertEurToCurrency({
    eurPrice,
    currency,
  }: {
    eurPrice: number;
    currency: "eth" | "bnb" | "osean" | "usd";
  }) {
    let conversionOutput = 0;

    console.log(`EUR Price: ${eurPrice}`);
    console.log(`Currency: ${currency}`);
    console.log(`eurPrice type: ${typeof eurPrice}`);

    if (currency === "usd") {
      conversionOutput = eurPrice * eurUnitUsdPrice;
    }

    if (currency === "eth") {
      const usdPrice = eurPrice * eurUnitUsdPrice;
      conversionOutput = usdPrice / ethUnitPrice;
    }

    if (currency === "bnb") {
      conversionOutput = eurPrice / eurUnitUsdPrice / bnbUnitPrice;
    }

    if (currency === "osean") {
      conversionOutput = eurPrice / eurUnitUsdPrice / oseanUnitPrice;
    }
    if (conversionOutput === 0) {
      return eurPrice;
    }
    if (currency === "eth" || currency === "bnb" || currency === "osean") {
      return conversionOutput.toLocaleString();
    }

    return conversionOutput.toFixed(0);
  }

  useEffect(() => {
    if (
      ethUnitPrice === 0 ||
      bnbUnitPrice === 0 ||
      oseanUnitPrice === 0 ||
      eurUnitUsdPrice === 0 ||
      usdUnitPrice === 0
    ) {
      isInitialized && updateAllPrices();
    }

    const clock = setInterval(() => {
      isInitialized && updateAllPrices();
    }, 120_000);

    return () => {
      clearInterval(clock);
    };
  }, [isInitialized, ethUnitPrice, bnbUnitPrice, oseanUnitPrice, eurUnitUsdPrice, usdUnitPrice]);

  return {
    ethUnitPrice,
    bnbUnitPrice,
    oseanUnitPrice,
    eurUnitUsdPrice,
    usdUnitPrice,
    convertEurToCurrency,
  };
};
