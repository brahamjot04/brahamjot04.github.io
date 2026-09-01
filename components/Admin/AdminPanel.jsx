import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { usePortfolioData } from "../../context/PortfolioContext";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";
import {
  AiFillGithub,
  AiFillInstagram,
  AiOutlinePlus,
  AiOutlineDelete,
  AiOutlineSave,
  AiOutlineUnlock,
  AiOutlineLock,
  AiOutlineDownload,
  AiOutlineCloudUpload,
  AiOutlineCheckCircle,
  AiOutlineWarning,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineCopy,
  AiOutlineCheck,
  AiOutlineLink,
  AiOutlineEye,
  AiOutlineMail,
} from "react-icons/ai";
import {
  FaLinkedinIn,
  FaProjectDiagram,
  FaUserAlt,
  FaTools,
  FaFilePdf,
  FaDatabase,
  FaRocket,
  FaGraduationCap,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { getSocialIcon, PRESET_PLATFORMS } from "../../lib/socialIcons";

export default function AdminPanel() {
  const {
    data: contextData,
    saveData,
    uploadAsset,
    isConfigured,
  } = usePortfolioData();

  const [data, setData] = useState(contextData);
  const [user, setUser] = useState(null);

  // Auth States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // UI States
  const [activeTab, setActiveTab] = useState("overview"); // overview, personal, projects, resume, socials, database, inbox
  const [statusMessage, setStatusMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [newTagInputs, setNewTagInputs] = useState({});
  const [newRoleInput, setNewRoleInput] = useState("");
  const [newActivityInput, setNewActivityInput] = useState("");
  const [newSocialPlatform, setNewSocialPlatform] = useState("twitter");
  const [customPlatformName, setCustomPlatformName] = useState("");
  const [newSocialUrl, setNewSocialUrl] = useState("");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Inbox & Messages
  const [messages, setMessages] = useState([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const fetchMessages = async () => {
    if (!isSupabaseConfigured || !supabase) return;
    setIsLoadingMessages(true);
    try {
      const { data: rows, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });
      if (!error && rows) {
        setMessages(rows);
      }
    } catch (err) {
      console.warn("Could not fetch messages:", err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!isSupabaseConfigured || !supabase) return;
    try {
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", id);
      if (!error) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error("Delete message error:", err);
    }
  };

  useEffect(() => {
    if (contextData) {
      setData(contextData);
    }
  }, [contextData]);

  useEffect(() => {
    // Check Supabase session
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session.user);
          setIsAuthenticated(true);
          fetchMessages();
        }
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
        setIsAuthenticated(Boolean(session?.user));
        if (session?.user) {
          fetchMessages();
        }
      });

      return () => subscription.unsubscribe();
    }
  }, []);

  // ---------------- Authentication Handlers ----------------
  const handleSupabaseLogin = async (e) => {
    e.preventDefault();
    setIsAuthLoading(true);
    setAuthError("");

    if (!isSupabaseConfigured || !supabase) {
      setAuthError("Supabase keys are missing in .env.local.");
      setIsAuthLoading(false);
      return;
    }

    try {
      const normalizedEmail = email.includes("@")
        ? email.trim()
        : `${email.trim().toLowerCase()}@portfolio.local`;

      const { error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });
      if (error) throw error;
      setIsAuthenticated(true);
    } catch (err) {
      setAuthError(err.message || "Failed to authenticate with Supabase.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  // ---------------- File Upload Handlers ----------------
  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingField("resume");
    setStatusMessage(null);

    try {
      const publicUrl = await uploadAsset(file, "resumes");
      updatePersonalInfo("resumePdf", publicUrl);
      setHasUnsavedChanges(true);
      setStatusMessage({
        type: "success",
        text: `Resume "${file.name}" uploaded to Supabase Storage! Click "Save Live Site" to apply.`,
      });
    } catch (err) {
      setStatusMessage({
        type: "danger",
        text: `Upload failed: ${err.message}. Verify that "portfolio_assets" bucket exists in Supabase.`,
      });
    } finally {
      setUploadingField(null);
    }
  };

  const handleProjectImageUpload = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingField(`project_${index}`);
    setStatusMessage(null);

    try {
      const publicUrl = await uploadAsset(file, "projects");
      updateProject(index, "image", publicUrl);
      setHasUnsavedChanges(true);
      setStatusMessage({
        type: "success",
        text: `Screenshot uploaded to Supabase Storage! Click "Save Live Site" to apply.`,
      });
    } catch (err) {
      setStatusMessage({
        type: "danger",
        text: `Image upload failed: ${err.message}`,
      });
    } finally {
      setUploadingField(null);
    }
  };

  // ---------------- Save Handler ----------------
  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);
    try {
      const isRemoteSaved = await saveData(data);
      setHasUnsavedChanges(false);
      if (isRemoteSaved) {
        setStatusMessage({
          type: "success",
          text: "Portfolio changes synced live to Supabase Database & Website!",
        });
      } else {
        setStatusMessage({
          type: "info",
          text: "Saved to local cache and server API. Check Supabase connection in .env.local for cloud sync.",
        });
      }
    } catch (err) {
      setStatusMessage({
        type: "danger",
        text: "Error saving data: " + err.message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const exportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "portfolioData.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  // ---------------- Data Mutations ----------------
  const updatePersonalInfo = (field, value) => {
    setData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
    setHasUnsavedChanges(true);
  };

  const updateEducation = (field, value) => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        education: { ...prev.personal.education, [field]: value },
      },
    }));
    setHasUnsavedChanges(true);
  };

  const updateBioParagraph = (index, value) => {
    const newParagraphs = [...data.personal.bio.paragraphs];
    newParagraphs[index] = value;
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        bio: { ...prev.personal.bio, paragraphs: newParagraphs },
      },
    }));
    setHasUnsavedChanges(true);
  };

  const addBioParagraph = () => {
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        bio: {
          ...prev.personal.bio,
          paragraphs: [
            ...prev.personal.bio.paragraphs,
            "New bio paragraph description...",
          ],
        },
      },
    }));
    setHasUnsavedChanges(true);
  };

  const removeBioParagraph = (index) => {
    const newParagraphs = data.personal.bio.paragraphs.filter(
      (_, i) => i !== index
    );
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        bio: { ...prev.personal.bio, paragraphs: newParagraphs },
      },
    }));
    setHasUnsavedChanges(true);
  };

  const moveBioParagraph = (index, direction) => {
    const newParagraphs = [...data.personal.bio.paragraphs];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newParagraphs.length) return;
    const temp = newParagraphs[index];
    newParagraphs[index] = newParagraphs[targetIdx];
    newParagraphs[targetIdx] = temp;
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        bio: { ...prev.personal.bio, paragraphs: newParagraphs },
      },
    }));
    setHasUnsavedChanges(true);
  };

  const addRole = () => {
    if (!newRoleInput.trim()) return;
    const existing = data.personal?.targetRoles || [];
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        targetRoles: [...existing, newRoleInput.trim()],
      },
    }));
    setNewRoleInput("");
    setHasUnsavedChanges(true);
  };

  const removeRole = (index) => {
    const existing = data.personal?.targetRoles || [];
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        targetRoles: existing.filter((_, i) => i !== index),
      },
    }));
    setHasUnsavedChanges(true);
  };

  const addActivity = () => {
    if (!newActivityInput.trim()) return;
    const existing = data.personal?.bio?.activities || [];
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        bio: {
          ...prev.personal.bio,
          activities: [...existing, newActivityInput.trim()],
        },
      },
    }));
    setNewActivityInput("");
    setHasUnsavedChanges(true);
  };

  const removeActivity = (index) => {
    const existing = data.personal?.bio?.activities || [];
    setData((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        bio: {
          ...prev.personal.bio,
          activities: existing.filter((_, i) => i !== index),
        },
      },
    }));
    setHasUnsavedChanges(true);
  };

  // Projects Mutations
  const updateProject = (index, field, value) => {
    const newProjects = [...data.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setData((prev) => ({ ...prev, projects: newProjects }));
    setHasUnsavedChanges(true);
  };

  const addProject = () => {
    const newProj = {
      id: "project-" + Date.now(),
      title: "New Showcase Project",
      description:
        "Description of your project architecture, features, and results.",
      image: "/src/Assets/Projects/Bakeology.png",
      ghLink: "https://github.com/brahamjot04",
      demoLink: "https://brahamjot.dev",
      tags: ["React", "JavaScript", "Full Stack"],
      featured: true,
    };
    setData((prev) => ({ ...prev, projects: [newProj, ...prev.projects] }));
    setHasUnsavedChanges(true);
    setActiveTab("projects");
  };

  const removeProject = (index) => {
    const newProjects = data.projects.filter((_, i) => i !== index);
    setData((prev) => ({ ...prev, projects: newProjects }));
    setHasUnsavedChanges(true);
  };

  const moveProject = (index, direction) => {
    const newProjects = [...data.projects];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= newProjects.length) return;
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIdx];
    newProjects[targetIdx] = temp;
    setData((prev) => ({ ...prev, projects: newProjects }));
    setHasUnsavedChanges(true);
  };

  const addProjectTag = (projectIdx) => {
    const tag = (newTagInputs[projectIdx] || "").trim();
    if (!tag) return;
    const project = data.projects[projectIdx];
    const currentTags = project.tags || [];
    if (!currentTags.includes(tag)) {
      updateProject(projectIdx, "tags", [...currentTags, tag]);
    }
    setNewTagInputs((prev) => ({ ...prev, [projectIdx]: "" }));
  };

  const removeProjectTag = (projectIdx, tagToRemove) => {
    const project = data.projects[projectIdx];
    const currentTags = project.tags || [];
    updateProject(
      projectIdx,
      "tags",
      currentTags.filter((t) => t !== tagToRemove)
    );
  };

  const updateSocialLink = (platform, value) => {
    setData((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }));
    setHasUnsavedChanges(true);
  };

  const removeSocialLink = (platform) => {
    const updated = { ...data.socialLinks };
    delete updated[platform];
    setData((prev) => ({
      ...prev,
      socialLinks: updated,
    }));
    setHasUnsavedChanges(true);
  };

  const addCustomSocialLink = () => {
    const key =
      newSocialPlatform === "custom"
        ? customPlatformName.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "")
        : newSocialPlatform;

    if (!key) return;

    setData((prev) => ({
      ...prev,
      socialLinks: {
        ...(prev.socialLinks || {}),
        [key]: newSocialUrl.trim(),
      },
    }));
    setNewSocialUrl("");
    setCustomPlatformName("");
    setHasUnsavedChanges(true);
  };

  // ---------------- Render Authentication Lock Screen ----------------
  if (!isAuthenticated) {
    return (
      <Container
        className="d-flex align-items-center justify-content-center py-5"
        style={{ minHeight: "85vh" }}
      >
        <Card
          className="admin-login-card p-4 p-md-5"
          style={{ maxWidth: "460px", width: "100%" }}
        >
          <div className="text-center mb-4">
            <div className="admin-lock-badge mb-3">
              <AiOutlineLock style={{ fontSize: "2rem", color: "var(--accent)" }} />
            </div>
            <h2 className="fw-bold mb-1">
              Portfolio <span className="purple">Admin</span>
            </h2>
            <p className="text-muted small">
              Sign in with your Supabase credentials to manage your live portfolio
            </p>
            {isConfigured ? (
              <Badge bg="success" className="px-3 py-2 rounded-pill">
                <AiOutlineCheckCircle /> Supabase Connected
              </Badge>
            ) : (
              <Badge bg="danger" className="px-3 py-2 rounded-pill">
                <AiOutlineWarning /> Setup Keys in .env.local
              </Badge>
            )}
          </div>

          {authError && (
            <Alert variant="danger" className="py-2 small">
              {authError}
            </Alert>
          )}

          <Form onSubmit={handleSupabaseLogin}>
            <Form.Group className="mb-3">
              <Form.Label className="small text-muted fw-bold">
                USERNAME OR EMAIL
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. brahamjot or name@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="admin-input"
                required
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="small text-muted fw-bold">
                PASSWORD
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                required
              />
            </Form.Group>
            <button
              type="submit"
              className="admin-btn admin-btn-primary w-100 py-2 fw-bold"
              disabled={isAuthLoading || !isConfigured}
            >
              {isAuthLoading ? (
                <Spinner size="sm" animation="border" />
              ) : (
                <>
                  <AiOutlineUnlock /> Sign In with Supabase
                </>
              )}
            </button>
          </Form>
        </Card>
      </Container>
    );
  }

  // ---------------- Render Dashboard ----------------
  return (
    <Container fluid className="admin-dashboard-container">
      <Container>
        {/* TOP STATUS & HEADER BAR */}
        <div className="admin-header-panel p-4 mb-4">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <div className="d-flex align-items-center gap-2 mb-1">
                <span className="live-indicator-dot"></span>
                <span className="small text-uppercase tracking-wider text-muted fw-bold">
                  Management Console
                </span>
                <Badge bg="success" className="ms-2">
                  <AiOutlineCheckCircle /> Supabase Live
                </Badge>
              </div>
              <h2 className="fw-bold mb-0">
                Portfolio <span className="purple">Admin Studio</span>
              </h2>
              <p className="text-muted small mb-0">
                Logged in as <strong className="text-light">{user?.email || "Admin"}</strong> • Direct Cloud Sync Enabled
              </p>
            </div>

            <div className="d-flex align-items-center gap-2 flex-wrap">
              <button
                type="button"
                className="admin-btn admin-btn-secondary admin-btn-sm"
                onClick={exportJSON}
              >
                <AiOutlineDownload /> Export JSON
              </button>
              <button
                type="button"
                className="admin-btn admin-btn-primary admin-btn-sm"
                onClick={handleSave}
                disabled={isSaving}
              >
                <AiOutlineSave /> {isSaving ? "Syncing..." : "Save Live Site"}
              </button>
            </div>
          </div>

          {/* QUICK METRICS ROW */}
          <Row className="mt-4 g-3">
            <Col sm={6} lg={3}>
              <div className="admin-stat-card">
                <div className="stat-icon-wrapper text-primary">
                  <FaRocket />
                </div>
                <div>
                  <div className="stat-number">{data.projects?.length || 0}</div>
                  <div className="stat-label">Live Projects</div>
                </div>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className="admin-stat-card">
                <div className="stat-icon-wrapper text-info">
                  <FaFilePdf />
                </div>
                <div>
                  <div className="stat-number">
                    {data.personal?.resumePdf?.includes("http") ? "Cloud CDN" : "Local PDF"}
                  </div>
                  <div className="stat-label">Resume Storage</div>
                </div>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className="admin-stat-card">
                <div className="stat-icon-wrapper text-warning">
                  <FaGraduationCap />
                </div>
                <div>
                  <div className="stat-number">
                    {data.personal?.education?.status || "Fresher"}
                  </div>
                  <div className="stat-label">Career Stage</div>
                </div>
              </div>
            </Col>
            <Col sm={6} lg={3}>
              <div className="admin-stat-card">
                <div className="stat-icon-wrapper text-success">
                  <FaTools />
                </div>
                <div>
                  <div className="stat-number">
                    {data.personal?.targetRoles?.length || 0} Roles
                  </div>
                  <div className="stat-label">Typewriter Skills</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        {/* NOTIFICATION TOAST / ALERT */}
        {statusMessage && (
          <Alert
            variant={statusMessage.type}
            dismissible
            onClose={() => setStatusMessage(null)}
            className="mb-4 shadow-sm"
          >
            {statusMessage.text}
          </Alert>
        )}

        {/* MODERN SEGMENTED NAVIGATION */}
        <div className="admin-nav-pills mb-4 d-flex flex-wrap gap-2">
          {[
            { key: "overview", label: "📊 Overview" },
            { key: "personal", label: "👤 Bio & Roles" },
            {
              key: "projects",
              label: `🚀 Projects (${data.projects?.length || 0})`,
            },
            { key: "resume", label: "📄 Resume & Storage" },
            { key: "socials", label: "🌐 Socials & Contact" },
            {
              key: "inbox",
              label: `📬 Inbox (${messages.length})`,
            },
            { key: "database", label: "💾 Raw JSON & DB" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`admin-nav-tab ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===================== TAB 1: OVERVIEW & QUICK ACTIONS ===================== */}
        {activeTab === "overview" && (
          <Row className="g-4">
            <Col lg={8}>
              <Card className="admin-section-card p-4 h-100">
                <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <FaRocket className="text-primary" /> Live Portfolio Snapshot
                </h4>
                <div className="snapshot-box p-3 rounded mb-3">
                  <h5 className="fw-bold text-accent mb-1">{data.personal?.name}</h5>
                  <p className="text-muted small mb-2">{data.personal?.tagline}</p>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {data.personal?.targetRoles?.map((r, i) => (
                      <span key={i} className="project-tag-pill">
                        {r}
                      </span>
                    ))}
                  </div>
                </div>

                <h5 className="fw-bold mt-4 mb-2">Active Bio Snippet</h5>
                <div className="text-muted small">
                  {data.personal?.bio?.paragraphs?.map((p, i) => (
                    <p key={i} className="mb-2">
                      <strong className="text-info">¶{i + 1}:</strong> {p}
                    </p>
                  ))}
                </div>
              </Card>
            </Col>

            <Col lg={4}>
              <Card className="admin-section-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold mb-3">⚡ Quick Actions</h4>
                  <div className="d-flex flex-column gap-2">
                    <button
                      type="button"
                      className="admin-quick-card-btn"
                      onClick={addProject}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <AiOutlinePlus className="text-accent" /> Add New Project
                      </span>
                      <span>→</span>
                    </button>
                    <button
                      type="button"
                      className="admin-quick-card-btn"
                      onClick={() => setActiveTab("resume")}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <AiOutlineCloudUpload className="text-info" /> Upload New Resume PDF
                      </span>
                      <span>→</span>
                    </button>
                    <button
                      type="button"
                      className="admin-quick-card-btn"
                      onClick={() => setActiveTab("personal")}
                    >
                      <span className="d-flex align-items-center gap-2">
                        <FaUserAlt className="text-warning" /> Edit Bio & Tagline
                      </span>
                      <span>→</span>
                    </button>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded border border-secondary border-opacity-25 bg-dark">
                  <div className="small text-muted mb-1">Live Site Link</div>
                  <a
                    href="https://brahamjot.dev"
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent fw-bold text-decoration-none d-flex align-items-center gap-1"
                  >
                    https://brahamjot.dev <FaExternalLinkAlt size={12} />
                  </a>
                </div>
              </Card>
            </Col>
          </Row>
        )}

        {/* ===================== TAB 2: BIO & ROLES STUDIO ===================== */}
        {activeTab === "personal" && (
          <Row className="g-4">
            <Col lg={6}>
              <Card className="admin-section-card p-4 h-100">
                <h4 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <FaUserAlt className="text-info" /> Profile Identity & Tagline
                </h4>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted fw-bold">FULL NAME</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.personal?.name || ""}
                    onChange={(e) => updatePersonalInfo("name", e.target.value)}
                    className="admin-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted fw-bold">CONTACT & RECIPIENT EMAIL</Form.Label>
                  <Form.Control
                    type="email"
                    value={data.personal?.email || ""}
                    placeholder="admin@brahamjot.dev"
                    onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    className="admin-input"
                  />
                  <Form.Text className="text-muted small">
                    Receives all contact form submissions and powers the &quot;Copy Email&quot; &amp; &quot;Mailto&quot; buttons.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted fw-bold">LOCATION</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.personal?.location || ""}
                    onChange={(e) => updatePersonalInfo("location", e.target.value)}
                    className="admin-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted fw-bold">HERO TAGLINE</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={data.personal?.tagline || ""}
                    onChange={(e) => updatePersonalInfo("tagline", e.target.value)}
                    className="admin-input"
                  />
                </Form.Group>

                <hr className="my-4 border-secondary opacity-25" />

                <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
                  <FaGraduationCap className="text-warning" /> Education & Status
                </h5>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted fw-bold">DEGREE / PROGRAM</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.personal?.education?.degree || ""}
                    onChange={(e) => updateEducation("degree", e.target.value)}
                    className="admin-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted fw-bold">COLLEGE / UNIVERSITY</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.personal?.education?.college || ""}
                    onChange={(e) => updateEducation("college", e.target.value)}
                    className="admin-input"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted fw-bold">STATUS BADGE</Form.Label>
                  <Form.Control
                    type="text"
                    value={data.personal?.education?.status || ""}
                    onChange={(e) => updateEducation("status", e.target.value)}
                    className="admin-input"
                  />
                </Form.Group>
              </Card>
            </Col>

            <Col lg={6}>
              <Card className="admin-section-card p-4 h-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold mb-0">About Bio Paragraphs</h4>
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={addBioParagraph}
                  >
                    <AiOutlinePlus /> Add Paragraph
                  </button>
                </div>

                <div className="bio-paragraphs-list">
                  {data.personal?.bio?.paragraphs?.map((p, idx) => (
                    <div key={idx} className="admin-paragraph-card p-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <Badge bg="secondary" className="px-2 py-1">
                          Paragraph #{idx + 1}
                        </Badge>
                        <div className="d-flex gap-1">
                          <button
                            type="button"
                            className="admin-icon-btn"
                            disabled={idx === 0}
                            onClick={() => moveBioParagraph(idx, -1)}
                            title="Move Up"
                          >
                            <AiOutlineArrowUp />
                          </button>
                          <button
                            type="button"
                            className="admin-icon-btn"
                            disabled={idx === data.personal.bio.paragraphs.length - 1}
                            onClick={() => moveBioParagraph(idx, 1)}
                            title="Move Down"
                          >
                            <AiOutlineArrowDown />
                          </button>
                          <button
                            type="button"
                            className="admin-icon-btn admin-icon-btn-danger"
                            disabled={data.personal.bio.paragraphs.length <= 1}
                            onClick={() => removeBioParagraph(idx)}
                            title="Delete Paragraph"
                          >
                            <AiOutlineDelete />
                          </button>
                        </div>
                      </div>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={p}
                        onChange={(e) => updateBioParagraph(idx, e.target.value)}
                        className="admin-input"
                      />
                    </div>
                  ))}
                </div>

                <hr className="my-4 border-secondary opacity-25" />

                {/* TYPEWRITER ROLES CHIP MANAGER */}
                <h5 className="fw-bold mb-2">Typewriter Animated Roles</h5>
                <p className="text-muted small mb-3">
                  Roles displayed in sequence on the hero typewriter animation.
                </p>

                <div className="d-flex flex-wrap gap-2 mb-3">
                  {data.personal?.targetRoles?.map((role, idx) => (
                    <span key={idx} className="admin-chip">
                      {role}
                      <button
                        type="button"
                        className="chip-remove-btn"
                        onClick={() => removeRole(idx)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Add new role (e.g. Flutter Developer)..."
                    value={newRoleInput}
                    onChange={(e) => setNewRoleInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addRole())}
                    className="admin-input"
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={addRole}
                  >
                    <AiOutlinePlus /> Add
                  </button>
                </div>
              </Card>
            </Col>
          </Row>
        )}

        {/* ===================== TAB 3: PROJECTS STUDIO ===================== */}
        {activeTab === "projects" && (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <div>
                <h3 className="fw-bold mb-1">
                  Projects <span className="purple">Showcase Studio</span>
                </h3>
                <p className="text-muted small mb-0">
                  Manage thumbnails, titles, live demo links, and tech stack tags.
                </p>
              </div>
              <button
                type="button"
                className="admin-btn admin-btn-primary"
                onClick={addProject}
              >
                <AiOutlinePlus /> Create New Project
              </button>
            </div>

            <Row className="g-4">
              {data.projects?.map((proj, idx) => (
                <Col lg={6} key={proj.id || idx}>
                  <Card className="admin-project-editor-card p-3 h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex align-items-center gap-2">
                        <Badge bg="info" className="px-2 py-1">
                          #{idx + 1}
                        </Badge>
                        <span className="fw-bold text-light">{proj.title || "Untitled Project"}</span>
                      </div>
                      <div className="d-flex gap-1">
                        <button
                          type="button"
                          className="admin-icon-btn"
                          disabled={idx === 0}
                          onClick={() => moveProject(idx, -1)}
                          title="Move Up"
                        >
                          <AiOutlineArrowUp />
                        </button>
                        <button
                          type="button"
                          className="admin-icon-btn"
                          disabled={idx === data.projects.length - 1}
                          onClick={() => moveProject(idx, 1)}
                          title="Move Down"
                        >
                          <AiOutlineArrowDown />
                        </button>
                        <button
                          type="button"
                          className="admin-icon-btn admin-icon-btn-danger"
                          onClick={() => removeProject(idx)}
                          title="Delete Project"
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    </div>

                    {/* PROJECT MEDIA & DROPZONE */}
                    <div className="project-thumbnail-dropzone mb-3 p-2 rounded">
                      <div className="d-flex align-items-center gap-3">
                        <div className="project-preview-thumb">
                          {proj.image ? (
                            <Image
                              src={proj.image}
                              alt="preview"
                              width={90}
                              height={60}
                              unoptimized
                              style={{
                                width: "90px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          ) : (
                            <div className="thumb-placeholder">No Image</div>
                          )}
                        </div>
                        <div className="flex-grow-1">
                          <Form.Label className="small text-muted fw-bold mb-1">
                            <AiOutlineCloudUpload /> UPLOAD SCREENSHOT TO SUPABASE
                          </Form.Label>
                          <Form.Control
                            type="file"
                            size="sm"
                            accept="image/*"
                            disabled={uploadingField === `project_${idx}`}
                            onChange={(e) => handleProjectImageUpload(idx, e)}
                            className="admin-input-file"
                          />
                          {uploadingField === `project_${idx}` && (
                            <div className="small text-info mt-1">
                              <Spinner size="sm" animation="border" /> Uploading to Supabase...
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <Form.Group className="mb-2">
                      <Form.Label className="small text-muted fw-bold">PROJECT TITLE</Form.Label>
                      <Form.Control
                        type="text"
                        value={proj.title}
                        onChange={(e) => updateProject(idx, "title", e.target.value)}
                        className="admin-input"
                      />
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label className="small text-muted fw-bold">DESCRIPTION</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={proj.description}
                        onChange={(e) => updateProject(idx, "description", e.target.value)}
                        className="admin-input"
                      />
                    </Form.Group>

                    <Row className="g-2 mb-2">
                      <Col sm={6}>
                        <Form.Group>
                          <Form.Label className="small text-muted fw-bold">GITHUB REPO LINK</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="https://github.com/..."
                            value={proj.ghLink || ""}
                            onChange={(e) => updateProject(idx, "ghLink", e.target.value)}
                            className="admin-input"
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={6}>
                        <Form.Group>
                          <Form.Label className="small text-muted fw-bold">LIVE DEMO URL</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="https://..."
                            value={proj.demoLink || ""}
                            onChange={(e) => updateProject(idx, "demoLink", e.target.value)}
                            className="admin-input"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* INTERACTIVE TAG PILLS */}
                    <div className="mt-3">
                      <Form.Label className="small text-muted fw-bold">TECH STACK TAGS</Form.Label>
                      <div className="d-flex flex-wrap gap-1 mb-2">
                        {proj.tags?.map((tag, tIdx) => (
                          <span key={tIdx} className="admin-chip">
                            {tag}
                            <button
                              type="button"
                              className="chip-remove-btn"
                              onClick={() => removeProjectTag(idx, tag)}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>

                      <div className="d-flex gap-2">
                        <Form.Control
                          type="text"
                          size="sm"
                          placeholder="Type tag (e.g. Flutter) & press Enter..."
                          value={newTagInputs[idx] || ""}
                          onChange={(e) =>
                            setNewTagInputs((prev) => ({
                              ...prev,
                              [idx]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === ",") {
                              e.preventDefault();
                              addProjectTag(idx);
                            }
                          }}
                          className="admin-input"
                        />
                        <button
                          type="button"
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                          onClick={() => addProjectTag(idx)}
                        >
                          + Tag
                        </button>
                      </div>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* ===================== TAB 4: RESUME & SUPABASE STORAGE ===================== */}
        {activeTab === "resume" && (
          <Row className="g-4">
            <Col lg={7}>
              <Card className="admin-section-card p-4 h-100">
                <h4 className="fw-bold mb-2 d-flex align-items-center gap-2">
                  <FaFilePdf className="text-danger" /> Resume Cloud Hosting (Supabase)
                </h4>
                <p className="text-muted small mb-4">
                  Upload your latest PDF CV directly to your Supabase Storage bucket. It instantly updates the live viewer and download buttons on <code>/resume</code>.
                </p>

                <div className="resume-dropzone-box p-4 text-center mb-4">
                  <div className="dropzone-icon mb-2">
                    <AiOutlineCloudUpload style={{ fontSize: "3rem", color: "var(--accent)" }} />
                  </div>
                  <h5 className="fw-bold">Upload New Resume PDF</h5>
                  <p className="text-muted small mb-3">
                    Drag & drop or browse your local file system (.pdf format)
                  </p>

                  <div className="d-flex justify-content-center">
                    <Form.Control
                      type="file"
                      accept="application/pdf"
                      disabled={uploadingField === "resume"}
                      onChange={handleResumeUpload}
                      style={{ maxWidth: "320px" }}
                      className="admin-input-file"
                    />
                  </div>

                  {uploadingField === "resume" && (
                    <div className="mt-3 text-info">
                      <Spinner size="sm" animation="border" /> Uploading to Supabase Storage...
                    </div>
                  )}
                </div>

                <Form.Group className="mb-3">
                  <Form.Label className="small text-muted fw-bold">ACTIVE RESUME ASSET URL</Form.Label>
                  <div className="d-flex gap-2">
                    <Form.Control
                      type="text"
                      value={data.personal?.resumePdf || ""}
                      onChange={(e) => updatePersonalInfo("resumePdf", e.target.value)}
                      className="admin-input"
                    />
                    <button
                      type="button"
                      className="admin-btn admin-btn-secondary"
                      onClick={() => copyToClipboard(data.personal?.resumePdf || "")}
                    >
                      {copiedUrl ? <AiOutlineCheck className="text-success" /> : <AiOutlineCopy />}
                    </button>
                  </div>
                </Form.Group>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="admin-section-card p-4 h-100 d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold mb-3">👁️ Live Resume Actions</h4>
                  <p className="text-muted small mb-3">
                    Preview how recruiters and visitors will see your resume on the site.
                  </p>
                  <div className="d-flex flex-column gap-2">
                    <a
                      className="admin-quick-card-btn"
                      href={data.personal?.resumePdf || "/assets/Resume.pdf"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="d-flex align-items-center gap-2">
                        <AiOutlineEye className="text-info" /> Open Document Directly
                      </span>
                      <span>↗</span>
                    </a>
                    <a
                      className="admin-quick-card-btn"
                      href="/resume"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="d-flex align-items-center gap-2">
                        <FaFilePdf className="text-danger" /> View Live /resume Page
                      </span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded bg-dark border border-secondary border-opacity-25">
                  <div className="small text-muted mb-1">Storage Bucket Info</div>
                  <div className="small text-light">
                    Bucket: <code>portfolio_assets</code>
                  </div>
                  <div className="small text-light">
                    Folder: <code>resumes/</code>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        )}

        {/* ===================== TAB 5: SOCIALS & CONTACT ===================== */}
        {activeTab === "socials" && (
          <Row className="g-4">
            <Col lg={7}>
              <Card className="admin-section-card p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold mb-0 d-flex align-items-center gap-2">
                    <AiOutlineLink className="text-info" /> Social Profiles & Networks
                  </h4>
                  <Badge bg="info">{Object.keys(data.socialLinks || {}).length} Connected</Badge>
                </div>
                <p className="text-muted small mb-4">
                  These links are dynamically rendered with matching branded icons in the Footer and Contact sections.
                </p>

                {/* DYNAMIC LIST OF EXISTING SOCIAL LINKS */}
                <div className="social-links-list mb-4">
                  {Object.entries(data.socialLinks || {}).map(([platform, url]) => (
                    <div key={platform} className="admin-paragraph-card p-3 mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center gap-2 text-accent fw-bold">
                          <span style={{ fontSize: "1.2rem" }}>{getSocialIcon(platform)}</span>
                          <span className="text-uppercase small">{platform}</span>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                          {url && (
                            <a
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-info small text-decoration-none d-flex align-items-center gap-1"
                            >
                              Test <FaExternalLinkAlt size={10} />
                            </a>
                          )}
                          <button
                            type="button"
                            className="admin-icon-btn admin-icon-btn-danger"
                            onClick={() => removeSocialLink(platform)}
                            title="Remove link"
                          >
                            <AiOutlineDelete />
                          </button>
                        </div>
                      </div>
                      <Form.Control
                        type="text"
                        placeholder={`https://${platform}.com/...`}
                        value={url || ""}
                        onChange={(e) => updateSocialLink(platform, e.target.value)}
                        className="admin-input"
                      />
                    </div>
                  ))}
                </div>

                {/* ADD NEW SOCIAL LINK FORM */}
                <div className="p-3 border rounded border-secondary border-opacity-25 bg-dark">
                  <h5 className="fw-bold mb-3 text-info d-flex align-items-center gap-2">
                    <AiOutlinePlus /> Add New Social Media Link
                  </h5>
                  <Row className="g-2 mb-2">
                    <Col sm={newSocialPlatform === "custom" ? 6 : 12}>
                      <Form.Group>
                        <Form.Label className="small text-muted fw-bold">SELECT PLATFORM</Form.Label>
                        <Form.Select
                          value={newSocialPlatform}
                          onChange={(e) => setNewSocialPlatform(e.target.value)}
                          className="admin-input"
                        >
                          {PRESET_PLATFORMS.map((p) => (
                            <option key={p.key} value={p.key}>
                              {p.label}
                            </option>
                          ))}
                          <option value="custom">Other / Custom Platform...</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    {newSocialPlatform === "custom" && (
                      <Col sm={6}>
                        <Form.Group>
                          <Form.Label className="small text-muted fw-bold">CUSTOM NAME</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="e.g. Substack, Codeforces"
                            value={customPlatformName}
                            onChange={(e) => setCustomPlatformName(e.target.value)}
                            className="admin-input"
                          />
                        </Form.Group>
                      </Col>
                    )}
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="small text-muted fw-bold">PROFILE / ACCOUNT URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="https://..."
                      value={newSocialUrl}
                      onChange={(e) => setNewSocialUrl(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSocialLink())}
                      className="admin-input"
                    />
                  </Form.Group>

                  <button
                    type="button"
                    className="admin-btn admin-btn-primary admin-btn-sm"
                    onClick={addCustomSocialLink}
                    disabled={!newSocialUrl.trim() || (newSocialPlatform === "custom" && !customPlatformName.trim())}
                  >
                    <AiOutlinePlus /> Add Link to Profile
                  </button>
                </div>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="admin-section-card p-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="fw-bold mb-0">Personal Activities / Hobbies</h4>
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary admin-btn-sm"
                    onClick={addActivity}
                  >
                    <AiOutlinePlus /> Add Activity
                  </button>
                </div>
                <p className="text-muted small mb-3">
                  Displayed under the &quot;Activities I love to do&quot; list on the About page.
                </p>

                <div className="d-flex flex-wrap gap-2 mb-3">
                  {data.personal?.bio?.activities?.map((act, idx) => (
                    <span key={idx} className="admin-chip">
                      {act}
                      <button
                        type="button"
                        className="chip-remove-btn"
                        onClick={() => removeActivity(idx)}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>

                <div className="d-flex gap-2">
                  <Form.Control
                    type="text"
                    placeholder="Add activity (e.g. Photography)..."
                    value={newActivityInput}
                    onChange={(e) => setNewActivityInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addActivity())}
                    className="admin-input"
                  />
                  <button
                    type="button"
                    className="admin-btn admin-btn-secondary"
                    onClick={addActivity}
                  >
                    <AiOutlinePlus /> Add
                  </button>
                </div>
              </Card>
            </Col>
          </Row>
        )}

        {/* ===================== TAB 6: RAW JSON & DB ===================== */}
        {activeTab === "database" && (
          <Card className="admin-section-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div>
                <h4 className="fw-bold mb-1">
                  Raw JSON <span className="purple">Configuration</span>
                </h4>
                <p className="text-muted small mb-0">
                  Inspect or modify raw JSON directly for advanced bulk updates.
                </p>
              </div>
              <button
                type="button"
                className="admin-btn admin-btn-secondary admin-btn-sm"
                onClick={exportJSON}
              >
                <AiOutlineDownload /> Download JSON File
              </button>
            </div>

            <Form.Control
              as="textarea"
              rows={16}
              style={{
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "0.85rem",
                background: "rgba(8, 14, 26, 0.85)",
                color: "#68d391",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              value={JSON.stringify(data, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value);
                  setData(parsed);
                  setHasUnsavedChanges(true);
                } catch (err) {}
              }}
            />
          </Card>
        )}

        {/* ===================== TAB 7: INBOX & RECRUITER MESSAGES ===================== */}
        {activeTab === "inbox" && (
          <Card className="admin-section-card p-4">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
              <div>
                <h4 className="fw-bold mb-1 d-flex align-items-center gap-2">
                  📬 Recruiter Inquiries & <span className="purple">Direct Messages</span>
                </h4>
                <p className="text-muted small mb-0">
                  Submissions received in real-time from the portfolio contact form.
                </p>
              </div>
              <button
                type="button"
                className="admin-btn admin-btn-secondary admin-btn-sm"
                onClick={fetchMessages}
                disabled={isLoadingMessages}
              >
                {isLoadingMessages ? "Refreshing..." : "🔄 Refresh Inbox"}
              </button>
            </div>

            {isLoadingMessages ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="info" />
                <p className="text-muted small mt-2">Loading inbox messages...</p>
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-5 border rounded border-secondary border-opacity-25 bg-dark">
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📭</div>
                <h5 className="fw-bold text-light mb-1">Your Inbox is Clean</h5>
                <p className="text-muted small mb-0">
                  No contact messages have been received yet. Any new note sent via the website will be displayed here.
                </p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {messages.map((msg) => (
                  <div key={msg.id} className="inbox-message-card">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-2">
                      <div>
                        <span className="fw-bold text-light me-2" style={{ fontSize: "1rem" }}>
                          {msg.name}
                        </span>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-info small text-decoration-none"
                        >
                          &lt;{msg.email}&gt;
                        </a>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <span className="text-muted small">
                          {msg.created_at
                            ? new Date(msg.created_at).toLocaleString(undefined, {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })
                            : "Recent"}
                        </span>
                        <button
                          type="button"
                          className="admin-icon-btn admin-icon-btn-danger"
                          onClick={() => deleteMessage(msg.id)}
                          title="Delete message"
                        >
                          <AiOutlineDelete />
                        </button>
                      </div>
                    </div>

                    <div className="mb-2">
                      <span className="badge bg-primary bg-opacity-25 text-info border border-info border-opacity-25 small">
                        {msg.subject || "General Inquiry"}
                      </span>
                    </div>

                    <p
                      className="text-light small mb-3 p-3 rounded"
                      style={{
                        background: "rgba(0, 0, 0, 0.25)",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {msg.message}
                    </p>

                    <div className="d-flex justify-content-end">
                      <a
                        href={`mailto:${msg.email}?subject=${encodeURIComponent(
                          `Re: ${msg.subject || "Portfolio Contact"}`
                        )}`}
                        className="admin-btn admin-btn-primary admin-btn-sm text-decoration-none"
                      >
                        <AiOutlineMail /> Reply via Email
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* STICKY BOTTOM ACTION BAR */}
        {hasUnsavedChanges && (
          <div className="admin-sticky-save-bar">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <span className="unsaved-pulse-dot"></span>
                <span className="small text-light fw-bold">
                  You have unsaved changes!
                </span>
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="admin-btn admin-btn-secondary admin-btn-sm"
                  onClick={() => {
                    setData(contextData);
                    setHasUnsavedChanges(false);
                  }}
                >
                  Discard
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn-primary admin-btn-sm"
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <AiOutlineSave /> {isSaving ? "Syncing..." : "Save Live Site"}
                </button>
              </div>
            </div>
          </div>
        )}
      </Container>
    </Container>
  );
}
