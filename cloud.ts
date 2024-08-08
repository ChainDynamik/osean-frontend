const Moralis = require("moralis").default;
const Parse = require("parse/node");
const { Web3 } = require("web3");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const wertPrivateKey = process.env.WERT_PRIVATE_KEY;
const wertTestnet = true;

const { signSmartContractData } = require("@wert-io/widget-sc-signer");

const DOMAIN = "oseandao.com";
const STATEMENT = "Sign this message to connect your wallet to OseanDAO";
const URI = "https://oseandao.com";
const EXPIRATION_TIME = "2025-01-01T00:00:00.000Z";
const TIMEOUT = 15;
const web3 = new Web3();

const beforeApiRequest = async (ts1: any, ts2: any, ts3: any) => {
  // implement Rate Limiting Logic
};

const getErrorMessage = (error: any, endpoint: string) => {
  if (error.message) {
    return error.message;
  }
  if (error.error) {
    return error.error;
  }
  return `Error occurred while calling ${endpoint}`;
};

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

{
  Parse.Cloud.define("getBlock", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getBlock");
      const result = await Moralis.EvmApi.block.getBlock(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getBlock"));
    }
  });

  Parse.Cloud.define("getDateToBlock", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getDateToBlock");
      const result = await Moralis.EvmApi.block.getDateToBlock(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getDateToBlock"));
    }
  });

  Parse.Cloud.define("getLogsByAddress", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getLogsByAddress");
      const result = await Moralis.EvmApi.events.getContractLogs(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getLogsByAddress"));
    }
  });

  Parse.Cloud.define("getNFTTransfersByBlock", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getNFTTransfersByBlock");
      const result = await Moralis.EvmApi.nft.getNFTTransfersByBlock(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getNFTTransfersByBlock"));
    }
  });

  Parse.Cloud.define("getTransaction", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getTransaction");
      const result = await Moralis.EvmApi.transaction.getTransaction(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getTransaction"));
    }
  });

  Parse.Cloud.define("getContractEvents", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getContractEvents");
      const result = await Moralis.EvmApi.events.getContractEvents(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getContractEvents"));
    }
  });

  Parse.Cloud.define("runContractFunction", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "runContractFunction");
      const result = await Moralis.EvmApi.utils.runContractFunction(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "runContractFunction"));
    }
  });

  Parse.Cloud.define("getTransactions", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getTransactions");
      const result = await Moralis.EvmApi.transaction.getWalletTransactions(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getTransactions"));
    }
  });

  Parse.Cloud.define("getNativeBalance", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getNativeBalance");
      const result = await Moralis.EvmApi.balance.getNativeBalance(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getNativeBalance"));
    }
  });

  Parse.Cloud.define("getTokenBalances", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getTokenBalances");
      const result = await Moralis.EvmApi.token.getWalletTokenBalances(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getTokenBalances"));
    }
  });

  Parse.Cloud.define("getTokenTransfers", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getTokenTransfers");
      const result = await Moralis.EvmApi.token.getWalletTokenTransfers(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getTokenTransfers"));
    }
  });

  Parse.Cloud.define("getNFTs", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getNFTs");
      const result = await Moralis.EvmApi.nft.getWalletNFTs(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getNFTs"));
    }
  });

  Parse.Cloud.define("getNFTTransfers", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getNFTTransfers");
      const result = await Moralis.EvmApi.nft.getWalletNFTTransfers(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getNFTTransfers"));
    }
  });

  Parse.Cloud.define("getWalletNFTCollections", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getWalletNFTCollections");
      const result = await Moralis.EvmApi.nft.getWalletNFTCollections(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getWalletNFTCollections"));
    }
  });

  Parse.Cloud.define("getNFTsForContract", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getNFTsForContract");
      const result = await Moralis.EvmApi.nft.getWalletNFTs(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getNFTsForContract"));
    }
  });

  Parse.Cloud.define("getTokenMetadata", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getTokenMetadata");
      const result = await Moralis.EvmApi.token.getTokenMetadata(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getTokenMetadata"));
    }
  });

  Parse.Cloud.define("getNFTTrades", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getNFTTrades");
      const result = await Moralis.EvmApi.nft.getNFTTrades(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getNFTTrades"));
    }
  });

  Parse.Cloud.define("getNFTLowestPrice", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getNFTLowestPrice");
      const result = await Moralis.EvmApi.nft.getNFTLowestPrice(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getNFTLowestPrice"));
    }
  });

  Parse.Cloud.define("getTokenMetadataBySymbol", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getTokenMetadataBySymbol");
      const result = await Moralis.EvmApi.token.getTokenMetadataBySymbol(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getTokenMetadataBySymbol"));
    }
  });

  Parse.Cloud.define("getTokenPrice", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getTokenPrice");
      const result = await Moralis.EvmApi.token.getTokenPrice(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getTokenPrice"));
    }
  });

  Parse.Cloud.define("getTokenAddressTransfers", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getTokenAddressTransfers");
      const result = await Moralis.EvmApi.token.getTokenTransfers(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getTokenAddressTransfers"));
    }
  });

  Parse.Cloud.define("getTokenAllowance", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getTokenAllowance");
      const result = await Moralis.EvmApi.token.getTokenAllowance(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getTokenAllowance"));
    }
  });

  Parse.Cloud.define("searchNFTs", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "searchNFTs");
      const result = await Moralis.EvmApi.nft.searchNFTs(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "searchNFTs"));
    }
  });

  Parse.Cloud.define(
    "getNftTransfersFromToBlock",
    async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
      try {
        await beforeApiRequest(user, ip, "getNftTransfersFromToBlock");
        const result = await Moralis.EvmApi.nft.getNFTTransfersFromToBlock(params);
        return result?.raw;
      } catch (error) {
        throw new Error(getErrorMessage(error, "getNftTransfersFromToBlock"));
      }
    }
  );

  Parse.Cloud.define("getAllTokenIds", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getAllTokenIds");
      const result = await Moralis.EvmApi.nft.getContractNFTs(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getAllTokenIds"));
    }
  });

  Parse.Cloud.define("getContractNFTTransfers", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getContractNFTTransfers");
      const result = await Moralis.EvmApi.nft.getNFTContractTransfers(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getContractNFTTransfers"));
    }
  });

  Parse.Cloud.define("getNFTOwners", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getNFTOwners");
      const result = await Moralis.EvmApi.nft.getNFTOwners(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getNFTOwners"));
    }
  });

  Parse.Cloud.define("getNFTMetadata", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getNFTMetadata");
      const result = await Moralis.EvmApi.nft.getNFTContractMetadata(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getNFTMetadata"));
    }
  });

  Parse.Cloud.define("reSyncMetadata", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "reSyncMetadata");
      const result = await Moralis.EvmApi.nft.reSyncMetadata(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "reSyncMetadata"));
    }
  });

  Parse.Cloud.define("syncNFTContract", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "syncNFTContract");
      const result = await Moralis.EvmApi.nft.syncNFTContract(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "syncNFTContract"));
    }
  });

  Parse.Cloud.define("getTokenIdMetadata", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getTokenIdMetadata");
      const result = await Moralis.EvmApi.nft.getNFTMetadata(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getTokenIdMetadata"));
    }
  });

  Parse.Cloud.define("getTokenIdOwners", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getTokenIdOwners");
      const result = await Moralis.EvmApi.nft.getNFTTokenIdOwners(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getTokenIdOwners"));
    }
  });

  Parse.Cloud.define("getWalletTokenIdTransfers", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getWalletTokenIdTransfers");
      const result = await Moralis.EvmApi.nft.getNFTTransfers(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getWalletTokenIdTransfers"));
    }
  });

  Parse.Cloud.define("resolveDomain", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "resolveDomain");
      const result = await Moralis.EvmApi.resolve.resolveDomain(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "resolveDomain"));
    }
  });

  Parse.Cloud.define("resolveAddress", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "resolveAddress");
      const result = await Moralis.EvmApi.resolve.resolveAddress(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "resolveAddress"));
    }
  });

  Parse.Cloud.define("getPairReserves", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getPairReserves");
      const result = await Moralis.EvmApi.defi.getPairReserves(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getPairReserves"));
    }
  });

  Parse.Cloud.define("getPairAddress", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "getPairAddress");
      const result = await Moralis.EvmApi.defi.getPairAddress(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "getPairAddress"));
    }
  });

  Parse.Cloud.define("uploadFolder", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "uploadFolder");
      const result = await Moralis.EvmApi.ipfs.uploadFolder(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "uploadFolder"));
    }
  });

  Parse.Cloud.define("web3ApiVersion", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "web3ApiVersion");
      // @ts-ignore
      const result = await Moralis.EvmApi.utils.web3ApiVersion(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "web3ApiVersion"));
    }
  });

  Parse.Cloud.define("endpointWeights", async ({ params, user, ip }: { params: any; user: any; ip: any }) => {
    try {
      await beforeApiRequest(user, ip, "endpointWeights");
      // @ts-ignore
      const result = await Moralis.EvmApi.utils.endpointWeights(params);
      return result?.raw;
    } catch (error) {
      throw new Error(getErrorMessage(error, "endpointWeights"));
    }
  });
}

