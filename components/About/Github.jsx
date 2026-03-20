import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { Row } from "react-bootstrap";

function Github() {
  const calendarTheme = {
    light: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa"],
    dark: ["#eff6ff", "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa"],
  };

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Days I <strong className="purple">Code</strong>
      </h1>
      <GitHubCalendar
        username="brahamjot04"
        blockSize={15}
        blockMargin={5}
        theme={calendarTheme}
        fontSize={16}
      />
    </Row>
  );
}

export default Github;
