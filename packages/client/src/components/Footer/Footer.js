import React from "react";
import "./footer.css";
import gitHubSvg from "../../assets/github-mark.svg";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "#0D1B2A",
        color: "#F0FFF4",
        padding: "20px 0",
      }}
    >
      <Container>
        <p className="footer-text">
          © {new Date().getFullYear()} Blog Talk
        </p>
      </Container>
      <div className="icon-wrapper">
        <a
          href="https://github.com/Tim-Quattrochi"
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          <img src={gitHubSvg} alt="GitHub" className="github-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
