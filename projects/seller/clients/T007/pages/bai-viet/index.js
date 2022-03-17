import { Container, Heading, SimpleGrid } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import PostList, { POSTS_QUERY } from "@itoa/ui/Post/List";
import PostListSimple from "@itoa/ui/Post/List/Simple";
import { BANNERS_QUERY } from "@itoa/ui/Banner/List";
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  LinkOverlay,
  LinkBox,

  // Skeleton,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import PostHashtagList, {
  query as POST_HASHTAG_LIST_QUERY,
} from "@itoa/ui/Post/Hashtag/List";
import PageList from "@itoa/ui/Page/List";
import HeroSimpleCentered2 from "@itoa/ui/Hero/SimpleCentered2";
import GridTwo from "@itoa/ui/Grid/Two";
import Image from "next/image";
import { executeServerSide, getApolloState } from "../../ui/UIProvider";
import Translate from "@itoa/ui/Translate";
export function PostUI({ post = {} }) {
  const [_h = {}] = post?.hashtags || [];
  if (!post.title) return <Box w="full" h="full" />;
  return (
    <Box p={4}>
      <LinkBox>
        <NextLink href={`/bai-viet/${_h.url || "_"}/${post.url}`} passHref>
          <LinkOverlay>
            <Heading
              size="md"
              mt={2}
              textAlign="justify"
              variant="gradient-brand"
            >
              {post.title}
            </Heading>
          </LinkOverlay>
        </NextLink>
        <Text textAlign="justify" color="gray.600">
          {post?.description?.slice(0, 120)}
          <Text
            as="span"
            bgClip="text"
            bgGradient="linear(to-l, gray.50, gray.600)"
          >
            {post?.description?.slice(120, 180)}
          </Text>
        </Text>
      </LinkBox>
      {post?.hashtags?.map((hashtag) => {
        return (
          <Badge key={hashtag.id} p={1} mr={2}>
            {hashtag.name}
          </Badge>
        );
      })}
    </Box>
  );
}
export function Block({ where }) {
  return <PostList first={4} PostWhereInput={where} UI={PostListSimple} />;
}
const Categories = ({ withBreadcrumb = true }) => {
  const router = useRouter();
  const {
    query: { hashtag },
  } = router;

  return (
    <Fragment>
      <Container maxW={"container.xl"}>
        <PageList UI={HeroSimpleCentered2} py={4} />
      </Container>
      {withBreadcrumb && (
        <Box
          zIndex="dropdown"
          mb={8}
        >
          <PostHashtagList
            where={{ url: hashtag }}
            UI={({ allPostHashtags }) => {
              return (
                <Container
                  maxW="container.xl"
                  overflowX="hidden"
                  borderBottomWidth={1}
                  py={2}
                  bg="white"
                >
                  <Breadcrumb spacing="8px" separator={"-"}>
                    {allPostHashtags?.map((category) => {
                      return (
                        <BreadcrumbItem key={category.id}>
                          <NextLink href={`/bai-viet/${category.url}`} passHref>
                            <BreadcrumbLink as={Heading} size="sm">
                              {category.name}
                            </BreadcrumbLink>
                          </NextLink>
                        </BreadcrumbItem>
                      );
                    })}
                  </Breadcrumb>
                </Container>
              );
            }}
          />
        </Box>
      )}
      <Container maxW={"container.xl"}>
        {/* <Block /> */}
      </Container>
      <PageSEO />
    </Fragment>
  );
};

export default Categories;
function PageSEO() {
  return (
    <Head>
      <title>
        <Translate content="Bài viết" /> | Japan Apple
      </title>
    </Head>
  );
}
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
      variables: { first: 12, where: {} },
    },
    { query: BANNERS_QUERY, variables: {} },
    {
      query: POSTS_QUERY,
      variables: {
        first: 4,
        skip: 0,
      },
    },
  ]);
}
