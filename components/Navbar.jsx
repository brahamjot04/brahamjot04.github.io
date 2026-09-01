import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineDashboard,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import {
  FaUserCircle,
  FaShieldAlt,
  FaGraduationCap,
  FaLaptopCode,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { usePortfolioData } from "../context/PortfolioContext";

function NavBar() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = usePortfolioData();
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [academicsOpen, setAcademicsOpen] = useState(false);

  const accountMenuRef = useRef(null);
  const academicsRef = useRef(null);

  const navItems = [
    { href: "/", label: "Home", icon: AiOutlineHome },
    { href: "/about", label: "About", icon: AiOutlineUser },
    { href: "/project", label: "Projects", icon: AiOutlineFundProjectionScreen },
    { href: "/resume", label: "Resume", icon: CgFileDocument },
  ];

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target)
      ) {
        setAccountMenuOpen(false);
      }
      if (
        academicsRef.current &&
        !academicsRef.current.contains(event.target)
      ) {
        setAcademicsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setAccountMenuOpen(false);
    updateExpanded(false);
    await logout();
    if (router.pathname === "/admin") {
      router.push("/");
    }
  };

  const isAcademicsActive =
    router.pathname === "/javaprograms" || router.pathname === "/presentations";

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand href="/" className="d-flex">
          <h4 className="brand">Brahamjot Singh</h4>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(!expand);
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto align-items-md-center" defaultActiveKey="#home">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = router.pathname === item.href;
              return (
                <Nav.Item key={item.href}>
                  <Nav.Link
                    as={Link}
                    href={item.href}
                    className={isActive ? "active-route" : ""}
                    onClick={() => {
                      updateExpanded(false);
                      setAcademicsOpen(false);
                    }}
                  >
                    <Icon style={{ marginBottom: "2px" }} /> {item.label}
                  </Nav.Link>
                </Nav.Item>
              );
            })}

            {/* ACADEMICS & HIDDEN PAGES SHOWCASE DROPDOWN */}
            <div className="nav-dropdown-custom" ref={academicsRef}>
              <button
                type="button"
                className={`nav-link ${isAcademicsActive ? "active-route" : ""}`}
                style={{
                  background: "transparent",
                  border: isAcademicsActive ? "1px solid rgba(79, 209, 197, 0.38)" : "1px solid transparent",
                  cursor: "pointer",
                }}
                onClick={() => setAcademicsOpen(!academicsOpen)}
              >
                <FaGraduationCap style={{ marginBottom: "2px" }} /> Academics{" "}
                <span style={{ fontSize: "0.65rem", marginLeft: "2px", opacity: 0.8 }}>
                  {academicsOpen ? "▲" : "▼"}
                </span>
              </button>

              {academicsOpen && (
                <div className="nav-dropdown-menu">
                  <Link
                    href="/javaprograms"
                    className={`nav-dropdown-item ${
                      router.pathname === "/javaprograms" ? "active" : ""
                    }`}
                    onClick={() => {
                      setAcademicsOpen(false);
                      updateExpanded(false);
                    }}
                  >
                    <FaLaptopCode className="text-accent" /> Java Lab & Exercises
                  </Link>
                  <Link
                    href="/presentations"
                    className={`nav-dropdown-item ${
                      router.pathname === "/presentations" ? "active" : ""
                    }`}
                    onClick={() => {
                      setAcademicsOpen(false);
                      updateExpanded(false);
                    }}
                  >
                    <FaChalkboardTeacher className="text-info" /> Presentations & Talks
                  </Link>
                </div>
              )}
            </div>

            {/* PROFILE / ACCOUNT MENU (WHEN LOGGED IN) */}
            {isAuthenticated && (
              <div className="navbar-account-wrapper" ref={accountMenuRef}>
                <button
                  type="button"
                  className="navbar-avatar-btn"
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  aria-label="Account Menu"
                  title={user?.email || "Admin Account"}
                >
                  <FaUserCircle className="navbar-avatar-icon" />
                  <span className="navbar-avatar-status-dot"></span>
                </button>

                {accountMenuOpen && (
                  <div className="navbar-account-dropdown">
                    <div className="dropdown-user-header">
                      <div className="dropdown-user-badge">
                        <FaShieldAlt /> Admin Mode
                      </div>
                      <div className="dropdown-user-email text-truncate">
                        {user?.email || "admin"}
                      </div>
                    </div>
                    <div className="dropdown-divider-line"></div>
                    <Link
                      href="/admin"
                      className={`navbar-dropdown-item ${
                        router.pathname === "/admin" ? "active" : ""
                      }`}
                      onClick={() => {
                        setAccountMenuOpen(false);
                        updateExpanded(false);
                      }}
                    >
                      <AiOutlineDashboard /> Admin Studio
                    </Link>
                    <button
                      type="button"
                      className="navbar-dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      <AiOutlineLogout /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
