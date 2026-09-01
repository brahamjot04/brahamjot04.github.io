import Head from "next/head";
import Home from "../components/Home/Home";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Brahamjot Singh | Software Developer & Tech Enthusiast</title>
        <meta
          name="description"
          content="Personal portfolio of Brahamjot Singh - Software Developer, B.Tech IT Graduate from GNDEC, building web applications, mobile apps with Flutter, exploring security and multimedia."
        />
        <meta property="og:title" content="Brahamjot Singh | Software Developer" />
        <meta
          property="og:description"
          content="Explore the personal portfolio, full-stack projects, skills, and background of Brahamjot Singh."
        />
        <link rel="canonical" href="https://brahamjot.dev" />
      </Head>
      <Home />
    </>
  );
}
