import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { useMemo, useState } from "react";
import { cartId, refetchProductCartItem } from "..";

export const PRODUCTCARTITEM_CREATE = gql`
  mutation ($data: ProductCartItemCreateInput) {
    createProductCartItem(data: $data) {
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
`;
/**
 *
 * @param {{ UI: ProductCartItemCreateSimple | ProductCartItemCreateQuick }} param
 */
export default function ProductCartItemCreate({
  UI,
  product,
  isDisabled,
  stock,
}) {
  const [quantity, setQuantity] = useState(1);
  const [onCreate, { loading, error, data }] = useMutation(
    PRODUCTCARTITEM_CREATE,
    {
      onCompleted: ({ createProductCartItem }) => {
        refetchProductCartItem()();
      },
    },
  );

  const id = useReactiveVar(cartId);
  const clickAddToCart = (e) => {
    console.log(stock);
    if (!quantity) return;
    if (!stock) return;
    if (!id) return;
    const variables = {
      data: {
        stock: stock ? { connect: { id: stock.id } } : null,
        product: { connect: { id: product.id } },
        cart: { connect: { id } },
        quantity,
      },
    };
    return !loading && onCreate({ variables });
  };
  const clickMinus = (e) => {
    setQuantity((quantity) => quantity - 1);
  };
  const clickPlus = (e) => {
    setQuantity((quantity) => quantity + 1);
  };
  return useMemo(
    () => (
      <UI
        clickAddToCart={clickAddToCart}
        loading={loading}
        error={error}
        data={data}
        quantity={quantity}
        clickMinus={clickMinus}
        clickPlus={clickPlus}
        isDisabled={isDisabled}
      />
    ),
    [loading, quantity, stock],
  );
}
