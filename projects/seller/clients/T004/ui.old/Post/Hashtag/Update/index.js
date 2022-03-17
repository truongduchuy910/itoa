import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: PostHashtagUpdateInput) {
    updatePostHashtag(id: $id, data: $data) {
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

export default function PostHashtagUpdate({ UI, children, posthashtag }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updatePostHashtag } = data;
  return (
    <UI posthashtag={posthashtag} on={on} updatePostHashtag={updatePostHashtag} /> ||
    children({ posthashtag, on, updatePostHashtag })
  );
}
