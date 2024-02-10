import { Card, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead, useBalance } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { ethers } from "ethers";


export default function BNBStakingContractBalance() {
    const address = useAddress();

    const { contract: stakingContract, isLoading: loadingStakeContract } = useContract("0xa3C6B0F0EE560E191614859f9790b99FBBf8fdd2");
    const { contract: stakingContract2, isLoading: loadingStakeContract2 } = useContract("0xD7fd7b5eb7cf468c8A376Acb65b609A45788897A");

    const { data: contractTokenBalance , refetch: refetchContractTokenBalance , isLoading: loadingContractTokenBalance } = useContractRead(stakingContract, "getRewardTokenBalance");
    const { data: contractTokenBalance2 , refetch: refetchContractTokenBalance2 , isLoading: loadingContractTokenBalance2 } = useContractRead(stakingContract2, "getRewardTokenBalance");

    const { data: newtokenBalance, isLoading: loadingnewTokenBalance } = useBalance("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c");

    const formattedBalance = contractTokenBalance
    ? ethers.utils.formatUnits(contractTokenBalance, 18) // 18 is the number of decimals for the unit you want to convert to
    : '';

    const formattedBalance2 = contractTokenBalance2
    ? ethers.utils.formatUnits(contractTokenBalance2, 18) // 18 is the number of decimals for the unit you want to convert to
    : '';

    useEffect(() => {
        setInterval(() => {
            refetchContractTokenBalance();
        }, 10000);
    }, []);

    useEffect(() => {
        setInterval(() => {
            refetchContractTokenBalance2();
        }, 10000);
    }, []);
    
    return (
        <Card p={5} className="card__reward-token">
            <Stack>
                <h3><img src="theme-assets/images/wbnb200.png" alt="WBNB" width="40" height="40" className='token-icon pb-1'/>&nbsp;Total Rewards Avail.</h3>
                <Skeleton h={4} w={"50%"} isLoaded={!loadingnewTokenBalance && !loadingContractTokenBalance}>
                    <Text fontSize={"large"} fontWeight={"bold"}>${newtokenBalance?.symbol}</Text>
                </Skeleton>
                <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeContract && !loadingContractTokenBalance}>
                    <Text>
                        <img src="theme-assets/images/wbnb200.png" alt="WBNB" width="18" height="18" className='token-icon pb-1'/>
                        &nbsp;Standard:&nbsp;{formattedBalance}
                    </Text>
                </Skeleton>
                <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeContract2 && !loadingContractTokenBalance2}>
                    <Text>
                        <img src="theme-assets/images/wbnb200.png" alt="WBNB" width="18" height="18" className='token-icon pb-1'/>
                        &nbsp;Skipper:&nbsp;&nbsp;&nbsp;&nbsp;{formattedBalance2}
                    </Text>
                </Skeleton>
            </Stack>
        </Card>
    )
}