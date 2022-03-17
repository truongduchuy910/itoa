import React from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  HStack,
  Tag,
  useColorModeValue,
  Container,
  Button,
} from "@chakra-ui/react";

import { ArrowDownIcon } from "@chakra-ui/icons";
import {
  FacebookIcon,
  FacebookShareButton,
  PinterestIcon,
  PinterestShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";

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
  onClickPost = (post) => {},
  onClickMore = () => {},
}) => {
  return (
    <Container maxW={"7xl"} p="12">
      {allPosts?.map((post, index) => {
        return (
          <Box
            key={post?.id}
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
                <Link
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                  onClick={() => {
                    onClickPost(post);
                  }}
                >
                  <Image
                    borderRadius="lg"
                    src={encodeURI(post?.thumbnail?.publicUrl)}
                    alt={post?.title}
                    objectFit="contain"
                  />
                </Link>
              </Box>
              <Box zIndex="1" width="100%" position="absolute" height="100%">
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
              <Heading marginTop="1">
                <Link
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                  onClick={() => {
                    onClickPost(post);
                  }}
                >
                  {post?.title}
                </Link>
              </Heading>
              <Text as="p" marginTop="2" fontSize="lg">
                {post?.description}
              </Text>
              <BlogAuthor
                name={post?.createdBy?.name}
                date={new Date(post?.createdAt)}
              />
              <HStack mt={3}>
                <FacebookShareButton
                  children={<FacebookIcon size={24} />}
                  url={window.location.host + "/" + post?.url}
                />
                <TwitterShareButton
                  children={<TwitterIcon size={24} />}
                  url={window.location.host + "/" + post?.url}
                />
                <PinterestShareButton
                  children={<PinterestIcon size={24} />}
                  url={window.location.host + "/" + post?.url}
                  media={
                    window.location.host +
                    "/" +
                    encodeURI(post?.image?.publicUrl)
                  }
                />
              </HStack>
            </Box>
          </Box>
        );
      })}
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
    </Container>
  );
};

export default ArticleList;
