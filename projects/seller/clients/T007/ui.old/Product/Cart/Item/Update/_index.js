import { useMutation, gql } from "@apollo/client";
import { useState } from "react";
import { refetchProductCart } from "..";
const ProductCartItemItemSimple = ({
  UI,
  productCartItem,
  clickRemove,
  readOnly,
  refetch: refetchProductCartItem,
}) => {
  const [_quantity, setQuantity] = useState(0);
  var quantity = _quantity || productCartItem.quantity;
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
      onCompleted: ({ updateProductCartItem }) => {
        refetchProductCartItem()({ id: localStorage.getItem("cart") });
        setQuantity(updateProductCartItem.quantity);
      },
    },
  );
  const onClickRemove = (e) => {
    clickRemove(productCartItem);
  };
  const [time, setTime] = useState();
  const delay = 1000;

  const updateQuantity = (quantity) => {
    if (!update.loading)
      onUpate({ variables: { id: productCartItem.id, data: { quantity } } });
  };
  const clickPlus = (e) => {
    setQuantity((_quantity) => (_quantity || quantity) + 1);
    clearTimeout(time);
    setTime(
      setTimeout(() => {
        updateQuantity(quantity + 1);
      }, delay),
    );
  };
  const clickMinus = (e) => {
    if (quantity > 1) setQuantity((_quantity) => (_quantity || quantity) - 1);
    clearTimeout(time);
    setTime(
      setTimeout(() => {
        updateQuantity(quantity - 1 || 1);
      }, delay),
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
      update={update}
      error
    />
  );
};
export default ProductCartItemItemSimple;
