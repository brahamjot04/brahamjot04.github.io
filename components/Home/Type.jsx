import React from "react";
import Typewriter from "typewriter-effect";
import { usePortfolioData } from "../../context/PortfolioContext";

function Type() {
  const { data } = usePortfolioData();
  const roles = data?.personal?.targetRoles?.length
    ? data.personal.targetRoles
    : [
        "Software Developer",
        "Full Stack Developer",
        "Flutter Developer",
        "Web Developer",
      ];

  return (
    <Typewriter
      key={JSON.stringify(roles)}
      options={{
        strings: roles,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
