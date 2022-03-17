import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteProductHashtag(id: $id) {
      id
      name
      url
    }
  }
`;

export default function ProductHashtagDelete({ UI, children, producthashtag }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteProductHashtag } = data;
  return (
    <UI producthashtag={producthashtag} on={on} deleteProductHashtag={deleteProductHashtag} /> ||
    children({ producthashtag, on, deleteProductHashtag })
  );
}
