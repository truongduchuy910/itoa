import { useRouter } from "next/router";
import Field from "@itoa/ui/Field";
import Card from "../../Card";
import {
  Divider,
  Heading,
  HStack,
  Box,
  Stack,
  Link,
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  Skeleton,
  chakra,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import Share from "@itoa/ui/Social/Share";
import ShareSimple from "@itoa/ui/Social/Share/Simple";

export default function PostItemChak({ post, objectFit }) {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  return post.title ? (
    <section>
      <Card textAlign="justify" variant="dark">
        <PostListSimple allPosts={[post]} mb={6} objectFit={objectFit} />
        <Field>{post?.content || post?.body}</Field>
      </Card>
    </section>
  ) : (
    <Skeleton />
  );
}

//
function PostListSimple({
  allPosts,
  _allPostsMeta,
  loading,
  onClickPost,
  onClickMore,
  objectFit = "cover",
  ...props
}) {
  return (
    <SimpleGrid gap={4} {...props}>
      {!loading ? (
        allPosts?.map((post = {}, i) => {
          const { hashtags = [] } = post;
          const [hashtag = {}] = hashtags;
          return (
            <GridItem key={post.id + i}>
              <LinkBox>
                <Box display={{ base: "block", md: "flex" }}>
                  <Box flexShrink={0} minW={{ base: "100%", md: "40%" }}>
                    <Box
                      borderRadius="lg"
                      minH="150px"
                      h="full"
                      pos="relative"
                      rounded="md"
                      overflow="hidden"
                      mb={2}
                    >
                      <Image
                        src={post?.thumbnail?.publicUrl || "/assets/img/no-image.png"}
                        layout="fill"
                        objectFit={objectFit}
                      />
                    </Box>
                  </Box>
                  <Box ml={{ md: 4 }}>
                    <NextLink
                      href={`/bai-viet/${hashtag.url}/${post.url}`}
                      passHref
                    >
                      <LinkOverlay>
                        <Heading variant="gradient-brand" size="xl" p={1}>
                          {post.title}
                        </Heading>
                      </LinkOverlay>
                    </NextLink>
                    <Field as={Text} color="gray.500">
                      {post?.description}
                    </Field>
                    <Share
                      UI={ShareSimple}
                      url={post.url}
                      src={post?.thumbnail?.publicUrl || "/assets/img/no-image.png"}
                    />
                    <Text
                      fontWeight="bold"
                      textTransform="uppercase"
                      fontSize="sm"
                      letterSpacing="wide"
                      color="gray.500"
                    >
                      {hashtags?.map((hashtag) => {
                        return (
                          <chakra.span key={hashtag.id} mr={2} size="xs">
                            {hashtag.name}
                          </chakra.span>
                        );
                      })}
                    </Text>
                  </Box>
                </Box>
              </LinkBox>
            </GridItem>
          );
        })
      ) : (
        <Skeleton h="50vh" w="full" />
      )}
    </SimpleGrid>
  );
}
