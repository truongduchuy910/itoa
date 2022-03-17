import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Head from "next/head";
import { createContext, useMemo, useState } from "react";
import { Fragment } from "react";
import merge from "deepmerge";
import { SmartSwatch } from "@itoa/ui/utils/swatch";
import PageList from "@itoa/ui/Page/List";
import Process from "@itoa/ui/Process";
import ProcessTop from "@itoa/ui/Process/Top";
import { config } from "../../theme";
export const PageContext = createContext();
function ThemeProviderUI({ page = {}, children, Loading, loading }) {
  const theme = useMemo(() => {
    if (!page.id) return extendTheme({});
    const brand = process.env.NODE_ENV === 'production'? (page.color
      ? SmartSwatch(page.color || "rgb(36,196,138)")
      : null) : '#000'

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
