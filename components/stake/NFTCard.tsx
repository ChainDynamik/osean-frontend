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
    ThirdwebNftMedia,
    useContract,
    useNFT,
    Web3Button,
  } from "@thirdweb-dev/react";
  import type { FC } from "react";
  import {
    nftDropContractAddress,
    stakingContractAddress,
  } from "../../consts/contractAddresses";
  import styles from "../../styles/Home3.module.css";
  
  interface NFTCardProps {
    tokenId: number;
  }

  const NFTCard: FC<NFTCardProps> = ({ tokenId }) => {
    const { contract } = useContract(nftDropContractAddress, "nft-drop");
    const { data: nft } = useNFT(contract, tokenId);
    const toast = useToast();
  
    return (
      <>
        {nft && (
          <div className={styles.nftBox}>
            {nft.metadata && (
              <ThirdwebNftMedia
                metadata={nft.metadata}
                className={styles.nftMedia}
              />
            )}
            <h3>{nft.metadata.name}</h3>
            <div style={{alignItems: "center", alignContent: "center", textAlign: "center"}}>
            <Web3Button className="btn btn-lg btn-round mt-4 btn-gradient-purple animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s"
              action={(contract) => contract?.call("withdraw", [[nft.metadata.id]])}
              contractAddress={stakingContractAddress}

              onSuccess={() =>
                toast({
                  title: "Withdraw Successful",
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
              Withdraw
            </Web3Button>
            </div>
          </div>
        )}
      </>
    );
  };
  export default NFTCard;
  