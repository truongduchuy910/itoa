import SellerProvider from "components/SellerProvider/Controller";
import "./_app.css";
import { ThemeProvider, BaseStyles } from "@primer/components";
import LayoutItoa from "components/Layout/Itoa";
import { config } from "../theme";
function App({ Component, pageProps }) {
  return (
    <SellerProvider pageProps={pageProps}>
      <ThemeProvider theme={config}>
        <BaseStyles>
          <LayoutItoa>
            <Component {...pageProps} />
          </LayoutItoa>
        </BaseStyles>
      </ThemeProvider>
    </SellerProvider>
  );
}
// App.getInitialProps = appInitialProps(({ domain, locale }) => []);
export default App;
