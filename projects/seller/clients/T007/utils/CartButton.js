import ProductCartItemListButtonWithBadge from "@itoa/ui/Product/Cart/Item/List/ButtonWithBadge";
import ProductCartItem from "@itoa/ui/Product/Cart/Item";
import { Fragment } from "react";
import ProductCartCreate from "@itoa/ui/Product/Cart/Create";
export default function CartButton() {
  return (
    <ProductCartItem>
      {({ productcart }) => {
        const { _itemsMeta } = productcart;
        return (
          <Fragment>
            <ProductCartCreate productcart={productcart} />
            <ProductCartItemListButtonWithBadge
              _allProductCartItemsMeta={_itemsMeta}
            />
          </Fragment>
        );
      }}
    </ProductCartItem>
  );
}
