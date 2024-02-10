import { Container, Flex, Box, Card, FormControl } from "@chakra-ui/react";
import { useAddress } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import React from "react";
import { OseanHeaderLinks } from "../components/oseanHeader";
import { Loading } from "./loading";
import Link from "next/link";
import { DAO_ADDRESS } from "../cost/addresses";

const ProposalPage: NextPage = () => {
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
  } */

  return (
    <Container maxW={"100%"}>

              <div className="sub-page">
                
                <div className="page-header">
                    <div className="img"></div>
                    <div className="head-content container-fluid">
                        <div className="container">
                            <h1 className="page-title">Submit</h1>
                           
                            <div className="breadcrumb">
                                <a href="https://osean.online">Home</a> / 
                                <a className="current">Submit your proposal</a>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
    <Container maxW={"1200px"}>
      <div className="breadcrumb" style={{marginTop:"50px"}}>
        <Link href="/">Archive &nbsp;</Link> /&nbsp; 
        <Link href="/vote">Quorum &nbsp;</Link> /&nbsp; 
        <Link href="/proposals">Submit a Proposal &nbsp;</Link> /&nbsp;
        <Link href="/decoder">Decode proposal Data</Link>
      </div>
      <div style={{marginTop:"70px", marginBottom:"50px"}}>
  
  <Flex  justify="center"   alignItems="flex-start" flexDirection={{ base: "column", md: "row" }} width="100%">
    
      <Card style={{ maxWidth: '500px', margin: '10px 10px' }}>
        <Box m={4}>
          
            <FormControl>
              <h3>Transfer OSEAN</h3>
              <h6>This is a prebuilt proposal to transfer any amount of OSEAN from our treasury to a random wallet.</h6>
            </FormControl>
            <div style={{ textAlign: "center" }}>
              <Link href='/transferOsean' className="btn btn-lg btn-round mt-4 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s">
                Create Proposal
              </Link>
            </div>
         </Box> 
      </Card>
      <Card style={{ maxWidth: '500px', margin: '10px 10px' }}>
      <Box m={4}>
            <FormControl>
              <h3>Swap OSEAN for BNB</h3>
              <h6>This is a prebuilt proposal to Swap Osean for BNB from the Dao Treasury</h6>
            </FormControl>
            <div style={{ textAlign: "center" }}>
              <Link href='/swaposean' className="btn btn-lg btn-round mt-4 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s">
                Create Proposal
              </Link>
            </div>
          </Box>
      </Card>
      </Flex>

      <Flex justify="center" alignItems="flex-start" flexDirection={{ base: "column", md: "row" }} width="100%">
      <Card style={{ maxWidth: '500px', margin: '10px 10px' }}>
      <Box m={4}>
            <FormControl>
              <h3>Transfer BNB</h3>
              <h6>This is a prebuilt proposal to transfer any amount of BNB from our treasury to a random wallet.</h6>
            </FormControl>
            <div style={{ textAlign: "center" }}>
              <Link href='/transferBNB' className="btn btn-lg btn-round mt-4 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s">
                Create Proposal
              </Link>
            </div>
          </Box>
      </Card>
      <Card style={{ maxWidth: '500px', margin: '10px 10px' }}>
      <Box m={4}>
            <FormControl>
              <h3>Swap BNB for OSEAN</h3>
              <h6>This is a prebuilt proposal to Swap BNB for OSEAN from Our DAO Treasury</h6>
            </FormControl>
            <div style={{ textAlign: "center" }}>
              <Link href='/swapBNB' className="btn btn-lg btn-round mt-4 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s">
                Create Proposal
              </Link>
            </div>
          </Box>
      </Card>
      </Flex>
      <Flex justify="center" alignItems="flex-start" flexDirection={{ base: "column", md: "row" }} width="100%">
      <Card style={{ maxWidth: '500px', margin: '10px 10px' }}>
      <Box m={4}>
            <FormControl>
              <h3>Swap BNB for USDT</h3>
              <h6>This is a prebuilt proposal to Swap BNB for USDT from Our DAO Treasury</h6>
            </FormControl>
            <div style={{ textAlign: "center" }}>
              <Link href='/swapUSDT' className="btn btn-lg btn-round mt-4 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s">
                Create Proposal
              </Link>
            </div>
          </Box>
      </Card>
      <Card style={{ maxWidth: '500px', margin: '10px 10px' }}>
      <Box m={4}>
            <FormControl>
              <h3>Mint Governace NFTs</h3>
              <h6>This is a prebuilt proposal to mint and offer NFT Governance tokens</h6>
            </FormControl>
            <div style={{ textAlign: "center" }}>
              <Link href='/claimconditions' className="btn btn-lg btn-round mt-4 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s">
                Create Proposal
              </Link>
            </div>
          </Box>
      </Card>
      </Flex>
      <Flex justify="center" alignItems="flex-start" flexDirection={{ base: "column", md: "row" }} width="100%">
      <Card style={{ maxWidth: '500px', margin: '10px 10px' }}>
      <Box m={4}>
            <FormControl>
              <h3>Set Voting Period</h3>
              <h6>This is a prebuilt proposal to change our DAO`s Voting Period</h6>
            </FormControl>
            <div style={{ textAlign: "center" }}>
              <Link href='/votingPeriod' className="btn btn-lg btn-round mt-4 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s">
                Create Proposal
              </Link>
            </div>
          </Box>
      </Card>
      <Card style={{ maxWidth: '500px', margin: '10px 10px' }}>
      <Box m={4}>
            <FormControl>
              <h3>Transfer USDT</h3>
              <h6>This is a prebuilt proposal to transfer any amount of USDT from our treasury to a random wallet.</h6>
            </FormControl>
            <div style={{ textAlign: "center" }}>
              <Link href='/transferUSDT' className="btn btn-lg btn-round mt-4 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s">
                Create Proposal
              </Link>
            </div>
          </Box>
      </Card>
      
      </Flex>

    <div style={{ marginTop: "50px", marginBottom: "50px" }}>
      <p style={{ textAlign: 'center' }}> <br />
        DAO contract on{' '}
        <a
          target="_blank"
          rel="noopener"
          className="chakra-link chakra-button css-1c0d5xu"
          href={`https://bscscan.com/address/${DAO_ADDRESS}`}
        >
          bscscan{' '}
          <span
            style={{ display: 'inline-block' }}
            className="chakra-button__icon css-1hzyiq5"
          >
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke-linecap="round"
              stroke-linejoin="round"
              focusable="false"
              className="chakra-icon css-13otjrl"
              aria-hidden="true"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </span>
        </a>
      </p>
    </div>
  </div>
</Container>
</Container>


  );
};

export default ProposalPage;
