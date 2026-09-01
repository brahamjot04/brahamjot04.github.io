import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { usePortfolioData } from "../context/PortfolioContext";
import { getSocialIcon } from "../lib/socialIcons";

function Footer() {
  const { data } = usePortfolioData();
  const personal = data?.personal || {};
  const socials = data?.socialLinks || {
    github: "https://github.com/brahamjot04",
    linkedin: "https://www.linkedin.com/in/brahamjotsingh/",
    instagram: "https://www.instagram.com/brahamjot_2004/",
  };

  let date = new Date();
  let year = date.getFullYear();

  return (
    <Container fluid className="footer">
      <Row>
        <Col md="6" className="footer-copywright">
          <h3>© {year} {personal.name || "Brahamjot Singh"}. All rights reserved.</h3>
        </Col>
        <Col md="6" className="footer-body">
          <ul className="footer-icons">
            {Object.entries(socials)
              .filter(([_, url]) => url && typeof url === "string" && url.trim().length > 0)
              .map(([platform, url]) => (
                <li key={platform} className="social-icons">
                  <a
                    href={url}
                    style={{ color: "white" }}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${platform} Profile`}
                    title={platform.toUpperCase()}
                  >
                    {getSocialIcon(platform)}
                  </a>
                </li>
              ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
