import Head from "next/head";
import Projects from "../components/Projects/Projects";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects | Brahamjot Singh - Full Stack & Web Apps</title>
        <meta
          name="description"
          content="Explore recent web development and product builds by Brahamjot Singh including Bakeology, Library Management System, FMCRS Radio, and client websites."
        />
        <meta property="og:title" content="Projects | Brahamjot Singh" />
        <meta
          property="og:description"
          content="Explore web development and product projects developed by Brahamjot Singh."
        />
        <link rel="canonical" href="https://brahamjot.dev/project" />
      </Head>
      <Projects />
    </>
  );
}
