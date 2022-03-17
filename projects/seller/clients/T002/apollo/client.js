import { useMemo } from 'react';
import { ApolloClient } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { HttpLink } from '@apollo/client/link/http';

import { InMemoryCache, makeVar, gql } from '@apollo/client';
import { init } from './action';
export const orderCountVar = makeVar(0);
export const newOrderVar = makeVar(false);
export const newOrderCountVar = makeVar();
export const customerVar = makeVar({ id: null });
export const refetchCustomer = makeVar(async () => {});

export let cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: 'https://ecom.itoa.vn/admin/api',
  credentials: 'same-origin',
});
const authLink = setContext((_, { headers }) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  }
});
function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache,
  });
}

let apolloClient;
export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}
export function useApollo(initialState) {
  const store = useMemo(() => {
    init();

    return initializeApollo(initialState);
  }, [initialState]);
  return store;
}
