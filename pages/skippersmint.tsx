import type { NextPage } from "next";
import styles from "../styles/Skipper.module.css";
import { 
  MediaRenderer, 
  Web3Button, 
  useActiveClaimConditionForWallet, 
  useAddress, 
  useClaimIneligibilityReasons, 
  useContract, 
  useContractMetadata, 
  useTotalCirculatingSupply, 
  useTotalCount 
} from "@thirdweb-dev/react";
import Image from "next/image";
import { CONTRACT_ADDRESS } from "../const/addresses";
import { ethers, BigNumber } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import toastStyle from "../util/toastConfig";
import { getCurrencyName } from "../util/currencyUtils";
import Link from "next/link";
import Container from "../components/Container/Container";

const Home: NextPage = () => {
  const address = useAddress();
  const router = useRouter();
  const maxClaimQuantity = 100;

  const {
    contract
  } = useContract(CONTRACT_ADDRESS);

  const {
    data: contractMetadata,
    isLoading: isContractMetadataLoading,
  } = useContractMetadata(contract);

  const {
    data: activeClaimPhase,
    isLoading: isActiveClaimPhaseLoading,
  } = useActiveClaimConditionForWallet(contract, address);

  const {
    data: claimIneligibilityReasons,
    isLoading: isClaimIneligibilityReasonsLoading,
  } = useClaimIneligibilityReasons(
    contract,
    {
      walletAddress: address || "",
      quantity: 1,
    }
  );

  const {
    data: totalSupply,
    isLoading: isTotalSupplyLoading,
  } = useTotalCount(contract);
  const {
    data: totalClaimSupply,
    isLoading: isTotalClaimSupplyLoading,
  } = useTotalCirculatingSupply(contract);

  console.log("totalSupply:", totalSupply);

  const [claimQuantity, setClaimQuantity] = useState(1);
  const increment = () => {
    if (claimQuantity < maxClaimQuantity) {
      setClaimQuantity(claimQuantity + 1);
    }
  };
  const decrement = () => {
    if (claimQuantity > 1) {
      setClaimQuantity(claimQuantity - 1);
    }
  };

  console.log("totalClaimSupply:", totalClaimSupply);

  console.log("Claim Ineligibility Reasons:", claimIneligibilityReasons);

  const [selectedOption, setSelectedOption] = useState('');

  // Function to handle collection change
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);

    // Depending on the selected option, you can navigate to the corresponding page
    switch (event.target.value) {
      case 'governance':
        router.push('/govmint');
        break;
      case 'skippers':
        router.push('/skippersmint');
        break;
      default:
        break;
    }
  };

  const formatPrice = (price: BigNumber): string => {
    const formattedPrice = ethers.utils.formatUnits(price.toString());
    return formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

  return (
    <>
    <Toaster position="bottom-center" reverseOrder={false} /> 
    <Container maxWidth="lg">
    <br />
    <br />
    <div className="breadcrumb">
      <div>
        <Link href="/markt">Marketplace &nbsp;</Link> /&nbsp;
        <Link href="/buy">Buy NFTs &nbsp;</Link> /&nbsp;
        <Link href="/sell">Sell NFTs</Link>
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
    <div className="mt-5">
    <Link href="/govmint" rel="noopener noreferrer">
    <Image src="https://osean.online/assets/GOVbanner2.jpg" 
      alt="Gov Banner"
      width={1280}
      height={189}
      layout="responsive"
      objectFit="cover" 
      />
      </Link>
      </div>
      <div className={styles.containerSkippers}>      
      <main className={styles.mainSkippers}>
      <div>
  {!isContractMetadataLoading && (
    <div className={styles.heroSection}>
        <div className={styles.collectionImage}>
          {/* <MediaRenderer */}
          {/* src={contractMetadata?.image} */}
          {/* /> */}
          <Image
            src="/img/placeholder2.jpg"
            width={320}
            height={512}
            rel="placeholder"
            alt="Osean Skippers"
          />
        
        </div>
        <div className={styles.textContainer}>
          <h1>{contractMetadata?.name}</h1>
          <br />
          <p>{contractMetadata?.description}</p>
          <br />
          {!isActiveClaimPhaseLoading ? (
            <div>
              <p>Claim Phase: {activeClaimPhase ? activeClaimPhase.metadata?.name : 'N/A'}</p>
              {activeClaimPhase && activeClaimPhase.price !== undefined ? (
                <p>
                  Price: {activeClaimPhase.price.eq(0) ? '[FREE MINT]' : `${formatPrice(activeClaimPhase.price)} ${getCurrencyName(activeClaimPhase.currencyAddress)}`}
                </p>
              ) : (
                <p>Price: N/A</p>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
          {!isTotalSupplyLoading && !isTotalClaimSupplyLoading ? (
            <p>Claimed: {totalClaimSupply?.toNumber()} / {totalSupply?.toNumber()}</p>
          ) : (
            <p>Loading...</p>
          )}
          {address ? (
            !isClaimIneligibilityReasonsLoading ? (
              claimIneligibilityReasons?.length! > 0 ? (
                claimIneligibilityReasons?.map((reason, index) => (
                  <p key={index}>{reason}</p>
                ))
              ) : (
                <div>
                  <p>Eligible to claim</p>
                  <div className={styles.claimContainer}>
                    <div className={styles.claimValue}>
                      <button
                        className={styles.claimBtn}
                        onClick={decrement}
                      >-</button>
                      <input
                        className={styles.claimInput}
                        type="number"
                        value={claimQuantity}
                      />
                      <button
                        className={styles.claimBtn}
                        onClick={increment}
                      >+</button>
                    </div>
                    <Web3Button style={{width: "150px"}}
                      className="btn btn-round btn-sign-in my-2 my-sm-4 mr-sm-2 ml-2 fadeInDown animated btn-gradient-blue"
                      contractAddress={CONTRACT_ADDRESS}
                      action={(contract) => contract.erc721.claim(claimQuantity)}
                      onSuccess={() => {
                        toast(`Mint success!`, {
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

                        toast(`Mint failed! Reason: ${reason}`, {
                          icon: "❌",
                          style: toastStyle,
                          position: "bottom-center",
                        });
                      }}
                    >
                      Mint NFT
                    </Web3Button>
                  </div>
                </div>
              )
            ) : (
              <p>Checking Eligibility...</p>
            )
          ) : (
            <p>Connect Wallet to claim</p>
          )}
        </div>
      </div>
      
    
  )}
</div>
        <p style={{ textAlign: 'center' }}> <br />
          SKipper NFT contract on{' '}
          <a
            target="_blank"
            rel="noopener"
            className="chakra-link chakra-button css-1c0d5xu"
            href={`https://bscscan.com/address/${CONTRACT_ADDRESS}`}
          >
            bscscan{' '}
            <span
              style={{ display: 'inline-block' }}
              className="chakra-button__icon css-1hzyiq5"
            >
              <svg
                stroke="currentColor"
                fill="none"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
                focusable="false"
                className="chakra-icon css-13otjrl"
                aria-hidden="true"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </span>
          </a>
        </p>
      </main>
    </div>
    </Container>
  </>
  );
};

export default Home;
