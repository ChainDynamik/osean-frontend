import {  ThirdwebSDK } from '@thirdweb-dev/sdk';
import { Web3Button, useContract, useContractWrite, useContractRead, useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { formatUnits } from 'ethers/lib/utils';
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
  Image,
  Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import React from "react";
import Web3 from "web3";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGasPump, faArrowCircleDown, faCopy } from '@fortawesome/free-solid-svg-icons'

export default function SwapBNBForOSEAN() {

  //@dev connect to contracts and get functions
  const address = useAddress();
  const { contract: osean } = useContract("0x722cb8e411d40942c0f581b919ecce3e4d759602");
  const { contract: wbnb } = useContract("0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", );
  const { mutateAsync: approve } = useContractWrite(osean, "approve");
  const { contract: univ2 } = useContract("0x10ED43C718714eb63d5aA57B78B54704E256024E");
  const { mutateAsync: swap } = useContractWrite(univ2, "swapExactETHForTokensSupportingFeeOnTransferTokens");
  const allowed = useContractRead(osean, "allowance", [address, "0x10ED43C718714eb63d5aA57B78B54704E256024E"]);
  const toast = useToast();
  
  //@dev set values from form and functions
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  
  const [amount, setAmount] = useState("");
  const [amountMinim, setAmountMinim] = useState("");
  const [gasCost, setGasCost] = useState<{ ether: string; wei: ethers.BigNumber } | undefined>(undefined);
  const [ethBalance, setETHbalance] = useState("");
  
  //@dev uncomment in case you want to allow users to set slippage
  // const [slippagePercentage, setSlippagePercentage] = useState(10);
  
  //@dev get wallets osean balance
  const to = address;
  const balanceAddress = useContractRead(osean, "balanceOf", [address]);
  const addressBalanceData = balanceAddress.data;
  let addressBalanceBig;
  let addressBalanceValue;
  let addressBalanceReadable;
  
  if (addressBalanceData) {
    const hexAddressBalance = addressBalanceData._hex;
    addressBalanceBig = ethers.BigNumber.from(hexAddressBalance);
    addressBalanceValue = addressBalanceBig.toString();
    addressBalanceReadable = formatUnits(addressBalanceBig, 18).slice(0, -14);
    console.info("Your Osean balance is:", addressBalanceValue);
    console.info("Your Readable Osean balance is:", addressBalanceReadable);
  } else {
    // Handle the case where addressBalanceData is undefined
    console.error("Error fetching Osean balance data");
    // Set default values or handle the error as needed
    addressBalanceValue = "0";
    addressBalanceReadable = "0";
  }

  //set values for swap
  const path = ["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x722cb8e411d40942c0f581b919ecce3e4d759602"] 
  const deadline = Math.floor(Date.now() / 1000) + (1*60);
  const amountIn = ethers.utils.parseUnits(amount.toString() || "0", 18);
  const amountsData = useContractRead(univ2, "getAmountsOut", [amountIn, path]);
  const slippagePercentage = 10;
  const slippagePercentage2 = 6;

  // Get amount that user will get after swap after taxes
  useEffect(() => {
    // Fetch amountsData
    if (amountsData && amountsData.data) {
      const object2 = amountsData.data[1];
      const hex2 = object2._hex;
      const value2 = ethers.BigNumber.from(hex2);
      const slippageAmount = value2.mul(slippagePercentage2).div(100);
      const valueStr = value2.sub(slippageAmount).toString();
      
      const amountMin = formatUnits(valueStr, 18).slice(0, -4);
      setAmountMinim(amountMin);
    }
  }, [amountsData]);

  
  //@dev execute swap function
  const swapFunction = async (contract: any) => {
    try {
                
        const outData = amountsData.data;
        console.log("AmountsOUT", outData);
        const object2 = outData[1];
        const hex2 = object2._hex;
        const value2 = ethers.BigNumber.from(hex2);
        console.log("MinAmount", value2.toString());
        const slippageAmount = value2.mul(slippagePercentage).div(100);
        const amountOutMin = value2.sub(slippageAmount).toString();
        console.info("You will get:", amountOutMin);

        const data = await swap({
            args: [amountOutMin, path, to, deadline], 
            overrides: { value: amountIn },
        });
        
        console.info("Contract call success", data.receipt.transactionHash);
        setTransactionHash(data.receipt.transactionHash);
    } catch (error) {
        console.error("Swap failure", error);
        throw error;
    }
};

//web3 window
const web3 = new Web3(window.ethereum);

//get wallet BNB balance
useEffect(() => {
      
    const getBNBBalance = async (address: string) => {
      try {
        const balanceInWei = await web3.eth.getBalance(address);
        const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
        return balanceInEther;
      } catch (error) {
        console.error('Error fetching BNB balance:', error);
        throw error;
      }
    };
  
    if (address) {
      getBNBBalance(address).then((bnbbalance) => {
        console.log('This is your BNB balance:', bnbbalance);
        setETHbalance(bnbbalance);
      });
    } else {
      console.error('Address is undefined');
    }  
  }, [address, web3.utils, web3.eth])
  
  //simulate swap to get gas costs
  useEffect(() => {
    const estimateGasCost = async () => {
        const weiToEther = (wei: ethers.BigNumber): string => {
            return ethers.utils.formatEther(wei);
          };
          
          const isEthereumNetwork = window.ethereum && window.ethereum.networkVersion === '1';
          const isBinanceNetwork = window.ethereum && window.ethereum.networkVersion === '56';

      if (
        address &&
        isBinanceNetwork &&
        ethBalance !== undefined &&
        parseFloat(ethBalance) > 0.0001 &&
        (!gasCost || parseFloat(gasCost.ether) === 0)
      ) {
        try {
          const nativeTokenValueTest = "0.0001";
          const testAddress = address;
          const testPath = ["0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0x722cb8e411d40942c0f581b919ecce3e4d759602"];
          const tx = univ2?.prepare("swapExactETHForTokensSupportingFeeOnTransferTokens", [0, testPath, testAddress, deadline], { value: ethers.utils.parseEther(nativeTokenValueTest) });
          const gasCost = await tx?.estimateGasCost();
          console.log("Gas cost:", gasCost);
          if (gasCost) {
            setGasCost({ ether: weiToEther(gasCost.wei), wei: gasCost.wei });
          }
        } catch (error) {
          console.error("Swap failure", error);
          throw error;
        }
      }
    };
  
    // Call estimateGasCost function
    estimateGasCost();
  }, [ethBalance, address, univ2, deadline, to, gasCost]);

  //add token to metamask
  const tokenAddress = '0x722cb8e411d40942c0f581b919ecce3e4d759602';
  const tokenSymbol = 'OSEAN';
  const tokenDecimals = 18;
  const tokenImage = '/img/osean200.png';

  const addToMetamask = async () => {
    try {
      // 'wasAdded' is a boolean. Like any RPC method, an error can be thrown.
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress, // The address of the token.
            symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 characters.
            decimals: tokenDecimals, // The number of decimals in the token.
            image: tokenImage, // A string URL of the token logo.
          },
        },
      });
  
      if (wasAdded) {
        console.log('Thanks for your interest!');
      } else {
        console.log('Your loss!');
      }
    } catch (error) {
      console.log(error);
    }
    }

    //copy paste function for contracts
    function copyToClipboard(text: string) {
      // Check if the Clipboard API is supported
      if (!navigator.clipboard || !navigator.clipboard.writeText) {
        console.error('Clipboard API not supported');
        return;
      }
      
      // Use the writeText method to copy text to the clipboard
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Text copied to clipboard successfully:', text);
          // Show a message indicating successful copy
          alert('Text copied to clipboard successfully!');
        })
        .catch((error) => {
          console.error('Unable to copy text to clipboard:', error);
          // Show an error message if copying fails
          alert('Unable to copy text to clipboard. Please try again.');
        });
    }

    const handleCopyClick = () => {
      copyToClipboard("0x722cb8e411d40942c0f581b919ecce3e4d759602");
    }


  return (
    

<ChakraProvider>
<div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
  <Card>
    <Flex justify="space-between" alignItems="flex-start" width="100%">
      <Box flex="1" m={4}>
        <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ textAlign: "center" }}>
          <h5>Swap BNB for OSEAN</h5>
          <Flex justify="center" mt={-2}><Text fontSize='xs' as='cite'>Autoslippage - output amount is calculated after tax.</Text></Flex>
          
        </div>
          
          <FormControl mt={5}>
          <Flex alignItems="flex-start">
            <Image src="/images/binance_osean.png" width={"25px"} height={"25px"} alt="osean" mr={2} />
            <FormLabel mt={0} mb={1} fontSize={18}><strong>BNB</strong></FormLabel>
          </Flex>
            <Text fontSize='xs' as='cite'>Enter BNB amount</Text>
            <Input
              type="number"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (!isNaN(Number(value))) {
                  setAmount(value);
                }
              }}
            />
            <Text fontSize='xs' as='cite'>Balance: {ethBalance || 0} BNB</Text>
          </FormControl>
          <Flex mt={5} justify="center">
          <FontAwesomeIcon icon={faArrowCircleDown} size="2xl" beat />
          </Flex>
          <FormControl mt={5}>
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="flex-start">
              <Image src="/img/osean200.png" width={"25px"} height={"25px"} alt="osean" mr={2} />
              <FormLabel mt={0} mb={1} fontSize={18}><strong>OSEAN</strong></FormLabel>
            </Flex>
            <Box
              display="flex"
              alignItems="center"
              _hover={{ cursor: "pointer", textDecoration: "underline" }}
            >
              <FontAwesomeIcon icon={faCopy} style={{ marginRight: '10px', marginTop: '-6px' }} size="lg" onClick={handleCopyClick} />
              <Image src="/images/metamask.png" alt="metamask" width="28px" height="28px" onClick={addToMetamask} marginRight="10px" marginTop="-4px" />
              
            </Box>
          </Flex>
            <Text fontSize='xs' as='cite'>OSEAN amount you will receive</Text>
            <Input value={amountMinim} onChange={(e) => { }} />
            <Text fontSize='xs' as='cite'>Balance: {addressBalanceReadable || 0} OSEAN</Text>
            
          </FormControl>
          <Text fontSize='xs' as='cite'><FontAwesomeIcon icon={faGasPump} beat size="xs" /> Gas cost: {gasCost ? `${gasCost.ether} BNB` : "Calculating..."}</Text>
          {/*
          <FormControl>
            <FormLabel mt={3} mb={-1}>Slippage %</FormLabel>
            <Text fontSize='xs' as='cite'>Set your slippage</Text>
            <Flex>
              <Input
                type="number"
                value={slippagePercentage}
                onChange={(e) => setSlippagePercentage(Number(e.target.value))}
              />
              <Text>%</Text>
            </Flex>
          </FormControl>
          */}
          
         
          <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Web3Button className="btn btn-lg btn-round mt-4 btn-gradient-blue animated"
        contractAddress="0x10ED43C718714eb63d5aA57B78B54704E256024E"
        action={(contract) => swapFunction(contract).then(() => {})}

        onSuccess={() =>
            toast({
              title: "Transaction Succesful",
              status: "success",
              duration: 15000,
              isClosable: true,
              position: "bottom",
            })
          }
          onError={(error) => {
            const errorLines = error.message.split('\n');
            const reasonLine = errorLines.find((line) => line.startsWith("Reason:"));
            const reason = reasonLine ? reasonLine.replace("Reason:", "").trim() : "Unknown error";
            toast({
              title: `Failed! Reason: ${reason}`,
              status: "error",
              duration: 15000,
              isClosable: true,
            });
          }}
      >
        Swap
      </Web3Button>
          </div>
        </form>
      </Box>
    </Flex>
  </Card>
</div>
</ChakraProvider>
  );
}