import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-scroll-behavior="smooth">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0f1626" />
        <meta
          name="impact-site-verification"
          content="632eb0d1-2261-4f54-82ad-44402c23b605"
        />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Global Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Brahamjot Singh Portfolio" />
        <meta property="og:url" content="https://brahamjot.dev" />
        <meta property="og:image" content="https://brahamjot.dev/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Global Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@brahamjot_2004" />
        <meta name="twitter:image" content="https://brahamjot.dev/og-image.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
