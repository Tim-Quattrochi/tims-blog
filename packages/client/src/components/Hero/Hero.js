import { useNavigate } from "react-router-dom";
import "./hero.css";
import { Container, Row, Col, Button } from "react-bootstrap";

const Hero = ({ title, para, btnName, path }) => {
  const navigate = useNavigate();
  return (
    <section className="hero-section">
      <Container>
        <Row>
          <Col>
            <div className="hero-content">
              <h1 className="hero-heading">{title}</h1>
              <p className="p-text">{para}</p>
              <Button
                className="cta-button"
                variant="primary"
                onClick={() => navigate(`/${path}`)}
              >
                {btnName}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
