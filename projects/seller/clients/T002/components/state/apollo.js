import { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import merge from "deepmerge";
import isEqual from "lodash/isEqual";

export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";
export const cache = new InMemoryCache({});
let apolloClient = {};
const authLink = setContext((_, { headers }) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  }
});

function createApolloClient(host) {
  console.log(process.env.CMS, process.env.HOST);
  const httpLink = new HttpLink({
    uri: process.env.CMS +
        "/admin/api",
    headers: {
      as: process.env.HOST || host,
      locale,
    },
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
  });
}
export function mergePageProps(initialState = {}, pageProps = {}) {
  const existingState = pageProps[APOLLO_STATE_PROP_NAME] || {};
  const state = merge(initialState, existingState, {
    arrayMerge: (destinationArray, sourceArray) => [
      ...sourceArray,
      ...destinationArray.filter((d) =>
        sourceArray.every((s) => !isEqual(d, s)),
      ),
    ],
  });
  return { [APOLLO_STATE_PROP_NAME]: state };
}
/**
 * @returns {ApolloClient}
 */
export function initializeApollo(initialState = null, host) {
  const _apolloClient = apolloClient[host] ?? createApolloClient(host);
  if (initialState) {
    const existingCache = _apolloClient.extract();
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }
  if (!apolloClient[host]) apolloClient[host] = _apolloClient;
  return _apolloClient;
}
export function addApolloState(client) {
  return { props: { [APOLLO_STATE_PROP_NAME]: client.cache.extract() } };
}
/**
 *
 * @param {*} pageProps
 * @returns {ApolloClient}
 */
export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const { host } = pageProps;
  const store = useMemo(() => initializeApollo(state, host), [state, host]);
  return store;
}
