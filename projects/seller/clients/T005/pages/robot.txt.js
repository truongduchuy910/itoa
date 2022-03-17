import { executeServerSide, getVariables } from "@itoa/ui/UIProvider";

export default function Robot() {}
export async function getServerSideProps(context) {
  const { res } = context;
  const result = await executeServerSide(context, []);
  const protocol =
    process.env.NODE_ENV === "production" ? "https://" : "http://";
  const { domain } = getVariables(result.props);
  const d = protocol + domain;
  res.setHeader("Content-Type", "UTF-16");
  res.write(`User-agent: *
Disallow: /admin/*
User-agent: Googlebot-news
Disallow: /san-pham
Sitemap: ${d}/sitemap.xml
`);
  res.end();
  return result;
}
