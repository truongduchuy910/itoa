import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { CommentListRefetch } from "../List";

export default function CommentUpdate({ UI, comment }) {
  const [onUpdate, resultUpdate] = useMutation(gql`
  mutation($id: ID!, $data: CommentUpdateInput) {
    updateComment(id: $id, data: $data ) {
      id
      content
    }
  }
  `);

  const [content, setContent] = useState("");
  const changeInput = (e) => {
    const content = e.target.value;
    setContent(content);
  };

  const clickUpdate = (e) => {
    onUpdate({
      variables: {
        id: comment.id,
        data: {content: content},
      },
    })
      .then((data) => {
        CommentListRefetch()();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  if (resultUpdate.loading) return "...";
  return (
    <UI
      changeInput={changeInput}
      clickUpdate={clickUpdate}
      comment={comment}
    />
  );
}
