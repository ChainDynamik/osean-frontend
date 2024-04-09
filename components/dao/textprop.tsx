import { ethers } from "ethers";
import {
  Flex,
  Card,
  Text,
  Box,
  Button,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  useToast,
  ChakraProvider,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { DAO_ADDRESS, OSEAN_ADDRESS, CEO_WALLET } from "../../cost/addresses";


export default function TextProposal() {
  const { contract: voteContract } = useContract(DAO_ADDRESS, "vote");
  const { contract: tokenContract } = useContract(OSEAN_ADDRESS, "token");
  const toast = useToast();
  
  const handleSuccess = () => {
    toast({
      title: "Proposal successfully created",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };
  
  
  const [description, setDescription] = useState("");
  //const [amount, setAmount] = useState("");
  //const [wallet, setWallet] = useState("");
 

  // Use the useContractWrite hook
  const { mutateAsync: propose, isLoading } = useContractWrite(voteContract, "propose");

  const textPropose = async () => {
    try {
      
        // Convert user-friendly amount to WEI
        // const weiAmount = ethers.utils.parseEther(amount);
  
        // Define the proposal data based on user input
        const targets = [voteContract?.getAddress()]; // The recipient wallet
        const values = [0]; // Amount to send in WEI
        const calldatas = ['0x']; // For ETH transfers, the calldata is empty
        const descriptionText = description;
  
        await propose({
          args: [targets, values, calldatas, descriptionText],
        });
        console.info("Proposal successfully created");
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card style={{maxWidth: "600px"}} >
      <Flex justify="space-between" alignItems="flex-start" width="100%">
          <Box flex="1" m={4}>
      <FormControl>
        <h3>Text Proposal</h3>
        <Text>This is a prebuilt proposal to create with a text only for DAO to vote.</Text>
        <FormLabel>Description</FormLabel>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          size="sm"
        />
      </FormControl>

      
      <div style={{textAlign: "center"}}>
      <button className="btn btn-lg btn-round mt-4 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s" 
      onClick={textPropose}
      >Create Proposal</button>
      </div>
      </Box>
            </Flex>
            
      </Card>
    </div>
    </ChakraProvider>
  );
}
