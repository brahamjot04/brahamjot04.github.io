import Head from "next/head";
import About from "../components/About/About";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Me | Brahamjot Singh - B.Tech IT Graduate</title>
        <meta
          name="description"
          content="Learn about Brahamjot Singh - B.Tech in Information Technology graduate from GNDEC Ludhiana, technical skill stack (Flutter, Firebase, PHP, React, MySQL), developer tools, and GitHub contributions."
        />
        <meta property="og:title" content="About Me | Brahamjot Singh" />
        <meta
          property="og:description"
          content="Learn about Brahamjot Singh's technical skills, toolstack, and professional background."
        />
        <link rel="canonical" href="https://brahamjot.dev/about" />
      </Head>
      <About />
    </>
  );
}
