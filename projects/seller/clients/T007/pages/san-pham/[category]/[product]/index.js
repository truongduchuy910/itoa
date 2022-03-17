import ProductItem, { QUERY_PRODUCT } from "@itoa/ui/Product/Item/index";
import Image from "next/image";
import {
  Box,
  Container,
  Divider,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";
import FAQ, { FAQS_QUERY } from "@itoa/ui/FAQ";
import FAQSimple from "@itoa/ui/FAQ/Simple";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
  useToast,
} from "@chakra-ui/react";
// import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import dynamic from "next/dynamic";
import { PRODUCTS_QUERY } from "@itoa/ui/Product/List";
import ProductAttributeListSimple from "@itoa/ui/Product/Attribute/List/Simple";
import { useRouter } from "next/router";
import Field from "@itoa/ui/Field";
import SmallGallery from "@itoa/ui/Image/SmallGallery";
import Translate from "@itoa/ui/Translate";
import { executeServerSide } from "@itoa/ui/UIProvider";
import ProductCategoryList, {
  PRODUCT_CATEGORIES_QUERY,
} from "@itoa/ui/Product/Category/List";
import { Fragment } from "react";
import Head from "next/head";
const ProductListSquare = dynamic(() => import("@itoa/ui/Product/List/Square"));
/**
 * @param {Promise} addToCart
 */
