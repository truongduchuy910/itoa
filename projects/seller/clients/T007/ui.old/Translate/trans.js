import { useRouter } from "next/router";
import data from "./data.json";
import options from "./options.json";
export default function trans(content = "") {
  const router = useRouter();
  if (!router) return "";
  const { locale, pathname, asPath } = router;
  const current = options.find((option) => option.value === locale);
  if (!current) {
    // console.log(router);
  }
  return content
    ? locale === "vi" || !data?.[content]?.[locale]
      ? content
      : data[content][locale]
    : "missing content";
}
