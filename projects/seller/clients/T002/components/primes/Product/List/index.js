import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
// import { cartId, refetchProductCart } from "../Cart";
// import { refetchProductCartItemList } from "../Cart/Item/List";
export const PRODUCTS_QUERY = (queryKey) => gql`
  query ${queryKey}(
    $first: Int
    $skip: Int
    $condition: ProductWhereInput
    $category: ProductCategoryWhereInput
  ) {
    allProductCategories(where: $category) {
      products(first: $first, skip: $skip, where: $condition) {
        id
        name
        price
        sale
        url
        brand {
          name
        }
        image {
          publicUrl
        }
        images {
          file {
            publicUrl
          }
        }
        categories {
          id
          url
        }
      }
      _productsMeta(where: $condition) {
        count
      }
    }
  }
`;
export const PRODUCTS_VARS = { first: 6, skip: 0, condition: {} };
const Products = ({
  queryKey = "Products",
  first = PRODUCTS_VARS.first,
  skip = PRODUCTS_VARS.skip,
  ProductWhereInput = PRODUCTS_VARS.condition,
  ProductCategoryWhereInput,
  UI,
}) => {
  const { data, error, loading, previousData, fetchMore, variables } = useQuery(
    PRODUCTS_QUERY(queryKey),
    {
      variables: {
        first,
        skip,
        condition: ProductWhereInput,
        category: ProductCategoryWhereInput,
      },
      ssr: false,
    },
  );
  return (
    <Option
      loading={loading}
      error={error}
      data={data || previousData}
      UI={UI}
      fetchMore={fetchMore}
      first={first}
    />
  );
};
export default Products;
const Option = ({ UI, data = {}, fetchMore, loading, error, first }) => {
  //
  // const [createProductCartItem, { loading: _loaing }] = useMutation(
  //   gql`
  //     mutation ($data: ProductCartItemCreateInput) {
  //       createProductCartItem(data: $data) {
  //         id
  //       }
  //     }
  //   `,
  //   {
  //     onError: (e) => {
  //       cartErrorSolve();
  //       refetchProductCart()();
  //       refetchProductCartItemList()();
  //     },
  //     onCompleted: (data) => {},
  //   },
  // );
  // const addToCart = async ({ product }) => {
  //   if (!_loaing) {
  //     await createProductCartItem({
  //       variables: {
  //         data: {
  //           cart: { connect: { id: cartId() } },
  //           product: { connect: { id: product.id } },
  //           quantity: 1,
  //         },
  //       },
  //     });
  //   }
  // };
  const { allProductCategories = [] } = data;
  var allProducts = [];
  var _allProductsMeta = { count: 0 };
  useEffect(() => {
    _allProductsMeta.count = 0;
  });
  allProductCategories.map((category) => {
    const { products = [], _productsMeta = {} } = category;
    allProducts = allProducts.concat(products);
    _allProductsMeta.count = Number(_productsMeta.count);
  });

  const [pagination, setPagination] = useState(1);
  const onClickMore = (e) => {
    if (!loading) {
      fetchMore({
        variables: { skip: first * pagination },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setPagination((pagination) => pagination + 1);
          return {
            ...previousResult,
            allProductCategories: [
              ...previousResult.allProductCategories,
              ...fetchMoreResult.allProductCategories,
            ],
          };
        },
      });
    }
  };
  const onChangeAttributeValues = (values = []) => {
    refetch({
      ...variables,
      stock: {
        attributeValues_every: { id_in: values.map((value) => value.id) },
      },
    });
  };
  return (
    <UI
      allProducts={allProducts}
      _allProductsMeta={_allProductsMeta}
      onClickMore={onClickMore}
      // addToCart={addToCart}
      onChangeAttributeValues={onChangeAttributeValues}
    />
  );
};
