import {
  GridItem,
  Text,
  SimpleGrid,
  chakra,
  Badge,
  Flex,
  Spacer,
  Box,
  Heading,
  Icon,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { AiOutlineShop } from "react-icons/ai";
import { IoNewspaperOutline } from "react-icons/io5";

import NextLink from "next/link";
import Field from "@itoa/ui/Field";
import Translate from "@itoa/ui/Translate";
function Item({ post }) {
  const { hashtags = [] } = post;
  const [hashtag] = hashtags;
  return (
    <GridItem as={LinkBox}>
      <Flex>
        <Box>
          <IoNewspaperOutline style={{ display: "inline-block", marginLeft: -3 }} />
          <Translate
            as={Text}
            mx={2}
            display="inline-block"
            color="gray.600"
            fontSize="xs"
            fontStyle="italic"
            content="Bài viết"
          />
          <Text fontSize="xs" display="inline-block">
            {hashtag.name}
          </Text>
          <NextLink href={`/bai-viet/${hashtag.url}/${post.url}`} passHref>
            <LinkOverlay>
              <Heading size="xs" variant="gradient-brand">
                {post.title}
              </Heading>
            </LinkOverlay>
          </NextLink>
        </Box>
        <Spacer />

        <Box>
          {/* <Badge mr={2} variant="subtle" size="sm">
            <Field>{post.price}</Field>
          </Badge> */}
        </Box>
      </Flex>
    </GridItem>
  );
}
export default function PostListSearch({ allPosts }) {
  return (
    <SimpleGrid gap={1} pb={4}>
      {allPosts?.map((post) => (
        <Item post={post} />
      ))}
    </SimpleGrid>
  );
}
