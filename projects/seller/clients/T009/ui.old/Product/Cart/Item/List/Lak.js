import ProductCartItemItemLak from "../Update/Lak";
import ProductCartItemItem from "../Item";
const ProductCartItemListLak = ({
  readOnly,
  allProductCartItems = [],
  clickRemove = (productCartItem) => {},
}) => {
  return allProductCartItems.map((item) => {
    return (
      <ProductCartItemItem
        key={item.id}
        UI={ProductCartItemItemLak}
        productCartItem={item}
        clickRemove={clickRemove}
        readOnly={readOnly}
      />
    );
  });
};
export default ProductCartItemListLak;
