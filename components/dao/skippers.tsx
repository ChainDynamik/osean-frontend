import { Stack, Flex, SimpleGrid, Card, Box, Divider, Text, FormControl, Input, FormLabel, useToast } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import {
    useAddress,
    useContract,
    useContractWrite,
  } from '@thirdweb-dev/react';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Proposal } from "@thirdweb-dev/sdk";
import  styles from "../../styles/Main.module.css";
import { utils, BigNumber } from "ethers";
import Web3, { BlockNumberOrTag } from 'web3';


export default function Skippers(): React.ReactElement | null {

// get connected wallet address
const address = useAddress() || '';
console.log('👋 Address:', address);



//SKIPPERS NFT
const { contract: editionDrop } = useContract(
    "0xE9De594c2FaD94b31b7Ce3192dB961B920238E9C",
  "nft-drop",    
);

  
const [memberAddresses, setMemberAddresses] = useState<string[] | undefined>([]);

// This useEffect grabs all the addresses of our members holding our NFT.
useEffect(() => {
      
    const getAllAddresses = async () => {
      try {
        const memberAddressesData = await editionDrop?.erc721.getAllOwners();
        const ownerAddresses = memberAddressesData
          ? Array.from(new Set(memberAddressesData.map(item => item.owner)))
          : [];
  
        setMemberAddresses(ownerAddresses);
        console.log('🚀 Members addresses', ownerAddresses);
      } catch (error) {
        console.error('failed to get member list', error);
      }
    };
    getAllAddresses();
    

  }, [editionDrop?.erc721]);

  const memberList = useMemo(() => {
    if (!memberAddresses || memberAddresses.length === 0) {
      return [];
    }
  
    const combinedList = memberAddresses.map((address, index) => {
      
      return {
        address,
        
      };
    });
  
    return combinedList;
  }, [memberAddresses]);

  if (!address) {
    return(

        <div style={{textAlign: "center"}}>
        <h3>Connect Wallet</h3>
        </div> 

        )
  }

  if (address === "0xC0bA74E3D4dA3273530E89080417C08daC7d984C") {
  return (

<Card className="mt-4" style={{maxWidth: "550px", justifyContent: "center", display: "flex"}}>
  <div style={{ textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
    <h2>Member List</h2>
    <hr className={`${styles.divider} ${styles.spacerTop}`} />
    <div style={{textAlign: "center", maxHeight: "1000px", overflowY: "auto" }}>
      <SimpleGrid columns={1} spacing={4}>
        <Stack spacing={4}>
          <h4>Address</h4>
          {memberList.map((member, index) => (
            <div key={index}>
              {member.address}
            </div>
          ))}
        </Stack>
       
      </SimpleGrid>
    </div>
  </div>
</Card>

    )
  } else {

    return(

        <div style={{textAlign: "center"}}>
        <h3>You have no access to this page</h3>
        </div> 
    )
  }
}