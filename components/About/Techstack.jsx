import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiPhp,
  DiMysql,
  DiPython,
  DiGit,
  DiJava,
  DiHtml5,
  DiCss3,
  DiBootstrap,
  DiGithub,
  DiDrupal,
  DiWordpress,
  DiReact,
} from "react-icons/di";
import { SiTailwindcss, SiFlutter, SiFirebase } from "react-icons/si";

const techStack = [
  { name: "Flutter", icon: SiFlutter, accent: "accent-flutter" },
  { name: "Firebase", icon: SiFirebase, accent: "accent-firebase" },
  { name: "React.js", icon: DiReact, accent: "accent-react" },
  { name: "JavaScript", icon: DiJavascript1, accent: "accent-js" },
  { name: "PHP", icon: DiPhp, accent: "accent-php" },
  { name: "MySQL", icon: DiMysql, accent: "accent-mysql" },
  { name: "C++", icon: CgCPlusPlus, accent: "accent-cpp" },
  { name: "Python", icon: DiPython, accent: "accent-python" },
  { name: "Java", icon: DiJava, accent: "accent-java" },
  { name: "Tailwind CSS", icon: SiTailwindcss, accent: "accent-tailwind" },
  { name: "Bootstrap", icon: DiBootstrap, accent: "accent-bootstrap" },
  { name: "HTML5", icon: DiHtml5, accent: "accent-html" },
  { name: "CSS3", icon: DiCss3, accent: "accent-css" },
  { name: "Git", icon: DiGit, accent: "accent-git" },
  { name: "GitHub", icon: DiGithub, accent: "accent-github" },
  { name: "WordPress", icon: DiWordpress, accent: "accent-wordpress" },
  { name: "Drupal", icon: DiDrupal, accent: "accent-drupal" },
];

function Techstack() {
  return (
    <Row
      className="tech-grid"
      style={{ justifyContent: "center", paddingBottom: "50px" }}
    >
      {techStack.map((tech) => {
        const Icon = tech.icon;
        return (
          <Col
            key={tech.name}
            xs={4}
            md={2}
            className={`tech-icons ${tech.accent}`}
            title={tech.name}
            aria-label={tech.name}
          >
            <div className="tech-icon-wrapper">
              <Icon />
            </div>
            <span className="tech-icon-label">{tech.name}</span>
          </Col>
        );
      })}
    </Row>
  );
}

export default Techstack;
