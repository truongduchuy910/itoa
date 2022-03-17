import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import UI from './UI';
export const IMAGEUPLOAD_DELETE = gql`
  mutation ($id: ID!) {
    deleteUploadImage(id: $id) {
      id
    }
  }
`;
export default function GalleryDelete({ refetch = () => {}, uploadImageId = null, style }) {
  const [onDeleteUploadImage, resultDeleteUploadImage] = useMutation(IMAGEUPLOAD_DELETE);

  return (
    <UI
      style={style}
      onClick={e => {
        onDeleteUploadImage({ variables: { id: uploadImageId } })
          .then(data => {
            console.log(data);
          })
          .catch(e => console.error(e))
          .finally(() => {
            console.log('refetch');
            refetch();
          });
      }}
    />
  );
}
