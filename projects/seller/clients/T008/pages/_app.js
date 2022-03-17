import dynamic from "next/dynamic";
import { Fragment, useEffect } from "react";
import { Box, Stack } from "@chakra-ui/react";
import Image from "next/image";
import Script from "next/script";
import "./_app.css";
import PageList, { PageListQuery } from "@itoa/ui/Page/List";
import { PRODUCT_CATEGORIES_QUERY } from "@itoa/ui/Product/Category/List";
import { query } from "@itoa/ui/Post/Hashtag/List";
import ApolloProvider, { appInitialProps } from "@itoa/ui/utils/ApolloProvider";
// import ThemeProvider from "@itoa/ui/utils/ThemeProvider";

import PageProviderSimple from "@itoa/ui/utils/PageProvider/Simple";

import NavbarDashboardSimpleLinksLeft from "@itoa/ui/Navbar/DashboardSimpleLinksLeft";
import LargeWithLogoSocialCentered from "@itoa/ui/Footer/LargeWithLogoSocialCentered";
import TranslateIcon from "@itoa/ui/Translate/Icon";
import Translate from "@itoa/ui/Translate";
import HotlineSimple from "@itoa/ui/Hotline/Simple";
import TranslateMenu from "@itoa/ui/Translate/Menu";
import UIProvider from "@itoa/ui/UIProvider";
function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof gtag === "object") gtag("event", "page_view");
  });
  const action = ({ page }) => (
    <Stack spacing={4}>
      <Translate UI={TranslateIcon} />
      <HotlineSimple page={page} />
    </Stack>
  );
  const footer = ({ page }) => (
    <Stack spacing={8}>
      <Translate UI={TranslateMenu} />
      <HotlineSimple page={page} />
    </Stack>
  );
  //
  return (
    <UIProvider pageProps={pageProps}>
      <PageList UI={NavbarDashboardSimpleLinksLeft} minH={12} action={action} />
      <Component {...pageProps} />
      <PageList UI={LargeWithLogoSocialCentered} minH={80} action={footer} />
      <Box
        pos="fixed"
        w="100vw"
        h="100vh"
        zIndex="-1"
        bottom="0"
        right="0"
        opacity=".3"
      >
        <Image
          unoptimized
          src="/img/bg.png"
          layout="fill"
          objectFit="contain"
        />
      </Box>
    </UIProvider>
  );
}

App.getInitialProps = appInitialProps([
  { query: PageListQuery },
  { query: PRODUCT_CATEGORIES_QUERY, variables: { first: 12, skip: 0 } },
  {
    query,
    variables: { first: 12 },
  },
]);

export default App;
export function reportWebVitals({ id, name, label, value }) {
  if (typeof gtag === "object") {
    console.log(id, name, label, value);
    gtag("event", name, {
      event_category:
        label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
      value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
      event_label: id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    });
  }
}
