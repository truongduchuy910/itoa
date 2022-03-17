import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo } from "react";
import trans from "@itoa/ui/utils/trans";
import { Skeleton } from "@chakra-ui/react";
export const POSTS_QUERY = gql`
  query (
    $locale: String
    $first: Int
    $skip: Int
    $condition: PostWhereInput
    $sortBy: [SortPostsBy!]
  ) {
    _allPostsMeta(where: $condition) {
      count
    }
    allPosts(first: $first, skip: $skip, where: $condition, sortBy: $sortBy) {
      # translate
      _trans: translations(where: { lang: $locale }) {
        fieldName
        content
      }
      id
      title
      thumbnail {
        publicUrl
      }
      description
      hashtags {
        # translate
        _trans: translations(where: { lang: $locale }) {
          fieldName
          content
        }
        id
        url
        name
      }
      createdBy {
        name
      }
      createdAt
      url
    }
  }
`;

const Posts = ({
  UI,
  first = 6,
  skip = 0,
  PostWhereInput,
  sortBy,
  ...props
}) => {
  const router = useRouter();
  const { locale } = router;
  var {
    data = {},
    error,
    loading,
    fetchMore,
    variables,
  } = useQuery(POSTS_QUERY, {
    variables: { first, skip, sortBy, condition: PostWhereInput, locale },
  });
  const onClickPost = (post) => {
    router.push(
      `/bai-viet/[category]/[id]`,
      `/bai-viet/${post?.hashtags[0]?.url}/${post.url}`,
    );
  };
  data = useMemo(() => trans(data), [variables, locale, loading]);
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
  return allPosts?.length ? (
    <UI
      allPosts={allPosts}
      _allPostsMeta={_allPostsMeta}
      loading={loading}
      onClickPost={onClickPost}
      onClickMore={onClickMore}
      {...props}
    />
  ) : (
    <Skeleton />
  );
};
export default Posts;
