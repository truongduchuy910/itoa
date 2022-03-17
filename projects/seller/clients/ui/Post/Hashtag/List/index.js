import { gql, makeVar, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useMemo } from "react";
import trans from "@itoa/ui/utils/trans";

export const query = gql`
  query (
    $locale: String
    $first: Int
    $skip: Int
    $where: PostHashtagWhereInput
  ) {
    _allPostHashtagsMeta(where: $where) {
      count
    }
    allPostHashtags(
      first: $first
      skip: $skip
      where: $where
      sortBy: prioritize_DESC
    ) {
      # translate
      _trans: translations(where: { lang: $locale }) {
        fieldName
        content
      }
      _childsMeta {
        count
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
      childs {
        # translate
        _trans: translations(where: { lang: $locale }) {
          fieldName
          content
        }
        _childsMeta {
          count
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
  }
`;

export default function PostHashtagList({
  UI,
  children,
  first = 12,
  skip,
  where,
  ...props
}) {
  const router = useRouter();
  const { locale } = router;
  var {
    data = {},
    error,
    loading,
    fetchMore,
    refetch,
    variables,
  } = useQuery(query, {
    variables: { first, skip, where, locale },
  });
  data = useMemo(() => trans(data), [loading, variables, locale]);
  const { allPostHashtags = [], _allPostHashtagsMeta = {} } = data;
  const count = allPostHashtags.length;

  function clickMore(e) {
    if (loading || error) return;
    if (_allPostHashtagsMeta.count <= count) return;
    fetchMore({
      variables: { skip: count },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          ...previousResult,
          allPostHashtags: [
            ...previousResult.allPostHashtags,
            ...fetchMoreResult.allPostHashtags,
          ],
        };
      },
    });
  }
  function clickToggle(e) {
    setIsOpen((isOpen) => !isOpen);
    refetch({ first: isOpen ? first : null, skip, where });
  }

  return (
    <UI
      {...props}
      allPostHashtags={allPostHashtags}
      _allPostHashtagsMeta={_allPostHashtagsMeta}
      clickMore={clickMore}
      clickToggle={clickToggle}
      first={first}
    />
  );
}
