import type { NFT as NFTType } from "@thirdweb-dev/sdk";
import { Status } from "@thirdweb-dev/sdk"; // Remove DirectListingV3 import
import { useValidDirectListings, useContract } from "@thirdweb-dev/react";
import Link from "next/link";
import React, { useState } from "react";
import { NFT_COLLECTION_ADDRESS, MARKETPLACE_ADDRESS } from "../../const/contractAddresses";
import Skeleton from "../Skeleton/Skeleton";
import NFT from "./NFT";
import styles from "../../styles/Buy.module.css";

type Props = {
  isLoading: boolean;
  data: NFTType[] | undefined;
  overrideOnclickBehavior?: (nft: NFTType) => void;
  emptyText?: string;
  filterCriteria?: string[];
  showDirectListings?: boolean;
};

export default function NFTGrid({
  isLoading,
  data,
  overrideOnclickBehavior,
  emptyText = "No NFTs found for this collection.",
  filterCriteria,
  showDirectListings,
}: Props) {
  const [itemsToShow, setItemsToShow] = useState(10); // Initial number of items to show
  const itemsToLoad = 10; // Number of items to load on "Load More" button click

  const handleLoadMore = () => {
    setItemsToShow(itemsToShow + itemsToLoad);
  };

  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  // 1. Load if the NFT is for direct listing
  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
    });

    console.log(directListing);

    const filteredData = (data || []).filter((nft) => {
      const attributes = nft.metadata.attributes as {
        trait_type: string;
        value: string;
      }[] | undefined;
    
      if (!attributes || !Array.isArray(attributes)) {
        return false; // Skip NFTs without attributes
      }
    
      const properties = nft.metadata.properties as {
        trait_type: string;
        value: string;
      }[] | undefined;
    
      // Ensure filterCriteria is always an array, defaulting to an empty array if undefined
      const filterCriteriaArray = filterCriteria || [];
    
      // Check if the NFT has at least one attribute that matches a selected filter
      const hasMatchingAttribute = filterCriteriaArray.every((filter) =>
        attributes.some((attribute) => attribute.value === filter)
      );
    
      // Check if the NFT's ID exists in the directListingAssetIds set
      const isDirectListing = directListing?.some(
        (listing) => listing.asset.id === nft.metadata.id
      );
    
      if (showDirectListings) {
        // When showDirectListings is toggled on, apply filters based on DirectListings
        return isDirectListing && hasMatchingAttribute;
      } else {
        // When showDirectListings is toggled off, apply filters based on all NFTs
        return hasMatchingAttribute;
      }
    });

  return (
    <div className={styles.nftGridContainer}>
      {isLoading ? (
        [...Array(itemsToShow)].map((_, index) => (
          <div key={index} className={styles.nftContainer}>
            <Skeleton key={index} width={"100%"} height={"350px"} />
          </div>
        ))
      ) : filteredData && filteredData.length > 0 ? (
        filteredData.slice(0, itemsToShow).map((nft) =>
          !overrideOnclickBehavior ? (
            <Link
              href={`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
              key={nft.metadata.id}
              className={styles.nftContainer}
            >
              <NFT nft={nft} />
            </Link>
          ) : (
            <div
              key={nft.metadata.id}
              className={styles.nftContainer}
              onClick={() => overrideOnclickBehavior(nft)}
            >
              <NFT nft={nft} />
            </div>
          )
        )
      ) : (
        <p>{emptyText}</p>
      )}
      <div className={styles.nftGridContainer}>
        {filteredData && filteredData.length > itemsToShow && (
          <button
            onClick={handleLoadMore}
            className="btn btn-round btn-sign-in fadeInDown animated btn-gradient-blue"
            style={{ margin: '30px auto 10px auto', display: "block", }}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}
