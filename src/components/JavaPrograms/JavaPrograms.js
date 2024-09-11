import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import pdf from "../../Assets/../Assets/JavaErrorQuestions.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function JavaPrograms() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

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
