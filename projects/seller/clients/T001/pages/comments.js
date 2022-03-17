import CommentsList from "@itoa/ui/Comment/List";
import CommentsListUI from "@itoa/ui/Comment/List/UI";
export default function Comments() {
  return (
    <CommentsList
      UI={CommentsListUI}
      // where={{ id: "612a10c73cf22ae3801fc6ed" }}
    />
  );
}
