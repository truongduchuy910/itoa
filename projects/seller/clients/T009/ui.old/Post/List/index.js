import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";
import trans from "@itoa/ui/utils/trans";
import { Skeleton } from "@chakra-ui/react";
import { NewsArticleJsonLd } from "next-seo";
import Head from "next/head";
export const POSTS_QUERY = gql`
  #post.list
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
      content
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
      `/bai-viet/${post?.hashtags[0]?.url}/${post.url}`
    );
  };
  data = useMemo(
    () => trans(data),
    [variables, locale, loading, data?.allPosts?.length]
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

  const { allPosts, _allPostsMeta } = data;
  return allPosts?.length ? (
    <Fragment>
      <Head>
        {allPosts.map((post) => {
          <script 
          key={post.id}
          type="application/ld+json"  
            dangerouslySetInnerHTML={​​​​​​​​{
              ​​​​​​​​ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              "articleBody": post.content,
              "datePublished":post.createdAt,
           }), 
          }​​​​​​​​}
        />;
      })}
      </Head>

      <UI
        allPosts={allPosts}
        _allPostsMeta={_allPostsMeta}
        loading={loading}
        onClickPost={onClickPost}
        onClickMore={onClickMore}
        {...props}
      />
    </Fragment>
  ) : (
    <Skeleton />
  );
};
export default Posts;
