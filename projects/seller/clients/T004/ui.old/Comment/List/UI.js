import { Box, SimpleGrid, Link } from "@chakra-ui/react";
import { Fragment } from "react";
import CommentCreate from "@itoa/ui/Comment/Create";
import CommentCreateUI from "@itoa/ui/Comment/Create/UI";
import CommentUpdate from "@itoa/ui/Comment/Update";
import CommentUpdateUI from "@itoa/ui/Comment/Update/UI";
import CommentDelete from "@itoa/ui/Comment/Delete";
import CommentDeleteUI from "@itoa/ui/Comment/Delete/UI";

function CommentItem({ comment }) {
  return (
    <Box shadow="lg" p={2}>
      {comment.content}
      <CommentListUI allComments={comment.replies} />
      <CommentUpdate UI={CommentUpdateUI} comment={comment} />
      <CommentDelete UI={CommentDeleteUI} id={comment.id} />
    </Box>
  );
}
export default function CommentListUI({ allComments = [], _allCommentsMeta }) {
  return (
    <Fragment>
      <SimpleGrid gap={2} px={4}>
        {allComments.map((comment) => {
          return <CommentItem key={comment.id} comment={comment} />;
        })}
      </SimpleGrid>
      {/*  */}
      <CommentCreate UI={CommentCreateUI} />
    </Fragment>
  );
}
