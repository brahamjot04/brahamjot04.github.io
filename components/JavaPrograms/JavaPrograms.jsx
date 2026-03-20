import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const pdf = "/assets/JavaErrorQuestions.pdf";

function JavaPrograms() {
  const [width] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  return (
    <div>
      <Container fluid className="java-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download Programs
          </Button>
        </Row>

        <Row className="resume">
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={2} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={3} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={4} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={5} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={6} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={7} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={8} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={9} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={10} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          {/* <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={11} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={12} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
          <Document file={pdf} className="d-flex justify-content-center">
            <Page pageNumber={13} scale={width > 786 ? 1.7 : 0.6} />
          </Document> */}
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdf}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;Download Programs
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default JavaPrograms;
