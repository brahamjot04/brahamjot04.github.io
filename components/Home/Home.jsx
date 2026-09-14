import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../src/Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { usePortfolioData } from "../../context/PortfolioContext";

function Home() {
  const { data } = usePortfolioData();
  const personal = data?.personal || {};

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="justify-content-center">
            <Col md={10} className="home-header text-center">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I&apos;M
                <strong className="main-name"> {personal.name?.toUpperCase() || "BRAHAMJOT SINGH"}</strong>
              </h1>

              <p className="section-lead mx-auto">
                {personal.tagline || "Building practical web products, exploring security, and shipping polished digital experiences."}
              </p>

              <div style={{ padding: 50, textAlign: "center" }}>
                <Type />
              </div>

              <div className="hero-actions justify-content-center">
                <Link href="/project" className="hero-btn hero-btn-primary">
                  View Projects
                </Link>
                <Link href="/about" className="hero-btn hero-btn-outline">
                  About Me
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
