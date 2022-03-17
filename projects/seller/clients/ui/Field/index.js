import { useMemo } from "react";
import gfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import {
  Code,
  Heading,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
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
        <ReactMarkdown
          children={children}
          remarkPlugins={[gfm]}
          className={className}
          components={{
            code: Code,
            h1: ({ children }) => (
              <Heading as="h2" py={2} size="lg" children={children} />
            ),
            h2: ({ children }) => (
              <Heading as="h3" py={2} size="md" children={children} />
            ),
            h3: ({ children }) => (
              <Heading as="h4" py={2} size="sm" children={children} />
            ),
            h4: ({ children }) => (
              <Heading as="h5" size="xs" children={children} />
            ),
            p: ({ children }) => <Text children={children} />,
            em: ({ children }) => (
              <Text
                as="em"
                color="gray.500"
                fontStyle="italic"
                mb={3}
                children={children}
              />
            ),
            ul: ({ children }) => <UnorderedList children={children} />,
            ol: ({ children }) => <OrderedList>{children}</OrderedList>,
            li: ({ children }) => <ListItem children={children} />,
            code: ({ children }) => {
              return <Code>{children?.join()?.trim()}</Code>;
            },
          }}
        />
      );
    }, [children]);
  }
  return children;
}
