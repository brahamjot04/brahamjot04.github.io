import React from "react";
import Image from "next/image";
import { Modal, Badge } from "react-bootstrap";
import { BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { AiOutlineClose, AiOutlineCheckCircle } from "react-icons/ai";
import { FaStar } from "react-icons/fa";

function ProjectModal({ project, show, onHide, onTagClick }) {
  if (!project) return null;

  const imageSrc = project.imageSrc || "/favicon.png";

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="project-details-modal"
      contentClassName="project-modal-content"
    >
      <div className="project-modal-header p-3 p-md-4 d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-25">
        <div className="d-flex align-items-center gap-2">
          <h4 className="fw-bold text-light mb-0">{project.title}</h4>
          {project.featured && (
            <Badge bg="warning" text="dark" className="d-flex align-items-center gap-1 small">
              <FaStar size={10} /> Featured
            </Badge>
          )}
        </div>
        <button
          type="button"
          className="admin-icon-btn"
          onClick={onHide}
          aria-label="Close modal"
        >
          <AiOutlineClose />
        </button>
      </div>

      <Modal.Body className="p-3 p-md-4">
        {/* MEDIA PREVIEW */}
        <div className="project-modal-media mb-4 rounded overflow-hidden">
          {typeof imageSrc === "string" && imageSrc.startsWith("http") ? (
            <Image
              src={imageSrc}
              alt={project.title}
              width={1200}
              height={650}
              unoptimized
              className="img-fluid w-100 rounded"
            />
          ) : (
            <Image
              src={imageSrc}
              alt={project.title}
              width={1200}
              height={650}
              className="img-fluid w-100 rounded"
            />
          )}
        </div>

        {/* DESCRIPTION */}
        <h5 className="fw-bold text-accent mb-2">Project Overview</h5>
        <p className="text-light text-opacity-85 lh-lg mb-4">
          {project.description}
        </p>

        {/* KEY HIGHLIGHTS */}
        <h5 className="fw-bold text-accent mb-2">Architecture & Features</h5>
        <ul className="project-modal-highlights list-unstyled mb-4">
          <li className="d-flex align-items-start gap-2 mb-2 text-muted small">
            <AiOutlineCheckCircle className="text-success mt-1 flex-shrink-0" />
            <span>Built with clean component architecture and reactive UI patterns.</span>
          </li>
          <li className="d-flex align-items-start gap-2 mb-2 text-muted small">
            <AiOutlineCheckCircle className="text-success mt-1 flex-shrink-0" />
            <span>Fully optimized for mobile, tablet, and high-DPI desktop viewports.</span>
          </li>
          <li className="d-flex align-items-start gap-2 mb-2 text-muted small">
            <AiOutlineCheckCircle className="text-success mt-1 flex-shrink-0" />
            <span>Direct database integration, session management, and responsive layouts.</span>
          </li>
        </ul>

        {/* TECH STACK TAGS */}
        {project.tags && project.tags.length > 0 && (
          <div className="mb-4">
            <div className="small text-muted fw-bold mb-2">TECHNOLOGY STACK</div>
            <div className="d-flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    onTagClick?.(tag);
                    onHide();
                  }}
                  className="project-tag-pill clickable active"
                  title={`Filter by ${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal.Body>

      <div className="project-modal-footer p-3 p-md-4 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <button
          type="button"
          className="admin-btn admin-btn-secondary admin-btn-sm"
          onClick={onHide}
        >
          Close
        </button>

        <div className="d-flex gap-2">
          {project.ghLink && (
            <a
              className="admin-btn admin-btn-secondary admin-btn-sm text-decoration-none"
              href={project.ghLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub /> GitHub
            </a>
          )}
          {project.demoLink && (
            <a
              className="admin-btn admin-btn-primary admin-btn-sm text-decoration-none"
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CgWebsite /> Live Demo ↗
            </a>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default ProjectModal;
