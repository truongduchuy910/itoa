import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import PostItem, { POST_ITEM_QUERY } from "@itoa/ui/Post/Item";
import PostsChak from "@itoa/ui/Post/Item/Chak";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  GridItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import PostList, { POSTS_QUERY as POSTS_LIST_QUERY } from "@itoa/ui/Post/List";
import PostListShort from "@itoa/ui/Post/List/Short";
import { Fragment } from "react";
import PostHashtagList, {
  query as POST_HASHTAG_LIST_QUERY,
} from "@itoa/ui/Post/Hashtag/List";
import Translate from "@itoa/ui/Translate";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Card from "@itoa/ui/Card";
import { executeServerSide } from "@itoa/ui/UIProvider";
export default function Post() {
  const router = useRouter();
  const {
    query: { post, hashtag },
  } = router;
  return (
    <Fragment>
      <Box
        zIndex="dropdown"
        bg="white"
      >
        <Container maxW="container.xl" borderBottomWidth={1}>
          <PostHashtagList
            UI={({ allPostHashtags }) => {
              return (
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
                    <BreadcrumbLink as={Heading} size="sm">
                      <Translate content="Bài viết" />
                    </BreadcrumbLink>
                  </BreadcrumbItem>
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
              );
            }}
            where={{ url: hashtag }}
          />
        </Container>
      </Box>
      <Container maxW="container.xl" py={4}>
        <SimpleGrid columns={12} gap={6}>
          <GridItem colSpan={hashtag !== "_" ? { base: 12, lg: 8 } : 12}>
            {post && <PostItem UI={PostsChak} PostWhereInput={{ url: post }} />}
          </GridItem>
          {hashtag !== "_" && (
            <GridItem colSpan={{ base: 12, lg: 4 }}>
              <Card variant="light">
                <PostList
                  UI={PostListShort}
                  PostWhereInput={{
                    hashtags_some: { url: hashtag },
                    url_not: post,
                  }}
                />
              </Card>
            </GridItem>
          )}
          {/* <GridItem colSpan={{ base: 12 }}>
            <ProductList
              first={1}
              UI={ProductListSquare}
            />
          </GridItem> */}
        </SimpleGrid>
      </Container>
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59",
  );
  const {
    query: { hashtag, post },
  } = context;

  return await executeServerSide(context, [
    {
      query: POST_HASHTAG_LIST_QUERY,
      variables: { first: 12, where: { url: hashtag } },
    },
    {
      query: POST_ITEM_QUERY,
      variables: {
        condition: { url: post },
      },
    },
    {
      query: POSTS_LIST_QUERY,
      variables: {
        first: 6,
        skip: 0,
        condition: { hashtags_some: { url: hashtag }, url_not: post },
      },
    },
  ]);
}
