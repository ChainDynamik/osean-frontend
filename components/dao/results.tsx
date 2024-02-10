import { Container, Stack, Flex, SimpleGrid, Card, Box, Divider, useToast, Button, Text } from "@chakra-ui/react";
import {
    useAddress,
    useContract,
    useNFTBalance,
    useContractWrite,
    Web3Button
  } from '@thirdweb-dev/react';
import { NFT_ADDRESS, OSEAN_ADDRESS, DAO_ADDRESS } from '../../cost/addresses';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Proposal } from "@thirdweb-dev/sdk";
import  styles from "../../styles/Main.module.css";
import Web3, { BlockNumberOrTag } from 'web3';
import Image from "next/image";
import Link from "next/link";

  
export default function Results(): React.ReactElement | null {

    // Use the hooks thirdweb give us.
  const address = useAddress();
  //console.log('👋 Address:', address);
  // Initialize our Edition Drop contract

  const { contract: editionDrop } = useContract(
    NFT_ADDRESS,
    "nft-drop",    
  );

  // Initialize our token contract
  const { contract: token } = useContract(
    NFT_ADDRESS,
    "token"
  );

  const { contract: vote } = useContract(
    DAO_ADDRESS,
    'vote',
  );

  
  // A fancy function to shorten someones wallet address, no need to show the whole thing.
  const shortenAddress = (str: string) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [memberTokenAmounts, setMemberTokenAmounts] = useState<any>([]);
  const [memberAddresses, setMemberAddresses] = useState<string[] | undefined>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isVoting, setIsVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [timestamps, setTimestamps] = useState<{ [key: string]: Date | undefined }>({});
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStatus, setExecutionStatus] = useState('');

  const toast = useToast();

  // Retrieve all our existing proposals from the contract.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // A simple call to vote.getAll() to grab the proposals.
    const getAllProposals = async () => {
      try {
        const proposals = await vote!.getAll();
        const pastProposals = proposals.filter((proposal) => proposal.state != 1 );
        setProposals(pastProposals);
        
        console.log("🌈 Proposals:", proposals);
      } catch (error) {
        console.log("failed to get proposals", error);
      }
    };
    getAllProposals();
  }, [hasClaimedNFT, vote]);

  // We also need to check if the user already voted.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    // If we haven't finished retrieving the proposals from the useEffect above
    // then we can't check if the user voted yet!
    if (!proposals.length) {
      return;
    }

    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await vote!.hasVoted(proposals[0].proposalId.toString(), address);
        setHasVoted(hasVoted);
        if (hasVoted) {
          console.log("🥵 User has already voted");
        } else {
          console.log("🙂 User has not voted yet");
        }
      } catch (error) {
        console.error("Failed to check if wallet has voted", error);
      }
    };
    checkIfUserHasVoted();

  }, [hasClaimedNFT, proposals, address, vote]);

  // This useEffect grabs all the addresses of our members holding our NFT.
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
  
    const getAllAddresses = async () => {
      try {
        const memberAddressesData = await editionDrop?.erc721.getAllOwners();
        const ownerAddresses = memberAddressesData
          ? Array.from(new Set(memberAddressesData.map(item => item.owner)))
          : [];
  
        setMemberAddresses(ownerAddresses);
        console.log('🚀 Members addresses', ownerAddresses);
      } catch (error) {
        console.error('failed to get member list', error);
      }
    };
    getAllAddresses();
  }, [hasClaimedNFT, editionDrop?.erc721]);
const hexToDecimal = (hex: string) => {
  return parseInt(hex, 16);
};

// This useEffect grabs the # of tokens each member holds.
useEffect(() => {
  if (!hasClaimedNFT || !memberAddresses || memberAddresses.length === 0) {
    return;
  }

  const getAllBalances = async () => {
    try {
      const amounts = await Promise.all(
        memberAddresses.map(async (address) => {
          const balanceHex = await editionDrop?.erc721.balanceOf(address);
          if (balanceHex) {
            const balance = hexToDecimal(balanceHex._hex);
            return balance;
          } else {
            return 0; // Default to 0 if balanceHex is undefined
          }
        }));
      setMemberTokenAmounts(amounts);
      console.log('👜 Amounts', amounts);
    } catch (error) {
      console.error('failed to get member balances', error);
    }
  };
  getAllBalances();
}, [hasClaimedNFT, editionDrop?.erc721, memberAddresses]);

// Now, we combine the memberAddresses and memberTokenAmounts into a single array
const memberList = useMemo(() => {
  if (!memberAddresses || memberAddresses.length === 0) {
    return [];
  }

  const combinedList = memberAddresses.map((address, index) => {
    const tokenAmount = memberTokenAmounts[index] || 0; // Use 0 if token amount is not available
    return {
      address,
      tokenAmount,
    };
  });

  return combinedList;
}, [memberAddresses, memberTokenAmounts]);


  useEffect(() => {
    if (!address) {
      return;
    }
    const checkBalance = async () => {
      try {
        const balance = await editionDrop!.erc721.balanceOf(address);
        if (balance.gt(0)) {
          setHasClaimedNFT(true);
          console.log("🌟 this user has a membership NFT!");
        } else {
          setHasClaimedNFT(false);
          console.log("😭 this user doesn't have a membership NFT.");
        }
      } catch (error) {
        setHasClaimedNFT(false);
        console.error("Failed to get balance", error);
      }
    };

    checkBalance();
  }, [address, editionDrop]);

  //DATES

  const web3 = new Web3('https://bsc-dataseed.binance.org/');

