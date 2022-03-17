import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SmartSwatch } from "../swatch";
import Head from "next/head";
import PageList from "@itoa/components/Page/List";
import { createContext, useMemo, useState } from "react";
import Process from "@itoa/components/Process";
import ProcessTop from "@itoa/components/Process/Top";
import { Fragment } from "react";
export const PageContext = createContext();
function PageProviderUI({ page = {}, children, Loading }) {
  console.log(page)
  const brand = useMemo(() => SmartSwatch(page.color || "rgb(36,196,138)"), [
    page.id,
  ]);
  const initialColorMode = page.colorMode || "light";
  const config = {
    colors: { brand },
    config: {
      initialColorMode,
      useSystemColorMode: false,
    },
  };
  const theme = useMemo(() => {
    return extendTheme(config);
  }, [page.id]);
  return (
    <Fragment>
      <ChakraProvider theme={theme}>
        <Loading page={page} />
        <Process UI={ProcessTop} />
        <PageContext.Provider value={config}>
          <Head>
            <title>
              {page.store} - {page.slogan}
            </title>
            <meta
              name="description"
              content={
                page?.description ||
                page?.intro ||
                `${page?.store} - ${page?.slogan}`
              }
            />
            <meta name="theme-color" content={page.color} />
            {page.logo && <link rel="icon" href={page?.logo?.publicUrl} />}
          </Head>
          {children}
        </PageContext.Provider>
      </ChakraProvider>
    </Fragment>
  );
}
export default function PageProvider({ children, Loading }) {
  console.log("PageProvider");
  return (
    <Fragment>
      <PageList UI={PageProviderUI} Loading={Loading}>
        {children}
      </PageList>
    </Fragment>
  );
}
