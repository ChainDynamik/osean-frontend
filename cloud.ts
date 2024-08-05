const Moralis = require("moralis").default;
const Parse = require("parse/node");
const { Web3 } = require("web3");

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
  const settings = await query.first();

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
    const existingQuote = await query.first();

    if (existingQuote) {
      return existingQuote.toJSON();
    }
  }

  const { amountUsd } = request.params;
  const user = request.user;

  const quoteUnitPrice = Number(await getSettingsKey(currency === "ETH" ? "eth-unit-price" : "osean-unit-price"));
  const amountInQuote = Number(amountUsd) / quoteUnitPrice;
  const amountInWei = web3.utils.toWei(amountInQuote, "ether");

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

  await quote.save();

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
  //     const existingQuote = await query.first();

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
  //   await quote.save();

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
    const existingOrder = await query.first();

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

  await order.save();
  return order.toJSON();
});

// Parse.Cloud.beforeSave("_User", async (request: any) => {
//   const user = request.object;

//   if (!user.get("ethAddress")) {
//     // Check if it's in the authData object as authData.moralisEth.address
//     const authData = user.get("authData");
//     const ethAddress = authData?.moralisEth?.id;

//     if (ethAddress) {
//       user.set("ethAddress", ethAddress);
//     }
//   }
// });