async function requestMessage({ address, chain, networkType }: { address: any; chain: any; networkType: any }) {
  const result = await Moralis.Auth.requestMessage({
    address,
    chain,
    networkType,
    domain: DOMAIN,
    statement: STATEMENT,
    uri: URI,
    expirationTime: EXPIRATION_TIME,
    timeout: TIMEOUT,
  });

  const { message } = result.toJSON();

  return message;
}

Parse.Cloud.define("requestMessage", async ({ params }: { params: any }) => {
  const { address, chain, networkType } = params;
  const message = await requestMessage({
    address,
    chain,
    networkType,
  });
  return { message };
});

Parse.Cloud.define("getPluginSpecs", () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return [];
});

Parse.Cloud.define("getServerTime", () => {
  // Not implemented, only excists to remove client-side errors when using the moralis-v1 package
  return null;
});

/**
 * Types
 */

// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT
// END DEFAULT

async function getSettingsKey(key: string) {
  const query = new Parse.Query("Global");
  query.equalTo("key", key);
  const settings = await query.first({ useMasterKey: true });

  if (!settings) {
    throw new Error(`Settings key ${key} not found`);
  }

  return settings.get("value");
}

Parse.Cloud.define("generateQuote", async (request: any) => {
  // Check if there is a pending, not expired/settled quote for this user

  const { currency, selectedOffer, selectedExtras, network } = request.params;

  {
    const Quote = Parse.Object.extend("Quote");
    const query = new Parse.Query(Quote);
    query.equalTo("currency", currency);
    query.equalTo("network", network);
    query.equalTo("status", "pending");
    query.equalTo("requiredSigner", request.user.get("ethAddress"));
    query.greaterThanOrEqualTo("expirationTime", Math.floor(Date.now() / 1000));
    const existingQuote = await query.first({ useMasterKey: true });

    if (existingQuote) {
      // return existingQuote.toJSON();
    }
  }

  const { amountUsd } = request.params;
  const user = request.user;

  const quoteUnitPrice =
    currency === "USDT"
      ? 1
      : Number(
          await getSettingsKey(
            currency === "ETH" ? "eth-unit-price" : currency === "BNB" ? "bnb-unit-price" : "osean-unit-price"
          )
        );
  const amountInQuote = Number(amountUsd) / quoteUnitPrice;
  const amountInWei = web3.utils.toWei(amountInQuote, currency === "USDT" ? "mwei" : "ether");

  // 5 minutes from now
  const expirationTime = Math.floor(Date.now() / 1000) + 300;
  const signer = user.get("ethAddress");
  const message = `${amountInWei}_${expirationTime}_${signer}_`;
  const signature = await web3.eth.accounts.sign(message, process.env.BACKEND_WALLET_PRIVATE_KEY);

  // Save this quote in the database
  const Quote = Parse.Object.extend("Quote");
  const quote = new Quote();
  quote.set("currency", currency);
  quote.set("network", network);
  quote.set("amountUsd", amountUsd);
  quote.set("amountInWei", amountInWei);
  quote.set("amountInQuote", amountInQuote);
  quote.set("quoteUnitPrice", quoteUnitPrice);
  quote.set("expirationTime", expirationTime);
  quote.set("requiredSigner", signer);
  quote.set("signature", signature.signature);
  quote.set("message", message);
  quote.set("status", "pending");
  quote.set("signatureRaw", signature);
  quote.set("selectedOffer", selectedOffer);
  quote.set("selectedExtras", selectedExtras);

  await quote.save(null, { useMasterKey: true });

  return quote.toJSON();

  // if (currency === "ETH") {

  // } else if (currency === "OSEAN") {
  //   {
  //     const Quote = Parse.Object.extend("Quote");
  //     const query = new Parse.Query(Quote);
  //     query.equalTo("currency", currency);
  //     query.equalTo("status", "pending");
  //     query.equalTo("requiredSigner", request.user.get("ethAddress"));
  //     query.greaterThanOrEqualTo("expirationTime", Math.floor(Date.now() / 1000));
  //     const existingQuote = await query.first({useMasterKey: true});

  //     if (existingQuote) {
  //       return existingQuote.toJSON();
  //     }
  //   }

  //   const { amountUsd } = request.params;

  //   const user = request.user;

  //   const quoteUnitPrice = Number(await getSettingsKey("osean-unit-price"));
  //   const amountInQuote = Number(amountUsd) / quoteUnitPrice;
  //   const amountInWei = web3.utils.toWei(amountInQuote, "ether");

  //   // 5 minutes from now
  //   const expirationTime = Math.floor(Date.now() / 1000) + 300;
  //   const signer = user.get("ethAddress");
  //   const message = `${amountInWei}_${expirationTime}_${signer}`;
  //   const signature = await web3.eth.accounts.sign(message, process.env.BACKEND_WALLET_PRIVATE_KEY);

  //   // Save this quote in the database
  //   const Quote = Parse.Object.extend("Quote");
  //   const quote = new Quote();
  //   quote.set("currency", currency);
  //   quote.set("amountUsd", amountUsd);
  //   quote.set("amountInWei", amountInWei);
  //   quote.set("amountInQuote", amountInQuote);
  //   quote.set("quoteUnitPrice", quoteUnitPrice);
  //   quote.set("expirationTime", expirationTime);
  //   quote.set("requiredSigner", signer);
  //   quote.set("signature", signature.signature);
  //   quote.set("message", message);
  //   quote.set("signatureRaw", signature);
  //   await quote.save(null, {useMasterKey: true})

  //   return quote.toJSON();
  // }
});

