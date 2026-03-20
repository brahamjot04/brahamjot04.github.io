import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

function NotFound() {
  return (
    <section>
      <Container fluid className="home-about-section">
        <Particle />
        <Container fluid>
          <Row>
            <Col md={12} className="home-about-description">
              <h1>404 | Page Not Found</h1>
              <p className="not-found-para">
                The page you are looking for does not exist or has been moved.
                <hr />
                Use the navigation above to continue exploring the portfolio.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default NotFound;
