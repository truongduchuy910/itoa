import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useMemo } from "react";
import trans from "@itoa/ui/utils/trans";
export const POST_QUERY = gql`
  query (
    $locale: String
    $hashtag: PostHashtagWhereInput
    $condition: PostWhereInput
  ) {
    allPostHashtags(where: $hashtag) {
      id
    }
    allPosts(first: 1, where: $condition) {
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
  } = useQuery(POST_QUERY, {
    variables: {
      condition: PostWhereInput,
      hashtag: PostHashtagWhereInput,
      locale,
    },
  });
  data = useMemo(() => trans(data), [variables, locale, loading]);

  const { allPosts = [] } = data;
  const [post = {}] = allPosts;
  console.log(post, PostWhereInput, error);
  return <UI post={post} />;
}
