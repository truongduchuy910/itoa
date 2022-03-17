import { gql, useQuery } from "@apollo/client";
import { Box, Container } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment, useMemo, useState } from "react";
import Breadcrumb from "../../../components/elements/Breadcrumb";
import BreadcrumbOne from "../../../components/elements/Breadcrumb/One";
import Loading from "../../../components/elements/Loading";
import ProductItem, {
  QUERY_PRODUCT,
} from "../../../components/primes/Product/Item";
import LakDetail from "../../../components/primes/Product/Item/LakDetail";
import {
  addApolloState,
  initializeApollo,
} from "../../../components/state/apollo";
const BREADCRUMB = gql`
  query ($condition: ProductWhereInput) {
    allProducts(where: $condition) {
      id
      categories {
        url
        name
        id
      }
      name
      url
    }
  }
`;

function Bre({ url: id }) {
  const {
    data = {},
    error,
    loading,
  } = useQuery(BREADCRUMB, {
    variables: {
      condition: { url: id },
    },
  });
  if (loading) return "";
  if (error) return error.toString();
  const { allProducts = [] } = data;
  const [product = {}] = allProducts;
  if (!product) return "";
  const { categories = [], name, url } = product;
  const items = [
    { name: "Trang chủ", url: "/" },
    { name: "Sản phẩm", url: "/san-pham" },
  ];
  if (categories && categories.length) {
    // [category]
    categories?.map((category) => {
      // console.log(`/san-pham/${category.url}`);
      items.push({
        name: category.name,
        url: "/san-pham/" + category.url,
      });
    });
    // [product]
    items.push({ name, url: "/san-pham/" + categories[0]?.url + "/" + url });
  }
  return <Breadcrumb items={items} UI={BreadcrumbOne} />;
}

const Product = () => {
  const router = useRouter();
  const {
    query: { product: id },
  } = router;

  const productDetail = useMemo(
    () =>
      id && (
        <Container maxW="container.xl" pt={{ base: 7, md: 10 }}>
          <ProductItem UI={LakDetail} ProductWhereInput={{ url: id }} />
        </Container>
      ),
    [id],
  );
  const bre = useMemo(() => id && <Bre url={id} />, [id]);
  return (
    <Fragment>
      {bre}
      {productDetail}
    </Fragment>
  );
};
export default Product;

// export async function getServerSideProps(context) {
//   console.log("getServerSideProps");
//   const { product } = context.query;
//   const host =
//     process.env.NODE_ENV === "production"
//       ? typeof window === "undefined"
//         ? context.req.headers.host
//         : window.location.host
//       : process.env.HOST;
//   if (!host)
//     return {
//       props: {},
//     };
//   try {
//     const client = initializeApollo(null, host);
//     if (product)
//       await client.query({
//         query: QUERY_PRODUCT,
//         variables: { product: { url: product }, stock: {} },
//       });
//     return addApolloState(
//       client,
//       {
//         props: {},
//       },
//       host,
//     );
//   } catch (e) {
//     return {
//       props: {},
//     };
//   }
// }
