import { ethers } from "ethers";
import {
  Flex,
  Card,
  Text,
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast,
  ChakraProvider,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useContract, useContractWrite, useSetClaimConditions } from "@thirdweb-dev/react";
import { DAO_ADDRESS, OSEAN_ADDRESS, NFT_ADDRESS } from "../../cost/addresses";

function ConsoleErrorCapture() {
  const toast = useToast();

  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (message, ...args) => {
      // Call the original console.error
      originalConsoleError(message, ...args);

      // Handle the error and display it using toast
      if (message instanceof Error) {
        const errorLines = message.message.split('\n');
        const errorLine = errorLines.find((line) => /^(Failed|Reason)/.test(line));
        const errorMessage = errorLine ? errorLine.replace(/^(Failed|Reason)/, "").trim() : "Unknown error";

        toast({
          title: `Failed! Reason: ${errorMessage}`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    return () => {
      // Restore the original console.error when the component unmounts
      console.error = originalConsoleError;
    };
  }, [toast]);

  return null; // This component doesn't render anything
}



  export default function Conditions() {
    const { contract: voteContract } = useContract(DAO_ADDRESS);
    const { contract: tokenContract } = useContract(OSEAN_ADDRESS);
    const { contract: nftDrop } = useContract(NFT_ADDRESS, "nft-drop");
    const toast = useToast();
    const { mutateAsync: propose } = useContractWrite(voteContract, "propose");
    const setClaimConditions = useSetClaimConditions(nftDrop);
  
    const handleSuccess = () => {
      toast({
        title: "Proposal successfully created",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    };
  
    const [values, setValues] = useState({
      description: "",
      amount: "",
      phaseName: "",
      walletMaxClaimable: 1,
      maxClaimable: 100,
      seconds: 60,
    });
  
    const handleChange = (field: string, value: any) => {
      setValues({
        ...values,
        [field]: value,
      });
    };
  
    const createClaimCondition = async () => {
      try {
        const claimConditions = {
          phases: [
            {
              startTime: new Date(),
              maxQuantity: Number(values.maxClaimable),
              price: ethers.utils.formatUnits(values.amount, 18), // Convert BigNumber to string in Ether
              quantityLimitPerTransaction: Number(values.walletMaxClaimable),
              waitInSeconds: values.seconds,
            },
          ],
        };
  
        const result = await setClaimConditions.mutateAsync(claimConditions);
  
        if (!setClaimConditions.error) {
          console.log("✅ Successfully set claim condition!", result);
        } else {
          console.error("Failed to set claim condition", setClaimConditions.error);
        }
      } catch (error) {
        console.error("Failed to set claim condition", error);
      }
    };
  
    const handleProposal = async () => {
      // ... your existing code for proposal
      createClaimCondition(); // Create claim condition before proposing
    };

  return (
    <ChakraProvider>
    <ConsoleErrorCapture />
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Card style={{ maxWidth: "600px" }}>
        <Flex justify="space-between" alignItems="flex-start" width="100%">
          <Box flex="1" m={4}>
            <form>
              <h3>Mint Governance NFTs</h3>
              <h6>This is a prebuilt proposal to mint and offer NFT Governance tokens</h6>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={values.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Amount in OSEAN</FormLabel>
                <Input
                  type="number"
                  value={values.amount}
                  onChange={(e) => handleChange("amount", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phase Name</FormLabel>
                <Input
                  type="text"
                  value={values.phaseName}
                  onChange={(e) => handleChange("phaseName", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Wallet Max Claimable</FormLabel>
                <Input
                  type="number"
                  value={values.walletMaxClaimable}
                  onChange={(e) => handleChange("walletMaxClaimable", e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Max Claimable</FormLabel>
                <Input
                  type="number"
                  value={values.maxClaimable}
                  onChange={(e) => handleChange("maxClaimable", e.target.value)}
                />
              </FormControl>
             
              <div style={{ textAlign: "center" }}>
              <button
  type="button" // Add this line to prevent the default form submission behavior
  className="btn btn-lg btn-round mt-4 btn-gradient-blue animated"
  data-animation="fadeInUpShorter"
  data-animation-delay="1.7s"
  onClick={handleProposal}
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


/*
{
          startTimestamp: 0,
          maxClaimableSupply: 0,
          supplyClaimed: 0,
          quantityLimitPerWallet: 0,
          merkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
          pricePerToken: 0,
          currency: OSEAN_ADDRESS,
          metadata: "Example metadata",
        }
*/        