import React, { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { Row, Col, Card } from "react-bootstrap";
import { AiFillGithub, AiOutlineStar, AiOutlineBranches, AiOutlineCode } from "react-icons/ai";
import { FaExternalLinkAlt } from "react-icons/fa";

function Github() {
  const [stats, setStats] = useState({
    publicRepos: 15,
    followers: 10,
    following: 12,
  });

  useEffect(() => {
    fetch("https://api.github.com/users/brahamjot04")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.public_repos !== undefined) {
          setStats({
            publicRepos: data.public_repos,
            followers: data.followers || 10,
            following: data.following || 12,
          });
        }
      })
      .catch((err) => console.warn("GitHub stats fetch notice:", err));
  }, []);

  const calendarTheme = {
    light: ["#16253d", "#1d4052", "#24666d", "#38a89d", "#4fd1c5"],
    dark: ["#16253d", "#1d4052", "#24666d", "#38a89d", "#4fd1c5"],
  };

  return (
    <div className="github-stats-section my-4">
      <h1 className="project-heading text-center" style={{ paddingBottom: "10px" }}>
        Days I <strong className="purple">Code</strong>
      </h1>
      <p className="text-center text-muted small mb-4">
        Open-source contributions, repositories, and development streak for{" "}
        <strong className="text-light">@brahamjot04</strong>.
      </p>

      {/* GITHUB TELEMETRY STAT CARDS */}
      <Row className="g-3 justify-content-center mb-4">
        <Col sm={6} md={3}>
          <Card className="github-stat-pill-card p-3 text-center">
            <div className="d-flex align-items-center justify-content-center gap-2 mb-1 text-accent">
              <AiOutlineBranches size={20} />
              <span className="fw-bold fs-4">{stats.publicRepos}+</span>
            </div>
            <span className="small text-muted fw-bold">Public Repositories</span>
          </Card>
        </Col>

        <Col sm={6} md={3}>
          <Card className="github-stat-pill-card p-3 text-center">
            <div className="d-flex align-items-center justify-content-center gap-2 mb-1 text-warning">
              <AiOutlineStar size={20} />
              <span className="fw-bold fs-4">Active</span>
            </div>
            <span className="small text-muted fw-bold">Code Contributions</span>
          </Card>
        </Col>

        <Col sm={6} md={3}>
          <Card className="github-stat-pill-card p-3 text-center">
            <div className="d-flex align-items-center justify-content-center gap-2 mb-1 text-info">
              <AiOutlineCode size={20} />
              <span className="fw-bold fs-4">Full Stack</span>
            </div>
            <span className="small text-muted fw-bold">Primary Focus</span>
          </Card>
        </Col>

        <Col sm={6} md={3}>
          <a
            href="https://github.com/brahamjot04"
            target="_blank"
            rel="noreferrer"
            className="github-stat-pill-card p-3 text-center text-decoration-none d-flex flex-column justify-content-center align-items-center h-100"
          >
            <div className="d-flex align-items-center justify-content-center gap-2 mb-1 text-light">
              <AiFillGithub size={20} />
              <span className="fw-bold fs-5">@brahamjot04</span>
            </div>
            <span className="small text-accent d-flex align-items-center gap-1">
              Visit GitHub Profile <FaExternalLinkAlt size={10} />
            </span>
          </a>
        </Col>
      </Row>

      {/* GITHUB CALENDAR CONTAINER */}
      <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
        <div className="github-calendar-box p-3 p-md-4 rounded">
          <GitHubCalendar
            username="brahamjot04"
            blockSize={15}
            blockMargin={5}
            theme={calendarTheme}
            fontSize={15}
          />
        </div>
      </Row>
    </div>
  );
}

export default Github;
