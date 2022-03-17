import { Container, Heading, SimpleGrid } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import PostList, { POSTS_QUERY } from "@itoa/ui/Post/List";
import {
  Badge,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  LinkOverlay,
  LinkBox,
  Link,
  // Skeleton,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import PostHashtagList from "@itoa/ui/Post/Hashtag/List";
import PageList from "@itoa/ui/Page/List";
import HeroSimpleCentered2 from "@itoa/ui/Hero/SimpleCentered2";
import GridTwo from "@itoa/ui/Grid/Two";
import Image from "next/image";
import { executeServerSide, getApolloState } from "../../ui/UIProvider";
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
function Block({ where }) {
  return (
    <PostList
      first={4}
      PostWhereInput={where}
      UI={({ allPosts = [] }) => {
        return (
          <GridTwo
            a={
              <Box
                w="full"
                h="full"
                pos="relative"
                rounded="md"
                overflow="hidden"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={allPosts?.[0]?.thumbnail?.publicUrl || "/assets/img/no-image.png"}
                />
              </Box>
            }
            c={
              <Box
                w="full"
                pos="relative"
                h="full"
                rounded="md"
                overflow="hidden"
              >
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={allPosts?.[3]?.thumbnail?.publicUrl || "/assets/img/no-image.png"}
                />
              </Box>
            }
            b={<PostUI post={allPosts?.[0]} />}
            d={<PostUI post={allPosts?.[1]} />}
            e={<PostUI post={allPosts?.[2]} />}
            f={<PostUI post={allPosts?.[3]} />}
          />
        );
      }}
    />
  );
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
          pos="sticky"
          top={{ base: "55px", md: "78px" }}
          mb={8}
        >
          <PostHashtagList
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
        <SimpleGrid columns={1} gap={6}>
          <PostHashtagList
            UI={({ allPostHashtags }) => {
              return allPostHashtags?.map((hashtag) => {
                return (
                  <Box key={hashtag.id}>
                    <NextLink href={`/bai-viet/${hashtag.url}`} passHref>
                      <Link>
                        <Heading variant="gradient-brand" pb={8}>
                          {hashtag.name}
                        </Heading>
                      </Link>
                    </NextLink>
                    <Block where={{ hashtags_some: { url: hashtag.url } }} />
                  </Box>
                );
              });
            }}
          />
        </SimpleGrid>
      </Container>
      <PageSEO />
    </Fragment>
  );
};

export default Categories;
function PageSEO() {
  return (
    <Head>
      <title>Bài viết | Yến Sào Đất Quảng</title>
    </Head>
  );
}
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59",
  );
  const result = await executeServerSide(context, []);
  const data = getApolloState(result.props);
  const { ROOT_QUERY } = data;
  const allPostHashtags =
    ROOT_QUERY['allPostHashtags({"first":12,"sortBy":"prioritize_DESC"})'];
  const queries = allPostHashtags.map((p) => {
    const h = data[p.__ref];
    return {
      query: POSTS_QUERY,
      variables: {
        condition: { hashtags_some: { url: h.url } },
        first: 4,
        skip: 0,
      },
    };
  });

  return await executeServerSide(context, queries);
}
