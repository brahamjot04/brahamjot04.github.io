import React from "react";
import Image from "next/image";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../src/Assets/pfp-brahamjot.svg";
import Tilt from "react-parallax-tilt";
import { usePortfolioData } from "../../context/PortfolioContext";
import { getSocialIcon } from "../../lib/socialIcons";
import ContactForm from "../Contact/ContactForm";

function Home2() {
  const { data } = usePortfolioData();
  const socials = data?.socialLinks || {
    github: "https://github.com/brahamjot04",
    linkedin: "https://www.linkedin.com/in/brahamjotsingh/",
    instagram: "https://www.instagram.com/brahamjot_2004/",
  };

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="align-items-center mb-5">
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              A QUICK <span className="purple"> INTRODUCTION </span>
            </h1>
            <div className="home-about-body">
              <p>
                I am a <b className="purple">B.Tech in Information Technology graduate</b> from{" "}
                <b className="purple">
                  Guru Nanak Dev Engineering College, Ludhiana
                </b>
                , actively seeking full-time <b className="purple">Software Developer</b> and <b className="purple">Full Stack</b> opportunities.
              </p>
              <p>
                I have strong foundations in core languages and frameworks including{" "}
                <i>
                  <b className="purple">JavaScript, Flutter, PHP, C++, React, and Firebase</b>.
                </i>
              </p>
              <p>
                My fields of interest are architecting modern{" "}
                <i>
                  <b className="purple">Web & Mobile Applications</b>, exploring{" "}
                  <b className="purple">Cyber Security</b>, and crafting creative visual content with{" "}
                  <b className="purple">Adobe Premiere Pro</b>.
                </i>
              </p>
              <p>
                Whenever possible, I love turning complex ideas into clean, functional products using <b className="purple">Flutter</b>, <b className="purple">React</b>, and modern backend services.
              </p>
            </div>
          </Col>
          <Col md={4} className="myAvtar text-center">
            <Tilt>
              <Image
                src={myImg}
                className="img-fluid"
                alt="avatar"
                width={360}
                height={360}
              />
            </Tilt>
          </Col>
        </Row>

        {/* INTERACTIVE RECRUITER CONTACT FORM */}
        <Row className="justify-content-center mb-5" id="contact">
          <Col lg={10}>
            <ContactForm />
          </Col>
        </Row>

        {/* SOCIAL NETWORKS */}
        <Row>
          <Col md={12} className="home-about-social">
            <h2 className="fw-bold mb-2">FIND ME ON</h2>
            <p className="text-muted">
              Connect with me on professional platforms and code repositories.
            </p>
            <ul className="home-about-social-links">
              {Object.entries(socials)
                .filter(([_, url]) => url && typeof url === "string" && url.trim().length > 0)
                .map(([platform, url]) => (
                  <li key={platform} className="social-icons">
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="icon-colour home-social-icons"
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
    </Container>
  );
}
export default Home2;
