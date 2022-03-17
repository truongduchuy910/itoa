import { Container, Heading } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Translate from "@itoa/ui/Translate";

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import PostHashtagList, {
  query as POST_HASHTAG_LIST_QUERY,
} from "@itoa/ui/Post/Hashtag/List";
import PostHashtagListSidebarTiki from "@itoa/ui/Post/Hashtag/List/SidebarTiki";
import PostList, { POSTS_QUERY } from "@itoa/ui/Post/List";
import PostListSimple from "@itoa/ui/Post/List/Simple";
import PostListShort from "@itoa/ui/Post/List/Short";
import { executeServerSide } from "../../../ui/UIProvider";
import { BANNERS_QUERY } from "../../../ui/Banner/List";
const Categories = ({ withBreadcrumb = true }) => {
  const router = useRouter();
  const {
    query: { hashtag },
  } = router;

  return (
    <Fragment>
      {withBreadcrumb && (
        <PostHashtagList
          UI={({ allPostHashtags }) => {
            return (
              <Fragment>
                <Container maxW="container.xl">
                  {allPostHashtags?.map((category) => (
                    <Heading
                      key={category.id}
                      // textAlign="center"
                      py={8}
                      variant="gradient-brand"
                      size="2xl"
                      textTransform="capitalize"
                    >
                      {category.name}
                    </Heading>
                  ))}
                </Container>
                <Container
                  maxW="container.xl"
                  borderBottomWidth={1}
                  zIndex="dropdown"
                  bg="white"
                >
                  <Breadcrumb
                    spacing="8px"
                    py={2}
                    separator={<ChevronRightIcon color="gray.500" />}
                  >
                    <BreadcrumbItem>
                      <NextLink href="/" passHref>
                        <BreadcrumbLink as={Heading} size="sm">
                          <Translate content="Trang chủ" />
                        </BreadcrumbLink>
                      </NextLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem>
                      <NextLink href="#" passHref>
                        <BreadcrumbLink as={Heading} size="sm">
                          <Translate content="Bài viết" />
                        </BreadcrumbLink>
                      </NextLink>
                    </BreadcrumbItem>
                    {allPostHashtags?.map((category) => {
                      return (
                        <BreadcrumbItem key={category.id}>
                          <BreadcrumbLink as={Heading} size="sm">
                            {category.name}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      );
                    })}
                  </Breadcrumb>
                </Container>
              </Fragment>
            );
          }}
          where={{ url: hashtag }}
        />
      )}
      <Container maxW={"container.xl"} mt={4}>
        <SimpleGrid columns={4} gap={6} pb={10}>
          <GridItem colSpan={{ base: 4, md: 1 }}>
            <PostHashtagList
              UI={PostHashtagListSidebarTiki}
              variant="light"
              title="Bài viết"
            />
          </GridItem>
          <GridItem colSpan={{ base: 4, md: 2 }}>
            {hashtag && (
              <PostList
                first={4}
                UI={PostListSimple}
                PostWhereInput={{ hashtags_some: { url: hashtag } }}
              />
            )}
          </GridItem>
          <GridItem colSpan={{ base: 4, md: 1 }}>
            <PostList UI={PostListShort} hasImage={false} />
          </GridItem>
        </SimpleGrid>
      </Container>
    </Fragment>
  );
};

export default Categories;
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59",
  );
  const {
    query: { hashtag },
  } = context;
  return await executeServerSide(context, [
    {
      query: POST_HASHTAG_LIST_QUERY,
      variables: { first: 12, where: { url: hashtag } },
    },
    { query: BANNERS_QUERY, variables: {} },
    {
      query: POSTS_QUERY,
      variables: {
        first: 4,
        skip: 0,
        condition: { hashtags_some: { url: hashtag } },
      },
    },
    {
      query: POSTS_QUERY,
      variables: {
        first: 6,
        skip: 0,
      },
    },
  ]);
}
