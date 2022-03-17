import {
  Box,
  Divider,
  Heading,
  HStack,
  Stack,
  Link,
  Text,
  VStack,
  SimpleGrid,
  GridItem,
  chakra,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import Image from "next/image";
import Field from "@itoa/ui/Field";
import NextLink from "next/link";
import Card from "../../Card";
export default function PostListShort({
  allPosts,
  _allPostsMeta,
  loading,
  onClickPost,
  onClickMore,
  hasImage = true,
  variant,
  ...props
}) {
  return (
    <Card variant={variant}>
      <SimpleGrid gap={4}>
        {allPosts?.map((post = {}, i) => {
          const { hashtags = [] } = post;
          const [hashtag] = hashtags;
          return (
            <GridItem key={post.url + i}>
              <LinkBox as="article">
                <NextLink
                  href={`/bai-viet/${hashtag.url}/${post.url}`}
                  passHref
                >
                  <LinkOverlay>
                    <Heading
                      textAlign="justify"
                      mt={1}
                      display="block"
                      fontSize="sm"
                      lineHeight="normal"
                      fontWeight="semibold"
                      textTransform="uppercase"
                      w="full"
                      mb={2}
                    >
                      {post.title}
                    </Heading>
                  </LinkOverlay>
                </NextLink>

                <Box display={{ md: "flex" }} mb={3}>
                  {hasImage && (
                    <Box
                      flexShrink={0}
                      w={{ md: 0, lg: "35%" }}
                      pr={{ md: 0, lg: 4 }}
                    >
                      <Box
                        borderRadius="lg"
                        w="full"
                        pos="relative"
                        h="full"
                        rounded="md"
                        overflow="hidden"
                      >
                        <Image
                          src={post?.thumbnail?.publicUrl || "/assets/img/no-image.png"}
                          layout="fill"
                          objectFit="cover"
                        />
                      </Box>
                    </Box>
                  )}
                  <Box mt={{ base: 4, md: 0 }}>
                    <Text color="gray.500" textAlign="justify" size="xs">
                      {post?.description?.slice(0, 50)}
                      <chakra.span
                        bgClip="text"
                        bgGradient="linear(to-l, gray.50, gray.500)"
                      >
                        {post?.description?.slice(50, 80)}
                      </chakra.span>
                    </Text>
                    <Text
                      fontWeight="bold"
                      textTransform="uppercase"
                      fontSize="sm"
                      letterSpacing="wide"
                      color="gray.500"
                    >
                      {hashtags?.map((hashtag) => {
                        return (
                          <chakra.span key={hashtag.id} mr={2}>
                            {" "}
                            {hashtag.name}
                          </chakra.span>
                        );
                      })}
                    </Text>
                  </Box>
                </Box>
                <Divider />
              </LinkBox>
            </GridItem>
          );
        })}
      </SimpleGrid>
    </Card>
  );
}
