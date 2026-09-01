import Head from "next/head";
import dynamic from "next/dynamic";

const Resume = dynamic(() => import("../components/Resume/ResumeNew"), {
  ssr: false,
});

export default function ResumePage() {
  return (
    <>
      <Head>
        <title>Resume & CV | Brahamjot Singh</title>
        <meta
          name="description"
          content="View and download the professional resume and curriculum vitae of Brahamjot Singh - Software Developer and B.Tech IT Graduate."
        />
        <meta property="og:title" content="Resume & CV | Brahamjot Singh" />
        <meta
          property="og:description"
          content="View and download the professional resume and curriculum vitae of Brahamjot Singh."
        />
        <link rel="canonical" href="https://brahamjot.dev/resume" />
      </Head>
      <Resume />
    </>
  );
}
