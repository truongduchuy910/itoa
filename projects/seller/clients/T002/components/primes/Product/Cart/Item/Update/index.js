import { useMutation, gql } from "@apollo/client";
import { useEffect, useMemo, useState } from "react";
import { refetchProductCartItem } from "..";

export default function ProductCartItemItemUpdate({
  UI,
  productCartItem,
  readOnly,
}) {
  const [quantity, setQuantity] = useState();

  const [time, setTime] = useState();
  const delay = 1000;
  const [onUpate, { loading, error, data }] = useMutation(
    gql`
      mutation ($id: ID!, $data: ProductCartItemUpdateInput) {
        updateProductCartItem(id: $id, data: $data) {
          id
          quantity
          id
          sale
          price
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
        }
      }
    `,
    {
      onCompleted: ({ updateProductCartItem }) => {
        refetchProductCartItem()();
      },
      onError: (error) => {
        setQuantity(productCartItem.quantity);
        refetchProductCartItem()();
      },
    },
  );
  useEffect(() => {
    setQuantity(productCartItem.quantity);
  }, [productCartItem.quantity]);
  const updateQuantity = (quantity) => {
    if (!loading)
      onUpate({ variables: { id: productCartItem.id, data: { quantity } } });
  };
  const clickPlus = (e) => {
    setQuantity((quantity) => ++quantity);
    clearTimeout(time);
    setTime(
      setTimeout(() => {
        setTime(null);
        updateQuantity(quantity + 1);
      }, delay),
    );
  };
  const clickMinus = (e) => {
    if (quantity > 1) setQuantity((quantity) => --quantity);
    clearTimeout(time);
    setTime(
      setTimeout(() => {
        setTime(null);
        updateQuantity(quantity - 1 || 1);
      }, delay),
    );
  };
  return useMemo(
    () => (
      <UI
        productCartItem={productCartItem}
        clickPlus={clickPlus}
        clickMinus={clickMinus}
        quantity={quantity}
        readOnly={readOnly}
        error={error}
        loading={loading}
        delay={time}
      />
    ),
    [UI.name, productCartItem, quantity, loading],
  );
}
