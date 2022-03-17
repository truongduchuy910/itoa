import React, { useMemo } from "react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
export const cache = new InMemoryCache();

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
var headers = {};
if (process.env.NODE_ENV === "development")
  headers.as = "trungtamamnhacdanang.com";
const httpLink = new HttpLink({
  headers,
  uri:
    process.env.NODE_ENV === "production"
      ? "https://ecom.itoa.vn/admin/api"
      : "https://ecom.itoa.vn/admin/api",
  // : "http://localhost:7005/admin/api",
  credentials: "same-origin",
});
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
  });
}

export function useApollo(pageProps) {
  return createApolloClient();
}
