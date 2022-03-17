import { Container, Heading, Text, VStack } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import Field from "../../../Field";
import { ArticleList } from "../List/Chak";
const Post = ({ post }) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  return (
    <section>
      <Container maxW="6xl">
        <article>
          <ArticleList allPosts={[post]} />
          <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
            <div style={{ maxWidth: "100%" }}>
              <Field>{post?.body}</Field>
            </div>
          </VStack>
        </article>
      </Container>
    </section>
  );
};
export default Post;
