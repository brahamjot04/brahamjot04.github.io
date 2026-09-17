/**
 * Validates that a given URL uses a safe, allowed protocol.
 * Mitigates javascript: URI injection, malicious data: schemes, and open redirects.
 * 
 * @param {string} url - The URL string to validate
 * @param {string|null} fallback - Fallback value if invalid (defaults to empty string)
 * @returns {string|null} - Safe URL string or fallback
 */
export function getSafeUrl(url, fallback = "") {
  if (!url || typeof url !== "string") {
    return fallback;
  }

  const trimmed = url.trim();

  // Explicitly deny javascript:, vbscript:, and dangerous data: schemes
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("vbscript:") ||
    (lower.startsWith("data:") && !lower.startsWith("data:image/"))
  ) {
    return fallback;
  }

  // Allow standard web protocols or mailto:
  if (
    lower.startsWith("https://") ||
    lower.startsWith("http://") ||
    lower.startsWith("mailto:")
  ) {
    return trimmed;
  }

  // Allow internal relative paths (starting with single /, but not protocol-relative //)
  if (lower.startsWith("/") && !lower.startsWith("//")) {
    return trimmed;
  }

  return fallback;
}
