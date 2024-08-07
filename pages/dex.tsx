import { Box, Card, Flex, Select } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import React, { useContext } from "react";
import { OseanHeaderLinks } from "../components/oseanHeader";
import SwapBNBforOSEAN from "../components/swap/swapbnbosean";
import SwapETHForOSEAN from "../components/swap/swapethosean";
import SwapOSEANForBNB from "../components/swap/swaposeanbnb";
import SwapOSEANForETH from "../components/swap/swaposeaneth";
import ChainContext from "../cost/chain";
import { useSwapContext } from "../cost/SwapContextBNB";
import { useSwapContextETH } from "../cost/SwapContextETH";
import { Loading } from "./loading";
import OseanOnRamping from "../components/OseanOnRamping/OseanOnRamping";

const SwapPage = () => {
  const address = useAddress();

  const [loading, setLoading] = React.useState(true);
  const { selectedChain, setSelectedChain } = useContext(ChainContext);
  const { selectedComponent, setSelectedComponent } = useSwapContext();
  const { selectedComponentETH, setSelectedComponentETH } = useSwapContextETH();

  const handleComponentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(e.target.value);
  };

  const handleComponentChangeETH = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponentETH(e.target.value);
  };

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div>
        <OseanHeaderLinks />
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <main>
        <br />
        <br />
        <OseanOnRamping />
        <div className="content-wrapper">
          <div className="content-body">
            <section className="about section-padding">
              <div className="container-fluid">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12 col-lg-6 col-xl-5">
                      <img
                        src="https://osean.online/dex_invest.png"
                        alt="invest"
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-md-12 col-lg-6 col-xl-7">
                      <div className="heading text-center">
                        <h2
                          className="title animated"
                          data-animation="fadeInUpShorter"
                          data-animation-delay="0.3s"
                        >
                          <strong>Token Sale</strong> &amp; Values
                        </h2>
                        <div
                          className="separator animated"
                          data-animation="fadeInUpShorter"
                          data-animation-delay="0.3s"
                        >
                          <span className="large"></span>
                          <span className="medium"></span>
                          <span className="small"></span>
                        </div>
                        <p
                          className="content-desc animated"
                          data-animation="fadeInUpShorter"
                          data-animation-delay="0.4s"
                        >
                          Our token is now trading Live. Acceptable currencies are BNB and ETH.
                          <br />
                          <br />
                          <strong>Dev tokens locked and vested gradually over a 13 month period by Unicrypt:</strong>
                          <br />
                          Dev TX lock: 0x3522b1dc7a6ccd15fa255c2057b228e9f1dc0343897c9965004815d99108ef50
                          <br />
                          <br />
                          <strong>
                            Airdrop tokens locked and vested gradually over a 19 month period by Unicrypt:
                          </strong>
                          <br />
                          Airdrop TX lock: 0xe22189ef308d5ae368a60c3171c1e75a3754d6a9daeb96297150672a1efb0703
                          <br />
                          <br />
                          <strong>Liquidity locked for 1 year by Unicrypt</strong>
                          <br />
                          Liquidity lock details:{" "}
                          <a
                            href="https://app.uncx.network/amm/pancake-v2/pair/0x8A7292E9ba068ec5221e4b5d491251a5b06762CC"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <strong>Unicrypt Liquidity Lock</strong>
                          </a>
                          <br />
                          <br />
                          <strong>*You cannot buy more than 1% of total supply on BSC or 10.000.000 $OSEAN!</strong>
                          <br />
                          <strong>*You cannot buy more than 1% of total supply on ETH or 2.800.000 $OSEAN!</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="row mb-5 bg-color ">
                    <div
                      style={{ position: "relative", backgroundColor: "#1F86FF", overflow: "hidden", color: "#fff" }}
                      className="col-md-12 col-lg-6 col-xl-6"
                    >
                      <div
                        className="bg-ripple-animation d-none d-md-block"
                        style={{ position: "absolute", bottom: "-200px", right: "120px", zIndex: "0" }}
                      >
                        <div
                          className="ripples"
                          style={{
                            position: "absolute",
                            bottom: "-200px",
                            right: "120px",
                            width: "800px",
                            height: "800px",
                            zIndex: "-1",
                          }}
                        ></div>
                      </div>
                      <div className="heading text-center mt-5 ">
                        <h2
                          style={{ color: "#fff" }}
                          className="title animated"
                          data-animation="fadeInUpShorter"
                          data-animation-delay="0.3s"
                        >
                          <strong>Select your</strong> Chain
                        </h2>
                        <div
                          className="separator animated"
                          data-animation="fadeInUpShorter"
                          data-animation-delay="0.3s"
                        >
                          <span className="large"></span>
                          <span className="medium"></span>
                          <span className="small"></span>
                        </div>
                        <p
                          style={{ color: "#fff" }}
                          className="content-desc animated"
                          data-animation="fadeInUpShorter"
                          data-animation-delay="0.4s"
                        >
                          Use the selector to trade OSEAN token on your favorite Chain. Osean token is availble only on
                          BINANCE and ETHEREUM Chains.
                        </p>
                      </div>
                    </div>
                    <div
                      style={{ position: "relative", backgroundColor: "#1F86FF", overflow: "hidden" }}
                      className="col-md-12 col-lg-6 col-xl-6 "
                    >
                      <div
                        className="bg-ripple-animation d-none d-md-block"
                        style={{ position: "absolute", bottom: "-200px", left: "120px", zIndex: "0" }}
                      >
                        <div
                          className="ripples"
                          style={{
                            position: "absolute",
                            bottom: "-200px",
                            left: "120px",
                            width: "800px",
                            height: "800px",
                            zIndex: "-1",
                          }}
                        ></div>
                      </div>
                      <div className="heading text-center mt-5">
                        <h2
                          style={{ color: "#fff" }}
                          className="title animated"
                          data-animation="fadeInUpShorter"
                          data-animation-delay="0.3s"
                        >
                          <strong>Selector</strong>
                        </h2>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: "auto",
                          marginTop: "-80px",
                          marginBottom: "80px",
                          zIndex: "1",
                        }}
                      >
                        <Card style={{ maxWidth: "600px", zIndex: "1" }}>
                          <Flex
                            justify="space-between"
                            alignItems="flex-start"
                            width="100%"
                          >
                            <Box
                              flex="1"
                              m={4}
                            >
                              <form>
                                <h4>Select your Chain</h4>
                                <Select
                                  style={{ maxWidth: "600px", zIndex: "1" }}
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
                  {selectedChain === "binance" && (
                    <div className="row">
                      <div className="col-md-12 col-lg-6 col-xl-5 mb-5">
                        <Card
                          mb={4}
                          style={{ maxWidth: "600px" }}
                        >
                          <Flex
                            justify="space-between"
                            alignItems="flex-start"
                            width="100%"
                          >
                            <Box
                              flex="1"
                              m={4}
                            >
                              <form>
                                <h4>What to Swap?</h4>
                                <Select
                                  style={{ maxWidth: "600px" }}
                                  value={selectedComponent}
                                  onChange={handleComponentChange}
                                >
                                  <option value="SwapBNBForOSEAN">BUY OSEAN ON BSC</option>
                                  <option value="SwapOseanForBNB">SELL OSEAN ON BSC</option>
                                </Select>
                              </form>
                            </Box>
                          </Flex>
                        </Card>
                        {selectedComponent === "SwapBNBForOSEAN" && <SwapBNBforOSEAN />}
                        {selectedComponent === "SwapOseanForBNB" && <SwapOSEANForBNB />}
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-7">
                        <iframe
                          title="chart"
                          src="https://dexscreener.com/bsc/0x8A7292E9ba068ec5221e4b5d491251a5b06762CC?embed=1&amp;info=0&amp;theme=light"
                          height="640px"
                          width="100%"
                        ></iframe>
                      </div>
                    </div>
                  )}
                  {selectedChain === "ethereum" && (
                    <div className="row">
                      <div className="col-md-12 col-lg-6 col-xl-5 mb-5">
                        <Card
                          mb={4}
                          style={{ maxWidth: "600px" }}
                        >
                          <Flex
                            justify="space-between"
                            alignItems="flex-start"
                            width="100%"
                          >
                            <Box
                              flex="1"
                              m={4}
                            >
                              <form>
                                <h4>What to Swap?</h4>
                                <Select
                                  style={{ maxWidth: "600px" }}
                                  value={selectedComponentETH}
                                  onChange={handleComponentChangeETH}
                                >
                                  <option value="SwapETHForOSEAN">BUY OSEAN ON ETH</option>
                                  <option value="SwapOSEANForETH">SELL OSEAN ON ETH</option>
                                </Select>
                              </form>
                            </Box>
                          </Flex>
                        </Card>
                        {selectedComponentETH === "SwapETHForOSEAN" && <SwapETHForOSEAN />}
                        {selectedComponentETH === "SwapOSEANForETH" && <SwapOSEANForETH />}
                      </div>
                      <div className="col-md-12 col-lg-6 col-xl-7">
                        <iframe
                          title="chart"
                          src="https://dexscreener.com/ethereum/0x9635B28d18B767d50635C133DaC973cf7b6a2738?embed=1&info=0"
                          height="640px"
                          width="100%"
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SwapPage;
