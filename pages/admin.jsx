import Head from "next/head";
import dynamic from "next/dynamic";

const AdminPanel = dynamic(() => import("../components/Admin/AdminPanel"), {
  ssr: false,
});

export default function AdminPage() {
  return (
    <>
      <Head>
        <title>Admin Dashboard | Brahamjot Singh Portfolio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <AdminPanel />
    </>
  );
}
