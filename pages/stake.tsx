import { Container, 
  Flex, 
  SimpleGrid, 
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel } from "@chakra-ui/react";
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

  /* if (!address) {
    return (
      <Container maxW={"1200px"}>
        <Flex h={"50vh"} justifyContent={"center"} alignItems={"center"}>
          <div>
            <h1>Please Connect a Wallet</h1>
          </div>
        </Flex>
      </Container>
    );
  }*/

  return (
    <Container maxW={"1200px"}>
         <br />
         <br />
      <Tabs mt={20} size='md' variant='enclosed'>
        <TabList>
          <Tab>Stake Osean</Tab>
          <Tab>Stake Skipper NFTs</Tab>
          <Tab>Governance Rewards</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
      
      
        <img 
          src="https://osean.online/theme-assets/images/bannerapy.png"
          alt="bannerapy"
          className="bannerapy mt-3"
        />
        
      

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
      </TabPanel>
      
      {/*<Link href="/skippersmint" rel="skippers">
      <img 
          src="https://osean.online/theme-assets/images/bannerapy2.png"
          alt="bannerapy"
          className="bannerapy"
        /></Link>
      <Stake2 />*/}
      <TabPanel>
      <Link href="/skippersmint" rel="skippers">
      <img 
          src="https://osean.online/theme-assets/images/bannerapy2.png"
          alt="bannerapy"
          className="bannerapy mt-3"
        /></Link>
      <Stake3 />
      </TabPanel>
      <TabPanel>
        <h3 className="mt-3">Coming Soon...</h3>
      </TabPanel>
      </TabPanels>
      </Tabs>
    </Container>
  );
};

export default Home;
