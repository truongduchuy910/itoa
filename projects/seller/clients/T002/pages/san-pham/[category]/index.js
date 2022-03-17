import { useRouter } from "next/router";
import React, { useState } from "react";
import NextLink from "next/link";
import dynamic from "next/dynamic";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Box, Container, Grid, GridItem } from "@chakra-ui/layout";
import ProductSidebar from "../../../components/frames/ProductSidebar";
const ProductSidebarSimple = dynamic(() =>
  import("../../../components/frames/ProductSidebar/Simple"),
);
import Product from "../../../components/primes/Product/List";
const ProductSimple = dynamic(() =>
  import("../../../components/primes/Product/List/Simple"),
);
import { useBreakpointValue } from "@chakra-ui/media-query";
import { ChevronRightIcon } from "@chakra-ui/icons";
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
    <Box pb={12}>
      <Container mt={13} p={1} maxW={"container.xl"}>
        <Breadcrumb
          spacing="8px"
          px={2}
          mb={4}
          separator={<ChevronRightIcon color="gray.500" />}
        >
          <BreadcrumbItem>
            <BreadcrumbLink>Trang chủ</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <NextLink href="/san-pham">
              <BreadcrumbLink href="">Danh mục sản phẩm</BreadcrumbLink>
            </NextLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Grid templateColumns={"repeat(14, 1fr)"} gap={{ base: 1, md: 4 }}>
          <GridItem colSpan={{ base: 5, md: 3 }}>
            <ProductSidebar
              UI={ProductSidebarSimple}
              category={category}
              brand={brand}
              onClickProductBrand={onClickProductBrand}
              onClickProductCategory={onClickProductCategory}
            />
          </GridItem>
          <GridItem colSpan={{ base: 9, md: 11 }}>
            <Product
              UI={ProductSimple}
              ProductCategoryWhereInput={category ? { url: category } : null}
              // ProductWhereInput={{
              //   categories_some: category ? { url: category } : null,
              //   brand: brand ? { id: brand.id } : null,
              // }}
            />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default Categories;
