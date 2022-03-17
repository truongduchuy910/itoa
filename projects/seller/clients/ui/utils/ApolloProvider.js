import NextApp from "next/app";
import { useMemo } from "react";
import {
  executeInitialProps,
  getApolloState,
  initializeApollo,
  ApolloProvider as Provider,
  getVariables,
} from "../UIProvider";

export default function ApolloProvider(props) {
  const { pageProps = {}, children } = props;
  const state = getApolloState(pageProps);
  const variables = getVariables(pageProps);
  const client = useMemo(() => initializeApollo(state, variables), [
    state,
    pageProps.domain,
    pageProps.locale,
  ]);

  return <Provider client={client}>{children}</Provider>;
}
export function appInitialProps(queries = []) {
  return async (app) => {
    var initialProps = await NextApp.getInitialProps(app);
    const context = app.ctx;
    const props = await executeInitialProps(context, initialProps, queries);
    return props;
  };
}
