import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useAddress } from "@thirdweb-dev/react";
import { OseanHeaderLinks } from "../components/oseanHeader";
import React from "react";
import Loading from "./loading";
import Container from "../components/Container/Container";
import { MARKETPLACE_ADDRESS } from "../const/contractAddresses";


/**
 * Landing page with a simple gradient background and a hero asset.
 * Free to customize as you see fit.
 */
const Home: NextPage = () => {
  const address = useAddress();

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
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
      <Container maxWidth="lg">
                        
          <div className={`${styles.heroBodyContainer} ${styles.stackOnMobile}`} style={{ display: 'flex', width: '100%', marginTop: "120px" }}>
            {/* First div with 45% width */}
            <div style={{ flex: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '20px 10px', padding: '10px'}}>
              <div className={styles.centerVertically}>
                <h1>
                  <span className={styles.heroTitleGradient}>
                    Welcome to OSEAN DAO Marketplace</span>
                </h1>
                <div className={styles.heroBody}>
                  <h3>Please Connect a Wallet</h3>
                </div>
                
              </div>
            </div>
            
            {/* Second div with 55% width */}
            <div style={{ flex: '55%', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '400px', minWidth: "350px", margin: '20px 10px', padding: '10px' }}>
              <Image
                src="/img/govnftbanner.png"
                layout="responsive"
                width={580}
                height={580}
                alt="Osean NFT, NFT marketplace"
                quality={100}
                className={styles.heroAsset}
                style={{ width: '100% !important', height: '100% !important' }}
              />
            </div>
          </div>
          
        
    </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <br />
      <br />
      <div className="breadcrumb">
						<Link href="/markt">Marketplace &nbsp;</Link> /&nbsp; 
						<Link href="/buygov">Buy NFTs &nbsp;</Link> /&nbsp; 
						<Link href="/sellgov">Sell NFTs</Link>
					</div>
            
             
         
          <br />
          <div className={`${styles.heroBodyContainer} ${styles.stackOnMobile}`} style={{ display: 'flex', width: '100%' }}>
            {/* First div with 45% width */}
            <div style={{ flex: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '20px 10px', padding: '10px' }}>
            <Image
                src="/img/govnftbanner.png"
                layout="responsive"
                width={580}
                height={580}
                alt="Osean NFT, NFT marketplace"
                quality={100}
                className={styles.heroAsset}
                style={{ width: '100% !important', height: '100% !important' }}
              />
              <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
                  <Link className="btn btn-lg btn-round btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s" href="/govmint" style={{ margin: '0 10px' }}>
                    Mint This Collection
                  </Link>
              </div>
              
            </div>
            
            {/* Second div with 55% width */}
            <div style={{ flex: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '400px', minWidth: "350px", margin: '20px 10px', padding: '10px' }}>
              <Image
                src="/img/skipperssq.png"
                layout="responsive"
                width={580}
                height={580}
                alt="Osean NFT, NFT marketplace"
                quality={100}
                className={styles.heroAsset}
                style={{ width: '100% !important', height: '100% !important' }}
              />
              <div className="mt-4" style={{ display: 'flex', justifyContent: 'center' }}>
                  <Link className="btn btn-lg btn-round btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s" href="/skippersmint" style={{ margin: '0 10px' }}>
                    Mint This Collection
                  </Link>
              </div>
            </div>
          </div>
          <div className={`${styles.heroBodyContainer} ${styles.stackOnMobile}`} style={{ display: 'flex', width: '100%' }}>
            {/* First div with 45% width */}
            <div style={{ flex: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', margin: '20px 10px', padding: '10px' }}>
            
          
          <div className={styles.centerVertically}>
                <h1>
                  <span className={styles.heroTitleGradient}>
                    Welcome to OSEAN DAO Marketplace</span>
                </h1>
                <div className={styles.heroBody}>
                  <h3> Browse our collections, Buy and Sell your NFTs</h3>
                </div>
                <div className="mt-4" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link className="btn btn-lg btn-round mt-3 btn-gradient-blue animated" data-animation="fadeInUpShorter" data-animation-delay="1.7s" href="/buygov" style={{ margin: '0 10px' }}>
                    Buy NFTs
                  </Link>
                  <Link className="btn btn-lg btn-round btn-light mt-3 animated" data-animation="fadeInUpShorter" data-animation-delay="1.9s" href="/sellgov" style={{ margin: '0 10px' }}>
                    Sell NFTs
                  </Link>
                </div>
              </div>

             </div>
             
             </div> 
             <p style={{ textAlign: 'center' }}> <br />
          Marketplace contract on{' '}
          <a
            target="_blank"
            rel="noopener"
            className="chakra-link chakra-button css-1c0d5xu"
            href={`https://bscscan.com/address/${MARKETPLACE_ADDRESS}`}
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
    </Container>
  );
};

export default Home;
