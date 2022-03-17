import { useRouter } from 'next/router';
import Posts from '../../../components/primes/Post/Item';
import PostsChak from '../../../components/primes/Post/Item/Chak';
const Post = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  return (
    <section>
      <Posts UI={PostsChak} PostWhereInput={{ url: id }} />
    </section>
  );
};
export default Post;
