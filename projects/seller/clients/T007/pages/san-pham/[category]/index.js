import { useRouter } from "next/router";
import React, { useState } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/react";
import { Container, Grid, GridItem } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Head from "next/head";
//
import ProductList, { PRODUCTS_QUERY } from "@itoa/ui/Product/List";
const ProductListSquare = dynamic(() =>
  import("@itoa/ui/Product/List/NameButton")
);
//
import ProductCategoryList, {
  PRODUCT_CATEGORIES_QUERY,
} from "@itoa/ui/Product/Category/List";
import ProductCategoryListSimpeSquare from "@itoa/ui/Product/Category/List/SimpleSquare";

import ProductCategoryListSidebarTiki from "@itoa/ui/Product/Category/List/SidebarTiki";
//
import { executeServerSide } from "@itoa/ui/UIProvider";
import Translate, { translate } from "@itoa/ui/Translate";
const Categories = () => {
  const router = useRouter();
  const {
    query: { category: _category },
  } = router;
  const [brand, setBrand] = useState();
  const category = router.query.category || false;
  const onClickProductBrand = (brand) => {
    setBrand((current) => (current?.id !== brand.id ? brand : null));
    if (category) router.push(`/san-pham/[category]`, `/san-pham/${category}`);
    else router.push(`/san-pham`);
  };
  const onClickProductCategory = (category) => {
    if (category)
      router.push(`/san-pham/[category]`, `/san-pham/${category.url}`);
  };

  const row = useBreakpointValue({
    base: "repeat(3, 1fr)",
    md: "repeat(4, 1fr)",
    lg: "repeat(6, 1fr)",
  });
  return (
    <Container maxW={"container.xl"}>
      <Box
        zIndex="dropdown"
        pos="sticky"
        top={{ base: "56px", md: "78px" }}
        bg="white"
      >
        <Container maxW="container.xl" borderBottomWidth={1}>
          <ProductCategoryList
            first={1}
            UI={({ allProductCategories }) => {
              return (
                <Breadcrumb
                  spacing="8px"
                  py={2}
                  separator={<ChevronRightIcon color="gray.500" />}
                >
                  <BreadcrumbItem>
                    <NextLink href="/" passHref>
                      <BreadcrumbLink as={Heading} size="sm">
                        <Translate content="Trang chủ" />
                      </BreadcrumbLink>
                    </NextLink>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                    <NextLink href="#" passHref>
                      <BreadcrumbLink as={Heading} size="sm">
                        <Translate content="Sản phẩm" />
                      </BreadcrumbLink>
                    </NextLink>
                  </BreadcrumbItem>
                  {allProductCategories?.map((category) => {
                    return (
                      <BreadcrumbItem key={category.id}>
                        <NextLink href={`/san-pham/${category.url}`} passHref>
                          <BreadcrumbLink as={Heading} size="sm">
                            {category.name}
                          </BreadcrumbLink>
                        </NextLink>
                      </BreadcrumbItem>
                    );
                  })}
                </Breadcrumb>
              );
            }}
            ProductCategoryWhereInput={{ url: _category }}
          />
        </Container>
      </Box>
      <Grid
        templateColumns={"repeat(14, 1fr)"}
        gap={{ base: 2, md: 2, lg: 4 }}
        pt={2}
        minH="60vh"
      >
        <GridItem
          colSpan={{ base: 5, md: 3 }}
          display={{ base: "none", md: "block" }}
        >
          <Box pos="sticky" top="125px">
            <ProductCategoryList
              title="Sản phẩm"
              UI={ProductCategoryListSidebarTiki}
              currentUrl={category}
            />
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: 14, md: 11 }}>
          <ProductCategoryList
            UI={ProductCategoryListSimpeSquare}
            ProductCategoryWhereInput={{ parent: { url: category } }}
          />
          <ProductList
            first={8}
            UI={ProductListSquare}
            withPrice={false}
            detailButton={true}
            unit="¥"
            ProductCategoryWhereInput={category ? { url: category } : null}
          />
        </GridItem>
      </Grid>
      <ProductCategoryList
        first={1}
        UI={PageSEO}
        ProductCategoryWhereInput={{ url: _category }}
      />
    </Container>
  );
};

function PageSEO({ allProductCategories = [] }) {
  const [category] = allProductCategories;
  console.log(category);
  return (
    <Head>
      <title>
        {translate("Sản phẩm")} {category && category.name} | Japan Apple
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
    query: { category },
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
      query: PRODUCTS_QUERY,
      variables: {
        first: 8,
        skip: 0,
        condition: {},
        category: category ? { url: category } : null,
      },
    },
    {
      query: PRODUCT_CATEGORIES_QUERY,
      variables: {
        first: 12,
        skip: 0,
        condition: { parent: { url: category } },
      },
    },
  ]);
}

export default Categories;
