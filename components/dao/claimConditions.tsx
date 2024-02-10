import { BytesLike, ethers, BigNumber } from "ethers";
import {
  Flex,
  Card,
  Text,
  Box,
  Input,
  FormControl,
  FormLabel,
  useToast,
  ChakraProvider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useContract, useContractWrite, useSetClaimConditions } from "@thirdweb-dev/react";
import { DAO_ADDRESS, OSEAN_ADDRESS, NFT_ADDRESS } from "../../cost/addresses";



  export default function Conditions() {
    const { contract: voteContract } = useContract(DAO_ADDRESS);
    const { contract: nftDrop } = useContract(NFT_ADDRESS, "nft-drop");
    console.log("NFT Drop Contract:", nftDrop);
    const toast = useToast();
    const { mutateAsync: propose } = useContractWrite(voteContract, "propose");
   
  
    const handleSuccess = () => {
      toast({
        title: "Proposal successfully created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    };
  
    const [descriptionValue, setDescription] = useState("");
    const [maxClaimableSupplyValue, setMaxClaimableSupply] = useState(0);
    const [quantityLimitPerTransactionValue, setQuantityLimitPerTransaction] = useState(0);
    const [pricePerTokenValue, setPricePerToken] = useState(0);
    const dateTimeNow = new Date(Date.now());
    const pricePerTokenInWei = ethers.utils.parseUnits(pricePerTokenValue.toString(), 18);

   
    interface ClaimCondition {
      startTimestamp: number;
      maxClaimableSupply: number;
      supplyClaimed: number;
      quantityLimitPerWallet: number;
      merkleRoot: BytesLike;
      pricePerToken: ethers.BigNumber;
      currency: string;
      metadata: string;
    }
    
    const claimConditions: {
      _conditions: ClaimCondition[];
      _resetClaimEligibility: boolean;
    } = {
      _conditions: [
        {
          startTimestamp: Math.floor(dateTimeNow.getTime() / 1000),
          maxClaimableSupply: maxClaimableSupplyValue,
          supplyClaimed: 0,
          quantityLimitPerWallet: quantityLimitPerTransactionValue,
          merkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
          pricePerToken: pricePerTokenInWei,
          currency: OSEAN_ADDRESS,
          metadata: "ipfs://QmXdSpyno8GDDZbpHecsjMZkb82A5EgSsHzgbJWRGV97jN/0",
        }
      ],
      _resetClaimEligibility: true,
    };
    
    
    const arrayData: [ClaimCondition[], boolean] = [
      claimConditions._conditions,
      claimConditions._resetClaimEligibility,
    ];
    
    
    const result = nftDrop?.encoder.encode("setClaimConditions", arrayData);
    
    console.log(result);


    const createProposal = async () => {
      try {
    
        const descriptionText = descriptionValue;
        const targets = [NFT_ADDRESS];
        const values = [0];
        const calldatas = [result];
    
        // Defensive check for undefined calldatas
        if (!calldatas) {
          console.error("calldatas is undefined");
          return;
        }
    
        console.log("calldatas:", calldatas);
    
        const data = await propose({
          args: [targets, values, calldatas, descriptionText],
        });
    
        console.info("Proposal successfully created", data);
        handleSuccess();
      } catch (err) {
        console.error("Failed to create proposal", err);
    
        // Manually display error using toast
        if (err instanceof Error) {
          const errorLines = err.message.split('\n');
          const errorLine = errorLines.find((line) => /^(Failed|Reason)/.test(line));
          const errorMessage = errorLine ? errorLine.replace(/^(Failed|Reason)/, "").trim() : "Invalid values";
          toast({
            title: `Failed! Reason: ${errorMessage}`,
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };

  return (
    <ChakraProvider>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ maxWidth: "600px" }}>
        <Flex justify="space-between" alignItems="flex-start" width="100%">
          <Box flex="1" m={4}>
            <form>
              <h3>Mint Governance NFTs</h3>
              <h6>This is a prebuilt proposal to mint and offer NFT Governance tokens</h6>
              <FormControl>
                <FormLabel mt={6}>Description</FormLabel>
                <Input
                  type="text"
                  value={descriptionValue}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel mt={3} mb={-1}>Amount in OSEAN</FormLabel>
                <Text fontSize='xs' as='cite'>Enter the amount in OSEAN that you wish to offer our NFTs for</Text>
                <Input
                  type="number"
                  value={pricePerTokenValue}
                  onChange={(e) => setPricePerToken(Number(e.target.value))}
                />
              </FormControl>
              <FormControl>
                <FormLabel mt={3} mb={-1}>Wallet Max Claimable</FormLabel>
                <Text fontSize='xs' as='cite'>Enter the amount of NFTs a single wallet can claim</Text>
                <Input
                  type="number"
                  value={maxClaimableSupplyValue}
                  onChange={(e) => setMaxClaimableSupply(Number(e.target.value))}
                />
              </FormControl>
              <FormControl>
                <FormLabel mt={3} mb={-1}>Max Claimable</FormLabel>
                <Text fontSize='xs' as='cite'>Enter the total amount of NFTs we will offer</Text>
                <Input
                  type="number"
                  value={quantityLimitPerTransactionValue}
                  onChange={(e) => setQuantityLimitPerTransaction(Number(e.target.value))}
                />
              </FormControl>
             
              <div style={{ textAlign: "center" }}>
              <button
                type="button" // Add this line to prevent the default form submission behavior
                className="btn btn-lg btn-round mt-4 btn-gradient-blue animated"
                data-animation="fadeInUpShorter"
                data-animation-delay="1.7s"
                onClick={createProposal}
              >
                Create Proposal
              </button>
              </div>
            </form>
          </Box>
        </Flex>
      </Card>
    </div>
  </ChakraProvider>
  );
}
