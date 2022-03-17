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
  Skeleton,
  chakra,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import Image from "next/image";
import Field from "@itoa/ui/Field";
import NextLink from "next/link";
export default function PostListSimple({
  allPosts,
  _allPostsMeta,
  loading,
  onClickPost,
  onClickMore,
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
              <LinkBox h="full">
                <Stack direction={{ base: "column", md: "row" }}>
                  <Box
                    borderRadius="lg"
                    minH={200}
                    minW={300}
                    h="full"
                    pos="relative"
                    rounded="md"
                    overflow="hidden"
                    mb={2}
                  >
                    <Image
                      src={post?.thumbnail?.publicUrl || "/assets/img/no-image.png"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                  <Box ml={{ md: 4 }}>
                    <NextLink
                      href={`/bai-viet/${hashtag.url}/${post.url}`}
                      passHref
                    >
                      <LinkOverlay>
                        <Heading variant="gradient-brand" size="md" p={1}>
                          {post.title}
                        </Heading>
                      </LinkOverlay>
                    </NextLink>
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

                    <Text mt={2} color="gray.500" textAlign="justify">
                      {post?.description?.slice(0, 80)}
                      <chakra.span
                        bgClip="text"
                        bgGradient="linear(to-l, gray.100, gray.500)"
                      >
                        {post?.description?.slice(80, 140)}
                      </chakra.span>
                    </Text>
                  </Box>
                </Stack>
                {/* <Stack key={post.id + i} gap={2} mb={5}>
                <Heading
                  fontSize={{ base: "8px", md: "10px", lg: "14px" }}
                  textAlign="justify"
                >
                  {post.title}
                </Heading>
                <HStack>
                  <Box
                    pos="relative"
                    minH={100}
                    rounded="md"
                    overflow="hidden"
                    minW={100}
                    mr={3}
                  >
                    <Image
                      src={post?.thumbnail?.publicUrl || "/assets/img/no-image.png"}
                      layout="fill"
                      objectFit="cover"
                    />
                  </Box>
                  <Box>
                    <Text
                      textAlign="justify"
                      size={{ base: "xs", sm: "sm" }}
                      fontStyle="italic"
                    >
                      <Field>{post.description}</Field>
                    </Text>
                    <Text color="gray">
                      {post.createdBy.name} -{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </Text>
                  </Box>
                </HStack>
                <Divider />
              </Stack> */}
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