const ProductItemSimple = ({
  product,
  stock,
  quantity,
  total,
  quickview,
  //
  clickPlus = (e) => {},
  clickMinus = (e) => {},
  addToCart = (e) => {},
  onChangeAttributeValues,
  category,
}) => {
  const {
    id,
    image,
    images,
    name,
    price,
    sale,

    brand,
    categories,

    description,
    detail,
    guide,
    url,
    attributes,
    stocks,
    _stocksMeta,
  } = product;

  const toast = useToast();
  const onToast = (content) =>
    toast({
      render: () => {
        return (
          <div
            style={{
              backgroundColor: `rgba(0,0,0,0.8)`,
              padding: 13,
              color: `#fff`,
              borderRadius: 5,
              textAlign: "center",
            }}
          >
            {content}
          </div>
        );
      },
    });
  const row = useBreakpointValue({
    base: "repeat(2, 1fr)",
    md: "repeat(4, 1fr)",
  });
  return (
    <Container maxW={"container.xl"}>
      <ProductCategoryList
        first={1}
        ProductCategoryWhereInput={{ url: category }}
        UI={({ allProductCategories }) => {
          return (
            <Breadcrumb
              spacing="8px"
              px={2}
              mb={4}
              mt={3}
              separator={<ChevronRightIcon color="gray.500" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={Heading} size="sm">
                  <Translate content="Trang chủ" />
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink as={Heading} size="sm">
                  <Translate content="Sản phẩm" />
                </BreadcrumbLink>
              </BreadcrumbItem>
              {allProductCategories?.map((c) => {
                return (
                  <BreadcrumbItem key={c.id}>
                    <NextLink href={`/san-pham/${c.url}`} passHref>
                      <BreadcrumbLink as={Heading} size="sm">
                        {c.name}
                      </BreadcrumbLink>
                    </NextLink>
                  </BreadcrumbItem>
                );
              })}
            </Breadcrumb>
          );
        }}
      />
      <SimpleGrid columns={{ base: 1, md: 2 }}>
        <SmallGallery
          srcs={[
            image?.publicUrl,
            ...images.map((img) => img?.file?.publicUrl),
          ]}
          objectFit="contain"
        />
        <Grid
          templateRows="repeat(6, 1fr)"
          templateColumns="repeat(6, 1fr)"
          gap={4}
        >
          <GridItem
            colSpan={{ base: 12, md: 6 }}
            rowSpan={1}
            px={3}
            display="flex"
            alignItems="center"
          >
            <Heading size={"2xl"} variant="gradient-brand">
              {name}
            </Heading>
          </GridItem>

          <GridItem colSpan={{ base: 3, md: 2 }} rowSpan={1} p={4}>
            <Box>
              <Translate as={Heading} content="Sản phẩm" size="sm" />
              <Text>
                {categories?.map((category) => category.name).join(", ")}
              </Text>
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 3, md: 2 }} rowSpan={1} p={4}>
            {brand?.name && (
              <Box>
                <Translate as={Heading} content="Thương hiệu" size="sm" />
                <Text>{brand?.name}</Text>
              </Box>
            )}
          </GridItem>
          <GridItem colSpan={{ base: 12, md: 6 }} rowSpan={10}>
            <Box>
              <Tabs colorScheme="brand">
                <TabList>
                  <Tab>
                    <Translate size="sm" as={Heading} content="Mô tả" />
                  </Tab>
                  {detail?.publicUrl && (
                    <Tab>
                      <Translate size="sm" as={Heading} content="Chi tiết" />
                    </Tab>
                  )}
                  <Tab>
                    <Translate size="sm" as={Heading} content="Hướng dẫn" />
                  </Tab>
                  <Tab>
                    <Translate size="sm" as={Heading} content="Câu hỏi" />
                  </Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <Field>{description}</Field>
                  </TabPanel>
                  {detail?.publicUrl && (
                    <TabPanel>
                      <Image
                        width={1920}
                        height={1920}
                        src={detail?.publicUrl}
                        objectFit="cover"
                      />
                    </TabPanel>
                  )}

                  <TabPanel>
                    <Field>{guide}</Field>
                  </TabPanel>
                  <TabPanel>
                    <FAQ UI={FAQSimple} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>
          <GridItem colSpan={{ base: 6, md: 4 }} rowSpan={2} p={4}>
            <ProductAttributeListSimple
              allProductAttributes={attributes}
              onChange={onChangeAttributeValues}
            />
          </GridItem>
        </Grid>
      </SimpleGrid>
      <Box>
        <SimpleGrid
          templateRows="repeat(1, 1fr)"
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
          }}
        >
          <Box
            alignItems={"center"}
            justifyContent="center"
            alignItems={"center"}
            display={"flex"}
            pos={"relative"}
          ></Box>
          <Box d={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box p={21} pos={"relative"} zIndex={2} w={"full"}>
              <Grid
                templateColumns={row}
                templateRows="repeat(1, 1fr)"
                gap={2}
                px={2}
              >
                <GridItem colSpan={4}>
                  <Divider my={21} />
                </GridItem>
                <GridItem colSpan={{ base: 4, md: 2 }}></GridItem>
                <GridItem colSpan={{ base: 4, md: 2 }}></GridItem>
                <GridItem colSpan={{ base: 4, md: 2 }}></GridItem>
              </Grid>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
      <ProductCategoryList
        first={1}
        ProductCategoryWhereInput={{ url: category }}
        product={product}
        UI={PageSEO}
        unit="¥"
      />
    </Container>
  );
};

export default function Product() {
  const router = useRouter();
  const {
    query: { product: url, category },
  } = router;
  return (
    <Fragment>
      <ProductItem
        UI={ProductItemSimple}
        category={category}
        ProductWhereInput={{ url }}
      />
    </Fragment>
  );
}
function PageSEO({ allProductCategories = [], product }) {
  const [category] = allProductCategories;
  return (
    <Head>
      <title>
        {category && category.name} {product.name} | Japan Apple
      </title>
    </Head>
  );
}
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59"
  );
  const {
    query: { product: url, category },
  } = context;
  return await executeServerSide(context, [
    {
      query: PRODUCT_CATEGORIES_QUERY,
      variables: {
        first: 1,
        skip: 0,
        condition: { url: category },
      },
    },
    {
      query: QUERY_PRODUCT,
      variables: {
        product: { url },
        stock: {},
      },
    },
    {
      query: FAQS_QUERY,
      variables: {},
    },
  ]);
}
