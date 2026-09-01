import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Link from "next/link";
import Particle from "../Particle";
import { FaExternalLinkAlt, FaFilePowerpoint, FaArrowLeft } from "react-icons/fa";

function Presentations() {
  const presentationUrl =
    "https://gndecedu-my.sharepoint.com/personal/brahamjot2221146_gndec_ac_in/_layouts/15/Doc.aspx?sourcedoc={8897ebbd-1941-4d30-81c9-c97018ef8ec0}&action=embedview&wdAr=1.7777777777777777";

  return (
    <div>
      <Container fluid className="presentations-section">
        <Particle />
        <Container>
          <div className="text-center mb-4">
            <h1 className="project-heading">
              Technical <strong className="purple">Presentations & Talks</strong>
            </h1>
            <p className="section-lead mx-auto text-center" style={{ marginBottom: "1.4rem" }}>
              Selected slide decks, academic seminars, and technical talks delivered at GNDEC.
            </p>
          </div>

          <Row className="justify-content-center">
            <Col lg={10}>
              <Card className="presentation-card-box p-3 p-md-4 mb-4">
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
                  <div className="d-flex align-items-center gap-2">
                    <span className="p-2 rounded bg-primary bg-opacity-25 text-info">
                      <FaFilePowerpoint size={20} />
                    </span>
                    <div>
                      <h5 className="fw-bold mb-0 text-light">
                        Technical Seminar & Project Presentation
                      </h5>
                      <span className="small text-muted">
                        Guru Nanak Dev Engineering College • Information Technology
                      </span>
                    </div>
                  </div>

                  <div className="d-flex gap-2">
                    <a
                      href={presentationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="admin-btn admin-btn-secondary admin-btn-sm text-decoration-none"
                    >
                      <FaExternalLinkAlt size={12} /> Open Full Deck
                    </a>
                  </div>
                </div>

                <div className="presentation-iframe-wrapper rounded overflow-hidden">
                  <iframe
                    title="Technical Presentation"
                    src={presentationUrl}
                    style={{ border: 0, width: "100%", height: "100%", minHeight: "480px" }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              </Card>

              <div className="text-center mt-3">
                <Link href="/" className="admin-btn admin-btn-secondary admin-btn-sm text-decoration-none">
                  <FaArrowLeft /> Back to Home
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
}

export default Presentations;
