import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiAdobepremierepro,
  SiDiscord,
  SiAdobephotoshop,
  SiWindows11,
  SiAudacity,
  SiUbuntu,
  SiKalilinux,
  SiManjaro,
  SiMicrosoftazure,
  SiOverleaf,
  SiVercel,
  SiIntellijidea,
  SiCanva,
  SiFigma,
  SiGooglesheets,
} from "react-icons/si";

const toolStack = [
  { name: "VS Code", icon: SiVisualstudiocode, accent: "accent-vscode" },
  { name: "IntelliJ IDEA", icon: SiIntellijidea, accent: "accent-intellij" },
  { name: "Kali Linux", icon: SiKalilinux, accent: "accent-kali" },
  { name: "Ubuntu", icon: SiUbuntu, accent: "accent-ubuntu" },
  { name: "Manjaro", icon: SiManjaro, accent: "accent-manjaro" },
  { name: "Windows 11", icon: SiWindows11, accent: "accent-win" },
  { name: "Premiere Pro", icon: SiAdobepremierepro, accent: "accent-premiere" },
  { name: "Photoshop", icon: SiAdobephotoshop, accent: "accent-photoshop" },
  { name: "Figma", icon: SiFigma, accent: "accent-figma" },
  { name: "Canva", icon: SiCanva, accent: "accent-canva" },
  { name: "Audacity", icon: SiAudacity, accent: "accent-audacity" },
  { name: "MS Azure", icon: SiMicrosoftazure, accent: "accent-azure" },
  { name: "Vercel", icon: SiVercel, accent: "accent-vercel" },
  { name: "Overleaf", icon: SiOverleaf, accent: "accent-overleaf" },
  { name: "Discord", icon: SiDiscord, accent: "accent-discord" },
  { name: "Google Sheets", icon: SiGooglesheets, accent: "accent-sheets" },
];

function Toolstack() {
  return (
    <Row
      className="tech-grid"
      style={{ justifyContent: "center", paddingBottom: "50px" }}
    >
      {toolStack.map((tool) => {
        const Icon = tool.icon;
        return (
          <Col
            key={tool.name}
            xs={4}
            md={2}
            className={`tech-icons ${tool.accent}`}
            title={tool.name}
            aria-label={tool.name}
          >
            <div className="tech-icon-wrapper">
              <Icon />
            </div>
            <span className="tech-icon-label">{tool.name}</span>
          </Col>
        );
      })}
    </Row>
  );
}

export default Toolstack;
