import React from 'react';
import { TrashIcon } from '@primer/octicons-react';

export default function UI(props) {
  return (
    <span {...props}>
      <TrashIcon />
    </span>
  );
}
