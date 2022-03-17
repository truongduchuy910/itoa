import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useMemo } from "react";
import trans from "@itoa/ui/utils/trans";

export const query = gql`
  query ($locale: String, $id: ID!) {
    PostHashtag(where: { id: $id }) {
      # translate
      _trans: translations(where: { lang: $locale }) {
        fieldName
        content
      }
      id
      name
      color
      description
      prioritize
      image {
        publicUrl
      }
      url
    }
  }
`;

export default function PostHashtagItem({ id, UI, children }) {
  if (!id) return "id required";
  const router = useRouter();
  const { locale } = router;
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  data = useMemo(() => trans(data), [data]);

  if (loading) return "...";
  if (error) return error.message;
  const { PostHashtag: posthashtag } = data;
  return <UI posthashtag={posthashtag} /> || children({ posthashtag });
}
