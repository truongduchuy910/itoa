import { useRouter } from "next/router";
import React, { useState } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Container, Grid, GridItem } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { ChevronRightIcon } from "@chakra-ui/icons";
//
import ProductList, {
  PRODUCTS_QUERY,
  PRODUCTS_VARS,
} from "@itoa/ui/Product/List";
const ProductListNoPrice = dynamic(() =>
  import("@itoa/ui/Product/List/NoPrice"),
);
//
import ProductCategoryList from "@itoa/ui/Product/Category/List";
import ProductCategoryListSimple from "@itoa/ui/Product/Category/List/Simple";
import ProductCategoryListSidebarSimple from "@itoa/ui/Product/Category/List/SidebarSimple";
//
import { executeServerSide } from "@itoa/ui/utils/apollo";
import Translate from "@itoa/ui/Translate";
const Categories = () => {
  const router = useRouter();
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
    <Container mt={13} p={1} maxW={"container.xl"}>
      <ProductCategoryList
        UI={({ allProductCategories }) => {
          return (
            <Breadcrumb
              spacing="8px"
              px={2}
              mb={4}
              separator={<ChevronRightIcon color="gray.500" />}
            >
              <BreadcrumbItem>
                <NextLink href="/" passHref>
                  <BreadcrumbLink>
                    <Translate content="Trang chủ" />
                  </BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <NextLink href="/san-pham" passHref>
                  <BreadcrumbLink>
                    <Translate content="Danh mục sản phẩm" />
                  </BreadcrumbLink>
                </NextLink>
              </BreadcrumbItem>
              {allProductCategories?.map((category) => {
                return (
                  <BreadcrumbItem key={category.id}>
                    <NextLink href="/san-pham" passHref>
                      <BreadcrumbLink>{category.name}</BreadcrumbLink>
                    </NextLink>
                  </BreadcrumbItem>
                );
              })}
            </Breadcrumb>
          );
        }}
        ProductCategoryWhereInput={category ? { url: category } : null}
      />

      <Grid
        templateColumns={"repeat(14, 1fr)"}
        gap={{ base: 2, md: 2, lg: 4 }}
        pt={2}
      >
        <GridItem colSpan={{ base: 5, md: 3 }}>
          <ProductCategoryList
            UI={ProductCategoryListSidebarSimple}
            currentUrl={category}
          />
        </GridItem>
        <GridItem colSpan={{ base: 9, md: 11 }}>
          <ProductCategoryList
            UI={ProductCategoryListSimple}
            ProductCategoryWhereInput={{ parent: { url: category } }}
          />
          <ProductList
            UI={ProductListNoPrice}
            ProductCategoryWhereInput={category ? { url: category } : null}
          />
        </GridItem>
      </Grid>
    </Container>
  );
};

export async function getServerSideProps(context) {
  const {
    query: { category },
  } = context;
  return executeServerSide(context, [
    {
      query: PRODUCTS_QUERY,
      variables: {
        first: PRODUCTS_VARS.first,
        skip: PRODUCTS_VARS.skip,
        ProductWhereInput: PRODUCTS_VARS.condition,
        category: category ? { url: category } : null,
      },
    },
  ]);
}

export default Categories;
