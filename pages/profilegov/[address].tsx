import {
  useContract,
  useContractRead,
  useOwnedNFTs,
  useValidDirectListings,
  useValidEnglishAuctions,
  useEnglishAuctions,
  useEnglishAuctionWinningBid,
  useAddress,
} from "@thirdweb-dev/react";
import { Status, EnglishAuction } from "@thirdweb-dev/sdk";
import { BigNumber } from "ethers";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Container from "../../components/Container/Container";
import ListingWrapper from "../../components/ListingWrapper/ListingGovWrapper";
import NFTGrid from "../../components/NFT/NFTGovGrid";
import Skeleton from "../../components/Skeleton/Skeleton";
import { MARKETPLACE_ADDRESS, GOV_NFT } from "../../const/contractAddresses";
import styles from "../../styles/Profile.module.css";
import randomColor from "../../util/randomColor";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../../util/toastConfig";
import BookingsTable from "../../components/BookingsTable/BookingsTable";
import PersonalInfoForm from "../../components/PersonalInfoForm/PersonalInfoForm";
import { CardPayment } from "../../components/CardPayment/CardPayment";

const [randomColor1, randomColor2, randomColor3, randomColor4] = [
  randomColor(),
  randomColor(),
  randomColor(),
  randomColor(),
];

type Props = {
  listing: EnglishAuction;
};

export default function ProfilePage({ listing }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<"nfts" | "listings" | "auctions">("nfts");
  const user = useAddress();
  const { contract: nftCollection } = useContract(GOV_NFT);

  const { contract: marketplace } = useContract(
    MARKETPLACE_ADDRESS,
    "marketplace-v3"
  );

  const { data: ownedNfts, isLoading: loadingOwnedNfts } = useOwnedNFTs(
    nftCollection,
    router.query.address as string
  );

  const { data: directListings, isLoading: loadingDirects } =
    useValidDirectListings(marketplace, {
      tokenContract: GOV_NFT,
    });

  const { data: auctionListings, isLoading: loadingAuctions } =
    useEnglishAuctions(marketplace, {
      tokenContract: GOV_NFT,
    });

  const { data: auctionListingsOfferor, isLoading: loadingAuctionsOfferor } =
    useEnglishAuctions(marketplace, {
      tokenContract: GOV_NFT,
      offeror: user,
    });

  // Filter and process data

  const filteredDirectListings = directListings
    ? directListings.filter(
        (listing) => listing.creatorAddress === router.query.address
      )
    : [];

  const filteredAuctionListings = auctionListings
    ? auctionListings.filter(
        (listing) =>
          listing.creatorAddress === router.query.address &&
          listing.status === Status.Expired
      )
    : [];

  const filteredAuctionListingsOfferor = auctionListingsOfferor
    ? auctionListingsOfferor.filter(
        (listing) => listing.status === Status.Expired
      )
    : [];

  const filteredOwnedNftsNotInDirectListings = ownedNfts
    ? ownedNfts.filter(
        (nft) =>
          !filteredDirectListings.some(
            (listing) => listing.asset.id === nft.metadata.id
          )
      )
    : [];

  // Create a set to store unique listing IDs
  const uniqueListingIds = new Set<string>();

  // Add listing IDs to the uniqueListingIds set
  filteredAuctionListings.forEach((listing) => {
    uniqueListingIds.add(listing.id);
  });

  filteredAuctionListingsOfferor.forEach((listing) => {
    uniqueListingIds.add(listing.id);
  });

  // Convert the set to an array
  const combinedAuctionListings = Array.from(uniqueListingIds).map(
    (listingId) => {
      const foundListing =
        filteredAuctionListings.find((listing) => listing.id === listingId) ||
        filteredAuctionListingsOfferor.find(
          (listing) => listing.id === listingId
        );
      return foundListing;
    }
  );

  const [selectedOption, setSelectedOption] = useState("");

  // Function to handle collection change
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);

    // Depending on the selected option, you can navigate to the corresponding page
    switch (event.target.value) {
      case "governance":
        router.push(`/profilegov/${user}`);
        break;
      case "skippers":
        router.push(`/profile/${user}`);
        break;
      default:
        break;
    }
  };

  return (
    <Container maxWidth="lg">
      <br />
      <br />
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="breadcrumb">
        <div>
          <Link href="/">Marketplace &nbsp;</Link> /&nbsp;
          <Link href="/buygov">Buy NFTs &nbsp;</Link> /&nbsp;
          <Link href="/sellgov">Sell NFTs</Link>
        </div>
        <div style={{ marginLeft: "auto" }}>
          {/* Dropdown Selector */}
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            style={{ height: "30px", color: "#1E90FF" }}
          >
            <option value="">Choose from OSEAN collections</option>
            <option value="governance">Governance NFT Collection</option>
            <option value="skippers">OSEAN Skippers Collection</option>
          </select>
        </div>
      </div>
      <div className={styles.profileHeader}>
        <div
          className={styles.coverImage}
          style={{
            background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
          }}
        />
        <div
          className={styles.profilePicture}
          style={{
            background: `linear-gradient(90deg, ${randomColor3}, ${randomColor4})`,
          }}
        />
        <h1 className={styles.profileName}>
          {router.query.address ? (
            router.query.address.toString().substring(0, 4) +
            "..." +
            router.query.address.toString().substring(38, 42)
          ) : (
            <Skeleton width="320" />
          )}
        </h1>
      </div>

      <div style={{ marginBottom: "70px" }} className={styles.tabs}>
        <h3
          className={`${styles.tab}
          ${tab === "nfts" ? styles.activeTab : ""}`}
          onClick={() => setTab("nfts")}
        >
          NFTs
        </h3>
        <h3
          className={`${styles.tab} 
          ${tab === "listings" ? styles.activeTab : ""}`}
          onClick={() => setTab("listings")}
        >
          Listings
        </h3>
        <h3
          className={`${styles.tab} 
          ${tab === "bookings" ? styles.activeTab : ""}`}
          onClick={() => setTab("bookings")}
        >
          Bookings
        </h3>
      </div>

      <div
        style={{ marginBottom: "70px" }}
        className={`${
          tab === "nfts" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        <NFTGrid
          data={filteredOwnedNftsNotInDirectListings}
          isLoading={loadingOwnedNfts}
          emptyText="Looks like you don't have any NFTs from this collection. Head to the buy page to buy some!"
        />
      </div>

      <div
        className={`${
          tab === "listings" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        {loadingDirects ? (
          <p>Loading...</p>
        ) : filteredDirectListings.length === 0 ? (
          <p>Nothing for sale yet! Head to the sell tab to list an NFT.</p>
        ) : (
          filteredDirectListings.map((listing) => (
            <ListingWrapper listing={listing} key={listing.id} />
          ))
        )}
      </div>

      <div
        className={`pb-16 ${
          tab === "bookings" ? styles.activeTabContent : styles.tabContent
        }`}
      >
        <PersonalInfoForm />
        <CardPayment isMakingPayment={false} />
        <BookingsTable tableId="user-bookings-table" />
      </div>
    </Container>
  );
}
