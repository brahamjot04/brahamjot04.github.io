import React from "react";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

function ProjectCards(props) {
  const imageSrc = props.imgPath?.src || props.imgPath || "/favicon.png";
  const imageWidth = props.imgPath?.width || 1200;
  const imageHeight = props.imgPath?.height || 700;

  return (
    <Card className="project-card-view position-relative">
      {props.featured && (
        <span className="featured-project-badge">
          <FaStar size={10} /> Featured
        </span>
      )}

      <div className="project-card-media">
        {typeof imageSrc === "string" && imageSrc.startsWith("http") ? (
          <Image
            src={imageSrc}
            alt={props.title || "project image"}
            width={imageWidth}
            height={imageHeight}
            unoptimized
            className="project-card-image img-fluid"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={props.title || "project image"}
            width={imageWidth}
            height={imageHeight}
            className="project-card-image"
          />
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold">{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify", flexGrow: 1 }}>
          {props.description}
        </Card.Text>

        {props.tags && props.tags.length > 0 && (
          <div className="project-tags mb-3 d-flex flex-wrap gap-1">
            {props.tags.map((tag) => {
              const isSelected = props.activeTag === tag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => props.onTagClick?.(tag)}
                  className={`project-tag-pill clickable ${isSelected ? "active" : ""}`}
                  title={`Filter projects by ${tag}`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-auto d-flex flex-wrap gap-2 align-items-center">
          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={props.onOpenDetails}
            title="View Project Case Study & Highlights"
          >
            Details
          </button>

          {props.ghLink && (
            <a
              className="admin-btn admin-btn-secondary admin-btn-sm text-decoration-none"
              href={props.ghLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${props.title} on GitHub`}
            >
              <BsGithub /> &nbsp;
              {props.isBlog ? "Blog" : "GitHub"}
            </a>
          )}

          {!props.isBlog && props.demoLink && (
            <a
              className="admin-btn admin-btn-primary admin-btn-sm text-decoration-none"
              href={props.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${props.title} Live Demo`}
            >
              <CgWebsite /> &nbsp;
              {"Live Demo"}
            </a>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
