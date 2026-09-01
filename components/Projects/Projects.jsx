import React, { useState, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineSearch, AiOutlineClose, AiOutlineReload } from "react-icons/ai";
import ProjectCard from "./ProjectCards";
import ProjectModal from "./ProjectModal";
import Particle from "../Particle";
import bakeology from "../../src/Assets/Projects/Bakeology.png";
import elements from "../../src/Assets/Projects/Elements.png";
import lms from "../../src/Assets/Projects/LMS.png";
import vetclinic from "../../src/Assets/Projects/Vetclinic.png";
import fmcrs from "../../src/Assets/Projects/FMCRS.png";
import Library from "../../src/Assets/Projects/Library.png";
import { usePortfolioData } from "../../context/PortfolioContext";

const localImages = {
  bakeology: bakeology,
  "library-redesign": Library,
  Library: Library,
  lms: lms,
  vetclinic: vetclinic,
  fmcrs: fmcrs,
  elements: elements,
};

function Projects() {
  const { data } = usePortfolioData();
  const projects = useMemo(() => data?.projects || [], [data?.projects]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  // Dynamic Categories calculation
  const categoryFilters = useMemo(() => {
    const categories = ["All"];
    const popularTags = ["Full Stack", "React", "Next.js", "PHP", "Web App", "Java", "Tailwind"];
    
    popularTags.forEach((tag) => {
      const count = projects.filter((p) =>
        p.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
      ).length;
      if (count > 0) {
        categories.push(tag);
      }
    });

    return categories;
  }, [projects]);

  // Combined Filter logic
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      // 1. Category Filter
      let matchesCategory = true;
      if (activeCategory !== "All") {
        matchesCategory = proj.tags?.some(
          (t) => t.toLowerCase() === activeCategory.toLowerCase()
        );
      }

      // 2. Search Query
      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const inTitle = proj.title?.toLowerCase().includes(query);
        const inDesc = proj.description?.toLowerCase().includes(query);
        const inTags = proj.tags?.some((t) => t.toLowerCase().includes(query));
        matchesSearch = inTitle || inDesc || inTags;
      }

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  const resolveImage = (proj) => {
    if (proj.image && (proj.image.startsWith("http") || proj.image.startsWith("data:"))) {
      return proj.image;
    }
    if (proj.id && localImages[proj.id]) {
      return localImages[proj.id];
    }
    if (proj.image && proj.image.includes("Bakeology")) return bakeology;
    if (proj.image && proj.image.includes("Library")) return Library;
    if (proj.image && proj.image.includes("LMS")) return lms;
    if (proj.image && proj.image.includes("Vetclinic")) return vetclinic;
    if (proj.image && proj.image.includes("FMCRS")) return fmcrs;
    if (proj.image && proj.image.includes("Elements")) return elements;
    return bakeology;
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <div className="text-center mb-4">
          <h1 className="project-heading">
            My Recent <strong className="purple">Works </strong>
          </h1>
          <p className="section-lead mx-auto text-center" style={{ marginBottom: "1.4rem" }}>
            A curated showcase of full-stack web applications, interactive platforms, and academic software systems.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="project-search-container">
          <div className="project-search-input-box">
            <AiOutlineSearch className="project-search-icon" />
            <input
              type="text"
              className="project-search-input"
              placeholder="Search projects by title, tech stack (e.g. React, Supabase, PHP)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                className="project-search-clear-btn"
                onClick={() => setSearchQuery("")}
                title="Clear search"
              >
                <AiOutlineClose />
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY FILTER PILLS */}
        <div className="project-filter-pills">
          {categoryFilters.map((cat) => {
            const count =
              cat === "All"
                ? projects.length
                : projects.filter((p) =>
                    p.tags?.some((t) => t.toLowerCase() === cat.toLowerCase())
                  ).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                type="button"
                className={`project-filter-btn ${isActive ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                <span>{cat}</span>
                <span className="project-filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* PROJECTS GRID OR EMPTY STATE */}
        {filteredProjects.length > 0 ? (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {filteredProjects.map((proj, idx) => {
              const imageSrc = resolveImage(proj);
              return (
                <Col md={4} key={proj.id || idx} className="project-card">
                  <ProjectCard
                    imgPath={imageSrc}
                    isBlog={false}
                    title={proj.title}
                    description={proj.description}
                    ghLink={proj.ghLink}
                    demoLink={proj.demoLink}
                    tags={proj.tags}
                    activeTag={activeCategory}
                    onTagClick={(tag) => {
                      setActiveCategory(tag);
                      setSearchQuery("");
                    }}
                    onOpenDetails={() =>
                      setSelectedProject({
                        ...proj,
                        imageSrc,
                      })
                    }
                    featured={idx === 0 || proj.featured}
                  />
                </Col>
              );
            })}
          </Row>
        ) : (
          <div className="project-empty-state">
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔍</div>
            <h4 className="fw-bold text-light mb-2">No Matching Projects Found</h4>
            <p className="text-muted small mb-3">
              We couldn&apos;t find any project matching &quot;{searchQuery || activeCategory}&quot;. Try adjusting your search term or filter.
            </p>
            <button
              type="button"
              className="admin-btn admin-btn-primary admin-btn-sm"
              onClick={handleResetFilters}
            >
              <AiOutlineReload /> Reset Filters
            </button>
          </div>
        )}

        {/* INTERACTIVE CASE STUDY MODAL */}
        <ProjectModal
          project={selectedProject}
          show={Boolean(selectedProject)}
          onHide={() => setSelectedProject(null)}
          onTagClick={(tag) => {
            setActiveCategory(tag);
            setSearchQuery("");
          }}
        />
      </Container>
    </Container>
  );
}

export default Projects;
