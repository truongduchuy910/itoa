import { useEffect } from "react";
import { Stack, Box } from "@chakra-ui/react";
import "./_app.css";
import "@fontsource/barlow";
import "@fontsource/pacifico";
import PageList, { PageListQuery } from "@itoa/ui/Page/List";
import { query as POST_HASHTAG_QUERY } from "@itoa/ui/Post/Hashtag/List";
import PageListHighlightBrand from "@itoa/ui/Page/List/HighlightBrand";
import FooterJapan from "@itoa/ui/Footer/Japan";
import Translate from "@itoa/ui/Translate";
import HotlineSimple from "@itoa/ui/Hotline/Simple";
import TranslateMenu from "@itoa/ui/Translate/Menu";
import UIProvider, { appInitialProps } from "@itoa/ui/UIProvider";
import ScrollUp from "@itoa/ui/ScrollUp";
function App({ Component, pageProps }) {
  useEffect(() => {
    if (typeof gtag === "object") gtag("event", "page_view");
  });
  const action = ({ page }) => (
    <Stack spacing={4}>
      <Translate UI={TranslateMenu} color="white" />
    </Stack>
  );
  return (
    <UIProvider pageProps={pageProps}>
      <ScrollUp bottom={100} right={30} colorScheme="brand" bg="brand.500" />
      <PageList
        UI={({ page }) => (
          <HotlineSimple
            page={page}
            position="fixed"
            withPhone={true}
            bottom={4}
            left={4}
            zIndex={999}
            variant="outline"
            bg="white"
          />
        )}
      />
      <PageList
        UI={PageListHighlightBrand}
        minH={12}
        action={action}
        navTextProps={{ size: "md", color: "white" }}
        cardProps={{ variant: "gradient-brand" }}
      />
      <Component {...pageProps} />
      <PageList
        UI={FooterJapan}
        minH={80}
        action={action}
        chat={true}
        bgUrl="/ja.png"
      />
    </UIProvider>
  );
}

App.getInitialProps = appInitialProps([
  { query: PageListQuery },
  { query: POST_HASHTAG_QUERY, variables: { first: 12, where: { pin: true } } },
]);

export default App;
export function reportWebVitals({ id, name, label, value }) {
  if (typeof gtag === "object") {
    gtag("event", name, {
      event_category:
        label === "web-vital" ? "Web Vitals" : "Next.js custom metric",
      value: Math.round(name === "CLS" ? value * 1000 : value), // values must be integers
      event_label: id, // id unique to current page load
      non_interaction: true, // avoids affecting bounce rate.
    });
  }
}
