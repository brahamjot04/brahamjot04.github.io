import React, { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Native, zero-dependency Cloudflare Turnstile widget for React / Next.js.
 * Fully compatible with React 19 and SSR.
 */
const TurnstileWidget = forwardRef(function TurnstileWidget(
  {
    onSuccess,
    onError,
    onExpire,
    action = "contact",
    theme = "dark",
    className = "",
  },
  ref
) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  const sitekey =
    process.env.NEXT_PUBLIC_TURNSTILE_SITEKEY || "1x00000000000000000000AA";

  // Allow parent component to reset the widget programmatically
  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.reset(widgetIdRef.current);
        } catch (err) {
          console.warn("Turnstile reset error:", err);
        }
      }
    },
    remove: () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
          widgetIdRef.current = null;
        } catch (err) {
          console.warn("Turnstile remove error:", err);
        }
      }
    },
  }));

  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current || !window.turnstile) return;

      // Clean up previous widget instance if one exists
      if (widgetIdRef.current !== null) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          // Ignore
        }
        widgetIdRef.current = null;
      }

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey,
          theme,
          action,
          callback: (token) => {
            if (isMounted && onSuccess) onSuccess(token);
          },
          "error-callback": (err) => {
            console.warn("Turnstile error challenge:", err);
            if (isMounted && onError) onError(err);
          },
          "expired-callback": () => {
            if (isMounted && onExpire) onExpire();
          },
        });
        widgetIdRef.current = id;
      } catch (err) {
        console.error("Turnstile render exception:", err);
      }
    };

    // Load Turnstile script if not present
    if (!window.turnstile) {
      const existingScript = document.querySelector(`script[src^="${SCRIPT_URL}"]`);
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = SCRIPT_URL;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          if (isMounted && window.turnstile) {
            renderWidget();
          }
        };
        script.onerror = () => {
          console.warn("Turnstile script failed to load (possible adblocker).");
          if (isMounted && onError) onError("script_load_failed");
        };
        document.head.appendChild(script);
      } else {
        existingScript.addEventListener("load", () => {
          if (isMounted && window.turnstile) {
            renderWidget();
          }
        });
      }
    } else {
      renderWidget();
    }

    return () => {
      isMounted = false;
      if (widgetIdRef.current !== null && window.turnstile) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch (e) {
          // Ignore
        }
        widgetIdRef.current = null;
      }
    };
  }, [sitekey, theme, action, onSuccess, onError, onExpire]);

  return (
    <div
      ref={containerRef}
      className={`turnstile-widget-wrapper ${className}`}
      style={{ minHeight: "65px", display: "flex", justifyContent: "center" }}
    />
  );
});

export default TurnstileWidget;
