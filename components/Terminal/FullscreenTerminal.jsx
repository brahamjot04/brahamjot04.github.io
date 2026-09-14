import React, { useState, useEffect, useRef } from "react";
import { usePortfolioData } from "../../context/PortfolioContext";

export default function FullscreenTerminal({ isOpen, onClose }) {
  const { data } = usePortfolioData();
  const [history, setHistory] = useState([
    {
      type: "banner",
      text: "brahamjotOS v6.8.0-generic (x86_64-pc-linux-gnu)\nType 'help' to see available commands, or 'exit' to close."
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [history, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (cmdStr) => {
    const cleanCmd = cmdStr.trim();
    const parts = cleanCmd.split(" ");
    const command = parts[0].toLowerCase();

    if (!cleanCmd) return;

    setCmdHistory((prev) => [...prev, cleanCmd]);
    setHistoryIndex(-1);

    const newHistory = [...history, { type: "prompt", text: cleanCmd }];

    switch (command) {
      case "help":
        newHistory.push({
          type: "output",
          text: `AVAILABLE COMMANDS:
  about           - Learn about Brahamjot Singh
  projects        - List top software projects
  skills          - View full technical stack
  roles           - View target career roles
  contact         - Get contact email & social handles
  clear           - Clear terminal buffer
  whoami          - Print current user identity
  sudo            - Execute elevated command
  exit            - Close terminal session`
        });
        break;

      case "about":
      case "bio":
      case "cat":
        if (command === "cat" && parts[1] && parts[1] !== "bio.txt" && parts[1] !== "skills.txt") {
          newHistory.push({ type: "error", text: `cat: ${parts[1]}: No such file or directory` });
          break;
        }
        if (command === "cat" && parts[1] === "skills.txt") {
          const skillsList = "JavaScript, TypeScript, Java, Dart, SQL, Python, Next.js, React, Node.js, Flutter, Supabase, Git, Linux";
          newHistory.push({ type: "output", text: `[SKILLS MATRIX]\n${skillsList}` });
          break;
        }
        const bioText = data?.personal?.bio?.paragraphs?.join("\n\n") ||
          "Brahamjot Singh — Full Stack Developer & B.Tech IT graduate from Guru Nanak Dev Engineering College, Ludhiana.";
        newHistory.push({ type: "output", text: bioText });
        break;

      case "projects":
      case "ls":
        const projs = data?.projects || [];
        if (projs.length === 0) {
          newHistory.push({ type: "output", text: "No projects registered in database." });
        } else {
          const projList = projs.map((p, i) => `[${i + 1}] ${p.title}\n    ${p.description}\n    Tags: ${p.tags?.join(", ") || "N/A"}\n    URL: ${p.demoLink || p.ghLink || "Local"}`).join("\n\n");
          newHistory.push({ type: "output", text: projList });
        }
        break;

      case "skills":
        newHistory.push({
          type: "output",
          text: `[LANGUAGES]: JavaScript (ES6+), TypeScript, Java, Dart, SQL, Python, HTML5, CSS3
[FRAMEWORKS]: Next.js, React.js, Node.js, Express, Flutter, Bootstrap, REST APIs
[DATABASES & CLOUD]: Supabase (PostgreSQL), Firebase, Vercel, Git, GitHub, Linux Bash`
        });
        break;

      case "roles":
        const targetRoles = data?.personal?.targetRoles?.join(" • ") || "Software Developer • Full Stack Developer • Flutter Developer";
        newHistory.push({ type: "output", text: `Target Roles: ${targetRoles}` });
        break;

      case "contact":
        const email = data?.personal?.contactEmail || "admin@brahamjot.dev";
        newHistory.push({
          type: "output",
          text: `Email: ${email}\nWebsite: https://brahamjot.dev\nLinkedIn: https://linkedin.com/in/brahamjotsingh\nGitHub: https://github.com/brahamjot04`
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      case "whoami":
        newHistory.push({ type: "output", text: "guest@brahamjot.dev (privileged recruiter console access)" });
        break;

      case "sudo":
        newHistory.push({
          type: "warning",
          text: "guest is not in the sudoers file. This incident will be reported to Brahamjot! 😄"
        });
        break;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        newHistory.push({
          type: "error",
          text: `bash: ${command}: command not found. Type 'help' for available commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIndex + 1 < cmdHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <div className="fullscreen-terminal-overlay" onClick={onClose}>
      <div
        className="fullscreen-terminal-modal"
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
      >
        {/* TITLEBAR */}
        <div className="fullscreen-terminal-titlebar d-flex align-items-center justify-content-between px-3 py-2">
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="cli-traffic-dot cli-dot-red border-0"
              onClick={onClose}
              title="Close Terminal (ESC)"
            />
            <span className="cli-traffic-dot cli-dot-yellow" />
            <span className="cli-traffic-dot cli-dot-green" />
          </div>
          <div className="fullscreen-terminal-title font-monospace small text-muted">
            brahamjot@portfolio:~ (bash) • 95vw × 92vh
          </div>
          <div className="font-monospace small text-muted">
            <span className="text-secondary">[ESC or type &apos;exit&apos; to close]</span>
          </div>
        </div>

        {/* TERMINAL CONTENT */}
        <div className="fullscreen-terminal-body p-4 font-monospace">
          {history.map((item, idx) => (
            <div key={idx} className="mb-2">
              {item.type === "banner" && (
                <div className="text-secondary small mb-3 border-bottom border-secondary border-opacity-25 pb-2">
                  {item.text}
                </div>
              )}
              {item.type === "prompt" && (
                <div className="text-light">
                  <span className="text-success">guest@brahamjot</span>:<span className="text-info">~</span>$ {item.text}
                </div>
              )}
              {item.type === "output" && (
                <pre className="text-muted mb-0 font-monospace" style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                  {item.text}
                </pre>
              )}
              {item.type === "error" && (
                <div className="text-danger small">{item.text}</div>
              )}
              {item.type === "warning" && (
                <div className="text-warning small">{item.text}</div>
              )}
            </div>
          ))}

          {/* ACTIVE PROMPT INPUT LINE */}
          <div className="d-flex align-items-center mt-2">
            <span className="text-success me-1">guest@brahamjot</span>:<span className="text-info me-1">~</span>$ &nbsp;
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="fullscreen-terminal-input flex-grow-1"
              autoFocus
              spellCheck="false"
              autoComplete="off"
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}
