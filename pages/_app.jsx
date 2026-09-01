import { useEffect, useState } from "react";
import Head from "next/head";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Pre";
import ScrollToTop from "../components/ScrollToTop";
import { PortfolioProvider } from "../context/PortfolioContext";
import "../styles/App.css";
import "../styles/index.css";
import "../styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MyApp({ Component, pageProps }) {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Brahamjot Singh",
    url: "https://brahamjot.dev",
    image: "https://brahamjot.dev/og-image.png",
    sameAs: [
      "https://github.com/brahamjot04",
      "https://www.linkedin.com/in/brahamjotsingh/",
      "https://www.instagram.com/brahamjot_2004/",
    ],
    jobTitle: "Software Developer & Full Stack Developer",
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Guru Nanak Dev Engineering College, Ludhiana",
    },
    knowsAbout: [
      "JavaScript",
      "React",
      "Next.js",
      "Flutter",
      "PHP",
      "C++",
      "Supabase",
      "Cyber Security",
      "Web Development",
    ],
  };

  return (
    <PortfolioProvider>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Brahamjot Singh | Software Developer & Full Stack Engineer</title>
        <meta
          name="description"
          content="Portfolio of Brahamjot Singh — B.Tech IT graduate, Software Developer, and Full Stack Engineer specializing in React, Next.js, Flutter, and scalable web solutions."
        />
        <meta name="keywords" content="Brahamjot Singh, Software Developer, Full Stack Developer, React, Next.js, Flutter, GNDEC, Portfolio" />
        <meta name="author" content="Brahamjot Singh" />
        <link rel="canonical" href="https://brahamjot.dev" />
        <link rel="icon" href="/favicon.png" />

        {/* OpenGraph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://brahamjot.dev" />
        <meta property="og:title" content="Brahamjot Singh | Software Developer & Full Stack Engineer" />
        <meta
          property="og:description"
          content="Portfolio of Brahamjot Singh — B.Tech IT graduate, Software Developer, and Full Stack Engineer. Explore projects, technical presentations, and academic exercises."
        />
        <meta property="og:image" content="https://brahamjot.dev/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://brahamjot.dev" />
        <meta name="twitter:title" content="Brahamjot Singh | Software Developer & Full Stack Engineer" />
        <meta
          name="twitter:description"
          content="Portfolio of Brahamjot Singh — B.Tech IT graduate, Software Developer, and Full Stack Engineer."
        />
        <meta name="twitter:image" content="https://brahamjot.dev/og-image.png" />

        {/* JSON-LD Structured Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </Head>

      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <ScrollToTop />
      </div>
      <SpeedInsights />
    </PortfolioProvider>
  );
}
