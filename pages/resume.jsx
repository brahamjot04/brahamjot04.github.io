import dynamic from "next/dynamic";

const Resume = dynamic(() => import("../components/Resume/ResumeNew"), {
  ssr: false,
});

export default function ResumePage() {
  return <Resume />;
}
