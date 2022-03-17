import PageList, { query as PageListQuery } from "@itoa/ui/Page/List";
import UIProvider, { appInitialProps } from "@itoa/ui/UIProvider";
import NavbarWithSubnavigation from "@itoa/ui/Navbar/WithSubnavigation";
import LargeWithLogoSocialCentered from "@itoa/ui/Footer/LargeWithLogoSocialCentered";
import TranslateIcon from "@itoa/ui/Translate/Icon";
import Translate from "@itoa/ui/Translate";
import { Fragment } from "react";
import HotlineSimple from "@itoa/ui/Hotline/Simple";
import Head from "next/head";
function App({ Component, pageProps }) {
  const action = ({ page }) => (
    <Fragment>
      <Translate UI={TranslateIcon} />
      <HotlineSimple page={page} />
    </Fragment>
  );
  return (
    <UIProvider pageProps={pageProps}>
      <PageList UI={PageSEO} />
      <NavbarWithSubnavigation minH={12} action={action} />
      <Component {...pageProps} />
      <LargeWithLogoSocialCentered minH={80} />
    </UIProvider>
  );
}
App.getInitialProps = appInitialProps([
  { query: PageListQuery, variables: { first: 1 } },
]);

export default App;

export function reportWebVitals({ name, value }) {
  switch (name) {
    case "FCP":
      console.log("First Contentful Paint", value, "ms");
      break;
    case "LCP":
      console.log("Largest Contentful Paint", value, "ms");
      break;
    case "CLS":
      console.log("Cumulative Layout Shift", value, "ms");
      break;
    case "FID":
      console.log("First Input Delay", value, "ms");
      break;
    case "TTFB":
      console.log("Time to First Byte", value, "ms");
      break;
    default:
      break;
  }
}

function PageSEO({ loading, page }) {
  return loading ? (
    <Head>
      <title>loading...</title>
    </Head>
  ) : (
    <Head>
      <title>
        {page.store} - {page.slogan}
      </title>
      <meta
        name="description"
        content={
          page?.description || page?.intro || `${page?.store} - ${page?.slogan}`
        }
      />
      <meta name="theme-color" content={page.color} />
      {page.logo && (
        <link
          rel="icon"
          href={page?.logo?.publicUrl?.replace("/img", "/img/sm")}
        />
      )}
    </Head>
  );
}
