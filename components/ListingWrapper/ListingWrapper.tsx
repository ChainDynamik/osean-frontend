import { 
  useContract, 
  useNFT, 
  Web3Button,
  useCancelDirectListing,
  useCancelEnglishAuction,
  useValidDirectListings,
  useValidEnglishAuctions,
  useEnglishAuctionWinningBid 
} from "@thirdweb-dev/react";
import { DirectListingV3, EnglishAuction } from "@thirdweb-dev/sdk";
import Link from "next/link";
import React from "react";
import { MARKETPLACE_ADDRESS, NFT_COLLECTION_ADDRESS } from "../../const/contractAddresses";
import styles from "../../styles/Buy.module.css";
import NFT from "../NFT/NFT";
import Skeleton from "../Skeleton/Skeleton";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";

type Props = {
  listing: DirectListingV3 | EnglishAuction;
    
};

/**
 * Accepts a listing and renders the associated NFT for it
 */
export default function ListingWrapper({ listing }: Props) {

  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);
  
  const { data: nft, isLoading} = useNFT(nftCollection, listing.asset.id);

  const { contract: marketplace, isLoading: loadingContract } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: directListing, isLoading: loadingDirect } =
    useValidDirectListings(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS
    });

  // 2. Load if the NFT is for auction
  const { data: auctionListing, isLoading: loadingAuction } =
    useValidEnglishAuctions(marketplace, {
      tokenContract: NFT_COLLECTION_ADDRESS,
    });

    const auctionId = auctionListing?.[0]?.id;

    const { data: winningBid, isLoading: loadingWinningBid } =
    useEnglishAuctionWinningBid(marketplace, auctionId);

    function getCurrentEpochTime() {
      return Math.floor(Date.now() / 1000);
    }


    const {
      mutateAsync: cancelDirectListing,
      
    } = useCancelDirectListing(marketplace);

    const {
      mutateAsync: cancelAuctionListing,
      
    } = useCancelEnglishAuction(marketplace);

    async function cancelAuction() {
      if (winningBid?.bidAmount) {
        throw new Error("Cannot cancel auction with active bids");
      }
  
      return await cancelAuctionListing(listing.id);
    }
  
    // Separate async function to cancel a direct listing
    async function cancelDirect() {
      return await cancelDirectListing(listing.id);
    }

    const isAuction = "buyoutBidAmount" in listing;
    const isDirect = "pricePerToken" in listing;


  if (isLoading) {
    return (
      <div className={styles.nftContainer}>
        <Skeleton width={"100%"} height="312px" />
      </div>
    );
  }

  if (!nft) return null;
  
  

  return (
    <>
    
    
      <div className={styles.nftContainer} style={{minHeight: "550px"}}>
      <Link
        href={`/token/${NFT_COLLECTION_ADDRESS}/${nft.metadata.id}`}
        key={nft.metadata.id}
        className={styles.nftContainerListing}
      >
        <NFT nft={nft} />
      </Link>
      
      {isDirect && (
        <Web3Button
          contractAddress={MARKETPLACE_ADDRESS}
          action={cancelDirect}
          className="btn btn-round btn-sign-in fadeInDown animated btn-gradient-blue"
          style={{
            display: 'block',  // Ensures the image is a block element
            margin: 'auto', // Adds 20px margin top and bottom, and centers horizontally
          }}
          onSuccess={() => {
            toast(`Listing Canceled Succesfully!`, {
              icon: "✅",
              style: toastStyle,
              position: "bottom-center",
            });
          }}
          onError={(error) => {
            // Parse the error message to extract the "Reason"
            const errorLines = error.message.split('\n');
            const reasonLine = errorLines.find((line) => line.startsWith("Reason:"));
            const reason = reasonLine ? reasonLine.replace("Reason:", "").trim() : "Unknown error";

            toast(`Listing Cancelation failed! Reason: ${reason}`, {
              icon: "❌",
              style: toastStyle,
              position: "bottom-center",
            });
          }}
          
        >
          Cancel</Web3Button>
      )}
  
      {isAuction && (
        <Web3Button
          contractAddress={MARKETPLACE_ADDRESS}
          action={cancelAuction}
          className="btn btn-lg btn-round btn-light btn-glow animated"
          onSuccess={() => {
            toast(`Auction Cancellation success!`, {
              icon: "✅",
              style: toastStyle,
              position: "bottom-center",
            });
          }}
          onError={(error) => {
            const errorMessage = (error as Error).message || "Unknown error occurred";
            toast(`Auction Cancellation failed! Reason: ${errorMessage}`, {
              icon: "❌",
              style: toastStyle,
              position: "bottom-center",
            });
          }}
        >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cancel&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Web3Button>
      )}
    
   </div> 
  </>
  );
}