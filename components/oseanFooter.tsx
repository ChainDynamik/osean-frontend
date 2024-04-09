import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Image } from '@chakra-ui/react';
export const OseanFooter :React.FC = () =>{
    return(
    
<footer
  className="footer static-bottom footer-light footer-custom-class"
  data-midnight="default"
>
  <div className="container">
    <div className="footer-wrapper mx-auto text-center">
      <div
        className="footer-title mb-5 animated"
        data-animation="fadeInUpShorter"
        data-animation-delay="0.2s"
      >
        Stay updated with us
      </div>
      <form
        action="https://online.us18.list-manage.com/subscribe/post?u=6a09cdbd942d1c910551ee97b&amp;id=590feb4b2d&amp;f_id=00ffc2e1f0"
        method="post"
        id="mc-embedded-subscribe-form"
        className="subscribe mb-3 animated validate"
        name="mc-embedded-subscribe-form"
        data-animation="fadeInUpShorter"
        data-animation-delay="0.3s"
        target="_self"
      >
        <input
          type="email"
          name="EMAIL"
          id="mce-EMAIL"
          className="mc-field-group subscribe-text required email"
          placeholder="Enter your email address"
        />
        <button
          id="mc-embedded-subscribe"
          type="submit"
          className="btn btn-gradient-blue btn-glow rounded-circle subscribe-btn"
        >
          <i className="ti-angle-right" />
        </button>
        <div id="mce-responses" className="clear foot">
          <div
            className="response"
            id="mce-error-response"
            style={{ display: "none" }}
          />
          <div
            className="response"
            id="mce-success-response"
            style={{ display: "none" }}
          />
        </div>
      </form>
      <p
        className="subscribe-desc mb-4 animated"
        data-animation="fadeInUpShorter"
        data-animation-delay="0.4s"
      >
        Subscribe now and be the first to find about our latest news!
      </p>
      <ul className="social-buttons list-unstyled mb-5">
        <li
          className="animated"
          data-animation="fadeInUpShorter"
          data-animation-delay="0.5s"
        >
          <a
            href="https://t.me/oseandao"
            title="Telegram"
            className="btn btn-outline-twitter rounded-circle"
          >
            <FontAwesomeIcon icon={faTelegram} /> 
            <i className="fa fa-telegram fa-2x" aria-hidden="true" />
          </a>
        </li>
        <li
          className="animated"
          data-animation="fadeInUpShorter"
          data-animation-delay="0.6s"
        >
          <a
            href="https://discord.gg/Jf2n4c4Axe"
            title="Discord"
            className="btn btn-outline-twitter rounded-circle"
          >
            <FontAwesomeIcon icon={faDiscord} /> 
            <i className="fa-brands fa-discord fa-2x" aria-hidden="true" />
          </a>
        </li>
        <li
          className="animated"
          data-animation="fadeInUpShorter"
          data-animation-delay="0.7s"
        >
          <a
            href="https://twitter.com/oseandao"
            title="Twitter"
            className="btn btn-outline-linkedin rounded-circle"
          >
            <FontAwesomeIcon icon={faTwitter} /> 
            <i className="fa fa-twitter fa-2x" aria-hidden="true" />
          </a>
        </li>
      </ul>
      
      <div className="mt-4 animated" data-animation="fadeInUpShorter" data-animation-delay="0.8s" style={{ justifyContent: "center", textAlign: "center" }}>
        <p style={{ color: "#7D7D7D", marginBottom: "5px", fontSize: "12px" }}>By connecting you agree to our</p>
        <div style={{ fontSize: "14px" }}>
          <p style={{ fontSize: "inherit", margin: "0" }}>
            <a href="https://osean.online/tos.html" rel="tos" style={{ textDecoration: "none", color: "#007BFF", fontSize: "inherit" }}>Terms of Service</a> &amp;
            <span><a href="https://osean.online/privacy.html" rel="privacy" style={{ textDecoration: "none", color: "#007BFF", fontSize: "inherit" }}> Privacy Policy</a></span>
          </p>
        </div>
        <br />
        <p style={{ color: "#7D7D7D", marginBottom: "5px", fontSize: "12px" }}>Powered By</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Image width="100px" height="22px" src="/theme-assets/images/OpenZeppelin-Logo.png" alt="OZ" /><span style={{ fontSize: "14px", color: "#7D7D7D" }}>&nbsp; &amp; &nbsp; </span>
          <Image width="90px" height="23px" alt="TW" src="/theme-assets/images/download.png" />
        </div>
        <br />
        <span className="copyright animated" data-animation="fadeInUpShorter" data-animation-delay="0.7s">Copyright &copy; 2024, Osean Dao</span>
      </div>


    </div>
  </div>
</footer>
    )
}

export default OseanFooter;