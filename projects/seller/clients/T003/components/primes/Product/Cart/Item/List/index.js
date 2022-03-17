import { gql, makeVar, useMutation, useQuery } from '@apollo/client';
import { refetchProductCart } from '../..';
import Loading from '../../../../../elements/Loading';
import { cart } from '../../../../../state/UseCart';
export const PRODUCTCARTITEM_QUERY = gql`
  query ($condition: ProductCartItemWhereInput) {
    allProductCartItems(where: $condition) {
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
export const refetchProductCartItemList = makeVar(() => {});
const ProductCartItemList = ({ UI }) => {
  const [onRemove, remove] = useMutation(gql`
    mutation ($id: ID!) {
      deleteProductCartItem(id: $id) {
        id
      }
    }
  `);
  const { loading, error, data, refetch } = useQuery(PRODUCTCARTITEM_QUERY, {
    variables: { condition: { cart: { id: cart() } } },
  });
  const clickRemove = productCartItem => {
    if (!loading && !remove.loading)
      onRemove({ variables: { id: productCartItem.id } }).finally(() => {
        if (refetch) refetch();
        refetchProductCart()();
      });
  };
  if (refetch) refetchProductCartItemList(refetch);
  if (loading || error) return <Loading />;
  return <UI allProductCartItems={data?.allProductCartItems} clickRemove={clickRemove} />;
};
export default ProductCartItemList;
