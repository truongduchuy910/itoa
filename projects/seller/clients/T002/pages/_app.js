import "@fontsource/barlow/400.css";
import "@fontsource/barlow/700.css";
import dynamic from "next/dynamic";
import { INFORMATION_QUERY } from "../components/frames/Infomation";

import UIProvider, { appInitialProps } from "../components/UIProvider";
import { PRODUCT_CATEGORIES_QUERY } from "../components/primes/Product/Category/List";
import Layout from "../components/frames/Layout";
import { PageListQuery } from "../components/primes/Page/List";

const ToastSimple = dynamic(
  () => import("../components/elements/Toast/Simple"),
  { ssr: false },
);
const TopProgress = dynamic(() => import("../components/elements/Procress"));

function App({ Component, pageProps }) {
  return (
    <UIProvider pageProps={pageProps}>
      {/* <TopProgress /> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <ToastSimple />
    </UIProvider>
  );
}
App.getInitialProps = appInitialProps([
  { query: PageListQuery },
  {
    query: INFORMATION_QUERY,
    variables: {
      first: 99,
      category: { parent_is_null: true },
    },
  },
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
