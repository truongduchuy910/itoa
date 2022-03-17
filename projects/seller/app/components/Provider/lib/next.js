import NextApp from "next/app";
export async function executeInitialProps(context, initialProps, queries = []) {
  // add
  const { domain, locale } = getContextVar(context);
  initialProps.pageProps[VARIABLE_PROP_NAME] = { domain, locale };
  //
  try {
    const client = initializeApollo(
      initialProps.pageProps[APOLLO_STATE_PROP_NAME],
      initialProps.pageProps[VARIABLE_PROP_NAME],
    );
    for (var i in queries) {
      var QUERY = queries[i];
      if (QUERY.variables) QUERY.variables.locale = locale;
      else QUERY.variables = { locale };
      await client.query(QUERY);
    }
    const initialState = client.cache.extract();
    initialProps.pageProps = mergePageProps(
      initialState,
      initialProps.pageProps,
    );
  } catch (err) {
    console.log("cannot executeInitialProps", err.toString());
  }
  return initialProps;
}
export async function executeServerSide(context, queries = []) {
  const { domain, locale } = getContextVar(context);
  var initialState = {};
  for (var i in queries) {
    const client = initializeApollo(initialState, { domain, locale });
    var QUERY = queries[i];
    if (!QUERY.disableLocale) {
      if (QUERY.variables) QUERY.variables.locale = locale;
      else QUERY.variables = { locale };
    }
    console.log(QUERY.variables);
    await client.query(QUERY);
    initialState = await client.cache.extract();
  }
  return {
    props: {
      [APOLLO_STATE_PROP_NAME]: initialState,
      [VARIABLE_PROP_NAME]: { domain, locale },
    },
  };
}
export function appInitialProps(queries = []) {
  return async (app) => {
    var initialProps = await NextApp.getInitialProps(app);
    const context = app.ctx;
    const { asPath } = context;

    if (context.res)
      context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=60, stale-while-revalidate=59",
      );
    const props = await executeInitialProps(context, initialProps, queries);
    return props;
  };
}
