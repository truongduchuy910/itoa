import {
  gql,
  makeVar,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";

import { Fragment, useEffect, useState } from "react";
export const refetchProductCart = makeVar(() => {});
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
export const CREATE_PRODUCT_CART = gql`
  mutation {
    createProductCart(data: { items: { disconnectAll: false } }) {
      id
    }
  }
`;
export const CREATE_PRODUCT_ORDER = gql`
  mutation ($data: ProductOrderCreateInput) {
    createProductOrder(data: $data) {
      id
      contact {
        phone
        name
        address
      }
      total
      saving
      discount {
        id
        code
      }
      items {
        id
        quantity
        product {
          name
          image {
            publicUrl
          }
        }
        sale
        price
        stock {
          id
          attributeValues {
            id
            value
          }
        }
      }
    }
  }
`;
export const DELETE_PRODUCT_CARTITEM = gql`
  mutation ($id: ID!) {
    deleteProductCartItem(id: $id) {
      id
    }
  }
`;

const ProductCart = ({ UI }) => {
  const [queryCart, { data = {}, loading, error, refetch, called }] =
    useLazyQuery(PRODUCT_CART, {
      onCompleted: (data) => {
        refetch();
      },
      onError: (e) => {
        if (!_loading && !_called) {
          createProductCart();
        }
      },
    });
  useEffect(() => {
    if (!called && !loading) {
      const id = localStorage.getItem("cart");
      cartId(id);
      queryCart({ variables: { id } });
    }
  });
  const [
    createProductCart,
    { loading: _loading, error: _error, called: _called },
  ] = useMutation(CREATE_PRODUCT_CART, {
    onCompleted: (data) => {
      const {
        createProductCart: { id },
      } = data;
      localStorage.setItem("cart", id);
      queryCart({ id });
      cartId(id);
      refetch();
    },
    onError: (e) => {
      console.log(e);
    },
  });
  const [deleteProdcutCartItem] = useMutation(DELETE_PRODUCT_CARTITEM, {
    onCompleted: (data) => {
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const [
    createProductOrder,
    { loading: orderLoading, error: orderError, data: success },
  ] = useMutation(CREATE_PRODUCT_ORDER);

  if (refetch) refetchProductCart(refetch);
  const onOrder = ({ phone, name, address, payment, code }) => {
    if (!orderLoading) {
      return createProductOrder({
        variables: {
          data: {
            contact: { create: { phone, name, address } },
            payment,
            cart: { connect: { id: localStorage.getItem("cart") } },
            code,
          },
        },
      });
    }
  };
  if (!called || loading) return "...";
  const { ProductCart = {} } = data;
  const onClickRemove = (item) => {
    deleteProdcutCartItem({ variables: { id: item.id } });
  };
  return (
    <UI
      ProductCart={ProductCart}
      refetch={refetch}
      deleteProdcutCartItem={deleteProdcutCartItem}
      onClickRemove={onClickRemove}
      success={success}
      onOrder={onOrder}
    />
  );
};
export default ProductCart;
