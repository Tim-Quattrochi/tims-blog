import { Link } from "react-router-dom";
import "./hero.css";

const Hero = ({ title, para, btnName, path }) => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-heading">{title}</h1>
        <p className="p-text">{para}</p>
        <Link className="cta-button" to={`/${path}`}>
          {btnName}
        </Link>
      </div>
    </section>
  );
};

export default Hero;
