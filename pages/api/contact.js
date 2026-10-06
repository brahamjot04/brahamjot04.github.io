import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

const EXPECTED_ACTION = "contact";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const { name, email, subject, message, honeypot, "cf-turnstile-response": turnstileToken } =
      req.body || {};

    // 1. Bot honeypot trap: silently return 200 if bot filled the hidden honeypot
    if (honeypot && String(honeypot).trim().length > 0) {
      return res.status(200).json({ success: true, message: "Inquiry received." });
    }

    // 2. Validate input fields
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : "";

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({
        error: "Missing required fields: Name, Email, and Message are required.",
      });
    }

    if (!trimmedEmail.includes("@") || trimmedEmail.length > 255) {
      return res.status(400).json({ error: "Invalid email address format." });
    }

    if (trimmedName.length > 100 || trimmedMessage.length > 5000) {
      return res.status(400).json({ error: "Field length exceeds permitted limits." });
    }

    // 3. Validate Cloudflare Turnstile token
    const token =
      typeof turnstileToken === "string"
        ? turnstileToken.trim()
        : req.body?.turnstileToken || "";

    if (!token || token.length > 2048) {
      return res.status(403).json({
        error: "Bot verification required. Please complete the security challenge.",
      });
    }

    const secretKey =
      process.env.TURNSTILE_SECRET || "1x0000000000000000000000000000000AA";

    const clientIp =
      (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
      req.socket.remoteAddress ||
      "";

    // Canonical Cloudflare siteverify endpoint
    const verifyFormData = new URLSearchParams({
      secret: secretKey,
      response: token,
    });
    if (clientIp) {
      verifyFormData.append("remoteip", clientIp);
    }

    const verifyResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: verifyFormData,
        signal: AbortSignal.timeout(10000),
      }
    );

    if (!verifyResponse.ok) {
      console.error("Turnstile siteverify HTTP error:", verifyResponse.status);
      return res.status(403).json({ error: "Security challenge verification failed." });
    }

    const verifyResult = await verifyResponse.json();

    // Determine expected hostnames
    const rawHostnames =
      process.env.TURNSTILE_HOSTNAMES ||
      "localhost,127.0.0.1,brahamjot.dev,www.brahamjot.dev";
    const expectedHostnames = new Set(
      rawHostnames
        .split(",")
        .map((h) => h.trim().toLowerCase())
        .filter(Boolean)
    );

    // Verify success, action, and approved hostname
    const returnedHostname = (verifyResult.hostname || "").toLowerCase();
    const isHostnameValid =
      expectedHostnames.has(returnedHostname) ||
      expectedHostnames.size === 0 ||
      returnedHostname === "dummy-hostname" || // Cloudflare test keys return dummy-hostname
      returnedHostname === "example.com";

    const isActionValid =
      !verifyResult.action || verifyResult.action === EXPECTED_ACTION;

    if (!verifyResult.success || !isHostnameValid || !isActionValid) {
      console.warn("Turnstile challenge rejected:", {
        success: verifyResult.success,
        action: verifyResult.action,
        hostname: verifyResult.hostname,
        errorCodes: verifyResult["error-codes"],
      });
      return res.status(403).json({
        error: "Security verification failed. Please refresh and try again.",
      });
    }

    // 4. Verification passed: Store message in Supabase
    if (isSupabaseConfigured && supabase) {
      const { error: dbError } = await supabase.from("contact_messages").insert([
        {
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject || "Portfolio Contact Inquiry",
          message: trimmedMessage,
        },
      ]);

      if (dbError) {
        console.error("Supabase contact_messages insertion error:", dbError);
        if (dbError.message?.includes("rate limit") || dbError.code === "P0001") {
          return res.status(429).json({
            error: "Submission rate limit exceeded. Please wait 30 seconds before sending another message.",
          });
        }
        return res.status(500).json({
          error: "Failed to record message. Please email directly at admin@brahamjot.dev",
        });
      }
    } else {
      console.warn("Supabase is not configured; message logged server-side only.");
    }

    return res.status(200).json({
      success: true,
      message: "Thank you! Your message has been received.",
    });
  } catch (err) {
    console.error("Contact API handler unexpected error:", err);
    return res.status(500).json({
      error: "An unexpected error occurred while processing your request.",
    });
  }
}
