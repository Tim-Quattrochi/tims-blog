import React from "react";
import "./footer.css";
import gitHubSvg from "../../assets/github-mark.svg";

const Footer = () => {
  return (
    <footer id="cs-footer-107">
      <div className="cs-container">
        <ul className="cs-ul">
          <li className="cs-li cs-copyright">
            © 2023 Copyright Tim Quattrochi
          </li>
          <li className="cs-li">
            <a
              href="https://github.com/Tim-Quattrochi"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <img
                width={"34px"}
                src={gitHubSvg}
                alt="GitHub"
                className="github-icon"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
