import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { CommentListRefetch } from "../List";

export const mutation = gql`
  mutation ($data: CommentCreateInput) {
    createComment(data: $data) {
      id
      content
    }
  }
`;

export default function CommentCreate({ UI, children, comment }) {
  const commentListRefetch = useReactiveVar(CommentListRefetch);
  const [on, { loading, error, data = {} }] = useMutation(mutation, {
    onCompleted: (data) => {
      commentListRefetch();
    },
  });
  if (loading) return "...";
  if (error) return error.message;
  const { createComment } = data;
  return (
    <UI comment={comment} on={on} createComment={createComment} /> ||
    children({ comment, on, createComment })
  );
}
