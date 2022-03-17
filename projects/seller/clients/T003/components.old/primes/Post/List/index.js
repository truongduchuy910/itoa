import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Loading from '../../../elements/Loading';
export const POSTS_QUERY = gql`
  query ($first: Int, $skip: Int, $condition: PostWhereInput, $sortBy: [SortPostsBy!]) {
    _allPostsMeta(where: $condition) {
      count
    }
    allPosts(first: $first, skip: $skip, where: $condition, sortBy: $sortBy) {
      id
      title
      thumbnail {
        publicUrl
      }
      description
      hashtags {
        id
        url
      }
      createdBy {
        name
        page {
          store
        }
      }
      createdAt
      url
    }
  }
`;
export const POSTS_VARS = { first: 6, skip: 0 };
const Posts = ({
  UI,
  first = POSTS_VARS.first,
  skip = POSTS_VARS.skip,
  PostWhereInput,
  sortBy,
}) => {
  const { data, error, loading, fetchMore } = useQuery(POSTS_QUERY, {
    variables: { first, skip, sortBy, condition: PostWhereInput },
  });
  const router = useRouter();
  const onClickPost = post => {
    router.push(`/bai-viet/[hashtag]/[id]`, `/bai-viet/${post?.hashtags[0]?.url}/${post.url}`);
  };
  const PostLink = ({ children, post }) => (
    <Link href={`/bai-viet/[hashtag]/[id]`} as={`/bai-viet/${post?.hashtags[0]?.url}/${post.url}`}>
      <a>{children}</a>
    </Link>
  );

  const onClickMore = () => {
    if (!loading)
      fetchMore({
        variables: { skip: data.allPosts.length },
        updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
          return {
            ...previousResult,
            allPosts: [...previousResult.allPosts, ...fetchMoreResult.allPosts],
          };
        },
      });
  };

  if (loading || error) return <Loading variant={{ height: 500 }} />;
  const { allPosts, _allPostsMeta } = data;
  return (
    <UI
      allPosts={allPosts}
      _allPostsMeta={_allPostsMeta}
      loading={loading}
      onClickPost={onClickPost}
      onClickMore={onClickMore}
      PostLink={PostLink}
    />
  );
};
export default Posts;
