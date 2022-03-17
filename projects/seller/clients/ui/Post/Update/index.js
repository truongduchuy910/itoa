import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: PostUpdateInput) {
    updatePost(id: $id, data: $data) {
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

export default function PostUpdate({ UI, children, post }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updatePost } = data;
  return (
    <UI post={post} on={on} updatePost={updatePost} /> ||
    children({ post, on, updatePost })
  );
}
