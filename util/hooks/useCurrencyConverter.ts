import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

export const useCurrencyConverter = () => {
  const [ethUnitPrice, setEthUnitPrice] = useState<number>(0);
  const [bnbUnitPrice, setBnbUnitPrice] = useState<number>(0);
  const [oseanUnitPrice, setOseanUnitPrice] = useState<number>(0);
  const [eurUnitUsdPrice, setEurUnitUsdPrice] = useState<number>(0);
  const [usdUnitPrice, setUsdUnitPrice] = useState<number>(1);

  // console.log(`ethUnitPrice: ${ethUnitPrice}`);
  // console.log(`bnbUnitPrice: ${bnbUnitPrice}`);
  // console.log(`oseanUnitPrice: ${oseanUnitPrice}`);
  // console.log(`eurUnitUsdPrice: ${eurUnitUsdPrice}`);
  // console.log(`usdUnitPrice: ${usdUnitPrice}`);

  const { Moralis, isInitialized } = useMoralis();

  async function fetchGlobalSetting(value: string, key: string) {
    try {
      const query = new Moralis.Query("Global");
      query.equalTo("key", key);
      const result = await query.first();
      return result?.get(value);
    } catch (error) {
      console.error(`Error fetching global setting for ${key}:`, error);
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
          return null;
      }
    }
  }

  async function updateAllPrices() {
    const now = new Date().getTime();
    const valueExpirationDate = 120_000;

    // Update each price independently if it's expired
    await Promise.all([
      updatePrice("eth-unit-price", setEthUnitPrice, now, valueExpirationDate),
      updatePrice("bnb-unit-price", setBnbUnitPrice, now, valueExpirationDate),
      updatePrice("osean-unit-price", setOseanUnitPrice, now, valueExpirationDate),
      updatePrice("eur-unit-usd", setEurUnitUsdPrice, now, valueExpirationDate),
      updatePrice("usd-unit-eur", setUsdUnitPrice, now, valueExpirationDate),
    ]);
  }

  async function updatePrice(key: string, setter: (value: number) => void, now: number, expiration: number) {
    const updatedAt = localStorage.getItem(`${key}-updated-at`);

    if (updatedAt && now - Number(updatedAt) < expiration) {
      const price = localStorage.getItem(key);
      if (price) {
        setter(Number(price));
        return;
      }
    }

    const price = await fetchGlobalSetting("value", key);
    if (price) {
      setter(Number(price));
      localStorage.setItem(key, price.toString());
      localStorage.setItem(`${key}-updated-at`, now.toString());
    }
  }

  function convertEurToCurrency({
    eurPrice,
    currency,
    maxDecimal,
  }: {
    eurPrice: number;
    currency: "eth" | "bnb" | "osean" | "usd" | "eur";
    maxDecimal?: number;
  }) {
    console.log(`eurPrice: ${eurPrice}`);
    console.log(`currency: ${currency}`);
    console.log(`maxDecimal: ${maxDecimal}`);

    if (currency === "eur") return eurPrice;

    let conversionOutput = 0;

    if (currency === "usd") {
      conversionOutput = eurPrice * eurUnitUsdPrice;
    } else if (currency === "eth") {
      const usdPrice = eurPrice * eurUnitUsdPrice;
      conversionOutput = usdPrice / ethUnitPrice;
    } else if (currency === "bnb") {
      const usdPrice = eurPrice * eurUnitUsdPrice;
      conversionOutput = usdPrice / bnbUnitPrice;
    } else if (currency === "osean") {
      const usdPrice = eurPrice * eurUnitUsdPrice;
      conversionOutput = usdPrice / oseanUnitPrice;
    }

    console.log(`conversionOutput: ${conversionOutput}`);

    if (conversionOutput === 0) {
      return "failed";
    }

    if (currency === "eth" || currency === "bnb" || currency === "osean") {
      if (maxDecimal) {
        return conversionOutput.toFixed(maxDecimal);
      } else {
        return conversionOutput.toLocaleString();
      }
    }

    return conversionOutput.toFixed(3);
  }

  useEffect(() => {
    if (isInitialized) {
      updateAllPrices();

      const clock = setInterval(() => {
        updateAllPrices();
      }, 120_000);

      return () => {
        clearInterval(clock);
      };
    }
  }, [isInitialized]);

  return {
    ethUnitPrice,
    bnbUnitPrice,
    oseanUnitPrice,
    eurUnitUsdPrice,
    usdUnitPrice,
    convertEurToCurrency,
  };
};
