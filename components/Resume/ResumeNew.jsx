import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner, Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import {
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaFilePdf,
  FaFileAlt,
  FaExternalLinkAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { usePortfolioData } from "../../context/PortfolioContext";
import { getSafeUrl } from "../../lib/urlUtils";

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const defaultPdf = "/assets/Resume.pdf";

function ResumeNew() {
  const { data } = usePortfolioData();
  const rawPdf = data?.personal?.resumePdf || defaultPdf;
  const pdf = getSafeUrl(rawPdf, defaultPdf);
  const [viewMode, setViewMode] = useState("interactive");
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages: total }) {
    setNumPages(total);
  }

  const getScale = () => {
    if (width > 1200) return 1.6;
    if (width > 786) return 1.2;
    if (width > 480) return 0.85;
    return 0.58;
  };

  const roles = data?.personal?.targetRoles || [];
  const projects = data?.projects || [];

  const eduList = data?.educationList?.length > 0 
    ? data.educationList 
    : [
        {
          degree: data?.personal?.education?.degree || "Bachelor of Technology (B.Tech)",
          institution: data?.personal?.education?.college || "Guru Nanak Dev Engineering College, Ludhiana",
          startYear: (data?.personal?.education?.batch || "2020 - 2024").split(" - ")[0],
          endYear: (data?.personal?.education?.batch || "2020 - 2024").split(" - ")[1],
          status: data?.personal?.education?.status || "Graduated Fresher",
          grade: "",
          description: "Specialization in Information Technology. Coursework covering Data Structures, Algorithms, Object-Oriented Programming (Java), Operating Systems, and Database Management Systems."
        }
      ];

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />

        {/* TOP TOGGLE & ACTION HEADER */}
        <div className="text-center mb-5">
          <h1 className="project-heading mb-2">
            Curriculum <strong className="purple">Vitae</strong>
          </h1>
          <p className="text-muted small mb-4">
            B.Tech in Information Technology • Full Stack & Software Developer
          </p>

          <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
            {/* VIEW SWITCHER */}
            <div className="resume-view-switcher p-1 rounded-pill d-inline-flex">
              <button
                type="button"
                className={`resume-tab-btn ${viewMode === "interactive" ? "active" : ""}`}
                onClick={() => setViewMode("interactive")}
              >
                <FaFileAlt /> Interactive Resume
              </button>
              <button
                type="button"
                className={`resume-tab-btn ${viewMode === "pdf" ? "active" : ""}`}
                onClick={() => setViewMode("pdf")}
              >
                <FaFilePdf /> PDF View
              </button>
            </div>

            {/* DOWNLOAD BUTTON */}
            <Button
              variant="primary"
              href={pdf}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center gap-2 rounded-pill px-4 py-2"
            >
              <AiOutlineDownload size={18} />
              <span>Download PDF</span>
            </Button>
          </div>
        </div>

        {/* ==================== INTERACTIVE TIMELINE VIEW ==================== */}
        {viewMode === "interactive" && (
          <Container style={{ maxWidth: "980px" }}>
            {/* STATUS BADGE */}
            <div className="text-center mb-4">
              <span className="about-status-pill">
                <span className="live-indicator-dot"></span>
                <span>Actively Seeking Full-Time SDE & Full Stack Roles</span>
              </span>
            </div>

            <Row className="g-4">
              {/* EDUCATION & ACADEMIC BACKGROUND */}
              <Col lg={6}>
                <Card className="resume-interactive-card p-4 h-100">
                  <div className="d-flex align-items-center gap-2 mb-3 text-accent">
                    <FaGraduationCap size={22} />
                    <h4 className="fw-bold mb-0 text-light">Education</h4>
                  </div>

                  {eduList.map((eduItem, idx) => (
                    <div key={idx} className="resume-timeline-item mb-4 pb-3 border-bottom border-secondary border-opacity-25">
                      <div className="d-flex justify-content-between align-items-start flex-wrap gap-1 mb-1">
                        <h5 className="fw-bold text-light mb-0">
                          {eduItem.degree || "Degree"}
                        </h5>
                        {(eduItem.startYear || eduItem.endYear) && (
                          <Badge bg="info" className="text-dark small">
                            {eduItem.startYear || ""} {eduItem.startYear && eduItem.endYear ? "-" : ""} {eduItem.endYear || ""}
                          </Badge>
                        )}
                      </div>
                      <div className="text-info small mb-2">
                        {eduItem.institution || "Institution"}
                      </div>
                      <p className="text-muted small mb-2" style={{ whiteSpace: "pre-wrap" }}>
                        {eduItem.description || ""}
                      </p>
                      <div className="d-flex align-items-center gap-2">
                        {eduItem.status && (
                          <Badge bg="success" className="rounded-pill">
                            {eduItem.status}
                          </Badge>
                        )}
                        {eduItem.grade && (
                          <Badge bg="secondary" className="rounded-pill">
                            {eduItem.grade}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* TARGET ROLES */}
                  <div>
                    <div className="small text-muted fw-bold mb-2 text-uppercase">
                      Target Job Roles
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {roles.map((r, i) => (
                        <span key={i} className="about-role-chip">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </Col>

              {/* CORE SKILLS & EXPERTISE */}
              <Col lg={6}>
                <Card className="resume-interactive-card p-4 h-100">
                  <div className="d-flex align-items-center gap-2 mb-3 text-accent">
                    <FaTools size={20} />
                    <h4 className="fw-bold mb-0 text-light">Technical Skills</h4>
                  </div>

                  <div className="mb-3">
                    <div className="small text-light fw-bold mb-2">Languages & Fundamentals</div>
                    <div className="d-flex flex-wrap gap-1">
                      {["JavaScript (ES6+)", "TypeScript", "Java", "SQL", "Dart", "HTML5/CSS3"].map((s) => (
                        <span key={s} className="admin-chip">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="small text-light fw-bold mb-2">Frameworks & Libraries</div>
                    <div className="d-flex flex-wrap gap-1">
                      {["Next.js", "React.js", "Flutter", "Node.js", "Express", "Bootstrap", "REST APIs"].map((s) => (
                        <span key={s} className="admin-chip">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="small text-light fw-bold mb-2">Cloud & Databases</div>
                    <div className="d-flex flex-wrap gap-1">
                      {["Supabase (PostgreSQL)", "Firebase", "Git / GitHub", "Vercel", "Linux Bash"].map((s) => (
                        <span key={s} className="admin-chip">{s}</span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top border-secondary border-opacity-25">
                    <div className="d-flex align-items-center gap-2 text-success small mb-1">
                      <FaCheckCircle /> Ready for immediate onboarding & remote/onsite relocation
                    </div>
                  </div>
                </Card>
              </Col>

              {/* FEATURED PROJECTS SHOWCASE */}
              <Col xs={12}>
                <Card className="resume-interactive-card p-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2 text-accent">
                      <FaBriefcase size={20} />
                      <h4 className="fw-bold mb-0 text-light">Featured Engineering Projects</h4>
                    </div>
                    <Button variant="outline-info" size="sm" href="/project" className="rounded-pill">
                      View All Projects ↗
                    </Button>
                  </div>

                  <Row className="g-3">
                    {projects.slice(0, 4).map((proj, idx) => (
                      <Col md={6} key={idx}>
                        <div className="resume-project-item p-3 rounded">
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="fw-bold text-light mb-0">{proj.title}</h6>
                            <div className="d-flex gap-2">
                              {proj.ghLink && (
                                <a
                                  href={proj.ghLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-muted small"
                                  title="GitHub"
                                >
                                  <FaExternalLinkAlt size={11} />
                                </a>
                              )}
                            </div>
                          </div>
                          <p className="text-muted small mb-2 text-truncate-2" style={{ minHeight: "40px" }}>
                            {proj.description}
                          </p>
                          <div className="d-flex flex-wrap gap-1">
                            {proj.tags?.slice(0, 4).map((tag, tIdx) => (
                              <span key={tIdx} className="badge bg-dark border border-secondary text-info small" style={{ fontSize: "0.72rem" }}>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        )}

        {/* ==================== PDF EMBED VIEW ==================== */}
        {viewMode === "pdf" && (
          <Row className="resume justify-content-center">
            <Document
              file={pdf}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="text-center my-4">
                  <Spinner animation="border" variant="info" />
                  <p className="mt-2 text-muted">Loading Resume Document...</p>
                </div>
              }
              error={
                <div className="text-center my-4 text-danger">
                  <p>Unable to preview PDF directly in browser.</p>
                  <Button
                    variant="outline-primary"
                    href={pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Resume Directly ↗
                  </Button>
                </div>
              }
              className="d-flex flex-column align-items-center"
            >
              {numPages &&
                Array.from({ length: numPages }, (_, index) => (
                  <div key={`resume_page_${index + 1}`} className="resume-page-wrapper mb-4">
                    <Page
                      pageNumber={index + 1}
                      scale={getScale()}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>
                ))}
            </Document>
          </Row>
        )}
      </Container>
    </div>
  );
}

export default ResumeNew;
