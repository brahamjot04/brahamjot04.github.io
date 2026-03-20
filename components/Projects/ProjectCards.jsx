import React from "react";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards(props) {
  const imageSrc = props.imgPath?.src || props.imgPath;
  const imageWidth = props.imgPath?.width || 1200;
  const imageHeight = props.imgPath?.height || 700;

  return (
    <Card className="project-card-view">
      <div className="project-card-media">
        <Image
          src={imageSrc}
          alt={props.title || "project image"}
          width={imageWidth}
          height={imageHeight}
          className="project-card-image"
        />
      </div>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>

        {props.ghLink && (
          <Button variant="primary" href={props.ghLink} target="_blank">
            <BsGithub /> &nbsp;
            {props.isBlog ? "Blog" : "GitHub"}
          </Button>
        )}
        {"\n"}
        {"\n"}

        {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

        {!props.isBlog && props.demoLink && (
          <Button
            variant="primary"
            href={props.demoLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
            <CgWebsite /> &nbsp;
            {"Website"}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
