import "bootstrap/dist/css/bootstrap-grid.min.css";
import "bootstrap/dist/css/bootstrap-reboot.min.css";
import "./_app.css";
import dynamic from "next/dynamic";
import Infomation, { INFORMATION_QUERY } from "../components/frames/Infomation";
import { PageListQuery } from "../ui/Page/List";
import UIProvider, { appInitialProps } from "../ui/UIProvider";
import { PRODUCT_CATEGORIES_QUERY } from "../components/primes/Product/Category/List";
import MenuLak from "../components/frames/Menu/Lak";
import FooterLak from "../components/frames/Footer/Lak";
const ToastSimple = dynamic(
  () => import("../components/elements/Toast/Simple"),
  { ssr: false }
);
const TopProgress = dynamic(() => import("../components/elements/Procress"));
function App({ Component, pageProps }) {
  return (
    <UIProvider pageProps={pageProps}>
      <TopProgress />
      <Infomation UI={MenuLak} />
      <Component {...pageProps} />
      <Infomation UI={FooterLak} />
      <ToastSimple />
    </UIProvider>
  );
}
App.getInitialProps = appInitialProps([
  { query: PageListQuery },
  {
    query: INFORMATION_QUERY,
    variables: {
      first: 7,
      category: { parent_is_null: true },
    },
  },
  {
    query: PRODUCT_CATEGORIES_QUERY,
    variables: {
      first: 12,
      skip: 0,
      condition: { parent_is_null: true },
    },
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
