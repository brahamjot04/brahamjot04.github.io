import React, { useState } from "react";
import { Form, Alert, Spinner } from "react-bootstrap";
import {
  AiOutlineMail,
  AiOutlineSend,
  AiOutlineCheck,
  AiOutlineCopy,
  AiOutlineUser,
} from "react-icons/ai";
import { FaLinkedinIn, FaPaperPlane } from "react-icons/fa";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import { usePortfolioData } from "../../context/PortfolioContext";

function ContactForm() {
  const { data } = usePortfolioData();
  const personal = data?.personal || {};
  const recipientEmail =
    personal.email && personal.email !== "brahamjot2004@gmail.com"
      ? personal.email
      : "admin@brahamjot.dev";
  const linkedinUrl =
    data?.socialLinks?.linkedin || "https://www.linkedin.com/in/brahamjotsingh/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(recipientEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMsg("Please fill in all required fields (Name, Email, Message).");
      setIsSubmitting(false);
      return;
    }

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.from("contact_messages").insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim(),
            subject: formData.subject.trim() || "Portfolio Contact Inquiry",
            message: formData.message.trim(),
          },
        ]);

        if (error) {
          console.warn("Supabase contact_messages write note:", error);
          const mailBody = `From: ${formData.name} (${formData.email})\n\n${formData.message}`;
          window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(
            formData.subject || "Portfolio Inquiry"
          )}&body=${encodeURIComponent(mailBody)}`;
        }
      } else {
        const mailBody = `From: ${formData.name} (${formData.email})\n\n${formData.message}`;
        window.location.href = `mailto:${recipientEmail}?subject=${encodeURIComponent(
          formData.subject || "Portfolio Inquiry"
        )}&body=${encodeURIComponent(mailBody)}`;
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      setErrorMsg("An unexpected error occurred. You can also reach me directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-card">
      <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
        <div className="text-start">
          <h3 className="fw-bold mb-1 text-light d-flex align-items-center gap-2">
            <AiOutlineMail className="text-accent" /> Get In Touch
          </h3>
          <p className="text-muted small mb-0">
            Have a project in mind, full-time role opportunity, or just want to say hi? Send a direct message!
          </p>
        </div>

        <div className="d-flex flex-wrap gap-2">
          <button
            type="button"
            className="quick-action-pill-btn"
            onClick={handleCopyEmail}
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <AiOutlineCheck className="text-success" /> Copied {recipientEmail}
              </>
            ) : (
              <>
                <AiOutlineCopy /> Copy Email
              </>
            )}
          </button>

          <a
            href={`mailto:${recipientEmail}`}
            className="quick-action-pill-btn text-decoration-none"
            title="Open default email client"
          >
            <FaPaperPlane size={11} /> Open Mail App
          </a>

          {linkedinUrl && (
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="quick-action-pill-btn text-decoration-none"
              title="Connect on LinkedIn"
            >
              <FaLinkedinIn size={12} className="text-info" /> LinkedIn DM
            </a>
          )}
        </div>
      </div>

      {submitted ? (
        <div className="contact-success-box text-center p-4">
          <div className="success-check-icon mb-3">
            <AiOutlineCheck />
          </div>
          <h4 className="fw-bold text-light mb-2">Message Sent Successfully!</h4>
          <p className="text-muted small mb-4">
            Thank you for reaching out. I&apos;ve received your note and will get back to you as soon as possible.
          </p>
          <button
            type="button"
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={() => setSubmitted(false)}
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <Form onSubmit={handleSubmit} className="text-start">
          {errorMsg && (
            <Alert variant="danger" className="py-2 small">
              {errorMsg}
            </Alert>
          )}

          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="small text-muted fw-bold">
                  YOUR NAME <span className="text-danger">*</span>
                </Form.Label>
                <div className="contact-input-wrapper">
                  <AiOutlineUser className="contact-input-icon" />
                  <Form.Control
                    type="text"
                    placeholder="e.g. Alex Johnson"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="contact-input"
                    required
                  />
                </div>
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group>
                <Form.Label className="small text-muted fw-bold">
                  YOUR EMAIL <span className="text-danger">*</span>
                </Form.Label>
                <div className="contact-input-wrapper">
                  <AiOutlineMail className="contact-input-icon" />
                  <Form.Control
                    type="email"
                    placeholder="e.g. alex@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="contact-input"
                    required
                  />
                </div>
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="small text-muted fw-bold">SUBJECT / INQUIRING ROLE</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Full Stack Developer Opportunity / Project Collaboration"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="contact-input"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="small text-muted fw-bold">
              MESSAGE <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="contact-input"
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Spinner size="sm" animation="border" /> Sending...
                </>
              ) : (
                <>
                  <AiOutlineSend /> Send Message
                </>
              )}
            </button>
          </div>
        </Form>
      )}
    </div>
  );
}

export default ContactForm;
