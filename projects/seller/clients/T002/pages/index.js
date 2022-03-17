import { Box, Container, Grid, GridItem, Heading } from "@chakra-ui/layout";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useRouter } from "next/router";
import PostList, { POSTS_QUERY } from "../components/primes/Post/List";
const PostListChak = dynamic(
  () => import("../components/primes/Post/List/Chak"),
  { ssr: false },
);
import ProductSidebar, { SIDEBAR } from "../components/frames/ProductSidebar";
const ProductSidebarSimple = dynamic(() =>
  import("../components/frames/ProductSidebar/Simple"),
);
import Product, { PRODUCTS_QUERY } from "../components/primes/Product/List";
const ProductSimple = dynamic(() =>
  import("../components/primes/Product/List/Simple"),
);
import Banner, { BANNERS_QUERY } from "../components/primes/Banner/List";
import { executeServerSide } from "../components/UIProvider";
import BannerChak from "../components/primes/Banner/List/Chak";
export default function Home() {
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

  return (
    <Box pb={12}>
      <Banner UI={BannerChak} />
      <Container mt={13} p={1} maxW={"container.xl"}>
        <Grid templateColumns={"repeat(14, 1fr)"} gap={{ base: 1, md: 2 }}>
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
            <Heading mb={8} ml={2} color={"brand.500"}>
              Hot Deal
            </Heading>

            <Product
              queryKey="ProductsHotDeal"
              UI={ProductSimple}
              ProductWhereInput={{
                status: "hotDeal",
              }}
            />
            <Heading mb={8} ml={2} color={"brand.500"}>
              Bán Chạy
            </Heading>
            <Product
              queryKey="ProductBestSeller"
              ProductCategoryWhereInput={{}}
              UI={ProductSimple}
              ProductWhereInput={{
                status: "bestSeller",
              }}
            />
          </GridItem>
        </Grid>
        <Heading mt={34} ml={2} color={"brand.500"} textAlign={"center"}>
          Bài Viết
        </Heading>
        <PostList UI={PostListChak} sortBy={"updatedAt_DESC"} first={3} />
      </Container>
    </Box>
  );
}
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59",
  );
  return await executeServerSide(context, [
    {
      query: SIDEBAR,
      variables: {
        firstCategories: 7,
        firstBrands: 7,
        category: { parent_is_null: true },
      },
    },
    {
      disableLocale: true,
      query: PRODUCTS_QUERY("ProductsHotDeal"),
      variables: {
        first: 6,
        skip: 0,
        condition: {
          status: "hotDeal",
        },
      },
    },
    {
      disableLocale: true,
      query: PRODUCTS_QUERY("ProductBestSeller"),
      variables: {
        first: 6,
        skip: 0,
        category: {},
        condition: {
          status: "bestSeller",
        },
      },
    },
    // {
    //   disableLocale: true,
    //   query: PRODUCTS_QUERY,
    //   variables: {
    //     first: 6,
    //     skip: 0,
    //     condition: {
    //       status: "newArrival",
    //     },
    //   },
    // },
    {
      disableLocale: true,
      query: BANNERS_QUERY,
      variables: {},
    },
    {
      query: POSTS_QUERY,
      variables: {
        first: 3,
        skip: 0,
        sortBy: "updatedAt_DESC",
      },
    },
  ]);
}