Parse.Cloud.define("createOrder", async (request: any) => {
  const { yachtId } = request.params;
  const user = request.user;

  // Check if there is a user for this user already in pending state (not settled)
  {
    const Order = Parse.Object.extend("Order");
    const query = new Parse.Query(Order);
    query.notEqualTo("status", "settled");
    query.equalTo("user", user);
    const existingOrder = await query.first({ useMasterKey: true });

    // If exists, throw an error
    if (existingOrder) {
      throw new Error("User already has an order in pending state");
    }
  }

  // Set expiry time to 15 minutes from now
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 15);

  const Order = Parse.Object.extend("Order");
  const order = new Order();
  order.set("yachtId", yachtId);
  order.set("status", "pending");
  order.set("quoteExpiryDate", expiryDate);
  order.set("user", user);

  await order.save(null, { useMasterKey: true });
  return order.toJSON();
});

Parse.Cloud.beforeSave("_User", async (request: any) => {
  const user = request.object;

  const savedEthAddress = user.get("ethAddress");
  const authData = user.get("authData");

  // Cancel if the address inside the authData is already belonging to another user
  if (authData?.moralisEth) {
    const query = new Parse.Query(Parse.User);
    query.equalTo("ethAddress", authData.moralisEth.id);
    const existingUser = await query.first({ useMasterKey: true });

    if (existingUser && existingUser.id !== user.id) {
      throw new Error("Address already belongs to another user");
    }
  }

  if (!savedEthAddress && authData?.moralisEth) {
    user.set("ethAddress", authData.moralisEth.id);
  }

  /// STRIPE

  const alreadySetup = user.get("customerId");

  if (!alreadySetup) {
    // Run createStripeCustomer function if the user is new
    const customer = await stripe.customers.create({ email: user.get("email") });
    // Creates an stripe setupIntent, that will enable the stripe lib to perform
    // a single operation related to payments
    const intent = await stripe.setupIntents.create({
      customer: customer.id,
    });

    // Set and save the stripe ids to the Parse.User object
    user.set({
      customerId: customer.id,
      setupSecret: intent.client_secret,
    });
  }
});

