import { Box, SimpleGrid } from "@chakra-ui/react";
import { Fragment } from "react";
import CommentCreate from "@itoa/ui/Comment/Create";
import CommentCreateUI from "@itoa/ui/Comment/Create/UI";

function CommentItem({ comment }) {
  return (
    <Box shadow="lg" p={2}>
      {comment.content}
      <CommentListUI allComments={comment.replies} />
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
