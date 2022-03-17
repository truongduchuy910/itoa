import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
// import Breadcrumb from '../../../components/elements/Breadcrumb';
// import BreadcrumbOne from '../../../components/elements/Breadcrumb/One';
// import Loading from "../../../components/elements/Loading";
// import ProductItem, { QUERY_PRODUCT } from '../../../components/primes/Product/Item';
// import LakDetail from '../../../components/primes/Product/Item/LakDetail';
const Product = () => {
  const router = useRouter();
  const {
    query: { product: id },
  } = router;

  //
  const { data, error, loading } = useQuery(
    gql`
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
    `,
    {
      variables: {
        condition: { url: id },
      },
    },
  );
  // if (loading || error) return <Loading style={{ minHeight: "60vh" }} />;
  //
  // const {
  //   allProducts: [{ categories, name, url }],
  // } = data;
  return (
    <Fragment>
      {/* <Breadcrumb
        items={[
          { name: 'Trang chủ', url: '/' },
          { name: 'Sản phẩm', url: '/san-pham' },
          ...categories?.map(category => ({
            name: category.name,
            url: '/san-pham/' + category.url,
          })),
          { name, url: '/san-pham/' + categories[0]?.url + '/' + url },
        ]}
        UI={BreadcrumbOne}
      />
      <ProductItem UI={LakDetail} ProductWhereInput={{ url: id }} /> */}
    </Fragment>
  );
};
export default Product;