/// STRIPE

/**
 * Stripe Helpers
 */

const formatAmount = (amount: any, currency: any) => {
  amount = zeroDecimalCurrency(amount, currency) ? amount : (amount / 100).toFixed(2);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

// Format amount for Stripe
const formatAmountForStripe = (amount: any, currency: any) => {
  return zeroDecimalCurrency(amount, currency) ? amount : Math.round(amount * 100);
};

// Check if we have a zero decimal currency
// https://stripe.com/docs/currencies#zero-decimal
const zeroDecimalCurrency = (amount: any, currency: any) => {
  let numberFormat = new Intl.NumberFormat(["en-US"], {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency;
};

Parse.Cloud.define("addNewPaymentMethod", async (request: any) => {
  // Get Parse.User object
  const userQuery = new Parse.Query(Parse.User);
  userQuery.equalTo("objectId", request.params.userId);
  let user = await userQuery.first({ useMasterKey: true });

  // Retrieve complete stripe payment method by its id
  const stripePaymentMethod = await stripe.paymentMethods.retrieve(request.params.paymentMethodId);

  // Create a new SetupIntent so the customer can add a new method next time.
  const intent = await stripe.setupIntents.create({
    customer: `${stripePaymentMethod.customer}`,
  });
  user.set("setupSecret", intent.client_secret);
  user = await user.save(null, { useMasterKey: true });

  // Creates a new Parse object in the PaymentMethod class
  let paymentMethod = new Parse.Object("PaymentMethod");

  paymentMethod.set({
    user: user,
    type: "card",
    stripeId: stripePaymentMethod.id,
    card: stripePaymentMethod.card,
    isDefault: true,
  });

  await paymentMethod.save();

  // Mark all the other methods besides this of this user isDefault to false
  {
    const query = new Parse.Query("PaymentMethod");
    query.equalTo("user", user);
    const paymentMethods = await query.find({ useMasterKey: true });

    for (const method of paymentMethods) {
      if (method.id !== paymentMethod.id) {
        method.set("isDefault", false);
        await method.save();
      }
    }
  }

  return true;
});

Parse.Cloud.define("setPreferredPaymentMethod", async (request: any) => {
  const user = request.user;
  const { paymentMethodId } = request.params;

  // Find the payment method in the database
  const PaymentMethod = new Parse.Query("PaymentMethod");
  PaymentMethod.equalTo("objectId", paymentMethodId);
  const paymentMethod = await PaymentMethod.first({
    useMasterKey: true,
  });

  if (!paymentMethod) {
    throw new Error("Payment method not found");
  }

  // Find all the other ones of this user and set them to not preferred
  const PaymentMethods = new Parse.Query("PaymentMethod");
  PaymentMethods.equalTo("user", user);
  const paymentMethods = await PaymentMethods.find({ useMasterKey: true });

  for (const method of paymentMethods) {
    method.set("isDefault", false);
    await method.save();
  }

  // Set the preferred one
  paymentMethod.set("isDefault", true);
  await paymentMethod.save();

  return paymentMethod;
});

Parse.Cloud.define("attemptStripePayment", async (request: any) => {
  const user = request.user;
  const { selectedOffer, selectedExtras, network, amountEur } = request.params;

  // Create the payment intent
  const currency = "usd";
  const amount = formatAmountForStripe(amountEur, currency);

  // Get the default payment method of the user
  const paymentMethodQuery = new Parse.Query("PaymentMethod");
  paymentMethodQuery.equalTo("user", user);
  paymentMethodQuery.equalTo("isDefault", true);
  const paymentMethod = await paymentMethodQuery.first({ useMasterKey: true });

  if (!paymentMethod) {
    throw new Error("No default payment method");
  }

  // Look up the Stripe customer id.
  const customer = user.get("customerId");

  // Create a charge using an unique idempotency key
  // to protect against double charges.
  const idempotencyKey = new Date().getTime();
  const payment = await stripe.paymentIntents.create(
    {
      amount,
      currency,
      customer,
      payment_method: paymentMethod.get("stripeId"),
      off_session: false,
      confirm: true,
      confirmation_method: "manual",
      return_url: "http://localhost:3005/",
    },
    { idempotencyKey }
  );

  // If the result is successful, write it back to the database.
  let Payment = new Parse.Object("Payment");
  Payment.set({
    user: user,
    data: payment,
  });

  // Create a new quote and mark it as settled for compatibility with the order

  // Save this quote in the database
  const Quote = Parse.Object.extend("Quote");
  const quote = new Quote();
  quote.set("currency", currency);
  quote.set("network", network);
  quote.set("amountEur", amountEur);
  quote.set("status", "settled");
  quote.set("selectedOffer", selectedOffer);
  quote.set("selectedExtras", selectedExtras);

  await quote.save(null, { useMasterKey: true });

  // Create a new order in the `Order` class
  const Order = Parse.Object.extend("Order");
  const order = new Order();

  order.set("user", user);
  order.set("offer", selectedOffer);
  order.set("quote", quote);
  order.set("status", "awaiting_admin_validation");

  await order.save(null, { useMasterKey: true });
  return order;
});

/// WERT

Parse.Cloud.define("signWertPaymentRequest", async (request: any) => {
  const user = request.user;
  const { commodity, network, commodity_amount, sc_address, sc_input_data } = request.params;

  // Create a configuration object with signed data

  const options = {
    address: user.get("ethAddress"),
    commodity,
    network,
    // Round commodity to maximum 8 decimals
    commodity_amount: Math.round(Number(commodity_amount) * 1e8) / 1e8,
    sc_address,
    sc_input_data,
  };

  const signedData = signSmartContractData(options, wertPrivateKey);

  return signedData;
});

Parse.Cloud.define("getAllOrders", async (request: any) => {
  const user = request.user;

  // Check if the user is admin
  const isAdmin = user.get("isAdmin");

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const query = new Parse.Query("Order");
  query.include("user");
  query.include("quote");
  query.descending("createdAt");
  const bookings = await query.find({ useMasterKey: true });

  return bookings.map((booking: any) => booking.toJSON());
});
