import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaArrowUp } from "react-icons/fa";

function ScrollToTop() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setIsVisible(scrollTop > 280);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global Keyboard Shortcut: Press "/" to jump to Projects or focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in an input or textarea
      if (
        e.target.tagName === "INPUT" ||
        e.target.tagName === "TEXTAREA" ||
        e.target.isContentEditable
      ) {
        return;
      }

      if (e.key === "/" || (e.ctrlKey && e.key === "k") || (e.metaKey && e.key === "k")) {
        e.preventDefault();
        if (router.pathname !== "/project") {
          router.push("/project");
        } else {
          const searchInput = document.querySelector(".project-search-input");
          if (searchInput) {
            searchInput.focus();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  if (!isVisible) return null;

  return (
    <div className="scroll-to-top-wrapper">
      <button
        type="button"
        className="scroll-to-top-btn"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Scroll to top (Press / to search projects)"
      >
        <svg className="scroll-progress-svg" width="46" height="46">
          <circle
            className="scroll-progress-bg"
            cx="23"
            cy="23"
            r={radius}
          />
          <circle
            className="scroll-progress-bar"
            cx="23"
            cy="23"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <FaArrowUp className="scroll-top-arrow" />
      </button>
    </div>
  );
}

export default ScrollToTop;
