import {
    Box,
    Card,
    Flex,
    Input,
    SimpleGrid,
    Skeleton,
    Stack,
    Text,
    useToast
  } from "@chakra-ui/react";
  import {
    Web3Button,
    useAddress,
    useContract,
    useContractRead,
    useTokenBalance,
  } from "@thirdweb-dev/react";
  import {
    REWARDETH_TOKEN_ADDRESSES,
    STAKEETH_CONTRACT_ADDRESSES,
    STAKEETH_TOKEN_ADDRESSES,
  } from "../../cost/addressesStakeNew";
  import React, { useEffect, useState } from "react";
  import { ethers } from "ethers";
  
  export default function StakeEth() {
    const address = useAddress();
  
    const { contract: stakeTokenContract } = useContract(
      STAKEETH_TOKEN_ADDRESSES,
      "token"
    );
    const { contract: rewardTokenContract } = useContract(
      REWARDETH_TOKEN_ADDRESSES,
      "token"
    );
    const { contract: stakeContract } = useContract(
      STAKEETH_CONTRACT_ADDRESSES,
      "custom"
    );
  
    const {
      data: stakeInfo,
      refetch: refetchStakeInfo,
      isLoading: loadingStakeInfo,
    } = useContractRead(stakeContract, "getStakeInfo", [address]);
  
    const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } =
      useTokenBalance(stakeTokenContract, address);
  
    const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } =
      useTokenBalance(rewardTokenContract, address);
  
    useEffect(() => {
      setInterval(() => {
        refetchStakeInfo();
      }, 10000);
    }, []);
  
    const [stakeAmount, setStakeAmount] = useState<string>("0");
    const [unstakeAmount, setUnstakeAmount] = useState<string>("0");
  
    function resetValue() {
      setStakeAmount("0");
      setUnstakeAmount("0");
    }
  
    const toast = useToast();
  
    return (
      <Card /*style={{backgroundColor: "#00a8ff"}}*/ p={5} mt={10} className="card__earn" >
        <h3>Stake Osean for Osean rewards.</h3>
        <br />Osean Stake tab - Base APY 6%.
        <SimpleGrid columns={2} className="card-block-wrapper">
          <Card p={5} m={5} className="card__stake">
            <Box textAlign={"center"} mb={5}>
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Osean Staked:
              </Text>
              <Skeleton isLoaded={!loadingStakeInfo && !loadingStakeTokenBalance}>
                {stakeInfo && stakeInfo[0] ? (
                  <Text>
                    <img src="theme-assets/images/oseantokeneth.png" alt="OSEAN" width="18" height="18" className='token-icon pb-1'/>&nbsp;
                    {ethers.utils.formatEther(stakeInfo[0])}
                    {" $" + stakeTokenBalance?.symbol}
                  </Text>
                ) : (
                  <Text>0</Text>
                )}
              </Skeleton>
            </Box>
            <SimpleGrid columns={2} spacing={4} className="stake-and-reward-wrapper">
              <Stack spacing={4}>
                <Input
                  type="number"
                  max={stakeTokenBalance?.displayValue}
                  value={stakeAmount}
                  onChange={(e) => setStakeAmount(e.target.value)}
                />
                <Web3Button className="btn btn-lg btn-round mt-0 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s"
                  contractAddress={STAKEETH_CONTRACT_ADDRESSES}
                  action={async (contract) => {
                    await stakeTokenContract?.erc20.setAllowance(
                      STAKEETH_CONTRACT_ADDRESSES,
                      stakeAmount
                    );
  
                    await contract.call("stake", [
                      ethers.utils.parseEther(stakeAmount),
                    ]);
                    resetValue();
                  }}
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
                >
                  Stake
                </Web3Button>
              </Stack>
              <Stack spacing={4}>
                <Input
                  type="number"
                  value={unstakeAmount}
                  onChange={(e) => setUnstakeAmount(e.target.value)}
                />
                <Web3Button className="btn btn-lg btn-round mt-0 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s"
                  contractAddress={STAKEETH_CONTRACT_ADDRESSES}
                  action={async (contract) => {
                    await contract.call("withdraw", [
                      ethers.utils.parseEther(unstakeAmount),
                    ]);
                  }}
                  onSuccess={() =>
                    toast({
                      title: "Unstake Successful",
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
                  Unstake
                </Web3Button>
              </Stack>
            </SimpleGrid>
          </Card>
          <Card p={5} m={5} className="card__reward">
            <Flex
              h={"100%"}
              justifyContent={"space-between"}
              direction={"column"}
              textAlign={"center"}
            >
              <Text fontSize={"xl"} fontWeight={"bold"}>
                Available Reward:
              </Text>
              <Skeleton
                isLoaded={!loadingStakeInfo && !loadingRewardTokenBalance}
              >
                {stakeInfo && stakeInfo[0] ? (
                  <Box>
                    <Text fontSize={"xl"} fontWeight={"bold"}>
                    <img src="theme-assets/images/oseantokeneth.png" alt="WBNB" width="18" height="18" className='token-icon pb-1'/>&nbsp;
                      {ethers.utils.formatEther(stakeInfo[1])}
                    </Text>
                    <Text>{" $" + rewardTokenBalance?.symbol}</Text>
                  </Box>
                ) : (
                  <Text>
                    <img src="theme-assets/images/oseantokeneth.png" alt="WBNB" width="18" height="18" className='token-icon pb-1'/>
                    &nbsp;0
                  </Text>
                )}
              </Skeleton>
              <div style={{textAlign:"center"}}>
              <Web3Button style={{width: "fit-content", textAlign: "center"}} className="btn btn-lg btn-round mt-0 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s"
                contractAddress={STAKEETH_CONTRACT_ADDRESSES}
                action={async (contract) => {
                  await contract.call("claimRewards");
                  resetValue();
                }}
                onSuccess={() =>
                  toast({
                    title: "Rewards Claimed",
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
            </div>
            </Flex>
          </Card>
        </SimpleGrid>
        <p style={{ textAlign: 'center' }}> <br />
          Staking contract on{' '}
          <a
            target="_blank"
            rel="noopener"
            className="chakra-link chakra-button css-1c0d5xu"
            href={`https://bscscan.com/address/${STAKEETH_CONTRACT_ADDRESSES}`}
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
  }