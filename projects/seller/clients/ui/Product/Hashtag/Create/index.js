import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: ProductHashtagCreateInput) {
    createProductHashtag(data: $data) {
      id
      name
      url
    }
  }
`;

export default function ProductHashtagCreate({ UI, children, producthashtag }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createProductHashtag } = data;
  return (
    <UI producthashtag={producthashtag} on={on} createProductHashtag={createProductHashtag} /> ||
    children({ producthashtag, on, createProductHashtag })
  );
}
