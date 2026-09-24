import React from "react";
import Head from "next/head";
import SocialsHub from "../components/Socials/SocialsHub";

export default function SocialsPage() {
  return (
    <>
      <Head>
        <title>Brahamjot Singh | Links &amp; Socials</title>
        <meta
          name="description"
          content="Connect with Brahamjot Singh — Full Stack Developer & Software Engineer. Find my official social media profiles, direct contact channels, and portfolio links."
        />
        <meta
          name="keywords"
          content="Brahamjot Singh, Links, Socials, Linktree, GitHub, LinkedIn, Instagram, Contact, Full Stack Developer"
        />
        <meta name="author" content="Brahamjot Singh" />
        <link rel="canonical" href="https://brahamjot.dev/socials" />

        {/* OpenGraph / Facebook / WhatsApp Preview */}
        <meta property="og:type" content="profile" />
        <meta property="og:url" content="https://brahamjot.dev/socials" />
        <meta property="og:title" content="Brahamjot Singh | Links &amp; Socials" />
        <meta
          property="og:description"
          content="Connect with Brahamjot Singh — Full Stack Developer. Find all official links, social media profiles, and contact channels."
        />
        <meta property="og:image" content="https://brahamjot.dev/og-image.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://brahamjot.dev/socials" />
        <meta name="twitter:title" content="Brahamjot Singh | Links &amp; Socials" />
        <meta
          name="twitter:description"
          content="Connect with Brahamjot Singh — Full Stack Developer. Socials, direct contact, and portfolio links."
        />
        <meta name="twitter:image" content="https://brahamjot.dev/og-image.png" />
      </Head>

      <SocialsHub />
    </>
  );
}
