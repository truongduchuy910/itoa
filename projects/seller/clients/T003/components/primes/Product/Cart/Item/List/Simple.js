import ProductCartItemItemSimple from '../Update/Simple';
import ProductCartItemItem from '../Item';
const ProductCartItemListSimple = ({
  readOnly,
  allProductCartItems = [],
  clickRemove = productCartItem => {},
}) => {
  return allProductCartItems.map(item => {
    return (
      <ProductCartItemItem
        key={item.id}
        UI={ProductCartItemItemSimple}
        productCartItem={item}
        clickRemove={clickRemove}
        readOnly={readOnly}
      />
    );
  });
};
export default ProductCartItemListSimple;
