import Categories from "../components/primes/Product/Category/List";
import CategoryLak from "../components/primes/Product/Category/List/Lak";
import ProductList, { PRODUCTS_QUERY } from "../components/primes/Product/List";
import ProductListLak from "../components/primes/Product/List/Lak";
import Title from "../components/elements/Title";
import TitleLak from "../components/elements/Title/Lak";
import { Container } from "@chakra-ui/react";
import { executeServerSide } from "@itoa/ui/UIProvider";
export default function Home() {
  return (
    <Container maxW="container.xl">
      <Categories
        UI={CategoryLak}
        first={12}
        ProductCategoryWhereInput={{ parent_is_null: true }}
      />
      <Title UI={TitleLak} title={`Hot Deal`} />
      <ProductList
        UI={ProductListLak}
        ProductWhereInput={{ status: "hotDeal" }}
        first={99}
      />
      {/*   <Title UI={TitleLak} title={`Best Seller`} />
      <ProductList
        UI={ProductListLak}
        ProductWhereInput={{ status: "bestSeller" }}
        first={6}
        onClickMore={() => {
          router.push(`/best-seller`);
        }}
      /> */}
    </Container>
  );
}

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59",
  );
  return await executeServerSide(context, [
    {
      disableLocale: true,
      query: PRODUCTS_QUERY,
      variables: {
        first: 99,
        skip: 0,
        condition: {
          status: "hotDeal",
        },
      },
    },
  ]);
}
