import Head from "next/head";
import Presentations from "../components/presentations/presentations";

export default function PresentationsPage() {
  return (
    <>
      <Head>
        <title>Presentations & Technical Talks | Brahamjot Singh</title>
        <meta
          name="description"
          content="Selected technical presentations, slide decks, and talks delivered by Brahamjot Singh."
        />
        <meta property="og:title" content="Presentations & Technical Talks | Brahamjot Singh" />
        <link rel="canonical" href="https://brahamjot.dev/presentations" />
      </Head>
      <Presentations />
    </>
  );
}
