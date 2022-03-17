import { createContext } from "react";
import { ApolloClient } from "@apollo/client";
import { HttpLink, InMemoryCache } from "@apollo/client";
import isEqual from "lodash/isEqual";
import { setContext } from "@apollo/client/link/context";
import merge from "deepmerge";
export const APOLLO_STATE_PROP_NAME = "__apollo_state__";
export const VARIABLE_PROP_NAME = "__variable__";
function createApolloClient(domain = "", locale) {
  const protocal =
    process.env.NODE_ENV === "production" ? "https://" : "http://";

  console.log(protocal + domain + "/admin/api");
  const httpLink = new HttpLink({
    uri: protocal + domain + "/admin/api",
    headers: {
      as:
        process.env.NODE_ENV === "production"
          ? domain
          : process.env.HOST || domain,
      locale,
    },
  });
  const link =
    typeof window === "object"
      ? setContext((_, { headers }) => {
          const token = localStorage.getItem("token");
          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : "",
            },
          };
        }).concat(httpLink)
      : httpLink;
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
export function initializeApollo(initialState = null, { domain, locale }) {
  const name = `${domain}`;
  const _apolloClient = apolloClients[name]
    ? apolloClients[name]
    : createApolloClient(domain, locale);
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
  if (!apolloClients[name]) apolloClients[name] = _apolloClient;
  return _apolloClient;
}
export function getContextVar(context) {
  const { locale } = context;
  if (locale) {
    // console.log(context);
  }
  return {
    domain: context.req ? context.req.headers.host : window.location.host,
    locale,
  };
}
export function getVariables(pageProps = {}) {
  return pageProps[VARIABLE_PROP_NAME];
}
export function getApolloState(pageProps = {}) {
  return pageProps[APOLLO_STATE_PROP_NAME];
}
export function addVariables(variable) {}
export function mergePageProps(initialState = {}, pageProps = {}) {
  const existingState = pageProps[APOLLO_STATE_PROP_NAME] || {};
  if (initialState) {
    const state = merge(initialState, existingState, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s)),
        ),
      ],
    });
    return { ...pageProps, [APOLLO_STATE_PROP_NAME]: state };
  }
}
export const PageContext = createContext();
