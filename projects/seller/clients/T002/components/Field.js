import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";

const f = new Intl.NumberFormat();
/**
 *
 * @param {{round:Boolean}} param
 * @returns
 */
export default function Field({ children = "", round, step, className }) {
  // number
  if (typeof children === "number") {
    return useMemo(() => {
      if (round) children = Math.round(children);
      if (step) children = Math.ceil(children / step) * step;
      return f.format(children);
    }, [children]);
  }
  // string
  if (typeof children === "string") {
    return useMemo(() => {
      const number = f.format(Number(children));
      if (number !== "NaN") return number;
      const isHtml = /<\/?[a-z][\s\S]*>/i.test(children);
      return isHtml ? (
        <div
          dangerouslySetInnerHTML={{ __html: children }}
          className={className}
        />
      ) : (
        <ReactMarkdown remarkPlugins={[gfm]} className={className}>
          {children}
        </ReactMarkdown>
      );
    }, [children]);
  }
  return children;
}
