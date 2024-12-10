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
              <h1 className="white"></h1>
              <h1 className="">404 Page Not Found</h1>
              <p className="not-found-para">
              <hr />
              nginx/1.18.0 (Ubuntu)
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default NotFound;
