import { useMemo } from "react";
import { ApolloClient, makeVar, gql } from "@apollo/client";
import { HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
import isEqual from "lodash/isEqual";
import { setContext } from "@apollo/client/link/context";
import merge from "deepmerge";
import NextApp from "next/app";

export const APOLLO_STATE_PROP_NAME = "__apollo_state__";

export const VARIABLE_PROP_NAME = "__variable__";
function createApolloClient(domain = "", locale, host) {
  const config = {
    uri:
      (process.env.NODE_ENV === "production" ? "https://" : "http://") +
      host +
      "/admin/api",
    headers: {
      as: domain,
      locale,
    },
  };
  console.log("createApolloClient", config);
  const httpLink = new HttpLink(config);
  function addToken(_, { headers }) {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
  const context = setContext(addToken);
  const link = typeof window === "object" ? context.concat(httpLink) : httpLink;
  const cache = new InMemoryCache();
  return new ApolloClient({
    link,
    cache,
  });
}

/**
 * @returns {ApolloClient}
 */
export let apolloClients = {};

export function initializeApollo(
  initialState = null,
  { domain, host, locale }
) {
  const name = `${domain}`;
  const _apolloClient = apolloClients[name]
    ? apolloClients[name]
    : createApolloClient(domain, locale, host);
  if (initialState) {
    const existingCache = _apolloClient.extract();
    function arrayMerge(destinationArray, sourceArray) {
      return [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ];
    }
    const data = merge(initialState, existingCache, {
      arrayMerge,
    });
    _apolloClient.cache.restore(data);
  }
  if (!apolloClients[name]) apolloClients[name] = _apolloClient;
  return _apolloClient;
}

export async function getContextVar(state = {}, context) {
  const { locale } = context;
  const host = context.req ? context.req.headers.host : window.location.host;
  const domain =
    process.env.NODE_ENV === "production" ? host : process.env.HOST || host;

  const client = initializeApollo(state, {
    domain,
    host,
    locale,
  });
  const { data } = await client.query({
    query: SELLER_QUERY,
    variables: { domain },
  });
  const { allUsers = [] } = data;
  const [seller = {}] = allUsers;

  return {
    domain,
    host,
    locale,
    seller,
  };
}

export function getVariables(pageProps = {}) {
  return pageProps[VARIABLE_PROP_NAME] || {};
}

export function getApolloState(pageProps = {}) {
  return pageProps[APOLLO_STATE_PROP_NAME];
}

export function mergePageProps(initialState = {}, pageProps = {}) {
  const existingState = getApolloState(pageProps) || {};
  if (initialState) {
    const state = merge(initialState, existingState, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    return { ...pageProps, [APOLLO_STATE_PROP_NAME]: state };
  }
}

async function executeQueries(state = {}, variables = {}, queries = () => []) {
  const { locale } = variables;
  var initialState = {};
  try {
    const client = initializeApollo(state, variables);
    const arr = queries(variables);
    for (var i in arr) {
      var QUERY = arr[i];
      QUERY.variables = { locale, ...QUERY.variables };
      await client.query(QUERY);
    }
    initialState = client.cache.extract();
  } catch (err) {
    console.log("cannot executeInitialProps", err.toString());
  }
  return initialState;
}
const SELLER_QUERY = gql`
  query seller($domain: String) {
    allUsers(first: 1, where: { domain: $domain }) {
      id
    }
  }
`;

export async function executeInitialProps(
  context,
  initialProps,
  queries = (variables) => {}
) {
  const state = getApolloState(initialProps.pageProps);
  var variables = await getContextVar(state, context);
  const initialState = await executeQueries(state, variables, queries);
  initialProps.pageProps[VARIABLE_PROP_NAME] = variables;
  initialProps.pageProps = mergePageProps(initialState, initialProps.pageProps);
  return initialProps;
}

export async function executeServerSide(context, queries = (variables) => []) {
  const variables = await getContextVar({}, context);
  var initialState = await executeQueries({}, variables, queries);
  return {
    props: {
      [APOLLO_STATE_PROP_NAME]: initialState,
      [VARIABLE_PROP_NAME]: variables,
    },
  };
}

export function appInitialProps(queries = (variables) => {}) {
  return async (app) => {
    var initialProps = await NextApp.getInitialProps(app);
    const context = app.ctx;
    if (context.res)
      context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=59"
      );
    const props = await executeInitialProps(context, initialProps, queries);
    return props;
  };
}

export const pagePropsVar = makeVar();

export default function Controller(props) {
  const { pageProps = {}, children, config } = props;
  const client = useMemo(() => {
    const variables = getVariables(pageProps);
    const state = getApolloState(pageProps);
    pagePropsVar(variables);
    return initializeApollo(state, variables);
  }, [pageProps]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
