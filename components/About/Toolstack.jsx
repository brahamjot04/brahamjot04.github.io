import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiAdobepremierepro,
  SiDiscord,
  SiAdobephotoshop,
  SiWindows11,
  SiAudacity,
  SiUbuntu,
  SiKalilinux,
  SiManjaro,
  SiMicrosoftazure,
  SiOverleaf,
  SiVercel,
  SiIntellijidea,
  SiCanva,
  SiFigma,
  SiGooglesheets,
} from "react-icons/si";

function Toolstack() {
  return (
    <Row
      className="tech-grid"
      style={{ justifyContent: "center", paddingBottom: "50px" }}
    >
      <Col xs={4} md={2} className="tech-icons accent-win">
        <SiWindows11 />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-ubuntu">
        <SiUbuntu />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-kali">
        <SiKalilinux />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-manjaro">
        <SiManjaro />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-vscode">
        <SiVisualstudiocode />
      </Col>

      <Col xs={4} md={2} className="tech-icons accent-intellij">
        <SiIntellijidea />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-premiere">
        <SiAdobepremierepro />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-photoshop">
        <SiAdobephotoshop />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-discord">
        <SiDiscord />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-audacity">
        <SiAudacity />
      </Col>

      <Col xs={4} md={2} className="tech-icons accent-azure">
        <SiMicrosoftazure />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-overleaf">
        <SiOverleaf />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-vercel">
        <SiVercel />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-canva">
        <SiCanva />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-figma">
        <SiFigma />
      </Col>

      <Col xs={4} md={2} className="tech-icons accent-sheets">
        <SiGooglesheets />
      </Col>
    </Row>
  );
}

export default Toolstack;
