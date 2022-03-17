import ProductCartItemListIconWithBadge from "@itoa/ui/Product/Cart/Item/List/IconWithBadge";
const ProductCartItem = dynamic(() => import("@itoa/ui/Product/Cart/Item"), {
  ssr: false,
});
const ProductCartItemListDrawer = dynamic(
  () => import("@itoa/ui/Product/Cart/Item/List/Drawer"),
  {
    ssr: false,
  },
);
export default function CartWithDraw() {
  return (
    <ProductCartItem
      UI={({ ProductCart, ...props }) => {
        return (
          <ProductCartItemListDrawer
            toggleButton={ProductCartItemListIconWithBadge}
            _allProductCartItemsMeta={ProductCart?._itemsMeta}
            allProductCartItems={ProductCart.items}
            {...props}
          />
        );
      }}
    />
  );
}
