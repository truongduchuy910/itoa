import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Fragment, useMemo } from "react";
import trans from "@itoa/ui/utils/trans";
import { NewsArticleJsonLd } from "next-seo";
import Head from "next/head";
export const POST_ITEM_QUERY = gql`
  query (
    $locale: String
    $hashtag: PostHashtagWhereInput
    $condition: PostWhereInput
  ) {
    allPostHashtags(where: $hashtag) {
      id
    }
    allPosts(first: 1, where: $condition, sortBy: prioritize_DESC) {
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
      hashtags {
        id
        url
      }
      body
      content
      createdAt
      description
      url
      createdBy {
        id
        name
      }
    }
  }
`;
export default function PostItem({
  UI,
  PostWhereInput,
  PostHashtagWhereInput,
}) {
  const router = useRouter();
  const { locale } = router;
  var {
    loading,
    error,
    data = {},
    variables,
  } = useQuery(POST_ITEM_QUERY, {
    variables: {
      condition: PostWhereInput,
      hashtag: PostHashtagWhereInput,
      locale,
    },
  });
  data = useMemo(() => trans(data), [data]);

  const { allPosts = [] } = data;
  const [post = {}] = allPosts;

  const { hashtags = [] } = post;
  const [hashtag = {}] = hashtags;
  return (
    <Fragment>
      {/* <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsArticle",
              url: `/bai-viet/${hashtag.url}/${post.url}`,
              articleBody: post.content,
              datePublished: post.createdAt,
            }),
          }}
        />
      </Head> */}

      <UI post={post} />
    </Fragment>
  );
}
