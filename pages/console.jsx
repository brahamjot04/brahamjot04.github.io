import Head from "next/head";
import AdminPanel from "../components/Admin/AdminPanel";

export default function ConsolePage() {
  return (
    <>
      <Head>
        <title>Portfolio Console | Brahamjot Singh</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminPanel />
    </>
  );
}
