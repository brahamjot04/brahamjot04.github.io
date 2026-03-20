import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../src/Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>

              <h1 className="heading-name">
                I&apos;M
                <strong className="main-name"> BRAHAMJOT SINGH</strong>
              </h1>

              <p className="section-lead">
                Building practical web products, exploring security, and shipping
                polished digital experiences.
              </p>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>

              <div className="hero-actions">
                <Link href="/project" className="hero-btn hero-btn-primary">
                  View Projects
                </Link>
                <Link href="/about" className="hero-btn hero-btn-outline">
                  About Me
                </Link>
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <Image
                src={homeLogo}
                alt="home pic"
                className="img-fluid home-hero-graphic"
                priority
                style={{ width: "100%", height: "auto", maxHeight: "450px" }}
                width={520}
                height={520}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
