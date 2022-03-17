import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Container,
  Heading,
} from "@chakra-ui/react";
import Head from "next/head";
import ProductCategoryList from "@itoa/ui/Product/Category/List";
import ProductCategoryListSimpeSquare from "@itoa/ui/Product/Category/List/SimpleSquare";
import NextLink from "next/link";
import HeroSimpleCentered2 from "@itoa/ui/Hero/SimpleCentered2";
import { Fragment } from "react";
import PageList from "@itoa/ui/Page/List";
import { executeServerSide } from "@itoa/ui/UIProvider";
export default function SanPham() {
  return (
    <Fragment>
      <Container maxW={"container.xl"}>
        <PageList UI={HeroSimpleCentered2} py={4} />
      </Container>
      <Box
        zIndex="dropdown"
        pos="sticky"
        top="78px"
        mb={4}
        display={{ base: "none", md: "block" }}
      >
        <ProductCategoryList
          UI={({ allProductCategories }) => {
            return (
              <Container
                maxW="container.xl"
                overflowX="hidden"
                borderBottomWidth={1}
                py={2}
                bg="white"
              >
                <Breadcrumb spacing="8px" separator={"-"}>
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
              </Container>
            );
          }}
        />
      </Box>
      <Container maxW="container.xl">
        <ProductCategoryList
          UI={ProductCategoryListSimpeSquare}
          columns={{ base: 2, md: 4 }}
        />
        {/*<Heading py="lg">Hot Deal</Heading>
        <ProductList
          UI={ProductListSquare}
          first={1}
          ProductWhereInput={{ status: "hotDeal" }}
        />
        <Heading>Best Seller</Heading>
        <ProductList
          UI={ProductListSquare}
          first={1}
          ProductWhereInput={{ status: "bestSeller" }}
        />
        <Heading>New Arrive</Heading>
        <ProductList
          UI={ProductListSquare}
          first={1}
          ProductWhereInput={{ status: "newArrival" }}
        />{" "}
        */}
      </Container>
      <PageSEO />
    </Fragment>
  );
}
function PageSEO() {
  return (
    <Head>
      <title>Sản Phẩm | Yến Sào Đất Quảng</title>
    </Head>
  );
}
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59",
  );
  return await executeServerSide(context, []);
}
