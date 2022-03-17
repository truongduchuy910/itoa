import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { CommentListRefetch } from "../List";

export default function CommentDelete({ UI, id }) {
  const [onDelete, resultDelete] = useMutation(gql`
  mutation($id: ID!) {
    deleteComment(id: $id) {
      id
      content
    }
  }
  `);

  const clickDelete = (e) => {
    onDelete({
      variables: {
        id: id
      },
    })
      .then((data) => {
        CommentListRefetch()();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (resultDelete.loading) return "...";
  return (
    <UI
    clickDelete={clickDelete}
    />
  );
}
