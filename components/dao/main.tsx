import { Stack, Flex, SimpleGrid, Card, Box, Divider, Text, FormControl, Input, FormLabel, useToast } from "@chakra-ui/react";
import {
    useAddress,
    useContract,
    useContractWrite,
  } from '@thirdweb-dev/react';
import { NFT_ADDRESS, OSEAN_ADDRESS, DAO_ADDRESS, USDT_ADDRESS } from '../../cost/addresses';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Proposal } from "@thirdweb-dev/sdk";
import  styles from "../../styles/Main.module.css";
import { utils, BigNumber } from "ethers";
import Web3, { BlockNumberOrTag } from 'web3';

interface ProposalVotes {
  [proposalId: string]: {
    [type: string]: {
      count: BigNumber;
    };
  };
}
  
export default function Main(): React.ReactElement | null {

  // get connected wallet address
  const address = useAddress() || '';
  console.log('👋 Address:', address);

  // OSEAN Token
  const { contract: oseantoken } = useContract(
    OSEAN_ADDRESS,  
  );
  
  //Governance NFT
  const { contract: editionDrop } = useContract(
    NFT_ADDRESS,
    "nft-drop",    
  );

  // call again to bypass SDK limitations for ERC721 voting
  const { contract: token } = useContract(
    NFT_ADDRESS,
    "token"
  );

  // call our DAO contract
  const { contract: vote } = useContract(
    DAO_ADDRESS,
    'vote',
  );
  

  // A fancy function to shorten someones wallet address, no need to show the whole thing.
  const shortenAddress = (str: string) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
  };

  const [hasClaimedNFT, setHasClaimedNFT] = useState(false);
  const [memberTokenAmounts, setMemberTokenAmounts] = useState<any>([]);
  const [memberAddresses, setMemberAddresses] = useState<string[] | undefined>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isVoting, setIsVoting] = useState(false);
  const [isDelegating, setIsDelegating] = useState(false);
  const [contractBNBBalance, setContractBNBBalance] = useState(BigNumber.from(0));
  const [contractOSEANBalance, setContractTokenBalance] = useState(BigNumber.from(0));
  const [contractUSDTBalance, setContractUSDTBalance] = useState(BigNumber.from(0));
  const [timestamps, setTimestamps] = useState<{ [key: string]: Date | undefined }>({});
  const [proposalHasVoted, setProposalHasVoted] = useState<{ [key: string]: boolean }>({});
  const [wallet, setWallet] = useState("");
  const [memberVotes, setMemberVotes] = useState<number[]>([]);
  const [proposalVotes, setProposalVotes] = useState<ProposalVotes>({});
  const [userMessage, setUserMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  const toast = useToast();

  // get users Vote Balance
  useEffect(() => {
    if (!hasClaimedNFT || !memberAddresses || memberAddresses.length === 0) {
      return;
    }
  
    const getTokenBalances = async () => {
      try {
        const votes = await Promise.all(
          memberAddresses.map(async (address) => {
            const data = await token?.call("getVotes", [address]);
            const dataAsString = data ? data.toString() : '0';
            return parseInt(dataAsString, 10);
          })
        );
    
        setMemberVotes(votes);
        console.log('🛠 getVotes data:', votes);
      } catch (error) {
        console.error('failed to get member balances', error);
      }
    };
  
    getTokenBalances();
    const fetchInterval = setInterval(getTokenBalances, 10000); 
  
    return () => {
      clearInterval(fetchInterval); 
    };
  }, [hasClaimedNFT, memberAddresses, token]);

  const memberVoteList = useMemo(() => {
    if (!memberAddresses || memberAddresses.length === 0) {
      return [];
    }
  
    const combinedList = memberAddresses.map((address, index) => {
      const voteAmount = memberVotes[index] || 0; // Use 0 if token amount is not available
      return {
        address,
        voteAmount,
      };
    });
    
     return combinedList;
  }, [memberAddresses, memberVotes]);


  


  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
  
    if (proposals.length === 0) {
      return;
    }
  
    // Check if connected user has voted    
    const checkIfUserHasVoted = async () => {
      try {
        const hasVoted = await vote!.hasVoted(proposals[0].proposalId.toString(), address);
        setProposalHasVoted((prevProposalHasVoted) => ({
          ...prevProposalHasVoted,
          [proposals[0].proposalId.toString()]: hasVoted,
        }));
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
  
  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }
  
    // A simple call to vote.getAll() to grab the proposals. (we grab only active and queued)
    const getAllProposals = async () => {
      try {
        const proposals = await vote!.getAll();
        const activeProposals = proposals.filter((proposal) => proposal.state === 1);
        const queuedProposals = proposals.filter((proposal) => proposal.state === 5);
        
        setProposals([...activeProposals, ...queuedProposals]);

        console.log("🌈 Proposals:", proposals);
        console.log("🌈 Active Proposals:", activeProposals);
        console.log("🌈 Queued Proposals:", queuedProposals);
        
      } catch (error) {
        console.log("failed to get proposals", error);
      }
    };
    getAllProposals();

    const intervalId = setInterval(() => {
      getAllProposals();
    }, 5000);
  
    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);

  }, [hasClaimedNFT, vote]);


    
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


  // Breaking forms

   
  const handleVote = async (e: React.MouseEvent<HTMLButtonElement>, proposalId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVoting(true);
  
    const selectedProposal = proposals.find((proposal) =>
      BigNumber.from(proposal.proposalId).eq(BigNumber.from(proposalId))
    );

    //------------------- Check if user has vote power ----------
    // Check if memberAddresses is defined
    if (!memberAddresses || memberAddresses.length === 0) {
      console.error('Member addresses not available');
      // Display your error message here
      // handleErrorMessage('Member addresses not available');
      setIsVoting(false); // Set isVoting back to false to exit the function
      return;
  }
    
    
    // Check if the user has any votes
    const voteAmountIndex = memberAddresses.indexOf(address);

    if (voteAmountIndex === -1 || memberVotes[voteAmountIndex] === 0) {
        console.error('User has no votes');
        // Display your error message here
        handleConsoleError("You don't have vote power");
        setIsVoting(false); // Set isVoting back to false to exit the function
        return;
    }
    // -----------------------------------------------

    if (selectedProposal) {
      const selectedVote = selectedProposal.votes.find((vote) => {
        const elem = document.getElementById(
          proposalId + '-' + vote.type
        ) as HTMLInputElement;
        return elem?.checked;
      });
  
      if (selectedVote) {
        try {
          /*
          if (address) {
            const delegation = await token!.call("delegates", [address]);
            if (Array.isArray(delegation) && delegation.length === 1 && delegation[0] === AddressZero) {
              await token!.delegateTo(address);
              console.log("Delegation Successful to:", address);
              handleSuccess();
            }
          }
          */
  
          const proposal = await vote!.get(proposalId);
          if (proposal.state === 1) {
            await vote!.vote(proposalId.toString(), selectedVote.type);

            setProposalVotes((prevVotes) => {
              return {
                ...prevVotes,
                [proposalId.toString()]: proposal.votes.reduce((acc, vote) => {
                  return {
                    ...acc,
                    [vote.type]: {
                      count: vote.type === selectedVote.type ? vote.count : vote.count,
                    },
                  };
                }, {}),
              };
            });       
  
            // Update the hasVoted status for the selected proposal
            setProposalHasVoted((prevState) => ({
              ...prevState,
              [proposalId]: true,
            }));
  
            console.log('Successfully voted for proposal', proposalId);
            handleVoteSuccess();
          }
  
          if (proposal.state === 4) {
            await vote!.execute(proposalId.toString());
          }
        } catch (err) {
          console.error('Error in voting for proposal', proposalId, err);
          handleError(err);
        }
      } else {
        console.error('No vote type selected for proposal', proposalId);
      }
    } else {
      console.error('Proposal not found with proposalId', proposalId);
    }
  
    setIsVoting(false);
  };

  
  const fetchCastedVotes = async () => {
    try {
      if (!vote) {
        console.error('Vote object is not defined');
        return;
      }
  
      // Fetch votes for each proposal
      proposals.forEach(async (proposal) => {
        const proposalId = proposal.proposalId.toString();
  
        try {
          const proposalVotes = await vote.get(proposalId);
  
          // Assuming 'votes' is the property containing vote information in the Proposal type
          setProposalVotes((prevVotes) => ({
            ...prevVotes,
            [proposalId]: proposalVotes.votes.reduce((acc, vote) => ({
              ...acc,
              [vote.type]: { count: vote.count },
            }), {}),
          }));
        } catch (error) {
          console.error('Error fetching votes for proposal:', proposalId, error);
        }
      });
    } catch (error) {
      console.error('Error fetching casted votes:', error);
    }
  };
  
  useEffect(() => {
    // Fetch casted votes initially
    fetchCastedVotes();
  
    // Set up interval to fetch casted votes every 5 seconds
    const intervalId = setInterval(() => {
      fetchCastedVotes();
    }, 5000);
  
    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [proposals]); // Add dependencies as needed
  
 


//Contract Balances

useEffect(() => {
  async function fetchBalances() {
    try {
      // Fetch BNB balance
      const ethBalance = await vote?.balance();
      let contractBNBBalance = BigNumber.from(0);

      if (ethBalance !== undefined) {
        contractBNBBalance = BigNumber.from(ethBalance.value._hex);
        console.log('BNB Balance:', utils.formatUnits(contractBNBBalance, 18), 'BNB');
      }

      // Fetch token balance (replace 'token_contract_address' with the actual token contract address)
      const tokenBalanceResponse = await vote?.balanceOfToken(OSEAN_ADDRESS);
      let contractTokenBalance = BigNumber.from(0);

      if (tokenBalanceResponse !== undefined && tokenBalanceResponse.value) {
        // Assuming tokenBalanceResponse.value is in BigNumber format
        
        contractTokenBalance = BigNumber.from(tokenBalanceResponse.value._hex);
        console.log('Token Balance:', utils.formatUnits(contractTokenBalance, tokenBalanceResponse.decimals), tokenBalanceResponse.symbol);
      }

      // Fetch token balance (replace 'token_contract_address' with the actual token contract address)
      const usdtBalanceResponse = await vote?.balanceOfToken(USDT_ADDRESS);
      let contractUSDTBalance = BigNumber.from(0);

      if (usdtBalanceResponse !== undefined && usdtBalanceResponse.value) {
        // Assuming tokenBalanceResponse.value is in BigNumber format
        
        contractUSDTBalance = BigNumber.from(usdtBalanceResponse.value._hex);
        console.log('Token Balance:', utils.formatUnits(contractUSDTBalance, usdtBalanceResponse.decimals), usdtBalanceResponse.symbol);
      }

      // Now you have both BNB and token balances, you can set them in your state or use as needed
      setContractBNBBalance(contractBNBBalance);
      setContractTokenBalance(contractTokenBalance);
      setContractUSDTBalance(contractUSDTBalance);
    } catch (error) {
      console.error('Failed to fetch balances:', error);
    }
  }

      // Fetch all balances here
      fetchBalances();

      const intervalId = setInterval(() => {
        fetchBalances();
      }, 5000);
      return () => clearInterval(intervalId);
}, [vote]);

     

//DATES

const web3 = new Web3('https://bsc-dataseed.binance.org/');

const getBlockTimestamp = useCallback(async (blockNumber: BlockNumberOrTag) => {
  try {
    const block = await web3.eth.getBlock(blockNumber);

    if (block) {
      const timestamp = new Date(Number(block.timestamp) * 1000);
      console.log('Block Number:', block.number);
      console.log('Block Timestamp:', timestamp);
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
    console.log("Fetch block Number:", blockNumber)
    try {
      const timestamp = await getBlockTimestamp(blockNumber);
      if (timestamp !== null) {
        setTimestamps((prevTimestamps) => ({
          ...prevTimestamps,
          [proposal.proposalId.toString()]: timestamp,
        }));
        console.log("Fetch timestamp", timestamp)
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
  const delay = 5000; // 5 seconds
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
    console.log("Fetch endBlock Number:", blockNumber);
    try {
      const timestamp = await getBlockTimestamp(blockNumber);
      if (timestamp !== null) {
        setTimestamps((prevTimestamps) => ({
          ...prevTimestamps,
          [`${proposal.proposalId}-end`]: timestamp, // Use a unique key for endBlock timestamps
        }));
        console.log("Fetch endBlock timestamp", timestamp);
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
  const delay = 5000; // 5 seconds
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

const { mutateAsync: delegate, isLoading } = useContractWrite(token, "delegate")

const handleDelegate = async () => {
  try {
    const data = await delegate({ args: [wallet] });
    console.info("Delegaction Successful", data);
    
    handleSuccess();
  } catch (err) {
    console.error("Reason (ERROR):", err);
    handleError(err);
  }
}

const handleVoteSuccess = () => {
  toast({
    title: "Thank you for your vote",
    status: "success",
    duration: 7000,
    isClosable: true,
  });
};

const handleSuccess = () => {
  toast({
    title: "Delegation Successful",
    status: "success",
    duration: 5000,
    isClosable: true,
  });
};

const handleConsoleError = (errorMessage: string) => {
  toast({
    title: `Failed! Reason: ${errorMessage}`,
    status: "error",
    duration: 5000,
    isClosable: true,
  });
};

const handleError = (error: unknown) => {
  if (error instanceof Error) {
    const errorLines = error.message.split('\n');
    const reasonLine = errorLines.find((line) => line.startsWith("Reason:"));
    const reason = reasonLine ? reasonLine.replace("Reason:", "").trim() : "Unknown error";

    toast({
      title: `Failed! Reason: ${reason}`,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  } else {
    // Handle unknown type
    console.error("Unknown error:", error);
  }
};

function addThousandSeparators(input: number | string) {
  const number = typeof input === 'string' ? parseFloat(input) : input;
  return number.toLocaleString();
}

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
  <div style={{ flex: '1', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '400px', maxWidth: '580px', margin: 'auto', marginTop: "30px" }}>
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
  <Flex  justify="space-between"
    alignItems="flex-start"
    flexDirection={{ base: "column", md: "row" }}
    width="100%">
  <Box flex="1" m={4} width={"auto"}>
  <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
    <h2>Active Proposals</h2>
    <hr className={`${styles.divider} ${styles.spacerTop}`} />
    <form>
      {proposals.map((proposal) => (
        <div key={proposal.proposalId.toString()} style={{ marginBottom: "20px" }}>
          <Card style={{ flex: 1, flexWrap: "wrap" }}>
            <div style={{ padding: "10px" }}>
              <h4>Proposal Title and Desc</h4>
              <Text><h6>{proposal.description}</h6></Text>
              <Divider my={2} />
              <div style={{ marginTop: "20px" }}>
                <p>BNB Amount: {utils.formatEther(proposal.executions[0].nativeTokenValue)} BNB</p>
                <div style={{display: "flex", alignSelf:"center", justifyContent:"center"}}>
                <Card maxW={"300px"} justify={"center"} alignSelf={"center"} textAlign={"center"} p={4} mb={4}>
                <Text>Encoded Proposal Data</Text>
                <p>{proposal.executions[0].transactionData.toString()}</p>
                </Card>
                </div>
                <Divider my={2} />
                <div>
                <p>Starts: {timestamps[proposal.proposalId.toString()]?.toLocaleString('en-US', {
                  timeZoneName: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                }) ?? 'Fetching timestamp...'}</p>
                <p>
                  <strong>Ends:</strong> {timestamps[proposal.proposalId.toString()] 
                  ? new Date(timestamps[proposal.proposalId.toString()]!.getTime() + 48 * 60 * 60 * 1000).toLocaleString('en-US', {
                    timeZoneName: 'short',
                    
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                  }) 
                  : 'Fetching end timestamp...'}
              </p>
                </div>
                {proposal.votes.map(({ type, label, count }) => (
                  <div
                    key={type}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "5px",
                    }}
                  >
                    <input
                      type="radio"
                      id={proposal.proposalId + "-" + type}
                      name={proposal.proposalId.toString()}
                      value={type}
                      defaultChecked={type === 2}
                      style={{ marginRight: "5px" }}
                    />
                    <label
                      htmlFor={proposal.proposalId + "-" + type}
                      style={{ margin: "3px 5px" }}
                    >
                      {label}
                    </label>
                    <span style={{ marginLeft: "10px" }}>
                    Votes: {proposalVotes[proposal.proposalId.toString()] && proposalVotes[proposal.proposalId.toString()][type] ? proposalVotes[proposal.proposalId.toString()][type].count.toString() : count.toString()}
                    </span>
                  </div>
                ))}
                <button
                  className="btn btn-lg btn-round mt-4 mb-3 btn-gradient-blue animated"
                  data-animation="fadeInUpShorter"
                  data-animation-delay="1.7s"
                  onClick={(e) => handleVote(e, proposal.proposalId.toString())}
                  disabled={isVoting || proposalHasVoted[proposal.proposalId.toString()]}
                >
                  {isVoting
                    ? "Voting..."
                    : proposalHasVoted[proposal.proposalId.toString()]
                    ? "You Already Voted"
                    : "Vote for This Proposal"}
                </button>
              </div>
            </div>
          </Card>
          <Text fontSize='xs' as='cite'>* Important to always check the encoded data at our decoder.</Text><br />
          <Text fontSize='xs' as='cite'>** End time is not accurate and is based on blockTime.</Text>
        </div>
      ))}
    </form>
  </div>
</Box>
<Box flex="1"
      m={4}
      width={"auto"}>
        <Card mb={6}>
          <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
            <h2>Treasury Balance</h2>
            <hr className={`${styles.divider} ${styles.spacerTop}`} />
            <Text mb={1} fontSize="xl" fontWeight="bold">
              <img src="theme-assets/images/bnbtoken.png" alt="WBNB" width="18" height="18" className='token-icon pb-1' />&nbsp;
              {addThousandSeparators(utils.formatUnits(contractBNBBalance, 18))} BNB
            </Text>
            <Text mb={1} fontSize="xl" fontWeight="bold">
              <img src="theme-assets/images/oseantoken.png" alt="OSEAN" width="18" height="18" className='token-icon pb-1' />&nbsp;
              {addThousandSeparators(utils.formatUnits(contractOSEANBalance, 18))} OSEAN
            </Text>
            <Text fontSize="xl" fontWeight="bold">
              <img src="theme-assets/images/usdttoken.png" alt="WBNB" width="18" height="18" className='token-icon pb-1' />&nbsp;
              {addThousandSeparators(utils.formatUnits(contractUSDTBalance, 18))} USDT
            </Text>
          </div>
        </Card>
      
       <Card mb={6}>
        <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
          <h2>Delegate Votes</h2>
          <hr className={`${styles.divider} ${styles.spacerTop}`} />
          <FormControl>
      <FormLabel ml={4}>Wallet or Address</FormLabel>
        <Input
          width={"80%"}
          type="text"
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
        />
      <button
          className="btn btn-lg btn-round mt-4 mb-3 btn-gradient-blue animated"
          data-animation="fadeInUpShorter"
          data-animation-delay="1.7s"
          onClick={async () => {
            setIsDelegating(true);
            try {
              // Call handleDelegate and wait for it to complete
              const data = await handleDelegate();
              setIsDelegating(false); // Enable the button
              console.info("Contract call success", data); // Handle success outside
            } catch (err) {
              setIsDelegating(false); // Enable the button
              console.error("Error:", err); // Handle the error
            }
          }}
          disabled={isDelegating}
        >
          {isDelegating ? 'Delegating...' : 'Delegate'}
        </button>
      </FormControl>

        </div>
      </Card> 
      <Text fontSize='xs' as='cite'>* You must delegate to your wallet for the first time, before you can vote.</Text><br />
      <Text fontSize='xs' as='cite'>* You cannot delegate once a proposal is active. All delegations must take place before proposal submission.</Text><br />
      <Card className="mt-4">
  <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
    <h2>Member List</h2>
    <hr className={`${styles.divider} ${styles.spacerTop}`} />
    <div style={{ maxHeight: "400px", overflowY: "auto" }}>
      <SimpleGrid columns={2} spacing={4}>
        <Stack spacing={4}>
          <h4>Address</h4>
          {memberVoteList?.slice(0, 300).map((member, index) => (
            <div key={index}>
              {shortenAddress(member.address)}
            </div>
          ))}
        </Stack>
        <Stack spacing={4}>
          <h4>Vote Pwr</h4>
          {memberVoteList?.slice(0, 300).map((member, index) => (
            <div key={index}>
              {member.voteAmount}
            </div>
          ))}
        </Stack>
      </SimpleGrid>
    </div>
  </div>
</Card>
    </Box>
  </Flex>
</Flex>


    );
  //} else { return null;}
}