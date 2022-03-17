import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
export const POSTS_QUERY = gql`
  query PostList(
    $first: Int
    $skip: Int
    $postWhereInput: PostWhereInput
    $sortBy: [SortPostsBy!]
  ) {
    _allPostsMeta(where: $postWhereInput) {
      count
    }
    allPosts(
      first: $first
      skip: $skip
      where: $postWhereInput
      sortBy: $sortBy
    ) {
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
  postWhereInput,
  sortBy,
}) => {
  const {
    data = {},
    error,
    loading,
    fetchMore,
  } = useQuery(POSTS_QUERY, {
    variables: {
      first,
      skip,
      sortBy,
      postWhereInput,
    },
  });
  const router = useRouter();
  const onClickPost = (post) => {
    router.push(
      `/bai-viet/[category]/[id]`,
      `/bai-viet/${post?.hashtags[0]?.url}/${post.url}`
    );
  };
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

  const { allPosts, _allPostsMeta } = data;
  return (
    <UI
      allPosts={allPosts}
      _allPostsMeta={_allPostsMeta}
      error={error}
      loading={loading}
      onClickPost={onClickPost}
      onClickMore={onClickMore}
    />
  );
};
export default Posts;
