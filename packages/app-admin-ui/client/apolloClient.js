import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
// eslint-disable-next-line
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

import fetch from 'cross-fetch';
const tokenContext = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
export const initApolloClient = ({ uri }) => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const as = localStorage.getItem('as');
  const host = as ? { as } : {};
  const httpLink = createUploadLink({
    uri,
    fetch, // support mocking `fetch` in Cypress tests. See https://github.com/cypress-io/cypress/issues/687#issuecomment-384953881
    headers: {
      ...host,
    },
  });

  const link = typeof window === 'object' ? tokenContext.concat(httpLink) : httpLink;
  return new ApolloClient({
    link: ApolloLink.from([errorLink, link]),
    cache: new InMemoryCache(),
  });
};
