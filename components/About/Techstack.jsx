import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiPhp,
  DiMysql,
  DiPython,
  DiGit,
  DiJava,
  DiHtml5,
  DiCss3,
  DiBootstrap,
  DiGithub,
  DiDrupal,
  DiWordpress,
  DiReact,
} from "react-icons/di";
import { SiTailwindcss } from "react-icons/si";

function Techstack() {
  return (
    <Row
      className="tech-grid"
      style={{ justifyContent: "center", paddingBottom: "50px" }}
    >
      <Col xs={4} md={2} className="tech-icons accent-html">
        <DiHtml5 />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-css">
        <DiCss3 />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-js">
        <DiJavascript1 />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-bootstrap">
        <DiBootstrap />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-tailwind">
        <SiTailwindcss />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-php">
        <DiPhp />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-react">
        <DiReact />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-mysql">
        <DiMysql />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-cpp">
        <CgCPlusPlus />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-git">
        <DiGit />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-github">
        <DiGithub />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-drupal">
        <DiDrupal />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-wordpress">
        <DiWordpress />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-python">
        <DiPython />
      </Col>
      <Col xs={4} md={2} className="tech-icons accent-java">
        <DiJava />
      </Col>
    </Row>
  );
}

export default Techstack;
