import React from "react";
import Head from "next/head";
import SocialsHub from "../components/Socials/SocialsHub";

export default function LinksAliasPage() {
  return (
    <>
      <Head>
        <title>Brahamjot Singh | Links &amp; Socials</title>
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://brahamjot.dev/socials" />
      </Head>
      <SocialsHub />
    </>
  );
}
