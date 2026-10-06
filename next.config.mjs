import path from "node:path";

/** @type {import('next').NextConfig} */

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
  img-src 'self' data: blob: https:;
  connect-src 'self' https://fvopyydvcietjwhehjvk.supabase.co wss://fvopyydvcietjwhehjvk.supabase.co https://vitals.vercel-insights.com https://api.github.com https://github-contributions-api.jogruber.de https://challenges.cloudflare.com;
  frame-src 'self' https://gndecedu-my.sharepoint.com https://challenges.cloudflare.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\s{2,}/g, " ").trim();

const nextConfig = {
  reactStrictMode: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["react-bootstrap", "react-icons"],
  },
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./lib/emptyPolyfill.js",
      "../../build/polyfills/polyfill-module": "./lib/emptyPolyfill.js",
      "next/dist/build/polyfills/polyfill-module": "./lib/emptyPolyfill.js",
    },
  },
  allowedDevOrigins: [
    "localhost:3000",
    "127.0.0.1:3000",
    "192.168.57.202:3000",
    "192.168.57.202",
  ],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "../build/polyfills/polyfill-module": path.resolve("./lib/emptyPolyfill.js"),
        "../../build/polyfills/polyfill-module": path.resolve("./lib/emptyPolyfill.js"),
        "next/dist/build/polyfills/polyfill-module": path.resolve("./lib/emptyPolyfill.js"),
      };
    }
    return config;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
