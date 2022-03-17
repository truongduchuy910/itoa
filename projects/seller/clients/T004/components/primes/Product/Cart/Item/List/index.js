import { gql, makeVar, useMutation, useQuery } from "@apollo/client";
import { refetchProductCart, cartId, DELETE_PRODUCT_CARTITEM, PRODUCT_CART } from "../..";

export const PRODUCTCARTITEM_QUERY = gql`
  query ($id: ID!) {
    ProductCart(where: { id: $id }) {
      allProductCartItems: items {
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
  }
`;
export const refetchProductCartItemList = makeVar(() => {});
const ProductCartItemList = ({ UI }) => {
  const [onRemove, remove] = useMutation(DELETE_PRODUCT_CARTITEM);
  const { loading, error, data, refetch } = useQuery(PRODUCT_CART, {
    variables: { id: cartId() },
    onError: (e) => {},
  });
  const clickRemove = (productCartItem) => {
    if (!loading && !remove.loading)
      onRemove({ variables: { id: productCartItem.id } }).finally(() => {
        if (refetch) refetch();
        refetchProductCart()();
        refetchProductCartItemList()();
      });
  };
  if (refetch) refetchProductCartItemList(refetch);
  if (loading || error) return "...";
  return (
    <UI
      allProductCartItems={data?.ProductCart?.items}
      clickRemove={clickRemove}
    />
  );
};
export default ProductCartItemList;
