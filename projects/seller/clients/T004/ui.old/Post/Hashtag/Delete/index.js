import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deletePostHashtag(id: $id) {
      id
      name
      color
      description
      prioritize
      image {
        publicUrl
      }
      url
    }
  }
`;

export default function PostHashtagDelete({ UI, children, posthashtag }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deletePostHashtag } = data;
  return (
    <UI posthashtag={posthashtag} on={on} deletePostHashtag={deletePostHashtag} /> ||
    children({ posthashtag, on, deletePostHashtag })
  );
}
