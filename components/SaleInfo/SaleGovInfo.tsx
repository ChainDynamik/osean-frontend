import { NFT as NFTType } from "@thirdweb-dev/sdk";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

import styles from "../../styles/Sale.module.css";
import profileStyles from "../../styles/Profile.module.css";
import {
  useContract,
  useCreateAuctionListing,
  useCreateDirectListing,
  Web3Button,
} from "@thirdweb-dev/react";
import {
  MARKETPLACE_ADDRESS,
  NFT_COLLECTION_ADDRESS,
  GOV_NFT,
} from "../../const/contractAddresses";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";

type Props = {
  nft: NFTType;
};

type AuctionFormData = {
  nftContractAddress: string;
  tokenId: string;
  startDate: Date;
  endDate: Date;
  floorPrice: string;
  buyoutPrice: string;
  currency: string;
};

type DirectFormData = {
  nftContractAddress: string;
  tokenId: string;
  price: string;
  startDate: Date;
  endDate: Date;
  currency: string;
};

const currencyOptions = [
  { label: "BNB", value: "BNB" }, // Use "BNB" as the value for BNB
  { label: "OSEAN", value: "0x722cB8e411D40942C0f581B919ecCE3E4D759602" },
  // Add more options as needed
];

export default function SaleInfo({ nft }: Props) {
  const router = useRouter();
  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );
  const { contract: nftCollection } = useContract(GOV_NFT);

  const { mutateAsync: createAuctionListing } =
    useCreateAuctionListing(marketplace);

  const { mutateAsync: createDirectListing } =
    useCreateDirectListing(marketplace);

  const [tab, setTab] = useState<"direct" | "auction">("direct");

  const {
    register: registerAuction,
    handleSubmit: handleSubmitAuction,
    setValue: setValueAuction,
  } = useForm<AuctionFormData>({
    defaultValues: {
      nftContractAddress: GOV_NFT,
      tokenId: nft.metadata.id,
      startDate: new Date(),
      endDate: new Date(),
      floorPrice: "0",
      buyoutPrice: "0",
      currency: "BNB", // Default to BNB
    },
  });

  const {
    register: registerDirect,
    handleSubmit: handleSubmitDirect,
    setValue: setValueDirect,
  } = useForm<DirectFormData>({
    defaultValues: {
      nftContractAddress: GOV_NFT,
      tokenId: nft.metadata.id,
      startDate: new Date(),
      endDate: new Date(),
      price: "0",
      currency: "BNB", // Default to BNB
    },
  });

  async function handleSubmissionAuction(data: AuctionFormData) {
    async function checkAndProvideApproval() {
      // Check if approval is required and provide approval if needed
      // ...
    }
  
    await checkAndProvideApproval();
    
    const auctionListingData: {
      assetContractAddress: string;
      tokenId: string;
      buyoutBidAmount: string;
      minimumBidAmount: string;
      startTimestamp: Date;
      endTimestamp: Date;
      currencyContractAddress?: string; // Make it optional
    } = {
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      buyoutBidAmount: data.buyoutPrice,
      minimumBidAmount: data.floorPrice,
      startTimestamp: new Date(data.startDate),
      endTimestamp: new Date(data.endDate),
    };
  
    if (data.currency !== "BNB") {
      auctionListingData.currencyContractAddress = data.currency;
    }
  
    const txResult = await createAuctionListing(auctionListingData);
    return txResult;
  }

  async function handleSubmissionDirect(data: DirectFormData) {
    async function checkAndProvideApproval() {
      // Check if approval is required and provide approval if needed
      // ...
    }
  
    await checkAndProvideApproval();
    
    const directListingData: {
      assetContractAddress: string;
      tokenId: string;
      pricePerToken: string;
      startTimestamp: Date;
      endTimestamp: Date;
      currencyContractAddress?: string; // Make it optional
    } = {
      assetContractAddress: data.nftContractAddress,
      tokenId: data.tokenId,
      pricePerToken: data.price,
      startTimestamp: new Date(data.startDate),
      endTimestamp: new Date(data.endDate),
    };
  
    if (data.currency !== "BNB") {
      directListingData.currencyContractAddress = data.currency;
    }
  
    const txResult = await createDirectListing(directListingData);
    return txResult;
  }
  
  
  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className={styles.saleInfoContainer} style={{ marginTop: -42 }}>
        <div className={profileStyles.tabs}>
          <h3
            className={`${profileStyles.tab} 
            ${tab === "direct" ? profileStyles.activeTab : ""}`}
            onClick={() => setTab("direct")}
          >
            Direct
          </h3>
          
        </div>
  
        {/* Direct listing fields */}
        <div
          className={`${
            tab === "direct"
              ? styles.activeTabContent
              : profileStyles.tabContent
          }`}
          style={{ flexDirection: "column" }}
        >
          <h4 className={styles.formSectionTitle}>When</h4>
          <legend className={styles.legend}>Listing Starts on</legend>
          <input
            className={styles.input}
            type="datetime-local"
            {...registerDirect("startDate")}
            aria-label="Auction Start Date"
          />
  
          <legend className={styles.legend}>Listing Ends on</legend>
          <input
            className={styles.input}
            type="datetime-local"
            {...registerDirect("endDate")}
            aria-label="Auction End Date"
          />
  
          <h4 className={styles.formSectionTitle}>Price</h4>
          {/*<legend className={styles.legend}>Price per token (in BNB)</legend>*/}
          <input
            className={styles.input}
            type="number"
            step={0.000001}
            {...registerDirect("price")}
          />
  
          {/* Currency selection dropdown */}
          <select
            className={styles.input}
            {...registerDirect("currency")}
            aria-label="Currency"
            style={{
              
              
            }}
          >
            {currencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
  
          {/* Create Direct Listing button */}
          <Web3Button
            contractAddress={MARKETPLACE_ADDRESS}
            action={async () => {
              await handleSubmitDirect(handleSubmissionDirect)();
            }}
            onError={(error) => {
              toast(`Listed Failed! Reason: ${error.cause}`, {
                icon: "❌",
                style: toastStyle,
                position: "bottom-center",
              });
              // Additional error handling code if needed
            }}
            onSuccess={(txResult) => {
              toast("Listed Successfully!", {
                icon: "🥳",
                style: toastStyle,
                position: "bottom-center",
              });
              router.push(`/tokengov/${GOV_NFT}/${nft.metadata.id}`);
              // Additional success handling code if needed
            }}
          >
            Create Direct Listing
          </Web3Button>
        </div>
  
        
      </div>
    </>
  );
  
  
}
