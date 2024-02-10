import {
    Box,
    Card,
    Flex,
    Input,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    useToast,
  } from "@chakra-ui/react";
  import {
    ConnectWallet,
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useContractRead,
    useOwnedNFTs,
    useTokenBalance,
    Web3Button,
  } from "@thirdweb-dev/react";
  import { BigNumber, ethers } from "ethers";
  import { useEffect, useState } from "react";
  import NFTCard from "./NFTCard";
  import {
    nftDropContractAddress_D,
    stakingContractAddress_D,
    tokenContractAddress_D,
  } from "../../consts/contractAddresses";
  import styles from "../styles/Home3.module.css";
  
  export default function Stake6() {
    const address = useAddress();
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const { contract: nftDropContract } = useContract(
      nftDropContractAddress_D,
      "nft-drop"
    );
    const { contract: tokenContract } = useContract(
      tokenContractAddress_D,
      "token"
    );
    const { contract, isLoading } = useContract(stakingContractAddress_D);
    const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);
    const { data: tokenBalance } = useTokenBalance(tokenContract, address);
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
    const { data: stakedTokens } = useContractRead(contract, "getStakeInfo", [
      address,
    ]);
    const { data: contractTokenBalance , refetch: refetchContractTokenBalance , isLoading: loadingContractTokenBalance } = useContractRead(contract, "getRewardTokenBalance");
    const formattedBalance = contractTokenBalance
      ? ethers.utils.formatUnits(contractTokenBalance, 18) // 18 is the number of decimals for the unit you want to convert to
      : '';
    const toast = useToast();
  
    useEffect(() => {
      setInterval(() => {
          refetchContractTokenBalance();
      }, 10000);
  }, []);
  
  useEffect(() => {
    if (!contract || !address) return;
  
    // Define a function to fetch claimable rewards
    async function loadClaimableRewards() {
      const stakeInfo = await contract?.call("getStakeInfo", [address]);
      setClaimableRewards(stakeInfo[1]);
    }
  
    // Fetch claimable rewards initially
    loadClaimableRewards();
  
    // Set up a setInterval to fetch claimable rewards every 8 seconds
    const intervalId = setInterval(loadClaimableRewards, 8000); // 8000 milliseconds = 8 seconds
  
    // Clear the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(intervalId);
    }, [address, contract]);
  
    
    async function stakeNft(id: string) {
      if (!address) return;
  
      const isApproved = await nftDropContract?.isApproved(
        address,
        stakingContractAddress_D
      );
      if (!isApproved) {
        await nftDropContract?.setApprovalForAll(stakingContractAddress_D, true);
      }
      await contract?.call("stake", [[id]]);
    }
  
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
  
    return (
      <Card /*style={{backgroundColor: "#f9f8ff"}}*/ p={5} mt={10} className="card__earn" >
        <h3 className={styles.h3}>Stake Your NFTs</h3>
        <br />Stake Osean Skipper NFTs for Osean rewards!
        <hr className={`${styles.divider} ${styles.spacerTop}`} />
          <h3>Reward Zone</h3>
          <br />Claim your available rewards!
            <SimpleGrid columns={2} spacing={4} className="stake-and-reward-wrapper">
              <Card p={5} m={5} className="card__stake">
                <Box textAlign={"center"} mb={5}>
                  <Text fontSize={"xl"} fontWeight={"bold"}>
                      Available Total Rewards:
                  </Text>
                      <p className={styles.tokenValue}>
                      <img src="theme-assets/images/oseantoken.png" alt="OSEAN" width="18" height="18" className='token-icon pb-1'/>&nbsp;
                        <b>{formattedBalance}</b> {tokenBalance?.symbol}
                      </p>
                    </Box>
                </Card>
              
              <Card p={5} m={5} className="card__stake">
                <Box textAlign={"center"} mb={5}>
                  <Text fontSize={"xl"} fontWeight={"bold"}>
                    Claimable Rewards:
                  </Text>
                    <p className={styles.tokenValue}>
                    <img src="theme-assets/images/oseantoken.png" alt="OSEAN" width="18" height="18" className='token-icon pb-1'/>&nbsp;
                      <b>
                        {!claimableRewards
                          ? "Loading..."
                          : ethers.utils.formatUnits(claimableRewards, 18)}
                      </b>{" "}
                      
                      {tokenBalance?.symbol}
                    </p>
                      
               
                   
                      <Web3Button className="btn btn-lg btn-round mt-4 btn-gradient-purple animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s"
                        action={(contract) => contract.call("claimRewards")}
                        contractAddress={stakingContractAddress_D}
                        onSuccess={() =>
                          toast({
                            title: "Claim Successful",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                          })
                        }
                        onError={(error) =>{
                          const errorLines = error.message.split('\n');
                          const reasonLine = errorLines.find((line) => line.startsWith("Reason:"));
                          const reason = reasonLine ? reasonLine.replace("Reason:", "").trim() : "Unknown error";
                          toast({
                            title: `Failed! Reason: ${reason}`,
                            status: "error",
                            duration: 5000,
                            isClosable: true,
                          })
                        }}
  
                      >
                        Claim Rewards
                      </Web3Button>
                      
                 
                </Box>
              </Card>
            </SimpleGrid>
            
            <hr className={`${styles.divider} ${styles.spacerTop}`} />
            <h3>Your Staked NFTs</h3><br />Press Withdraw to get your NFT back to your wallet! 
            <div className={styles.nftBoxGrid}>
              {stakedTokens &&
                stakedTokens[0]?.map((stakedToken: BigNumber) => (
                  <NFTCard
                    tokenId={stakedToken.toNumber()}
                    key={stakedToken.toString()}
                  />
                ))}
            </div>
  
            <hr className={`${styles.divider} ${styles.spacerTop}`} />
            <h3>Your Unstaked NFTs</h3>
            <br /><div className="mt-1">Mint your own Skipper NFT{' '}
            <a 
              target="_blank"
              rel="noopener"
              className="chakra-link chakra-button css-1c0d5xu"
              href="https://markt.osean.online/skippersmint"
            >
              here{' '}
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
            {' '}or buy it at our{' '}
            <a 
              target="_blank"
              rel="noopener"
              className="chakra-link chakra-button css-1c0d5xu"
              href="https://markt.osean.online/buy"
            >
              Marketplace{' '}
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
            </div>
            <div className={styles.nftBoxGrid}>
              {ownedNfts?.map((nft) => (
                <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                  <ThirdwebNftMedia
                    
                    metadata={nft.metadata}
                    className={styles.nftMedia}
                  />
                  <h3 style={{marginTop: "20px"}}>{nft.metadata.name}</h3>
                  <div style={{alignItems: "center", alignContent: "center", textAlign: "center"}}>
                  <Web3Button style={{alignContent: "center"}}  className="btn btn-lg btn-round mt-4 btn-gradient-purple animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s"
                    contractAddress={stakingContractAddress_D}
                    action={() => stakeNft(nft.metadata.id)}
  
                    onSuccess={() =>
                      toast({
                        title: "Stake Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                      })
                    }
                    onError={(error) =>{
                      const errorLines = error.message.split('\n');
                      const reasonLine = errorLines.find((line) => line.startsWith("Reason:"));
                      const reason = reasonLine ? reasonLine.replace("Reason:", "").trim() : "Unknown error";
                      toast({
                        title: `Failed! Reason: ${reason}`,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                      })
                    }}
                    isDisabled={isButtonDisabled}
                  >
                    Stake
                  </Web3Button>
                  </div>
                </div>
              ))}
            </div>
            <hr className={`${styles.divider} ${styles.spacerTop}`} />
            <p style={{ textAlign: 'center' }}> <br />
            Staking contract on{' '}
            <a
              target="_blank"
              rel="noopener"
              className="chakra-link chakra-button css-1c0d5xu"
              href="https://bscscan.com/address/0x54e1C5626cD819f4f6B5Ca1413d354B0b7E997a3"
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
        
      </Card>
    );
  };
  