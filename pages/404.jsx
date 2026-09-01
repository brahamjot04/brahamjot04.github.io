import Head from "next/head";
import NotFound from "../components/404NotFound/404";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Brahamjot Singh</title>
        <meta name="robots" content="noindex, follow" />
      </Head>
      <NotFound />
    </>
  );
}
