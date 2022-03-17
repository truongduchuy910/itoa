import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import { createContext, useMemo, useState } from "react";
import { Fragment } from "react";
import merge from "deepmerge";
import { SmartSwatch } from "@itoa/components/utils/swatch";
import PageList from "@itoa/components/Page/List";
import Process from "@itoa/components/Process";
import ProcessTop from "@itoa/components/Process/Top";
import { config } from "../../theme";
export const PageContext = createContext();
function ThemeProviderUI({ page = {}, children, Loading, loading }) {
  const theme = useMemo(() => {
    if (!page.id) return extendTheme({});
    const brand = page.color
      ? SmartSwatch(page.color || "rgb(36,196,138)")
      : null;
    const initialColorMode = page.colorMode || "light";

    return extendTheme(
      merge.all([
        config,
        {
          colors: { brand },
          config: {
            initialColorMode,
            useSystemColorMode: false,
          },
        },
      ]),
    );
  }, [page.id]);
  const head = loading ? (
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
      {page.logo && <link rel="icon" href={page?.logo?.publicUrl} />}
    </Head>
  );
  return (
    <Fragment>
      {head}
      <ChakraProvider theme={theme}>
        {Loading && <Loading page={page} />}
        <Process UI={ProcessTop} />
        {children}
      </ChakraProvider>
    </Fragment>
  );
}
export default function ThemeProvider(props) {
  return <PageList {...props} UI={ThemeProviderUI} />;
}
