import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deletePost(id: $id) {
      id
      title
      thumbnail {
        publicUrl
      }
      content
      embed
      description
      keywords
      url
      body
    }
  }
`;

export default function PostDelete({ UI, children, post }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deletePost } = data;
  return (
    <UI post={post} on={on} deletePost={deletePost} /> ||
    children({ post, on, deletePost })
  );
}
