import { Card, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead, useBalance } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { ethers } from "ethers";


export default function BNBStakingContractBalance() {
    const address = useAddress();

    const { contract: stakingContract, isLoading: loadingStakeContract } = useContract("0x8d5AF78eBc2424Ff2D3211ea9169d40f2618d203");
    const { contract: stakingContract2, isLoading: loadingStakeContract2 } = useContract("0xD7fd7b5eb7cf468c8A376Acb65b609A45788897A");

    const { data: contractTokenBalance , refetch: refetchContractTokenBalance , isLoading: loadingContractTokenBalance } = useContractRead(stakingContract, "getRewardTokenBalance");
    const { data: contractTokenBalance2 , refetch: refetchContractTokenBalance2 , isLoading: loadingContractTokenBalance2 } = useContractRead(stakingContract2, "getRewardTokenBalance");

    const { data: newtokenBalance, isLoading: loadingnewTokenBalance } = useBalance("0x722cB8e411D40942C0f581B919ecCE3E4D759602");

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
    }, [refetchContractTokenBalance]);

    useEffect(() => {
        setInterval(() => {
            refetchContractTokenBalance2();
        }, 10000);
    }, [refetchContractTokenBalance2]);
    
    return (
        <Card p={5} className="card__reward-token">
            <Stack>
                <h3><img src="theme-assets/images/oseantokenbsc.png" alt="WBNB" width="40" height="40" className='token-icon pb-1'/>&nbsp;Total Rewards Avail.</h3>
                <Skeleton h={4} w={"50%"} isLoaded={!loadingnewTokenBalance && !loadingContractTokenBalance}>
                    <Text fontSize={"large"} fontWeight={"bold"}>${newtokenBalance?.symbol}</Text>
                </Skeleton>
                <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeContract && !loadingContractTokenBalance}>
                    <Text>
                        <img src="theme-assets/images/oseantokenbsc.png" alt="WBNB" width="18" height="18" className='token-icon pb-1'/>
                        &nbsp;Available:&nbsp;{formattedBalance}
                    </Text>
                </Skeleton>
                {/*<Skeleton h={4} w={"100%"} isLoaded={!loadingStakeContract2 && !loadingContractTokenBalance2}>
                        <Text>
                            <img src="theme-assets/images/oseantoken.png" alt="WBNB" width="18" height="18" className='token-icon pb-1'/>
                            &nbsp;Skipper:&nbsp;&nbsp;&nbsp;&nbsp;{formattedBalance2}
                        </Text>
                    </Skeleton>*/}
            </Stack>
        </Card>
    )
}