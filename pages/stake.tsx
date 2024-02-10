import { Container, Flex, SimpleGrid } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import React from "react";
import RewardToken from "../components/stake/RewardToken";
import Stake from "../components/stake/Stake";
import Stake2 from "../components/stake/Stake2";
import Stake3 from "../components/stake/Stake3";
import StakeToken from "../components/stake/StakeToken";
import { OseanHeaderLinks } from "../components/oseanHeader";
import { Loading } from "./loading";
import Link from "next/link";

const Home: NextPage = () => {
  const address = useAddress();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
    <div>
    <OseanHeaderLinks />
    <Loading />
    </div> 
    )
  }

  if (!address) {
    return (
      <Container maxW={"1200px"}>
        <Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
          <div>
            <h1>Please Connect a Wallet</h1>
          </div>
        </Flex>
      </Container>
    );
  }

  return (
    <Container maxW={"1200px"}>
      <>
      <br />
      <br />
      <br />
      <br />
      <br />
      
      
        <img
          src="https://osean.online/theme-assets/images/bannerapy.png"
          alt="bannerapy"
          className="bannerapy"
        />
        
      </>

      <SimpleGrid
        columns={2}
        spacing={4}
        mt={10}
        className="stake-and-reward-wrapper"
      >
        <StakeToken />
        <RewardToken />
      </SimpleGrid>
      <Stake />
      <Link href="/skippersmint" rel="skippers">
      <img 
          src="https://osean.online/theme-assets/images/bannerapy2.png"
          alt="bannerapy"
          className="bannerapy"
        /></Link>
      <Stake2 />
      <Stake3 />
    </Container>
  );
};

export default Home;
