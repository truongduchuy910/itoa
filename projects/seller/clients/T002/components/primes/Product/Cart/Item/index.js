import {
  gql,
  makeVar,
  useApolloClient,
  useLazyQuery,
  useMutation,
} from "@apollo/client";
import { Skeleton, useDisclosure } from "@chakra-ui/react";

import { useEffect, useMemo } from "react";
import { CREATE_PRODUCT_CART } from "../Create";
export const refetchProductCartItem = makeVar(() => {});
export const cartId = makeVar();

export const PRODUCT_CART = gql`
  query ($id: ID!) {
    ProductCart(where: { id: $id }) {
      id
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

const ProductCart = ({ UI, onCompleted = () => {} }) => {
  const client = useApolloClient();
  const [queryCart, { data = {}, loading, error, refetch, called }] =
    useLazyQuery(PRODUCT_CART, {
      onCompleted: (props) => {
        onCompleted(props);
        const { ProductCart } = props;
        cartId(ProductCart.id);
      },
      onError: (e) => {
        client
          .mutate({ mutation: CREATE_PRODUCT_CART })
          .then(({ data = {} }) => {
            const { createProductCart = {} } = data;
            const { id } = createProductCart;
            if (id) {
              localStorage.setItem("cart", id);
              queryCart({ variables: { id } });
            } else console.log(data);
          })
          .catch((e) => {
            console.log("create product cart error", e);
          });
      },
    });

  useEffect(() => {
    const id = localStorage.getItem("cart");
    if (!id) {
      client
        .mutate({ mutation: CREATE_PRODUCT_CART })
        .then(({ data = {} }) => {
          const { createProductCart = {} } = data;
          const { id } = createProductCart;
          if (id) {
            localStorage.setItem("cart", id);
            queryCart({ variables: { id } });
          } else console.log(data);
        })
        .catch((e) => {
          console.log("create product cart error", e);
        });
    } else if (id && !called && !loading) {
      queryCart({ variables: { id } });
    }
  });

  if (!loading && called && refetch) refetchProductCartItem(refetch);

  const { ProductCart = {} } = data;
  return useMemo(
    () => (
      <UI
        ProductCart={ProductCart}
        refetch={refetch}
        loading={loading || !called}
      />
    ),
    [UI.name, ProductCart],
  );
};
export default ProductCart;
