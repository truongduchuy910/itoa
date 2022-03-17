import { gql, useMutation } from "@apollo/client";
import { refetchProductCartItem } from "..";

export const DELETE_PRODUCT_CARTITEM = gql`
  mutation ($id: ID!) {
    deleteProductCartItem(id: $id) {
      id
    }
  }
`;
/**
 *
 * @param { { UI: ProductCartItemDeleteSimple } } param
 */
export default function ProductCartItemDelete({ UI, productCartItem }) {
  const [onDelete, { loading, error, data }] = useMutation(
    DELETE_PRODUCT_CARTITEM,
    {
      onCompleted: (data) => {
        refetchProductCartItem()();
      },
    },
  );
  const clickDelete = (e) => {
    if (!loading) onDelete({ variables: { id: productCartItem.id } });
  };
  return <UI clickDelete={clickDelete} loading={loading} />;
}
