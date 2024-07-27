import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";
import useScreenSize from "../../util/hooks/useScreenSize";
import { cn } from "../../util";
export const OseanHeaderLinks: React.FC = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css?family=Comfortaa:300,400,500,700"
        rel="stylesheet"
      />
      {/*Font icons*/}
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/fontawesome.min.css"
        rel="stylesheet"
      />
      {/* BEGIN VENDOR CSS*/}
      <link
        rel="stylesheet"
        type="text/css"
        href="theme-assets/css/bootstrap.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="theme-assets/fonts/themify/style.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="theme-assets/fonts/flag-icon-css/css/flag-icon.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="theme-assets/vendors/animate/animate.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="theme-assets/vendors/flipclock/flipclock.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="theme-assets/vendors/swiper/css/swiper.min.css"
      />
      {/* END VENDOR CSS*/}
      {/* END CRYPTO CSS*/}
      {/* BEGIN Page Level CSS*/}
      <link
        rel="stylesheet"
        type="text/css"
        href="theme-assets/css/template-intro-video.css"
      />
      {/* END Page Level CSS*/}
      {/* BEGIN Custom CSS*/}
      <link rel="stylesheet" type="text/css" href="assets/css/style.css" />
    </>
  );
};

export const OseanHeader: React.FC = () => {
  const { isTablet } = useScreenSize();
  function toggleNav() {
    if (isTablet) {
      document
        .querySelectorAll("#navbarCollapse")[0]
        .classList.toggle("collapse");
    }
  }
  return (
    <>
      <OseanHeaderLinks />
      <header className="page-header">
        {/* Horizontal Menu Start*/}
        <nav className="main-menu static-top navbar-dark navbar navbar-expand-lg fixed-top mb-1 navbar-fixed navbar-shadow">
          <div className="container">
            <a
              className="navbar-brand animated"
              data-animation="fadeInDown"
              data-animation-delay="1s"
              href="https://osean.online"
              style={{ display: "flex" }}
            >
              <img
                src="/theme-assets/images/logo-dark.png"
                className="navbar-brand-logo-dark"
                alt="OSEAN Logo"
              />
              <span className="brand-text">
                <span className="font-weight-bold">Osean</span> DAO
              </span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={toggleNav}
              style={{
                filter:
                  "invert(52%) sepia(44%) saturate(4169%) hue-rotate(172deg) brightness(99%) contrast(110%)",
              }}
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className={cn("navbar-collapse", {
                collapse: isTablet,
              })}
              id="navbarCollapse"
            >
              <div id="navigation" className="navbar-nav ml-auto">
                <ul className="navbar-nav mt-1">
                  <li
                    className="nav-item animated"
                    data-animation="fadeInDown"
                    data-animation-delay="1.0s"
                  >
                    <a className="nav-link" href="https://osean.online">
                      Home
                    </a>
                  </li>
                  <li
                    className="nav-item animated"
                    data-animation="fadeInDown"
                    data-animation-delay="1.2s"
                  >
                    <a className="nav-link" href="https://dex.osean.online">
                      Swap
                    </a>
                  </li>
                  <li
                    className="nav-item animated"
                    data-animation="fadeInDown"
                    data-animation-delay="1.4s"
                  >
                    <a className="nav-link" href="https://stake.osean.online">
                      Stake
                    </a>
                  </li>
                  <li
                    className="nav-item animated"
                    data-animation="fadeInDown"
                    data-animation-delay="1.4s"
                  >
                    <a className="nav-link" href="https://markt.osean.online">
                      Marketplace
                    </a>
                  </li>
                  <li
                    className="nav-item animated"
                    data-animation="fadeInDown"
                    data-animation-delay="1.8s"
                  >
                    <a className="nav-link" href="https://gov.osean.online">
                      DAO
                    </a>
                  </li>
                  <li
                    className="nav-item animated"
                    data-animation="fadeInDown"
                    data-animation-delay="1.4s"
                  >
                    <a className="nav-link" href="https://club.osean.online">
                      NFT Club
                    </a>
                  </li>
                  <li
                    className="dropdown show mr-2 px-2 animated"
                    data-animation="fadeInDown"
                    data-animation-delay="2.0s"
                  ></li>
                </ul>
                <span id="slide-line" />
                <form className="form-inline mt-2 mt-md-0">
                  <a className=" my-2 my-sm-0">
                    <ConnectWallet theme="light" />
                  </a>
                </form>
              </div>
            </div>
          </div>
        </nav>
        {/* /Horizontal Menu End*/}
      </header>
      {/* /Header End*/}
    </>
  );
};

export default OseanHeader;
