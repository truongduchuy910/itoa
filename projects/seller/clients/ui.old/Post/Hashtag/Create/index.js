import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: PostHashtagCreateInput) {
    createPostHashtag(data: $data) {
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

export default function PostHashtagCreate({ UI, children, posthashtag }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createPostHashtag } = data;
  return (
    <UI posthashtag={posthashtag} on={on} createPostHashtag={createPostHashtag} /> ||
    children({ posthashtag, on, createPostHashtag })
  );
}
