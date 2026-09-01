import React from "react";
import Card from "react-bootstrap/Card";
import Link from "next/link";
import { FaLaptopCode, FaChalkboardTeacher, FaMapMarkerAlt, FaGraduationCap, FaBriefcase, FaCode } from "react-icons/fa";
import { AiOutlineArrowRight } from "react-icons/ai";
import { usePortfolioData } from "../../context/PortfolioContext";

const getActivityIcon = (act) => {
  const lower = act.toLowerCase();
  if (lower.includes("game")) return "🎮";
  if (lower.includes("video") || lower.includes("edit")) return "🎬";
  if (lower.includes("anchor") || lower.includes("speak")) return "🎙️";
  if (lower.includes("photo")) return "📸";
  if (lower.includes("music")) return "🎵";
  return "⚡";
};

function AboutCard() {
  const { data } = usePortfolioData();
  const personal = data?.personal || {};
  const activities = personal.bio?.activities || ["Playing Games", "Video Editing", "Anchoring"];
  const targetRoles = personal.targetRoles || [
    "Software Developer",
    "Full Stack Developer",
    "Flutter Developer",
    "Web Developer",
  ];

  return (
    <Card className="modern-about-card">
      <Card.Body className="p-4 p-md-4">
        {/* TOP STATUS BADGES STRIP */}
        <div className="about-status-strip d-flex flex-wrap gap-2 mb-4">
          <span className="about-status-pill">
            <FaMapMarkerAlt className="text-danger" /> {personal.location || "Punjab, India"}
          </span>
          <span className="about-status-pill">
            <FaGraduationCap className="text-warning" /> {personal.education?.degree || "B.Tech in IT"}
          </span>
          <span className="about-status-pill available-pill">
            <span className="live-status-dot"></span> Actively Seeking Full-Time Roles
          </span>
        </div>

        {/* MAIN 2-COLUMN GRID */}
        <div className="row g-4 mb-2">
          {/* LEFT COLUMN: INTRODUCTION & TARGET ROLES */}
          <div className="col-lg-6">
            <div className="about-narrative mb-4">
              <h4 className="fw-bold text-light mb-2">
                Hi Everyone, I am <span className="purple">{personal.name || "Brahamjot Singh"}</span> 👋
              </h4>
              <p className="text-muted small lh-lg mb-0">
                I am an Information Technology graduate from{" "}
                <strong className="text-light">
                  {personal.education?.college || "Guru Nanak Dev Engineering College, Ludhiana"}
                </strong>
                . I focus on building practical web products, exploring cybersecurity, and crafting responsive user experiences.
              </p>
            </div>

            <div>
              <div className="small text-muted fw-bold mb-2 d-flex align-items-center gap-1">
                <FaBriefcase className="text-accent" size={13} /> PRIMARY FOCUS &amp; TARGET ROLES
              </div>
              <div className="d-flex flex-wrap gap-2">
                {targetRoles.map((role) => (
                  <span key={role} className="about-role-chip">
                    <FaCode size={11} className="text-accent" /> {role}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ACADEMIC SHORTCUTS & PASSIONS */}
          <div className="col-lg-6 d-flex flex-column justify-content-between">
            <div className="mb-4">
              <div className="small text-muted fw-bold mb-2 d-flex align-items-center gap-1">
                <FaLaptopCode className="text-info" size={13} /> ACADEMIC LAB &amp; PRESENTATIONS
              </div>
              <div className="d-flex flex-column gap-2">
                <Link
                  href="/javaprograms"
                  className="about-showcase-btn text-decoration-none"
                  title="View Java lab exercises and code solutions"
                >
                  <span className="d-flex align-items-center gap-2">
                    <FaLaptopCode className="text-accent" /> Java Lab Sheet &amp; Exercises
                  </span>
                  <AiOutlineArrowRight size={13} />
                </Link>
                <Link
                  href="/presentations"
                  className="about-showcase-btn text-decoration-none"
                  title="View technical seminar presentations"
                >
                  <span className="d-flex align-items-center gap-2">
                    <FaChalkboardTeacher className="text-info" /> Technical Talks &amp; Decks
                  </span>
                  <AiOutlineArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div>
              <div className="small text-muted fw-bold mb-2">
                BEYOND THE CODE (ACTIVITIES &amp; PASSIONS)
              </div>
              <div className="d-flex flex-wrap gap-2">
                {activities.map((act) => (
                  <span key={act} className="about-interest-pill">
                    <span className="me-1">{getActivityIcon(act)}</span> {act}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
