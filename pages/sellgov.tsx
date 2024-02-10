import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useOwnedNFTs,
    useValidDirectListings,
    useValidEnglishAuctions,
    useNFT
  } from "@thirdweb-dev/react";
  import React, { useState } from "react";
  import { DirectListingV3, EnglishAuction } from "@thirdweb-dev/sdk";
  import Link from "next/link";
  import Container from "../components/Container/Container";
  import NFTGrid from "../components/NFT/NFTGovGrid";
  import { MARKETPLACE_ADDRESS, GOV_NFT } from "../const/contractAddresses";
  import tokenPageStyles from "../styles/Token.module.css";
  import { NFT as NFTType } from "@thirdweb-dev/sdk";
  import SaleInfo from "../components/SaleInfo/SaleGovInfo";
  import { useRouter } from "next/router";
  
  type Props = {
    listing: DirectListingV3 | EnglishAuction;
      
  };
  
  export default function Sell({ listing }: Props) {
    // Load all of the NFTs from the NFT Collection
    const { contract } = useContract(GOV_NFT);
    const { data: nft } = useNFT(contract, listing?.asset.id);
    const address = useAddress();
    const { data, isLoading } = useOwnedNFTs(contract, address);
  
    const [selectedNft, setSelectedNft] = useState<NFTType>();
    
    const { contract: marketplace } = useContract(MARKETPLACE_ADDRESS, "marketplace-v3")
  
    const { data: directListing, isLoading: loadingDirect } =
      useValidDirectListings(marketplace, {
        tokenContract: GOV_NFT
      });
  
    // Check if there is a pricePerToken property in the directListing data
    const isDirect = directListing?.some(listing => listing.pricePerToken);
    
    console.log(isDirect)
  
    // 2. Load if the NFT is for auction
    const { data: auctionListing, isLoading: loadingAuction } =
      useValidEnglishAuctions(marketplace, {
        tokenContract: GOV_NFT,
      });
  
    // Check if there is a buyoutBidAmount property in the auctionListing data
    const isAuction = auctionListing?.some(listing => listing.buyoutBidAmount);
    
    console.log(isAuction)
  
    const filteredNFTs = data
    ? data.filter((nft) => {
        const isNFTDirect = directListing?.some(
          (listing) => listing.asset.id === nft.metadata.id
        );
        const isNFTAuction = auctionListing?.some(
          (listing) => listing.asset.id === nft.metadata.id
        );
        return !isNFTDirect && !isNFTAuction; // Exclude NFTs that are in direct listings or auctions
      })
    : [];
  
      console.log(filteredNFTs)
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState('');

      // Function to handle collection change
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);

    // Depending on the selected option, you can navigate to the corresponding page
    switch (event.target.value) {
      case 'governance':
        router.push('/sellgov');
        break;
      case 'skippers':
        router.push('/sell');
        break;
      default:
        break;
    }
  };
  
    
      return (
        <Container maxWidth="lg">
          <br />
           <br />
          <div className="breadcrumb">
      <div>
        <Link href="/markt">Marketplace &nbsp;</Link> /&nbsp;
        <Link href="/buygov">Buy NFTs &nbsp;</Link> /&nbsp;
        <Link href="/sellgov">Sell NFTs</Link>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        {/* Dropdown Selector */}
        <select value={selectedOption} onChange={handleOptionChange} style={{height:"30px", color: "#1E90FF"}}>
          <option value="">Choose from OSEAN collections</option>
          <option value="governance">Governance NFT Collection</option>
          <option value="skippers">OSEAN Skippers Collection</option>
        </select>
      </div>
    </div>
    <div className="mb-5">
          <h1>Sell NFTs</h1>
          {!selectedNft ? (
            <>
              <p>Select which NFT you&rsquo;d like to sell below.</p>
              <NFTGrid
                data={filteredNFTs}
                isLoading={isLoading}
                overrideOnclickBehavior={(nft) => {
                  setSelectedNft(nft);
                }}
                emptyText={
                  "Looks like you don't own any NFTs in this collection. Head to the buy page to buy some!"
                }
              />
            </>
          ) : (
            <div className={tokenPageStyles.container} style={{ marginTop: 0 }}>
              <div className={tokenPageStyles.metadataContainer}>
                <div className={tokenPageStyles.imageContainer}>
                  <ThirdwebNftMedia
                    metadata={selectedNft.metadata}
                    className={tokenPageStyles.sellimage}
                  />
                  <button
                    onClick={() => {
                      setSelectedNft(undefined);
                    }}
                    className={tokenPageStyles.crossButton}
                  >
                    X
                  </button>
                </div>
              </div>
    
              <div className={tokenPageStyles.listingContainer}>
                <p>You&rsquo;re about to list the following item for sale.</p>
                <h1 className={tokenPageStyles.title}>
                  {selectedNft.metadata.name}
                </h1>
                <p className={tokenPageStyles.collectionName}>
                  Token ID #{selectedNft.metadata.id}
                </p>
    
                <div className={tokenPageStyles.pricingContainer}>
                  <SaleInfo nft={selectedNft} />
                </div>
              </div>
            </div>
          )}
          </div>
        </Container>
      );
    }
    