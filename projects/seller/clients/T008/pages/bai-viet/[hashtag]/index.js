import { Container, Heading } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import Translate from "@itoa/ui/Translate";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
  GridItem,
  SimpleGrid,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import PostHashtagList from "@itoa/ui/Post/Hashtag/List";
import PostHashtagListSidebarTiki from "@itoa/ui/Post/Hashtag/List/SidebarTiki";
import PostList from "@itoa/ui/Post/List";
import PostListSimple from "@itoa/ui/Post/List/Simple";
import PostListShort from "@itoa/ui/Post/List/Short";
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
                  pos="sticky"
                  top={{ base: "56px", md: "78px" }}
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
                      <NextLink href={`/bai-viet`} passHref>
                        <BreadcrumbLink as={Heading} size="sm">
                          <Translate content="Bài viết" />
                        </BreadcrumbLink>
                      </NextLink>
                    </BreadcrumbItem>
                    {allPostHashtags?.map((category) => {
                      return (
                        <BreadcrumbItem key={category.id}>
                          <NextLink href="/bai-viet" passHref>
                            <BreadcrumbLink as={Heading} size="sm">
                              {category.name}
                            </BreadcrumbLink>
                          </NextLink>
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
            <Box pos="sticky" top="135px">
              <PostHashtagList
                UI={PostHashtagListSidebarTiki}
                variant="light"
                title="Bài viết"
              />
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 4, md: 2 }}>
            {hashtag && (
              <PostList
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
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59",
  );

  return {
    props: {},
  };
}