const getBlockTimestamp = useCallback(async (blockNumber: BlockNumberOrTag) => {
  try {
    const block = await web3.eth.getBlock(blockNumber);

    if (block) {
      const timestamp = new Date(Number(block.timestamp) * 1000);
      
      return timestamp;
    } else {
      console.log('Block not found for proposal.');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}, [web3.eth]);

const fetchTimestamps = useCallback(async (proposals: Proposal[]) => {
  for (const proposal of proposals) {
    const blockNumber = proposal.startBlock.toNumber();
    
    try {
      const timestamp = await getBlockTimestamp(blockNumber);
      if (timestamp !== null) {
        setTimestamps((prevTimestamps) => ({
          ...prevTimestamps,
          [proposal.proposalId.toString()]: timestamp,
        }));
        
      } else {
        console.log('Error getting timestamp for proposal:', proposal.proposalId.toString());
      }
    } catch (error) {
      console.error('Error fetching timestamp for proposal:', error);
    }
  }
}, [getBlockTimestamp]);

useEffect(() => {
  // Wait for 5 seconds (5000 milliseconds) before fetching timestamps
  const delay = 300000; // 5 seconds
  const timer = setTimeout(() => {
    fetchTimestamps(proposals);
  }, delay);

  return () => {
    clearTimeout(timer); // Clear the timer if the component unmounts before 5 seconds
  };
}, [proposals]);

const fetchEndBlockTimestamps = useCallback(async (proposals: Proposal[]) => {
  for (const proposal of proposals) {
    const blockNumber = proposal.endBlock.toNumber(); // Use endBlock instead of startBlock
    
    try {
      const timestamp = await getBlockTimestamp(blockNumber);
      if (timestamp !== null) {
        setTimestamps((prevTimestamps) => ({
          ...prevTimestamps,
          [`${proposal.proposalId}-end`]: timestamp, // Use a unique key for endBlock timestamps
        }));
        
      } else {
        console.log('Error getting endBlock timestamp for proposal:', proposal.proposalId.toString());
      }
    } catch (error) {
      console.error('Error fetching endBlock timestamp for proposal:', error);
    }
  }
}, [getBlockTimestamp]);

useEffect(() => {
  // Wait for 5 seconds (5000 milliseconds) before fetching timestamps
  const delay = 300000; // 5 seconds
  const timer = setTimeout(() => {
    fetchEndBlockTimestamps(proposals);
  }, delay);

  return () => {
    clearTimeout(timer); // Clear the timer if the component unmounts before 5 seconds
  };
}, [proposals]);

const fetchDatesPeriodically = () => {
  // Fetch both startBlock and endBlock timestamps
  fetchTimestamps(proposals);
  fetchEndBlockTimestamps(proposals);
};



// Set up an interval to call fetchDatesPeriodically every 300 seconds
useEffect(() => {
  // Initial call
  fetchDatesPeriodically();

  // Set up an interval to fetch dates every 300 seconds (5 minutes)
  const intervalId = setInterval(fetchDatesPeriodically, 300000); // 300,000 milliseconds = 300 seconds

  // Clean up the interval when the component unmounts
  return () => {
    clearInterval(intervalId);
  };
}, [proposals]);


const [displayedProposals, setDisplayedProposals] = useState(5)

  

  // Handle click on "Show More" button
  const handleShowMore = () => {
    setDisplayedProposals((prev) => prev + 5);
  };



  /*
  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div style={{marginTop:"150px", marginBottom:"100px", textAlign:"center"}} className="landing">
        <h1>Welcome to OSEAN DAO</h1>
        <h5>Connect a wallet</h5>
      </div>
    );
  }

  if (!hasClaimedNFT) {
    return (
      <div style={{ flex: '1', display: 'flex', marginTop: '100px', marginBottom: '100px', textAlign: 'center', alignContent: 'center', flexDirection: 'column', justifyContent: 'center', margin: 'auto' }}>
  <h3>You need to hold our governance token to access this page</h3>
  <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '400px', minWidth: '350px', maxWidth: '580px', margin: 'auto', padding: '30px' }}>
    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
      <Image
        src="/img/govnftbanner.png"
        layout="responsive"
        width={580}
        height={580}
        alt="Osean NFT, NFT marketplace"
        quality={100}
        style={{ width: '100% !important', height: '100% !important', margin: 'auto' }}
      />
    </div>
    <div className="mt-4" style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
      <Text>Get your own governance NFT today!</Text>
    </div>
    <div className="mt-1" style={{ display: 'flex', justifyContent: 'center', margin: 'auto' }}>
      <Link className="btn btn-lg btn-round btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s" href="https://markt.osean.online/govmint" style={{ margin: '0 10px' }}>
        Mint This Collection
      </Link>
    </div>
  </div>
</div>


      
    );
  }
  // If the user has already claimed their NFT we want to display the interal DAO page to them
  // only DAO members will see this. Render all the members + token amounts.
  if (hasClaimedNFT) { */
    return (
      <Flex justify="center" alignItems="center" flexDirection="column">
        <h1>OSEAN DAO Member area</h1>
        <p>This page is accessible only to our Governance NFT Holders</p>
        <Flex justify="space-between" alignItems="flex-start" width="100%" maxWidth="800px">
          <Box flex="1" width="100%">
            <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
              <h2>Proposal History</h2>
              <hr className={`${styles.divider} ${styles.spacerTop}`} />
            
              <Flex justify="center" alignItems="center" flexDirection="column">
            
              <div style={{ flex: 1, width: "100%" }}>
              {proposals.slice().reverse().slice(0, displayedProposals).map((proposal) => (
  <div key={proposal.proposalId.toString()} style={{ flex: 1, padding: "10px", width: "100%" }}>
    <Card mt-2 style={{ padding: "5px", width: "100%", maxWidth: "1000px" }} mb={10}>
      <h3>Proposal Title and Desc</h3>
      <Text mt={4}><h5 style={{ paddingTop: "5px" }}>{proposal.description}</h5></Text>
      <hr className={`${styles.divider} ${styles.spacerTop}`} />
      Proposer:
      <h6 style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}>{proposal.proposer}</h6>
      
     <p>Started: {timestamps[proposal.proposalId.toString()]?.toLocaleString() ?? 'Fetching timestamp...'}</p>
     <p>Ended: {timestamps[`${proposal.proposalId}-end`]?.toLocaleString() ?? 'Fetching end timestamp...'}</p>
     <Card maxW={"300px"} justify={"center"} alignSelf={"center"} textAlign={"center"} p={4} mb={4}>
      <Text>Encoded Proposal Data</Text>
     <p>{proposal.executions[0].transactionData.toString()}</p>
     </Card>
     <hr className={`${styles.divider} ${styles.spacerTop}`} />
      <h5>Vote Count</h5>
      {proposal.votes.map(({ type, label, count }) => (
      
        <div key={type} style={{ marginTop: "2px", display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: "0px" }}>
          
          <label htmlFor={proposal.proposalId + "-" + type} style={{ margin: "3px 5px" }}>
            {label}
          </label>
          <span style={{ marginLeft: "10px" }}>
            Votes: {count.toString()}
          </span>
          </div>
        ))}
        <div style={{ marginTop: "20px", display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: "20px" }}>
          {proposal.state === 3 && (
            <img src="img/defeated.png" alt="Defeated" />
          )}
          {proposal.state === 4 && (
            <img src="img/passed.png" alt="Passed" />
          )}
          {proposal.state === 7 && (
            <img src="img/executed.png" alt="Passed" />
          )}
        </div>
        <div>
  {proposal.state === 4 && (
    <div>
      <Web3Button
  isDisabled={isExecuting}
  className="btn btn-lg btn-round mb-4 btn-gradient-blue animated"
  data-animation="fadeInUpShorter"
  data-animation-delay="1.7s"
  action={async () => {
    setIsExecuting(true); // Set loading state
    try {
      // Execute the proposal and update status
      await vote?.execute(proposal.proposalId.toString());
      setExecutionStatus('Proposal executed successfully');

      // Update the proposal state in the component state
      setProposals((prevProposals) =>
        prevProposals.map((prevProposal) =>
          prevProposal.proposalId.toString() === proposal.proposalId.toString()
            ? { ...prevProposal, state: 7 }
            : prevProposal
        )
      );

      // Show a success toast message
      toast({
        title: 'Execute was successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error executing proposal:', error);
      setExecutionStatus('Error executing proposal');

      // Cast the error to the Error type to ensure it has a message property
      const errorMessage = (error as Error).message;

      // Extract the reason from the error message
      const errorLines = errorMessage.split('\n');
      const reasonLine = errorLines.find((line: string) => line.startsWith("Reason:"));
      const reason = reasonLine ? reasonLine.replace("Reason:", "").trim() : "Unknown error";

      // Show an error toast message with the extracted error message
      toast({
        title: `Failed! Reason: ${reason}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsExecuting(false); // Reset loading state
    }
  }}
  contractAddress={DAO_ADDRESS}
>
  {isExecuting ? 'Executing...' : 'Execute'}
</Web3Button>

      {executionStatus && <p>{executionStatus}</p>}
    </div>
  )}
</div>
  

            </Card>
          </div>
        ))}
        {proposals.length > displayedProposals && (
          <button onClick={handleShowMore} className="btn btn-lg btn-round mb-4 btn-gradient-blue animated"
          data-animation="fadeInUpShorter"
          data-animation-delay="1.7s">
            Show More
          </button>
        )}
                </div>
              
              
              
              </Flex>
            
            </div>
          </Box>
        </Flex>
      </Flex>
    );
 // } else { return null;} 
}
