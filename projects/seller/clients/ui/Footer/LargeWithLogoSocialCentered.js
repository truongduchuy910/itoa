import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  useColorModeValue,
  Center,
  Link,
  Heading,
} from "@chakra-ui/react";

import NextLink from "next/link";
import { FacebookProvider, Page, CustomChat } from "react-facebook";

import LogoBrandV from "../Logo/BrandV";
import CopyrightSimple from "@itoa/ui/Copyright/Simple";
import PageItemSocial from "../Page/Item/Social";
import Field from "@itoa/ui/Field";
import Translate from "@itoa/ui/Translate";
import ProductCategoryList from "../Product/Category/List";
import PostHashtagList from "@itoa/ui/Post/Hashtag/List";

const ListHeader = (props) => {
  return <Text {...props} fontWeight={"500"} fontSize={"lg"} mb={2} />;
};

export default function LargeWithLogoSocialCentered({
  allPages,
  _allPagesMeta,
  action,
  page,
  allProductCategories,
  allPostHashtags,
}) {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"container.xl"} py={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <Stack align={"flex-start"}>
            <ListHeader as="div">
              <Heading size="md" variant="gradient-brand">
                {page.store}
              </Heading>
            </ListHeader>
            <Text>{page.slogan}</Text>
            <Field>{page.address}</Field>
            <Text>{page.email}</Text>

            {action({ page })}
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader as="div">
              <Translate
                as={Heading}
                content="Sản phẩm"
                variant="gradient-brand"
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
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader as="div">
              <Translate
                as={Heading}
                content="Bài viết"
                size="sm"
                variant="gradient-brand"
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
              <Heading size="sm" variant="gradient-brand">
                <Translate content="Liên hệ" />
              </Heading>
            </ListHeader>
            <FacebookProvider appId="145518257438217">
              {page.pageId ? (
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
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: "1px solid",
            borderColor: useColorModeValue("gray.200", "gray.700"),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <LogoBrandV src={page?.logo?.publicUrl} name={page?.store} w={100} />
        </Flex>
        <CopyrightSimple />
      </Box>
    </Box>
  );
}
