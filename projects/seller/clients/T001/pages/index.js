import dynamic from "next/dynamic";
import { Fragment } from "react";
import Head from "next/head";
import { Box, SimpleGrid, GridItem, Container, Stack } from "@chakra-ui/react";
import HeroSimpleCentered2 from "@itoa/ui/Hero/SimpleCentered2";
import PageList from "@itoa/ui/Page/List";
import GridTwo from "@itoa/ui/Grid/Two";
import { PostUI } from "./bai-viet";
import Image from "next/image";
import ShopNowSimpleJustified from "@itoa/ui/ShopNow/SimpleJustified";
import PostList, { POSTS_QUERY } from "@itoa/ui/Post/List";
import { BANNERS_QUERY } from "@itoa/ui/Banner/List";
import TitleOnly from "@itoa/ui/Post/Item/TitleOnly";
//
import PostHashtagList from "@itoa/ui/Post/Hashtag/List";
import PostHashtagListSidebarTiki from "@itoa/ui/Post/Hashtag/List/SidebarTiki";
import ProductCategoryList from "@itoa/ui/Product/Category/List";
import trans from "@itoa/ui/Translate/trans";

import ProductCategorySidebarTiki from "@itoa/ui/Product/Category/List/SidebarTiki";
import {
  executeServerSide,
  getContextVar,
  getVariables,
} from "../ui/UIProvider";
export default function Home() {
  return (
    <Fragment>
      <Container maxW="container.xl">
        <SimpleGrid columns={4} gap={4}>
          <GridItem colSpan={4}>
            <PageList UI={HeroSimpleCentered2} py={4} />
          </GridItem>
          <GridItem colSpan={4}>
            <ShopNowSimpleJustified />
          </GridItem>
          <GridItem colSpan={{ base: 4, md: 3 }}>
            <PageList
              UI={({ page = {} }) => {
                const [post] = page?.company || [];
                return <TitleOnly key={post?.id} post={post} />;
              }}
            />
          </GridItem>
          <GridItem colSpan={{ base: 4, md: 1 }}>
            <Stack pos="sticky" top={"95px"} spacing={4}>
              <PostHashtagList
                UI={PostHashtagListSidebarTiki}
                title={"Bài viết"}
                variant="light"
              />
              <ProductCategoryList
                UI={ProductCategorySidebarTiki}
                title={"Sản phẩm"}
                variant="light"
              />
            </Stack>
          </GridItem>
          <GridItem colSpan={4} py={8}>
            <PostList
              first={4}
              UI={({ allPosts = [] }) => {
                return (
                  <GridTwo
                    a={
                      <Box
                        w="full"
                        pos="relative"
                        pb="40%"
                        rounded="lg"
                        overflow="hidden"
                      >
                        <Image
                          layout="fill"
                          objectFit="cover"
                          src={
                            allPosts[0]?.thumbnail?.publicUrl || "/assets/img/no-image.png"
                          }
                        />
                      </Box>
                    }
                    c={
                      <Box
                        w="full"
                        pos="relative"
                        h="full"
                        rounded="lg"
                        overflow="hidden"
                      >
                        <Image
                          layout="fill"
                          objectFit="cover"
                          src={
                            allPosts[3]?.thumbnail?.publicUrl || "/assets/img/no-image.png"
                          }
                        />
                      </Box>
                    }
                    b={<PostUI post={allPosts[0]} />}
                    d={<PostUI post={allPosts[1]} />}
                    e={<PostUI post={allPosts[2]} />}
                    f={<PostUI post={allPosts[3]} />}
                  />
                );
              }}
            />
          </GridItem>
        </SimpleGrid>
      </Container>
      <PageList UI={PageSEO} />
    </Fragment>
  );
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

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59",
  );

  const { locale } = getContextVar(context);

  return await executeServerSide(context, [
    { query: POSTS_QUERY, variables: { first: 4, skip: 0, locale } },
    { query: BANNERS_QUERY, variables: {} },
  ]);
}
