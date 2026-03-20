import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";

function Presentations() {
  return (
    <div>
      <Container fluid className="presentations-section">
        <Particle />
        <Container>
          <h1 className="project-heading">
            My Recent <strong className="purple">Presentations </strong>
          </h1>
          <p style={{ color: "white" }}>
            Here are a few presentations I've worked on recently.
          </p>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={4} className="presentation-card">
              <iframe
                title="Presentation embed"
                src="https://gndecedu-my.sharepoint.com/personal/brahamjot2221146_gndec_ac_in/_layouts/15/Doc.aspx?sourcedoc={8897ebbd-1941-4d30-81c9-c97018ef8ec0}&action=embedview&wdAr=1.7777777777777777"
                style={{ border: 0, width: "100%", minHeight: "420px" }}
                loading="lazy"
                allowFullScreen
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default Presentations;
