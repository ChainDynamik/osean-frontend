import { Container, Button, Flex, SimpleGrid, ChakraProvider, Card, FormControl, Box, Input, FormLabel, Text, Select, Image } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import React, {useContext} from "react";
import { OseanHeaderLinks } from "../components/oseanHeader";
import ChainContext from "../cost/chain";
import { Loading } from "./loading";
import BridgeVault from "../components/bridge/bridgeVault";
import BridgeEth from "../components/bridge/bridgeEth";


const Home: NextPage = () => {
  const address = useAddress();

  const [loading, setLoading] = React.useState(true);
  const { selectedChain, setSelectedChain } = useContext(ChainContext);

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
  
  return (
    <Container maxW={"100%"}>

              <div className="sub-page">
                
                <div className="page-header">
                    <div className="img"></div>
                    <div className="head-content container-fluid">
                        <div className="container">
                            <h1 className="page-title">ETH - BSC Bridge</h1>
                           
                            <div className="breadcrumb">
                                <a href="https://osean.online">Home</a> / 
                                <a className="current">Bridge</a>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>

            <Container maxW={"1200px"}>
            <div className="row mb-5">
                  <div style={{ position: "relative", overflow: "hidden", color: "#fff" }} className="col-md-12 col-lg-6 col-xl-5">
                  
                  <div className="heading text-center mt-5">
                  <div style={{display: "flex", justifyContent: "center", marginTop: "70px", marginBottom: "20px"}} className="crypto-video animated">
                  <Image src="https://osean.online/theme-assets/images/bannerBridge.jpg" alt="bridge banner"  />
                  </div>

                  <h2 className="title animated" data-animation="fadeInUpShorter" data-animation-delay="0.3s">
                      <strong>Bridge your</strong> OSEAN
                    </h2>
                    <h5 style={{marginTop: "-10px"}} className="title animated" data-animation="fadeInUpShorter" data-animation-delay="0.5s">
                      <strong>How</strong> Bridge works?
                    </h5>
                    <div className="separator animated" data-animation="fadeInUpShorter" data-animation-delay="0.3s">
                      <span className="large"></span>
                      <span className="medium"></span>
                      <span className="small"></span>
                    </div>
                    <p style={{textAlign: "justify"}} className="content-desc animated" data-animation="fadeInUpShorter" data-animation-delay="0.4s">
                      Osean is deployed on both BSC and ETH chains and share supply between them. When you move BSC-OSEAN to ETH chain your BSC tokens are locked in a vault contract and new ETH-OSEAN tokens are minted to your destination wallet.
                      <br />
                      When you move ETH-OSEAN to BSC your ETH tokens are burnt and the bridged amount is released from BSC vault contract, to your destination wallet.
                      <br />
                      <strong>Gas Fees</strong> represent the necessary amount needed to execute all transactions for a successful bridge process.
                    </p>
                  
                  </div> 
                  </div>
                  <div style={{ position: "relative", overflow: "hidden" }} className="col-md-12 col-lg-6 col-xl-7 ">
                  <ChakraProvider>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop:"70px" }}>
                            <Card style={{ maxWidth: "600px" }}>
                              <Flex justify="space-between" alignItems="flex-start" width="100%">
                                <Box flex="1" m={4}>
                                  <form>
                                    <h4>Select your Route</h4>
                                    <Select style={{ maxWidth: "600px", }}
                                      value={String(selectedChain)}
                                      onChange={(e) => setSelectedChain(e.target.value)}
                                    >
                                      <option value="binance">Binance to Ethereum</option>
                                      <option value="ethereum">Ethereum to Binance</option>
                                    </Select>
                                  </form>
                                </Box>
                              </Flex>
                            </Card>
                          </div>
                        </ChakraProvider>

                        <div style={{ marginTop: "20px", marginBottom: "50px" }}>
                          {selectedChain === "binance" && <BridgeVault />}
                          {selectedChain === "ethereum" && <BridgeEth />}
                        </div>
                      
                      <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop:"50px", marginBottom:"50px"}}>
                <Text>Powered by </Text> &ensp; <p><a href="https://socket.tech" rel="socket" target="_blank"><Image src="/theme-assets/images/socket.jpg" alt="socket" /></a></p>
                      
                      </div>
                    </div>
                  </div>

        </Container>
      
    </Container>
    
  );
};

export default Home;