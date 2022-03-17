import { Container, Heading, Text, VStack } from '@chakra-ui/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArticleList } from '../List/Chak';

const Post = ({ post }) => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const PostLink = ({ children, post }) => (
    <Link
      href={`/bai-viet/[hashtag]/[id]`}
      as={`/bai-viet/${post?.hashtags ? post?.hashtags[0]?.url : '_'}/${post.url}`}
    >
      <a>{children}</a>
    </Link>
  );
  return (
    <section>
      <Container maxW="6xl">
        <article>
          <ArticleList allPosts={[post]} PostLink={PostLink} />
          <div
            dangerouslySetInnerHTML={{
              __html: post?.body?.replace(/iframe/g, 'div'),
            }}
            style={{ maxWidth: '100%' }}
          />
        </article>
      </Container>
    </section>
  );
};
export default Post;
