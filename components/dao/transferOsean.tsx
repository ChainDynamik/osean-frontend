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
import { DAO_ADDRESS, OSEAN_ADDRESS, CEO_WALLET } from "../../cost/addresses";


export default function TransferOsean() {
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

  const handleTransfer = async () => {
    try {
      await transfer(); // Await the transfer function
      
    } catch (error) {
      
    }
  };

  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [wallet, setWallet] = useState("");

  const toWei = (value: string) => {
    // Convert user-friendly format to WEI
    return ethers.utils.parseEther(value).toString();
  };

  
  // Use the useContractWrite hook
  const { mutateAsync: propose, isLoading } = useContractWrite(voteContract, "propose");

  const transfer = async () => {
    try {
      // Define the proposal data based on user input
      const targets = [tokenContract?.getAddress()];
      const values = [0];
      const calldatas = [
        tokenContract?.encoder.encode("transfer", [wallet, toWei(amount)]),
      ];
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Card style={{ maxWidth: "600px" }}>
          <Flex justify="space-between" alignItems="flex-start" width="100%">
            <Box flex="1" m={4}>
              <FormControl>
                <h3>Transfer Osean</h3>
                <Text>This is a prebuilt proposal to send an OSEAN amount from our treasury to an external Wallet.</Text>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel mt={3}>Wallet or Address</FormLabel>
                <Input
                  type="text"
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel mt={3}>Amount in OSEAN</FormLabel>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </FormControl>
              <div style={{ textAlign: "center" }}>
                <button className="btn btn-lg btn-round mt-4 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s"
                  onClick={handleTransfer}
                >Create Proposal</button>
              </div>
            </Box>
          </Flex>
        </Card>
      </div>
    </ChakraProvider>
  );
}

