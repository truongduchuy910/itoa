/** @jsx jsx */
import { useMemo, useState } from 'react';
import { jsx } from '@emotion/core';
import { styles } from './styles';
import { FieldContainer, FieldLabel, FieldDescription } from '@arch-ui/fields';
import MDEditor from '@uiw/react-md-editor';
export default function MarkdownField({
  field,
  errors,
  value,
  onChange,
  isDisabled,
  preview: pre = false,
}) {
  const htmlID = `ks-input-${field.path}`;
  const accessError = errors.find(
    error => error instanceof Error && error.name === 'AccessDeniedError'
  );

  const [editor, setEditor] = useState();

  if (editor) {
    editor.refresh();
    setEditor(undefined);
  }

  if (accessError) return null;
  return (
    <FieldContainer
      css={[
        styles,
        {
          '.cm-s-mirrormark .CodeMirror-scroll': {
            padding: 0,
            marginBottom: '1em',
          },
        },
      ]}
    >
      <FieldLabel htmlFor={htmlID} field={field} errors={errors} />
      <FieldDescription text={field.adminDoc} />
      <MDEditor value={value} onChange={onChange} preview="edit" />
    </FieldContainer>
  );
}
// const args = /^# (.*$)/gim.exec(value || "");
// const title = args && args.length > 1 ? args[1] : null;
