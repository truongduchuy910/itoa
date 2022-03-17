import { Box, Breadcrumbs } from "@primer/components";
import {
  executeServerSide,
  getApolloState,
  getContextVar,
  mergePageProps,
} from "components/SellerProvider/Controller";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PropTypes from 'prop-types';
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";

function CodeBlock({ language = null, value }) {
  return (
    <SyntaxHighlighter language={language} style={solarizedLight}>
      {value}
    </SyntaxHighlighter>
  );
}
CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
};
import { Fragment } from "react";
export default function DocsPath(props) {
  const { text } = getApolloState(props);
  return (
    <Fragment>
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Home</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/about">About</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/about/team" selected>
          Team
        </Breadcrumbs.Item>
      </Breadcrumbs>
      <Box py={5}>
        <ReactMarkdown
          children={text}
          remarkPlugins={[remarkGfm]}
          renderers={{
            code: CodeBlock,
          }}
        />
        ,
      </Box>
    </Fragment>
  );
}
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59"
  );
  const apolloProps = await executeServerSide(context, ({ seller }) => []);
  const protocal =
    process.env.NODE_ENV === "production" ? "https://" : "http://";
  const { domain } = await getContextVar({}, context);
  const {
    query: { path },
  } = context;
  const url = protocal + domain + "/_docs/" + path.join("/");
  const response = await fetch(url);
  const text = await response.text();
  const page = {
    props: { text },
  };
  return { props: mergePageProps(page.props, apolloProps.props) };
}
