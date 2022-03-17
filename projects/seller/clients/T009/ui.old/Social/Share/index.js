import dynamic from "next/dynamic";
const UI = dynamic(() => import("./Simple"), { ssr: false });
export default function Share({ ...props }) {
  return <UI {...props} />;
}
