import dynamic from "next/dynamic";

const JavaPrograms = dynamic(
  () => import("../components/JavaPrograms/JavaPrograms"),
  { ssr: false }
);

export default function JavaProgramsPage() {
  return <JavaPrograms />;
}
