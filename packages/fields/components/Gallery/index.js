import React, { useState } from 'react';
import UI from './UI';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
export default function Gallery({
  clickImage,
  showDelete = false,
  onClose,
  searchField,
  fileField,
  relatedList,
}) {
  const [keyword, setKeyword] = useState(null);
  const where = keyword ? { [`${searchField}_contains_i`]: keyword } : {};
  console.log(where, relatedList);
  const resultAllImages = useQuery(
    gql`
      query ($where: ${relatedList.gqlNames.whereInputName}, $skip: Int) {
        ${relatedList.gqlNames.listQueryName}(first: 25, skip: $skip, where: $where) {
          id
          ${fileField} {
            publicUrl
          }
          ${searchField}
        }
      }
    `,
    {
      variables: {
        where,
      },
    }
  );
  function clickMore(e) {
    if (!resultAllImages.loading) {
      resultAllImages.fetchMore({
        variables: { skip: resultAllImages.data[relatedList.gqlNames.listQueryName].length },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            ...previousResult,
            [relatedList.gqlNames.listQueryName]: [
              ...previousResult[relatedList.gqlNames.listQueryName],
              ...fetchMoreResult[relatedList.gqlNames.listQueryName],
            ],
          };
        },
      });
    }
  }
  const allUploadImages = (resultAllImages.data || resultAllImages.previousData || {})[
    relatedList.gqlNames.listQueryName
  ];
  return (
    <UI
      setKeyword={setKeyword}
      allUploadImages={allUploadImages}
      clickMore={clickMore}
      clickImage={clickImage}
      showDelete={showDelete}
      refetch={resultAllImages.refetch}
      fileField={fileField}
      onClose={onClose}
    />
  );
}
