import {
  gql,
  useApolloClient,
  useMutation,
  useReactiveVar,
} from "@apollo/client";
import { useMemo, useState } from "react";
import { refetchProductCartItem } from "..";
import { onOpenCart } from "../List/Drawer";
import { PRODUCT_CART_CREATE } from "@itoa/ui/Product/Cart/Create";
import { useRouter } from "next/router";
export const PRODUCT_CART_ITEM_CREATE = gql`
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
  const router = useRouter();
  const client = useApolloClient();
  const [quantity, setQuantity] = useState(1);
  const [onCreate, { loading, error, data }] = useMutation(
    PRODUCT_CART_ITEM_CREATE,
    {
      onError: () => {
        localStorage.removeItem("cart");
      },
    },
  );

  const clickAddToCart = async (url) => {
    /** CREATE CART */
    if (!localStorage.getItem("cart")) {
      const {
        data: { createProductCart },
      } = await client.mutate({ mutation: PRODUCT_CART_CREATE });
      localStorage.setItem("cart", createProductCart?.id);
    }
    if (!quantity) throw "Hết hàng";
    if (!stock) throw "Vui lòng chọn thuộc tính";
    if (loading) throw "Vui lòng chờ";
    const variables = {
      data: {
        stock: stock ? { connect: { id: stock.id } } : null,
        product: { connect: { id: product.id } },
        cart: { connect: { id: localStorage.getItem("cart") } },
        quantity,
      },
    };
    /**
     * CREATE CART ITEM
     */
    return await onCreate({ variables }).then(() => {
      refetchProductCartItem()({ id: localStorage.getItem("cart") }).finally(() => {
        if (url) {
          router.push(url);
        } else onOpenCart(true);
      });
    });
  };
  const clickMinus = (e) => {
    setQuantity((quantity) => quantity - 1);
  };
  const clickPlus = (e) => {
    setQuantity((quantity) => quantity + 1);
  };
  return (
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
  );
}
