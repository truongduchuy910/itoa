import { gql, makeVar, useQuery } from "@apollo/client";
import { useMemo } from "react";
export const refetchProductCartItem = makeVar(() => {});
export const PRODUCT_CART = gql`
  query ($id: ID!) {
    ProductCart(where: { id: $id }) {
      id
      _itemsMeta {
        count
      }
      items {
        id
        sale
        price
        quantity
        product {
          id
          name
          image {
            publicUrl
          }
        }
        stock {
          id
          attributeValues {
            id
            value
          }
        }
        stock {
          attributeValues {
            id
            value
          }
        }
      }
    }
  }
`;
/**
 * CLIENT SIDE ONLY
 */
const ProductCart = ({ UI }) => {
  const {
    data = {},
    loading,
    error,
    refetch,
    variables,
  } = useQuery(PRODUCT_CART, {
    variables: { id: localStorage.getItem("cart") },
    onCompleted: () => {
      refetchProductCartItem(refetch);
    },
    onError: () => {
      refetchProductCartItem(refetch);
      localStorage.removeItem("cart");
    },
    ssr: false,
  });
  const { ProductCart = {} } = data;
  var count = 0;
  const { items = [] } = ProductCart;
  items?.map((item) => (count += item.quantity));
  return useMemo(
    () => (
      <UI
        ProductCart={ProductCart}
        refetch={refetch}
        loading={loading}
        error={error}
        count={count}
      />
    ),
    [UI.name, variables, loading, data],
  );
};
export default ProductCart;
