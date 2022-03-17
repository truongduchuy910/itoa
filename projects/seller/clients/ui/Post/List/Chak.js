import React from "react";
import {
  Box,
  Heading,
  Link,
  Text,
  HStack,
  Tag,
  useColorModeValue,
  Container,
  Button,
  VStack,
  Center,
} from "@chakra-ui/react";
import Image from "next/image";
import Share from "@itoa/ui/Social/Share";
import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import NextLink from "next/link";
import { Fragment } from "react";
import Field from "@itoa/ui/Field";
const BlogTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      {/* <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      /> */}
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

export const ArticleList = ({
  allPosts,
  _allPostsMeta,
  loading,
  onClickMore = () => {},
}) => {
  return (
    <Fragment>
      {allPosts?.map((post, index) => {
        const { hashtags = [] } = post;
        const [hashtag = {}] = hashtags;
        const href = `/bai-viet/${hashtag?.url || "_"}/${post.url}`;
        return (
          <NextLink href={href} key={post?.id}>
            <Link>
              <Box
                marginTop={{ base: "1", sm: "5" }}
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  flex="1"
                  marginRight="3"
                  position="relative"
                  alignItems="center"
                >
                  <Box
                    width={{ base: "100%", sm: "85%" }}
                    zIndex="2"
                    marginLeft={{ base: "0", sm: "5%" }}
                    marginTop="5%"
                  >
                    <Box
                      rounded="md"
                      overflow="hidden"
                      pos="relative"
                      w="full"
                      h={300}
                    >
                      <Image
                        src={post?.thumbnail?.publicUrl || "/assets/img/no-image.png"}
                        alt={post?.title}
                        layout="fill"
                        objectFit="cover"
                      />
                    </Box>
                  </Box>
                  <Box
                    zIndex="1"
                    width="100%"
                    position="absolute"
                    height="100%"
                  >
                    <Box
                      bgGradient={useColorModeValue(
                        "radial(orange.600 1px, transparent 1px)",
                        "radial(orange.300 1px, transparent 1px)",
                      )}
                      backgroundSize="20px 20px"
                      opacity="0.4"
                      height="100%"
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent="center"
                  marginTop={{ base: "3", sm: "0" }}
                >
                  {/* <BlogTags tags={["Engineering", "Product"]} /> */}
                  <Heading size="md">{post?.title}</Heading>
                  <Box marginTop="2" fontSize="lg">
                    <Field>{post?.description}</Field>
                  </Box>
                  {post?.createdBy && (
                    <BlogAuthor
                      name={post?.createdBy?.name}
                      date={new Date(post?.createdAt)}
                    />
                  )}
                  <Share url={href} src={post.thumbnail?.publicUrl} />
                </Box>
              </Box>
            </Link>
          </NextLink>
        );
      })}
      <Center>
        {allPosts?.length < _allPostsMeta?.count && (
          <Button
            isLoading={loading}
            my={24}
            rightIcon={<ArrowDownIcon />}
            colorScheme="teal"
            variant="outline"
            onClick={() => onClickMore()}
          >
            Xem thêm
          </Button>
        )}
      </Center>
    </Fragment>
  );
};

export default ArticleList;
