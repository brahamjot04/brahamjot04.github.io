import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { usePortfolioData } from "../../context/PortfolioContext";
import { getSocialIcon } from "../../lib/socialIcons";
import { getSafeUrl } from "../../lib/urlUtils";
import pfpImg from "../../src/Assets/IMG20250304153732-min.jpg";
import {
  AiOutlineArrowLeft,
  AiOutlineShareAlt,
  AiOutlineCheck,
  AiOutlineCopy,
  AiOutlineMail,
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import {
  FaLinkedinIn,
  FaPhoneAlt,
  FaWhatsapp,
  FaFilePdf,
  FaRocket,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function SocialsHub() {
  const { data } = usePortfolioData();
  const personal = data?.personal || {};
  const socials = data?.socialLinks || {};

  const [copiedType, setCopiedType] = useState(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  const email = personal.email || "admin@brahamjot.dev";
  const rawPhone = personal.phone ? String(personal.phone).trim() : "";
  let formattedPhone = "";
  let whatsappUrl = "";

  if (rawPhone) {
    const digitsOnly = rawPhone.replace(/\D/g, "");
    if (digitsOnly.length > 0) {
      if (rawPhone.startsWith("+91")) {
        formattedPhone = `+${digitsOnly}`;
      } else if (digitsOnly.startsWith("91") && digitsOnly.length >= 12) {
        formattedPhone = `+${digitsOnly}`;
      } else {
        const cleanNumber = digitsOnly.replace(/^0+/, "");
        formattedPhone = `+91${cleanNumber}`;
      }
      whatsappUrl = `https://wa.me/${formattedPhone}`;
    }
  }
  const resumePdf = personal.resumePdf || "/assets/Resume.pdf";
  const linkedinUrl =
    socials.linkedin || "https://www.linkedin.com/in/brahamjotsingh/";
  const githubUrl = socials.github || "https://github.com/brahamjot04";
  const instagramUrl =
    socials.instagram || "https://www.instagram.com/brahamjot_2004/";

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleShare = async () => {
    const shareData = {
      title: "Brahamjot Singh | Links & Socials",
      text: "Connect with Brahamjot Singh — Full Stack & Software Developer.",
      url: typeof window !== "undefined" ? window.location.href : "https://brahamjot.dev/socials",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch (err) {
        // User cancelled or share failed, fallback to copy URL
        copyToClipboard(shareData.url, "url");
      }
    } else {
      copyToClipboard(shareData.url, "url");
    }
  };

  // Filter out platforms already explicitly showcased in main quick cards
  const otherSocials = Object.entries(socials).filter(
    ([platform, url]) =>
      url &&
      typeof url === "string" &&
      url.trim().length > 0 &&
      !["github", "linkedin", "instagram"].includes(platform.toLowerCase())
  );

  return (
    <div className="socials-page-wrapper">
      <Container className="d-flex flex-column align-items-center">
        {/* TOP BAR / UTILITY NAVIGATION */}
        <div className="socials-top-nav d-flex justify-content-between align-items-center w-100 mb-4">
          <Link href="/" className="socials-pill-btn text-decoration-none">
            <AiOutlineArrowLeft /> Back to Portfolio
          </Link>

          <button
            type="button"
            className="socials-pill-btn"
            onClick={handleShare}
            title="Share this profile"
          >
            {shareSuccess || copiedType === "url" ? (
              <>
                <AiOutlineCheck className="text-success" /> Link Copied!
              </>
            ) : (
              <>
                <AiOutlineShareAlt /> Share Profile
              </>
            )}
          </button>
        </div>

        {/* MAIN LINKTREE CARD CONTAINER */}
        <div className="socials-card-container text-center">
          {/* AVATAR WITH GLOW RING */}
          <div className="socials-avatar-wrapper mb-3 position-relative d-inline-block">
            <div className="socials-avatar-glow"></div>
            <Image
              src={pfpImg}
              alt="Brahamjot Singh"
              width={110}
              height={110}
              className="socials-avatar-img rounded-circle"
              priority
            />
          </div>

          {/* NAME & VERIFIED BADGE */}
          <h2 className="fw-bold text-light mb-1 d-flex align-items-center justify-content-center gap-2">
            {personal.name || "Brahamjot Singh"}
            <span className="socials-verified-badge" title="Verified Developer Profile">
              <FaCheckCircle />
            </span>
          </h2>

          {/* HANDLE & LOCATION */}
          <div className="d-flex align-items-center justify-content-center gap-3 text-muted small mb-2">
            <span className="socials-handle font-monospace text-accent">@brahamjot04</span>
            <span>•</span>
            <span className="d-flex align-items-center gap-1">
              <FaMapMarkerAlt className="text-danger" size={11} /> {personal.location || "Punjab, India"}
            </span>
          </div>

          {/* STATUS PILL */}
          <div className="mb-3">
            <span className="socials-status-badge">
              <span className="socials-status-dot"></span>
              Available for Full-Time SDE &amp; Full Stack Roles
            </span>
          </div>

          {/* SHORT 1-LINE BIO */}
          <p className="socials-bio-text text-light text-opacity-75 small mb-4 mx-auto">
            {personal.tagline ||
              "Building practical web products, exploring security, and shipping polished digital experiences."}
          </p>

          {/* ==================== SECTION 1: DIRECT CONTACT ACTIONS ==================== */}
          <div className="socials-section-label text-start mb-2">
            <span>⚡ DIRECT CONTACT</span>
          </div>

          <div className="d-flex flex-column gap-2 mb-4">
            {/* EMAIL DIRECT ACTION CARD */}
            <div className="socials-link-card d-flex align-items-center justify-content-between p-3">
              <a
                href={getSafeUrl(`mailto:${email}`)}
                className="d-flex align-items-center gap-3 text-decoration-none flex-grow-1 text-start"
              >
                <div className="socials-link-icon-box text-accent">
                  <AiOutlineMail size={22} />
                </div>
                <div>
                  <div className="socials-link-title text-light fw-bold">Email Me Directly</div>
                  <div className="socials-link-subtitle text-muted small">{email}</div>
                </div>
              </a>
              <button
                type="button"
                className="socials-card-action-btn"
                onClick={() => copyToClipboard(email, "email")}
                title="Copy Email"
                aria-label="Copy Email to Clipboard"
              >
                {copiedType === "email" ? (
                  <AiOutlineCheck className="text-success" />
                ) : (
                  <AiOutlineCopy />
                )}
              </button>
            </div>

            {/* PHONE & WHATSAPP ACTION CARD */}
            {formattedPhone && (
              <div className="socials-link-card d-flex align-items-center justify-content-between p-3">
                <a
                  href={getSafeUrl(`tel:${formattedPhone}`)}
                  className="d-flex align-items-center gap-3 text-decoration-none flex-grow-1 text-start"
                >
                  <div className="socials-link-icon-box text-success">
                    <FaPhoneAlt size={18} />
                  </div>
                  <div>
                    <div className="socials-link-title text-light fw-bold">Contact Number / Call</div>
                    <div className="socials-link-subtitle text-muted small">{formattedPhone}</div>
                  </div>
                </a>
                <div className="d-flex gap-1 align-items-center">
                  {whatsappUrl && (
                    <a
                      href={getSafeUrl(whatsappUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="socials-card-action-btn text-success text-decoration-none"
                      title="Chat on WhatsApp"
                      aria-label="Open WhatsApp Chat"
                    >
                      <FaWhatsapp size={16} />
                    </a>
                  )}
                  <button
                    type="button"
                    className="socials-card-action-btn"
                    onClick={() => copyToClipboard(formattedPhone, "phone")}
                    title="Copy Phone Number"
                    aria-label="Copy Phone Number to Clipboard"
                  >
                    {copiedType === "phone" ? (
                      <AiOutlineCheck className="text-success" />
                    ) : (
                      <AiOutlineCopy />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* LINKEDIN DM CARD */}
            {linkedinUrl && (
              <a
                href={getSafeUrl(linkedinUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="socials-link-card d-flex align-items-center justify-content-between p-3 text-decoration-none"
              >
                <div className="d-flex align-items-center gap-3 text-start">
                  <div className="socials-link-icon-box text-info">
                    <FaLinkedinIn size={20} />
                  </div>
                  <div>
                    <div className="socials-link-title text-light fw-bold">LinkedIn Message</div>
                    <div className="socials-link-subtitle text-muted small">Connect &amp; Message on LinkedIn</div>
                  </div>
                </div>
                <FaExternalLinkAlt className="text-muted small" size={13} />
              </a>
            )}
          </div>

          {/* ==================== SECTION 2: SOCIAL PROFILES ==================== */}
          <div className="socials-section-label text-start mb-2">
            <span>🌐 SOCIAL PROFILES</span>
          </div>

          <div className="d-flex flex-column gap-2 mb-4">
            {/* GITHUB CARD */}
            {githubUrl && (
              <a
                href={getSafeUrl(githubUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="socials-link-card d-flex align-items-center justify-content-between p-3 text-decoration-none"
              >
                <div className="d-flex align-items-center gap-3 text-start">
                  <div className="socials-link-icon-box text-light">
                    <AiFillGithub size={22} />
                  </div>
                  <div>
                    <div className="socials-link-title text-light fw-bold">GitHub</div>
                    <div className="socials-link-subtitle text-muted small">@brahamjot04 • Projects &amp; Repos</div>
                  </div>
                </div>
                <FaExternalLinkAlt className="text-muted small" size={13} />
              </a>
            )}

            {/* INSTAGRAM CARD */}
            {instagramUrl && (
              <a
                href={getSafeUrl(instagramUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="socials-link-card d-flex align-items-center justify-content-between p-3 text-decoration-none"
              >
                <div className="d-flex align-items-center gap-3 text-start">
                  <div className="socials-link-icon-box text-danger">
                    <AiFillInstagram size={22} />
                  </div>
                  <div>
                    <div className="socials-link-title text-light fw-bold">Instagram</div>
                    <div className="socials-link-subtitle text-muted small">@brahamjot_2004 • Visuals &amp; Life</div>
                  </div>
                </div>
                <FaExternalLinkAlt className="text-muted small" size={13} />
              </a>
            )}

            {/* DYNAMIC ADDITIONAL SOCIAL LINKS */}
            {otherSocials.map(([platform, url]) => (
              <a
                key={platform}
                href={getSafeUrl(url)}
                target="_blank"
                rel="noopener noreferrer"
                className="socials-link-card d-flex align-items-center justify-content-between p-3 text-decoration-none"
              >
                <div className="d-flex align-items-center gap-3 text-start">
                  <div className="socials-link-icon-box text-accent">
                    {getSocialIcon(platform)}
                  </div>
                  <div>
                    <div className="socials-link-title text-light fw-bold text-capitalize">
                      {platform}
                    </div>
                    <div className="socials-link-subtitle text-muted small">
                      Visit {platform} Profile
                    </div>
                  </div>
                </div>
                <FaExternalLinkAlt className="text-muted small" size={13} />
              </a>
            ))}
          </div>

          {/* ==================== SECTION 3: KEY PORTFOLIO ACTIONS ==================== */}
          <div className="socials-section-label text-start mb-2">
            <span>🚀 PORTFOLIO &amp; HIGHLIGHTS</span>
          </div>

          <div className="d-flex flex-column gap-2 mb-4">
            {/* VIEW RESUME BUTTON */}
            <a
              href={getSafeUrl(resumePdf)}
              target="_blank"
              rel="noopener noreferrer"
              className="socials-featured-btn d-flex align-items-center justify-content-between p-3 text-decoration-none"
            >
              <div className="d-flex align-items-center gap-3">
                <FaFilePdf size={20} className="text-danger" />
                <span className="fw-bold">Curriculum Vitae / Resume PDF</span>
              </div>
              <span className="socials-badge-highlight">Latest</span>
            </a>

            {/* BROWSE FULL PORTFOLIO BUTTON */}
            <Link
              href="/"
              className="socials-featured-btn d-flex align-items-center justify-content-between p-3 text-decoration-none"
            >
              <div className="d-flex align-items-center gap-3">
                <FaRocket size={18} className="text-accent" />
                <span className="fw-bold">Explore Full Portfolio</span>
              </div>
              <span className="small text-muted">brahamjot.dev ↗</span>
            </Link>

            {/* VIEW PROJECTS BUTTON */}
            <Link
              href="/project"
              className="socials-link-card d-flex align-items-center justify-content-between p-3 text-decoration-none"
            >
              <div className="d-flex align-items-center gap-3 text-start">
                <div className="socials-link-icon-box text-warning">
                  <span>💻</span>
                </div>
                <div>
                  <div className="socials-link-title text-light fw-bold">Engineering Projects</div>
                  <div className="socials-link-subtitle text-muted small">Full-stack apps, systems &amp; tools</div>
                </div>
              </div>
              <span className="small text-muted">View All ↗</span>
            </Link>
          </div>

          {/* FOOTER WATERMARK */}
          <div className="socials-footer mt-4 pt-3 border-top border-secondary border-opacity-25 text-muted small">
            <div>© {new Date().getFullYear()} Brahamjot Singh • All rights reserved.</div>
            <div className="mt-1 font-monospace" style={{ fontSize: "0.75rem", opacity: 0.7 }}>
              brahamjot.dev/socials
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
