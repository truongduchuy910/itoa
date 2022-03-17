import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import data from "./data.json";
import options from "./options.json";

export function useTrans(q, locale) {
  if (typeof q !== "string") return q;
  if (data?.[q]?.[locale]) return data?.[q]?.[locale];
  const [text, setText] = useState(q);
  useEffect(async () => {
    // const res = await fetch("https://libretranslate.de/translate", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     q,
    //     source: "auto",
    //     target: locale,
    //   }),
    //   headers: { "Content-Type": "application/json" },
    // });
    // const data = await res.json();
    // console.log(data);
    // const { translatedText } = data;
    // setText(translatedText || q);
  }, [text, locale]);
  var _data = { ...data, [q]: { ...data?.[q], [locale]: text } };
  return text;
}
export default function Translate({ content, UI = {}, as: As, ...props }) {
  const router = useRouter();
  if (!router) return "";
  const { locale, pathname, asPath } = router;
  const current = options.find((option) => option.value === locale);
  const _t = useTrans(content, locale);
  return typeof content === "string" ? (
    As ? (
      <As {...props}>
        {locale === "vi" || !data?.[content]?.[locale]
          ? _t
          : data[content][locale]}
      </As>
    ) : locale === "vi" || !data?.[content]?.[locale] ? (
      _t
    ) : (
      data[content][locale]
    )
  ) : UI.name ? (
    <UI
      {...props}
      locale={locale}
      options={options}
      href={asPath}
      current={current}
    />
  ) : (
    "missing content or UI"
  );
}
export function translate(content) {
  const router = useRouter();
  const { locale } = router;
  return useTrans(content, locale);
}
export function trans(data) {
  if (Array.isArray(data)) {
    data = data.map((d) => ({ ...d, ...trans(d) }));
  } else {
    if (typeof data === "object" && data !== null) {
      var _data = { ...data };
      for (var i in _data) {
        if (Array.isArray(_data._trans)) {
          const t = _data._trans.find((d) => d.fieldName === i);
          if (t) {
            _data[i] = t.content;
          }
        }
        _data[i] = trans(_data[i]);
      }
      data = _data;
    }
  }
  return data;
}
