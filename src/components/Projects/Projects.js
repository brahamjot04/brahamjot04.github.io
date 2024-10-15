import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import bakeology from "../../Assets/Projects/Bakeology.png";
import elements from "../../Assets/Projects/Elements.png";
import lms from "../../Assets/Projects/LMS.png";
import vetclinic from "../../Assets/Projects/Vetclinic.png";
import fmcrs from "../../Assets/Projects/FMCRS.png";
import Library from "../../Assets/Projects/Library.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bakeology}
              isBlog={false}
              title="Bakeology"
              description="Practice Website Designed during the 6-week training at STEP-GNDEC from July 2022 to August 2022."
              ghLink="https://github.com/brahamjot04/Bakeology"
              demoLink="https://brahamjot04.github.io/Bakeology/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Library}
              isBlog={false}
              title="Library Webpage Redesign"
              description="Redesigned the library page of the Guru Nanak Dev Polytechnic College website."
              // ghLink="https://github.com/brahamjot04/Library-Management-System"
              demoLink="https://gndpoly.org/library.php?library=home"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={lms}
              isBlog={false}
              title="Library Management System"
              description="A web-based Library Management System developed using HTML, CSS, JavaScript, PHP, and MySQL. The system allows the librarian to manage the library's books, members, and transactions."
              ghLink="https://github.com/brahamjot04/Library-Management-System"
              // demoLink="https://editor.soumya-jit.tech/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={vetclinic}
              isBlog={false}
              title="Vetclinic"
              description="A web-based Veterinary Clinic Management System developed using HTML, CSS, JavaScript, PHP, and MySQL. The system allows the veterinarian to manage the clinic's pets, owners, and appointments."
              ghLink="https://github.com/brahamjot04/Vetclinic"
              // demoLink="https://plant49-ai.herokuapp.com/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={fmcrs}
              isBlog={false}
              title="90.8 MHz FM Community Radio, GNDEC"
              description="90.8 MHz FM Community Radio Station, Guru Nanak Dev Engineering College, Ludhiana. The website is designed to provide information about the radio station, its programs and team members."
              // ghLink="https://github.com/soumyajit4419/AI_For_Social_Good"
              demoLink="https://fmcrs.gndec.ac.in/"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={elements}
              isBlog={false}
              title="Elements: Kitchens That Inspire"
              description="Elements: Kitchens That Inspire is a website for a Canadian-based kitchen design company. The website is designed to showcase the company's kitchen designs and services."
              // ghLink="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
              demoLink="https://emfinc.ca/"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
