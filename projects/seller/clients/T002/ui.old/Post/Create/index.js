import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: PostCreateInput) {
    createPost(data: $data) {
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

export default function PostCreate({ UI, children, post }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createPost } = data;
  return (
    <UI post={post} on={on} createPost={createPost} /> ||
    children({ post, on, createPost })
  );
}
