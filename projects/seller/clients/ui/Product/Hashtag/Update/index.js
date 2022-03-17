import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ProductHashtagUpdateInput) {
    updateProductHashtag(id: $id, data: $data) {
      id
      name
      url
    }
  }
`;

export default function ProductHashtagUpdate({ UI, children, producthashtag }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateProductHashtag } = data;
  return (
    <UI producthashtag={producthashtag} on={on} updateProductHashtag={updateProductHashtag} /> ||
    children({ producthashtag, on, updateProductHashtag })
  );
}
