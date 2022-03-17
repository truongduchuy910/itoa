import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { cartId, refetchProductCart } from "../Cart";
import { refetchProductCartItemList } from "../Cart/Item/List/Controller";
export const PRODUCTS_QUERY = gql`
  query(
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
  first = 6,
  skip = 0,
  ProductWhereInput,
  ProductCategoryWhereInput,
  UI,
}) => {
  const { data = {}, error, loading, fetchMore } = useQuery(PRODUCTS_QUERY, {
    variables: {
      first,
      skip,
      condition: ProductWhereInput,
      category: ProductCategoryWhereInput,
    },
    onError: (error) => {
      console.error("product list", error);
    },
  });
  return (
    <Option
      loading={loading}
      error={error}
      data={data}
      UI={UI}
      fetchMore={fetchMore}
      first={first}
    />
  );
};
export default Products;
const Option = ({ UI, data = {}, fetchMore, loading, error, first }) => {
  //
  const [createProductCartItem, { loading: _loaing }] = useMutation(
    gql`
      mutation($data: ProductCartItemCreateInput) {
        createProductCartItem(data: $data) {
          id
        }
      }
    `,
    {
      onError: (e) => {
        cartErrorSolve();
        refetchProductCart()();
        refetchProductCartItemList()();
      },
      onCompleted: (data) => {},
    },
  );
  const addToCart = async ({ product }) => {
    if (!_loaing) {
      await createProductCartItem({
        variables: {
          data: {
            cart: { connect: { id: cartId() } },
            product: { connect: { id: product.id } },
            quantity: 1,
          },
        },
      });
    }
  };
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

  return (
    <UI
      allProducts={allProducts}
      _allProductsMeta={_allProductsMeta}
      onClickMore={onClickMore}
      addToCart={addToCart}
    />
  );
};
