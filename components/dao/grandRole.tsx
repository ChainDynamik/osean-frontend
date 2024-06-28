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
import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { DAO_ADDRESS, OSEAN_ADDRESS, NFT_ADDRESS } from "../../cost/addresses"; 


export default function GrandRole() {
  const { contract: voteContract } = useContract(DAO_ADDRESS);
  const { contract: nftDrop } = useContract(NFT_ADDRESS, "nft-drop");
  console.log("NFT Drop Contract:", nftDrop);
  const { contract: tokenContract } = useContract(OSEAN_ADDRESS);
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
  const [role, setRole] = useState("")
  const [account, setAccount] = useState("");

  const toWei = (value: string) => {
    // Convert user-friendly format to WEI
    return ethers.utils.parseEther(value).toString();
  };

  // Use the useContractWrite hook
  const { mutateAsync: propose } = useContractWrite(voteContract, "propose");
  
  const handleProposal = async () => {
    try {

      const roleData = nftDrop?.encoder.encode("grantRole", [role, account]);
      
      // Define the proposal data based on user input
      const targets = [NFT_ADDRESS]; // OSEAN token and voteContract addresses
      const values = [0]; // 0 for no ETH transfer
      const calldatas = [roleData];
      const descriptionText = description;
  
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Card style={{maxWidth: "600px"}} >
        <Flex justify="space-between" alignItems="flex-start" width="100%">
          <Box flex="1" m={4}>
            <FormControl>
              <h3>Grand Role</h3>
              <h6>This is a prebuilt proposal to grand roles to a wallet.</h6>
              <FormLabel mt={6}>Description</FormLabel>
              <Input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={3}>Role</FormLabel>
              <Input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel mt={3}>Wallet</FormLabel>
              <Input
                type="text"
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </FormControl>
            <div style={{textAlign: "center"}}>
              <button className="btn btn-lg btn-round mt-4 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s"
                onClick={handleProposal}
              >
                Create Proposal
              </button>
            </div>
          </Box>
        </Flex>
      </Card>
    </div>
    </ChakraProvider>
  );
}
