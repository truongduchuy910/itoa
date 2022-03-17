import { gql, makeVar, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
export const refetchProductCart = makeVar(() => {});
import { cart, cartErrorSolve } from '../../../state/UseCart';
import Loading from '../../../elements/Loading';
export const PRODUCT_CART = gql`
  query ($id: ID!) {
    ProductCart(where: { id: $id }) {
      id
      items {
        id
        quantity
        product {
          id
          url
          name
          image {
            publicUrl
          }
          price
          sale
        }
        price
        sale
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
const ProductCart = ({ UI }) => {
  const [deleteProdcutCartItem] = useMutation(gql`
    mutation ($id: ID!) {
      deleteProductCartItem(id: $id) {
        id
      }
    }
  `);
  const [fixed, setFixed] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createProductOrder, { loading: orderLoading, error: orderError, data: orderData }] =
    useMutation(gql`
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
    `);

  const { data, loading, error, refetch } = useQuery(PRODUCT_CART, {
    variables: { id: cart() },
  });
  const router = useRouter();
  if (loading) return <Loading />;
  if (error) {
    if (cart()) {
      cartErrorSolve(error, router);
    }
    return <Loading />;
  }
  if (refetch) refetchProductCart(refetch);
  const onClickProduct = url => {
    router.push(`/san-pham/${url}`);
  };
  const { ProductCart } = data;
  const onOrder = ({ phone, name, address, payment, code }) => {
    if (!orderLoading) {
      const cartId = cart();
      return createProductOrder({
        variables: {
          data: {
            contact: { create: { phone, name, address } },
            payment,
            cart: { connect: { id: cartId } },
            code,
          },
        },
      });
    }
  };

  const onClickCheckout = () => {
    if (ProductCart.items?.length) router.push(`/thanh-toan`);
  };
  const onClickCart = () => {
    router.push(`/gio-hang`);
  };
  return (
    <UI
      ProductCart={ProductCart}
      refetch={refetch}
      deleteProdcutCartItem={deleteProdcutCartItem}
      onClickProduct={onClickProduct}
      onClickCheckout={onClickCheckout}
      fixed={fixed}
      success={success}
      orderData={orderData}
      onOrder={onOrder}
      onClickCart={onClickCart}
    />
  );
};
export default ProductCart;
