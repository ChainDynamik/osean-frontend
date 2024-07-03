import { Card, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useAddress, useContract, useContractRead, useBalance } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { ethers } from "ethers";


export default function ETHStakingContractBalance() {
    const address = useAddress();

    const { contract: stakingContract, isLoading: loadingStakeContract } = useContract("0x3845aC8f6734752B80ad64221ba28df238f06A16");
    const { contract: stakingContract2, isLoading: loadingStakeContract2 } = useContract("0xD7fd7b5eb7cf468c8A376Acb65b609A45788897A");

    const { data: contractTokenBalance , refetch: refetchContractTokenBalance , isLoading: loadingContractTokenBalance } = useContractRead(stakingContract, "getRewardTokenBalance");
    const { data: contractTokenBalance2 , refetch: refetchContractTokenBalance2 , isLoading: loadingContractTokenBalance2 } = useContractRead(stakingContract2, "getRewardTokenBalance");

    const { data: newtokenBalance, isLoading: loadingnewTokenBalance } = useBalance("0x50d5118Fb90D572B9d42ba65E0addC4900867809");

    const formattedBalance = contractTokenBalance
    ? parseFloat(ethers.utils.formatUnits(contractTokenBalance, 18)).toFixed(2) // Format to 2 decimals
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
                <h3><img src="theme-assets/images/oseantokeneth.png" alt="WBNB" width="40" height="40" className='token-icon pb-1'/>&nbsp;Total Rewards Avail.</h3>
                <Skeleton h={4} w={"50%"} isLoaded={!loadingnewTokenBalance && !loadingContractTokenBalance}>
                    <Text fontSize={"large"} fontWeight={"bold"}>${newtokenBalance?.symbol}</Text>
                </Skeleton>
                <Skeleton h={4} w={"100%"} isLoaded={!loadingStakeContract && !loadingContractTokenBalance}>
                    <Text>
                        <img src="theme-assets/images/oseantokeneth.png" alt="WBNB" width="18" height="18" className='token-icon pb-1'/>
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