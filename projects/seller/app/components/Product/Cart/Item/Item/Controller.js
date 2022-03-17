import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { refetchProductCart } from "../../Controller";
import { refetchProductCartItemList } from "../List/Controller";
const ProductCartItemItemSimple = ({
  UI,
  productCartItem,
  clickRemove,
  readOnly,
}) => {
  const [onUpate, update] = useMutation(
    gql`
      mutation ($id: ID!, $data: ProductCartItemUpdateInput) {
        updateProductCartItem(id: $id, data: $data) {
          id
          quantity
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
        }
      }
    `,
    {
      onCompleted: (data) => {
        refetchProductCart()();
        refetchProductCartItemList()();
      },
    }
  );
  const [quantity, setQuantity] = useState(productCartItem.quantity);
  const onClickRemove = (e) => {
    clickRemove(productCartItem);
  };
  const [time, setTime] = useState();
  const delay = 1000;

  const updateQuantity = (quantity) => {
    if (!update.loading)
      onUpate({ variables: { id: productCartItem.id, data: { quantity } } })
        .then(() => {
          refetchProductCart()();
          refetchProductCartItemList()();
        })
        .catch(() => {
          refetchProductCart()();
          refetchProductCartItemList()();
          setQuantity(productCartItem.quantity);
        });
  };
  const clickPlus = (e) => {
    setQuantity((quantity) => ++quantity);
    clearTimeout(time);
    setTime(
      setTimeout(() => {
        updateQuantity(quantity + 1);
      }, delay)
    );
  };
  const clickMinus = (e) => {
    if (quantity > 1) setQuantity((quantity) => --quantity);
    clearTimeout(time);
    setTime(
      setTimeout(() => {
        updateQuantity(quantity - 1 || 1);
      }, delay)
    );
  };
  return (
    <UI
      productCartItem={productCartItem}
      onClickRemove={onClickRemove}
      clickPlus={clickPlus}
      clickMinus={clickMinus}
      quantity={quantity}
      readOnly={readOnly}
      error
    />
  );
};
export default ProductCartItemItemSimple;
