import NextLink from "next/link";
import dynamic from "next/dynamic";
import { Fragment, useMemo } from "react";
import Head from "next/head";
import PostList from "@itoa/ui/Post/List";
import {
  Heading,
  Box,
  Flex,
  HStack,
  Spacer,
  Center,
  Circle,
  Text,
  SimpleGrid,
  GridItem,
  Container,
  LinkBox,
  Img,
  LinkOverlay,
  Link,
} from "@chakra-ui/react";
import { BsClockFill } from "react-icons/bs";
import { ArrowRightIcon } from "@chakra-ui/icons";
import PageList from "@itoa/ui/Page/List";
import BannerList, { BANNERS_QUERY } from "@itoa/ui/Banner/List";
import CarouselSimple from "@itoa/ui/Carousel/Simple";
import ProductList, { PRODUCTS_QUERY } from "@itoa/ui/Product/List";

import ProductListSquare from "@itoa/ui/Product/List/NameButton";
//
import ProductCategoryListWithImage from "../ui/Product/Category/List/WithImage";
//
import ProductCategoryList, {
  PRODUCT_CATEGORIES_QUERY,
} from "@itoa/ui/Product/Category/List";
import {
  executeServerSide,
  getContextVar,
  initializeApollo,
} from "../ui/UIProvider";
import Translate from "../../T007/ui/Translate";
import FeatureList, { query as FEATURE_QUERY } from "@itoa/ui/Feature/List";
import FeatureListSimple from "@itoa/ui/Feature/List/Simple";
import Card from "@itoa/ui/Card";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import { useRouter } from "next/router";
import trans from "../ui/utils/trans";
import Field from "@itoa/ui/Field";
import {
  TestimonialListWithBubbles,
  TestimonialListQuery,
} from "@itoa/ui/Testimonial";
import PostHashtagList from "@itoa/ui/Post/Hashtag/List";

import { ServiceListQuery, ServiceListSideBySide } from "@itoa/ui/Service";
function FeatureUI({ data }) {
  if (!data) return "";
  return (
    <Box overflow="hidden">
      <Card
        my="40px"
        variant="gradient-brand"
        rounded={{ base: "md" }}
        overflow="hidden"
        shadow="xl"
      >
        <Box
          pos="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="-1"
          opacity=".15"
          overflow="hidden"
        >
          <Image
            src="/hoa-tiet.png"
            layout="fill"
            objectFit="cover"
            unoptimized
          />
        </Box>
        <HStack py={{ base: 4, md: 8 }}>
          <Circle
            borderWidth={6}
            p={4}
            ml={4}
            borderColor="white.500"
            display={{ base: "none", md: "block" }}
          >
            <Image
              width={50}
              height={50}
              objectFit="contain"
              src={data?.image?.publicUrl || "/assets/img/no-image.png"}
            />
          </Circle>
          <Center boxSize="full">
            <Field
              d="inline-block"
              strongProps={{ color: "white", fontSize: 30 }}
              pProps={{ color: "yellow.400", fontSize: 25 }}
              letterSpacing={4}
              fontWeight={400}
              fontFamily="Pacifico"
            >
              {data.description}
            </Field>
          </Center>
        </HStack>
      </Card>
    </Box>
  );
}

const Blog = (props) => {
  const { title, href, description, media, category } = props;
  return (
    <LinkBox
      as="article"
      bg={{ sm: "white" }}
      shadow={{ sm: "xl" }}
      rounded={{ sm: "md" }}
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ shadow: { sm: "md" } }}
    >
      <Flex direction="column">
        <Img height="60" objectFit="cover" alt={title} src={media} />
        <Flex direction="column" px={{ sm: "6" }} pt="5">
          <Text
            casing="uppercase"
            letterSpacing="wider"
            fontSize="xs"
            fontWeight="semibold"
            mb="2"
            color="gray.500"
          >
            {category}
          </Text>
          <Heading as="h3" size="sm" mb="2" lineHeight="base">
            <LinkOverlay href={href} color={"brand.500"}>
              {title}
            </LinkOverlay>
          </Heading>
          <Text noOfLines={2} mb="8" color={"gray.600"}>
            {description}
          </Text>
          <Flex
            align="baseline"
            justify="space-between"
            fontSize="sm"
            color={"gray.600"}
          ></Flex>
        </Flex>
      </Flex>
    </LinkBox>
  );
};

