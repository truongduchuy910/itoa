import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
  Center,
  Link,
  HStack,
  Divider,
  Heading,
} from "@chakra-ui/react";

import NextLink from "next/link";
import { FacebookProvider, Page, CustomChat } from "react-facebook";
import Image from "next/image";
import LogoBrandV from "../Logo/BrandV";
import CopyrightSimple from "@itoa/ui/Copyright/Simple";
import PageItemSocial from "../Page/Item/Social";
import Field from "@itoa/ui/Field";
import Translate from "@itoa/ui/Translate";
import ProductCategoryList from "../Product/Category/List";
import PostHashtagList from "@itoa/ui/Post/Hashtag/List";
import Card from "../Card";

const ListHeader = (props) => {
  return <Text {...props} fontWeight={"500"} fontSize={"lg"} mb={2} />;
};

export default function LargeWithLogoSocialCenteredDark({
  allPages,
  _allPagesMeta,
  action,
  page,
  allProductCategories,
  allPostHashtags,
  bgUrl,
  chat,
}) {
  return (
    <Card variant="gradient-brand" color="white" py={8} mt={10} rounded="none">
      <Box
        pos="absolute"
        w="50vw"
        h="50vh"
        zIndex="1"
        bottom="0"
        right="0"
        opacity=".2"
      >
        <Image unoptimized src="/ja.png" layout="fill" objectFit="contain" />
      </Box>
      <Container as={Stack} maxW={"container.xl"}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader as="div">
              <Heading size="md" variant="white">
                {page.store}
              </Heading>
            </ListHeader>
            <Text>{page.slogan}</Text>
            <Field>{page.address}</Field>
            <Text>{page.email}</Text>

            {action({ page })}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>
              <Translate
                content="Sản phẩm"
                as={Heading}
                variant="white"
                size="sm"
              />
            </ListHeader>
            <ProductCategoryList
              UI={({ allProductCategories }) =>
                allProductCategories?.map((category, index) => {
                  return (
                    <NextLink
                      key={category.id + index}
                      href={`/san-pham/${category.url}`}
                      passHref
                    >
                      <Link>{category.name}</Link>
                    </NextLink>
                  );
                })
              }
            />

            {/* <Stack direction={"row"} align={"center"} spacing={2}>
              <Link href={"#"}>hot deal</Link>
              <Tag
                size={"sm"}
                bg={useColorModeValue("green.300", "green.800")}
                ml={2}
                color={"white"}
              >
                New
              </Tag>
            </Stack> */}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader as="div">
              <Translate
                as={Heading}
                content="Bài viết"
                size="sm"
                variant="white"
              />
            </ListHeader>
            <PostHashtagList
              UI={({ allPostHashtags }) =>
                allPostHashtags?.map((hashtag) => {
                  return (
                    <NextLink
                      key={hashtag.id}
                      href={`/bai-viet/${hashtag.url}`}
                      passHref
                    >
                      <Link>{hashtag.name}</Link>
                    </NextLink>
                  );
                })
              }
            />
          </Stack>
          <Stack align={"flex-start"} w="full" overflow="hidden">
            <ListHeader as="div">
              <Heading size="sm" variant="white">
                <Translate content="Liên hệ" />
              </Heading>
            </ListHeader>
            <FacebookProvider appId="145518257438217">
              {chat && page.pageId ? (
                <CustomChat pageId={page.pageId} minimized={true} />
              ) : null}
              {page.pageId ? (
                <Page href={`https://www.facebook.com/${page.pageId}`} />
              ) : null}
            </FacebookProvider>
            <Center py={2} mt={4}>
              <PageItemSocial page={page} />
            </Center>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={"center"}
          _before={{
            content: '""',
            // borderBottom: "1px solid",
            borderColor: "gray.700",
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            // borderBottom: "1px solid",
            borderColor: "gray.700",
            flexGrow: 1,
            ml: 8,
          }}
        >
          <LogoBrandV src={page?.logo?.publicUrl} name={page?.store} w={100} />
        </Flex>
        <CopyrightSimple />
      </Box>
    </Card>
  );
}
