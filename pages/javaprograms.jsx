import Head from "next/head";
import dynamic from "next/dynamic";

const JavaPrograms = dynamic(
  () => import("../components/JavaPrograms/JavaPrograms"),
  { ssr: false }
);

export default function JavaProgramsPage() {
  return (
    <>
      <Head>
        <title>Java Programs & Exercises | Brahamjot Singh</title>
        <meta
          name="description"
          content="Academic Java questions, problem solutions, and error-handling exercise sheets by Brahamjot Singh."
        />
        <meta property="og:title" content="Java Programs & Exercises | Brahamjot Singh" />
        <link rel="canonical" href="https://brahamjot.dev/javaprograms" />
      </Head>
      <JavaPrograms />
    </>
  );
}
