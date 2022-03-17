// T004

// react
import { Fragment, useMemo, createContext } from "react";
// next
import NextApp from "next/app";
import Head from "next/head";
import Script from "next/script";
// important
import { ApolloClient, makeVar, gql } from "@apollo/client";
import { HttpLink, InMemoryCache, ApolloProvider } from "@apollo/client";
//
import { extendTheme, ChakraProvider } from "@chakra-ui/react";
import chroma from "chroma-js";
import isEqual from "lodash/isEqual";
import { setContext } from "@apollo/client/link/context";
import merge from "deepmerge";
//
import Information from "@itoa/components/Information/Controller";
//
const UNKNOWN_USER_COLOR_STRING = "#000";
const LIGHTNESS_MAP = [0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.0];
const SATURATION_MAP = [0.32, 0.16, 0.08, 0.04, 0, 0, 0.04, 0.08, 0.16, 0.32];
const HUE_MAP = [0, 4, 8, 12, 16, 20, 24, 28, 32, 36];

const getUserColorChroma = (
  colorString,
  fallbackValue = UNKNOWN_USER_COLOR_STRING
) => (chroma.valid(colorString) ? chroma(colorString) : chroma(fallbackValue));

export const SmartSwatch = (userColorInput = "#000") => {
  const trimmedColor = userColorInput.trim();
  const userColorChroma = getUserColorChroma(trimmedColor);

  const lightnessGoal = userColorChroma.get("hsl.l");
  const closestLightness = LIGHTNESS_MAP.reduce((prev, curr) =>
    Math.abs(curr - lightnessGoal) < Math.abs(prev - lightnessGoal)
      ? curr
      : prev
  );

  const baseColorIndex = LIGHTNESS_MAP.findIndex((l) => l === closestLightness);

  const colors = LIGHTNESS_MAP.map((l) => userColorChroma.set("hsl.l", l))
    .map((color) => chroma(color))
    .map((color, i) => {
      const saturationDelta =
        SATURATION_MAP[i] - SATURATION_MAP[baseColorIndex];
      return saturationDelta >= 0
        ? color.saturate(saturationDelta)
        : color.desaturate(saturationDelta * -1);
    });
  const colorsHueDown = colors.map((color, i) => {
    const hueDelta = HUE_MAP[i] - HUE_MAP[baseColorIndex];
    return hueDelta >= 0
      ? color.set("hsl.h", `-${hueDelta}`)
      : color.set("hsl.h", `-${(hueDelta * -1) / 2}`);
  });
  const result = {};
  const c = colorsHueDown.map((color, index) => {
    const number = getColorNumber(index);
    result[number] = color.hex();
  });
  return result;
};

export function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    const context = this,
      args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (immediate && !timeout) {
      func.apply(context, args);
    }
  };
}
export const getColorNumber = (index) => (index === 0 ? 50 : index * 100);
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
    const data = merge(initialState, existingCache, {
      arrayMerge: (destinationArray, sourceArray) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });
    _apolloClient.cache.restore(data);
  }
  if (!apolloClients[name]) apolloClients[name] = _apolloClient;
  return _apolloClient;
}
export async function getContextVar(state, context) {
  const { locale } = context;
  const host = context.req ? context.req.headers.host : window.location.host;
  const domain =
    process.env.NODE_ENV === "production" ? host : process.env.HOST;
  //
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
  const [seller] = allUsers;
  //
  return {
    domain,
    host,
    locale,
    seller,
  };
}
export function getVariables(pageProps = {}) {
  return pageProps[VARIABLE_PROP_NAME];
}
export function getApolloState(pageProps = {}) {
  return pageProps[APOLLO_STATE_PROP_NAME];
}

export function mergePageProps(initialState = {}, pageProps = {}) {
  const existingState = pageProps[APOLLO_STATE_PROP_NAME] || {};
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
async function executeQueries(state, variables, queries) {
  const { locale } = variables;
  var initialState = {};
  try {
    const client = initializeApollo(state, variables);
    for (var i in queries) {
      var QUERY = queries[i];
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
  const initialState = await executeQueries(
    state,
    variables,
    queries(variables)
  );
  initialProps.pageProps[VARIABLE_PROP_NAME] = variables;
  initialProps.pageProps = mergePageProps(initialState, initialProps.pageProps);
  return initialProps;
}

export async function executeServerSide(context, queries = (variables) => {}) {
  const variables = await getContextVar({}, context);
  var initialState = await executeQueries({}, variables, queries(variables));
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
export const PageContext = createContext();
function UI(props) {
  const { children, page = {}, config = {} } = props;
  const initialColorMode = page.colorMode || "light";
  const brand = SmartSwatch(page.color || "#0000");
  const theme = extendTheme(
    merge.all([
      config,
      {
        colors: { brand },
        config: {
          initialColorMode,
          useSystemColorMode: false,
        },
      },
    ])
  );
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
}
export const pagePropsVar = makeVar();
export default function UIProvider(props) {
  const { pageProps = {}, children, config } = props;
  const client = useMemo(() => {
    const variables = getVariables(pageProps);
    const state = getApolloState(pageProps);
    pagePropsVar(variables);
    return initializeApollo(state, variables);
  }, [pageProps]);
  return (
    <ApolloProvider client={client}>
      <Information
        UI={UI}
        children={children}
        config={config}
        pageProps={pageProps}
      />
    </ApolloProvider>
  );
}

function Helmet() {
  return (
    <Fragment>
      {page?.gtag && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js`}
          id={page.gtag}
          strategy="lazyOnload"
          onLoad={() => {
            window.dataLayer = window.dataLayer || [];
            function gtag() {
              dataLayer.push(arguments);
            }
            gtag("js", new Date());
            gtag("config", page.gtag);
          }}
        />
      )}
      <Script src="https://sp.zalo.me/plugins/sdk.js"></Script>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        nonce="3HoFlu1a"
        onLoad={() => {
          window.fbAsyncInit = function () {
            FB.init({
              appId:
                process.env.NODE_ENV === "production"
                  ? "145518257438217"
                  : "793212068255116",
              autoLogAppEvents: true,
              xfbml: true,
              version: "v11.0",
            });
            FB.getLoginStatus(function (response) {
              if (response.status === "connected") {
                // The user is logged in and has authenticated your
                // app, and response.authResponse supplies
                // the user's ID, a valid access token, a signed
                // request, and the time the access token
                // and signed request each expire.
                var uid = response.authResponse.userID;
                var accessToken = response.authResponse.accessToken;
              } else if (response.status === "not_authorized") {
                // The user hasn't authorized your application.  They
                // must click the Login button, or you must call FB.login
                // in response to a user gesture, to launch a login dialog.
              } else {
                // The user isn't logged in to Facebook. You can launch a
                // login dialog with a user gesture, but the user may have
                // to log in to Facebook before authorizing your application.
              }
            });
          };
          if (page.pixelId) {
            fbq("init", pixelId);
            fbq("track", "PageView");
          }
        }}
      />

      {page.pixelId && (
        <noscript>
          <img
            height="1"
            width="1"
            src={`https://www.facebook.com/tr?id=${page.pixelId}&ev=PageView&noscript=1`}
          />
        </noscript>
      )}
      <Head>
        {/* <link rel="icon" href={page?.logo?.publicUrl} type="image/jpg" /> */}
      </Head>
    </Fragment>
  );
}
