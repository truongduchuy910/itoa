import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Center,
  GridItem,
  Link,
  HStack,
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
import { GoLocation } from "react-icons/go";
import {
  AiOutlineInfoCircle,
  AiOutlineMail,
  AiOutlineContacts,
} from "react-icons/ai";
const ListHeader = (props) => {
  return <Text {...props} fontWeight={"500"} fontSize={"lg"} mb={2} />;
};

export default function FooterJapan({
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
    <Card variant="gradient-brand" color="white" py={8} mt={20} rounded="none">
      <Box
        pos="absolute"
        w="50vw"
        h="100%"
        zIndex="-1"
        bottom="0"
        right="0"
        opacity=".2"
      >
        <Image unoptimized src="/ja.png" layout="fill" objectFit="contain" />
      </Box>
      <Container as={Stack} maxW={"container.xl"}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
          <GridItem colSpan={1}>
            <Card>
              <Stack align={"flex-start"}>
                <Heading size="sm" variant="white" mb={2}>
                  {page.store}
                </Heading>

                <HStack>
                  <GoLocation />
                  <Field>{page.address}</Field>
                </HStack>
                <HStack>
                  <AiOutlineInfoCircle />
                  <Field>{page.intro}</Field>
                </HStack>
                <HStack>
                  <AiOutlineMail />
                  <Text>{page.email}</Text>
                </HStack>
                <HStack>
                  <AiOutlineContacts />
                  <Field>{page.contact}</Field>
                </HStack>
                <Box>{action({ page })}</Box>
              </Stack>
            </Card>
          </GridItem>
          <GridItem colSpan={1}>
            <Stack align={"flex-start"}>
              <ListHeader as="div">
                {
                  <Translate
                    as={Heading}
                    content="Trang chủ"
                    size="sm"
                    variant="white"
                  />
                }
              </ListHeader>
              {page &&
                page.company?.map((post) => {
                  return (
                    <NextLink
                      key={post.id}
                      href={`/bai-viet/_/${post.url}`}
                      passHref
                    >
                      <Link>{post.title}</Link>
                    </NextLink>
                  );
                })}
            </Stack>
          </GridItem>
          <GridItem colSpan={1}>
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
                ProductCategoryWhereInput={{ parent_is_null: true }}
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
          </GridItem>
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
                <Page
                  href={`https://www.facebook.com/${page.pageId}`}
                  // tabs="timeline"
                />
              ) : null}
            </FacebookProvider>
            <Center py={2} mt={4}>
              <PageItemSocial page={page} />
            </Center>
          </Stack>
        </SimpleGrid>
      </Container>
      {/* <CopyrightSimple /> */}
    </Card>
  );
}