const FeaturedArticles = ({ hashtag }) => {
  return (
    <Box
      as="section"
      bg={"white"}
      // py={{ base: '10', sm: '24' }}
    >
      <Box
      // maxW={{ base: 'xl', md: '7xl' }}
      // mx="auto"
      // px={{ base: '6', md: '8' }}
      >
        <Box
          d="flex"
          justifyContent="space-between"
          borderBottomWidth="2px"
          borderColor="brand.600"
        >
          <Heading
            fontFamily="Pacifico"
            letterSpacing={2}
            fontWeight={400}
            pb={2}
            color={"brand.500"}
          >
            {hashtag.name}
          </Heading>
          <NextLink href={`bai-viet/${hashtag.url}`} passHref>
            <Text
              as="a"
              fontSize="sm"
              fontWeight="bold"
              pos="relative"
              pt="4"
              color={"brand.500"}
            >
              <Translate content="Xem thêm" />
              <ArrowRightIcon w="3" h="2" ml="1" pos="relative" bottom="0.5" />
            </Text>
          </NextLink>
        </Box>

        <SimpleGrid mt="3" columns={{ base: 1, md: 3 }} spacing="12" mb="10">
          <PostList
            first={3}
            PostWhereInput={{ hashtags_some: { id: hashtag.id } }}
            UI={({ allPosts }) => {
              return allPosts?.map((post) => (
                <NextLink href={`bai-viet/kien-thuc/${post.url}`} passHref>
                  <Blog
                    key={post.id}
                    category={post.hashtags?.[0].name}
                    media={post.thumbnail.publicUrl}
                    title={post.title}
                    description={post.description}
                    href="#"
                  />
                </NextLink>
              ));
            }}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default function Home() {
  const { locale } = useRouter();
  const { data = {} } = useQuery(FEATURE_QUERY, { variables: { locale } });
  var { allFeatures = [] } = useMemo(() => trans(data), [data]);
  return (
    <Container maxW="container.xl">
      <SimpleGrid columns={4}>
        <GridItem
          colSpan={{ md: 1, sm: 4 }}
          mt={3}
          display={{ base: "none", md: "block" }}
        >
          <ProductCategoryList
            size="sm"
            bgImage="/icon/008-star.svg"
            UI={ProductCategoryListWithImage}
            headerProps={{
              color: "brand.500",
              fontFamily: "Pacifico",
              fontWeight: 400,
            }}
            ProductCategoryWhereInput={{ parent_is_null: true }}
          />
        </GridItem>

        <GridItem colSpan={{ md: 3, base: 4 }} mt={3}>
          <BannerList UI={CarouselSimple} />
        </GridItem>
      </SimpleGrid>
      <FeatureList
        titleProps={{
          size: "sm",
          display: { base: "none", md: "block" },
          color: "white",
        }}
        cardProps={{
          d: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          shadow: "lg",
          variant: "gradient-brand",
          borderRadius: "5",
        }}
        UI={FeatureListSimple}
        columns={3}
        gap={5}
        mt={5}
      />
      <HStack
        variant="gradient-brand-bold"
        mt="10"
        mb={3}
        color="brand.500"
        borderBottomWidth="2px"
        borderColor="brand.600"
      >
        <Heading
          fontFamily="Pacifico"
          letterSpacing={2}
          fontWeight={400}
          pb={2}
          color={"brand.500"}
        >
          <Translate content="Ưa chuộng" />
        </Heading>
        <Spacer />
      </HStack>
      <ProductList
        ProductWhereInput={{ status: "hotDeal" }}
        first={4}
        UI={ProductListSquare}
        unit="¥"
        moreButton={false}
        withPrice={false}
        detailButton={true}
      />
      <ProductCategoryList
        ProductCategoryWhereInput={{ childs_every: { id: null } }}
        UI={({ allProductCategories }) => {
          return allProductCategories.map((category, i) => {
            return (
              <Box key={category.id} my="40px">
                <HStack
                  variant="gradient-brand-bold"
                  mt="10"
                  mb={3}
                  color="brand.500"
                  borderBottomWidth="2px"
                  borderColor="brand.600"
                >
                  <Heading
                    fontFamily="Pacifico"
                    letterSpacing={2}
                    fontWeight={400}
                    pb={2}
                    color={"brand.500"}
                  >
                    {category.name}
                  </Heading>
                  <Spacer />
                  <NextLink href={`/san-pham/${category.url}`} passHref>
                    <Text
                      as="a"
                      fontSize="sm"
                      fontWeight="bold"
                      pos="relative"
                      color={"brand.500"}
                    >
                      <Translate content="Xem thêm" />
                      <ArrowRightIcon
                        w="3"
                        h="2"
                        ml="1"
                        pos="relative"
                        bottom="0.5"
                      />
                    </Text>
                  </NextLink>
                </HStack>
                <ProductList
                  ProductCategoryWhereInput={{ id: category.id }}
                  first={4}
                  UI={ProductListSquare}
                  unit="¥"
                  withPrice={false}
                  detailButton={true}
                  moreButton={false}
                />
                {i % 2 == 0 && (
                  <FeatureUI data={allFeatures?.[Math.floor(i / 2)]} />
                )}
              </Box>
            );
          });
        }}
        title={"Sản phẩm"}
        variant="light"
      />
      <PostHashtagList
        where={{ pin: true }}
        UI={({ allPostHashtags }) => {
          return allPostHashtags.map((hashtag) => {
            return <FeaturedArticles hashtag={hashtag} />;
          });
        }}
      />
      {/* <ServiceListSideBySide />
      <TestimonialListWithBubbles first={3} /> */}
      <PageList UI={PageSEO} />
    </Container>
  );
}

function PageSEO({ loading, page }) {
  return loading ? (
    <Head>
      <title>loading...</title>
    </Head>
  ) : (
    <Head>
      <title>
        {page.store} - {page.slogan}
      </title>
      <meta
        name="description"
        content={
          page?.description || page?.intro || `${page?.store} - ${page?.slogan}`
        }
      />
      <meta name="theme-color" content={page.color} />
      {page.logo && (
        <link
          rel="icon"
          href={page?.logo?.publicUrl?.replace("/img", "/img/sm")}
        />
      )}
    </Head>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59"
  );

  const { locale, domain } = getContextVar(context);
  // QUERY HASHTAG ID
  const client = initializeApollo(null, { locale, domain });
  const { data = {} } = await client.query({
    query: PRODUCT_CATEGORIES_QUERY,
    variables: {
      first: 12,
      skip: 0,
      condition: {
        childs_every: {
          id: null,
        },
      },
    },
  });
  const { allProductCategories = [] } = data;
  const products = allProductCategories.map((category) => {
    return {
      query: PRODUCTS_QUERY,
      variables: { category: { id: category.id } },
    };
  });
  return await executeServerSide(context, [
    ...products,
    {
      query: PRODUCT_CATEGORIES_QUERY,
      variables: {
        first: 12,
        skip: 0,
        condition: {
          parent_is_null: true,
        },
        locale: "vi",
      },
    },
    {
      query: PRODUCTS_QUERY,
      variables: {
        first: 4,
        skip: 0,
        condition: {},
        category: {},
        locale: "vi",
      },
    },
    { query: FEATURE_QUERY, variables: { first: 12 } },
    { query: FEATURE_QUERY },
    { query: TestimonialListQuery, variables: { first: 3 } },
    { query: ServiceListQuery, variables: { first: 12 } },
    { query: BANNERS_QUERY, variables: { first: 12 } },
  ]);
}
//
