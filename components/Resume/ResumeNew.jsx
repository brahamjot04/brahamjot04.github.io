import React, { useState, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { usePortfolioData } from "../../context/PortfolioContext";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const defaultPdf = "/assets/Resume.pdf";

function ResumeNew() {
  const { data } = usePortfolioData();
  const pdf = data?.personal?.resumePdf || defaultPdf;
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

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative", marginBottom: "20px" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>

        <Row className="resume justify-content-center">
          <Document
            file={pdf}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="text-center my-4">
                <Spinner animation="border" variant="info" />
                <p className="mt-2 text-muted">Loading Resume...</p>
              </div>
            }
            error={
              <div className="text-center my-4 text-danger">
                <p>Unable to preview PDF directly in browser.</p>
                <Button variant="outline-primary" href={pdf} target="_blank">
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

        <Row style={{ justifyContent: "center", position: "relative", marginTop: "20px" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
