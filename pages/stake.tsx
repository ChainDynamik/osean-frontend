import { Container, 
  Flex, 
  SimpleGrid, 
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel, Box, Card, Select } from "@chakra-ui/react";
import ChainContext from "../cost/chain";
import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import React, { useContext } from "react";
import RewardToken from "../components/stake/RewardToken";
import RewardTokenEth from "../components/stake/RewardTokenEth";
import Stake from "../components/stake/Stake";
import StakeEth from "../components/stake/StakeEth";
import Stake2 from "../components/stake/Stake2";
import Stake3 from "../components/stake/Stake3";
import StakeToken from "../components/stake/StakeToken";
import StakeTokenEth from "../components/stake/StakeTokenEth";
import { OseanHeaderLinks } from "../components/oseanHeader";
import { Loading } from "./loading";
import Link from "next/link";

const Home: NextPage = () => {
  const address = useAddress();

  const { selectedChain, setSelectedChain } = useContext(ChainContext);
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
         <br />
         
         <div className="row bg-color mt-5">
                  <div style={{ position: "relative", backgroundColor: "#1F86FF", overflow: "hidden", color: "#fff" }} className="col-md-12 col-lg-6 col-xl-6">
                  <div className="bg-ripple-animation d-none d-md-block" style={{ position: "absolute", bottom: "-200px", right: "120px", zIndex: "0" }}>
                        <div className="ripples" style={{ position: "absolute", bottom: "-200px", right: "120px", width: "800px", height: "800px", zIndex: "-1" }}></div>
                    </div>
                  <div className="heading text-center mt-5">
                  <h2 style={{ color: "#fff" }} className="title animated" data-animation="fadeInUpShorter" data-animation-delay="0.3s">
                      <strong>Select your</strong> Chain
                    </h2>
                    <div className="separator animated" data-animation="fadeInUpShorter" data-animation-delay="0.3s">
                      <span className="large"></span>
                      <span className="medium"></span>
                      <span className="small"></span>
                    </div>
                    <p style={{ color: "#fff" }} className="content-desc animated" data-animation="fadeInUpShorter" data-animation-delay="0.4s">
                      Use the selector to stake OSEAN token on your favorite Chain. Osean token is available on both BINANCE and ETHEREUM Chains, while our NFTs only available on BINANCE chain.
                      
                    </p>
                  </div> 
                  </div>
                  <div style={{ position: "relative", backgroundColor: "#1F86FF", overflow: "hidden" }} className="col-md-12 col-lg-6 col-xl-6 ">
                    <div className="bg-ripple-animation d-none d-md-block" style={{ position: "absolute", bottom: "-200px", left: "120px", zIndex: "0" }}>
                        <div className="ripples" style={{ position: "absolute", bottom: "-200px", left: "120px", width: "800px", height: "800px", zIndex: "-1" }}></div>
                    </div>
                    <div className="heading text-center mt-5">
                  <h2 style={{ color: "#fff" }} className="title animated" data-animation="fadeInUpShorter" data-animation-delay="0.3s">
                      <strong>Selector</strong>
                    </h2>
                   
                    
                  </div> 
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "auto", marginTop: "-80px",  marginBottom: "80px", zIndex: "1" }}>
                   
                        <Card style={{ maxWidth: "600px", zIndex: "1" }}>
                          <Flex justify="space-between" alignItems="flex-start" width="100%">
                            <Box flex="1" m={4}>
                              <form>
                                <h4>Select your Chain</h4>
                                <Select style={{ maxWidth: "600px", zIndex: "1" }}
                                  value={String(selectedChain)}
                                  onChange={(e) => setSelectedChain(e.target.value)}
                                >
                                  <option value="binance">BINANCE</option>
                                  <option value="ethereum">ETHEREUM</option>
                                </Select>
                              </form>
                            </Box>
                          </Flex>
                        </Card>
                      </div>
                    </div>
                  </div>


      <Tabs mt={10} size='md' variant='enclosed'>
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
        
        
     {selectedChain === "binance" && ( 
      <div>
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
      </div>
      )}

{selectedChain === "ethereum" && ( 
      <div>
      <SimpleGrid
        columns={2}
        spacing={4}
        mt={10}
        className="stake-and-reward-wrapper"
      >
        <StakeTokenEth />
        <RewardTokenEth />
      </SimpleGrid>
      <StakeEth />
      </div>
      )}
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
