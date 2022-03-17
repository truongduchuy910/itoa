/** @jsx jsx */
import { useMemo, useState } from 'react';
import { jsx } from '@emotion/core';
import { styles } from './styles';
import { gridSize, colors, borderRadius } from '@arch-ui/theme';
import { FieldContainer, FieldLabel, FieldDescription } from '@arch-ui/fields';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { getTools } from './get-tools';
import { ListProvider } from '@itoa/app-admin-ui/components';
import Toolbar from './Toolbar';
import Value from '../../../Value';

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
  const [tools, setTools] = useState([]);
  const [fn, setFn] = useState({
    toggleAround: () => {},
    toggleBefore: () => {},
  });
  const [editor, setEditor] = useState();

  if (editor) {
    editor.refresh();
    setEditor(undefined);
  }
  const [preview, setPreview] = useState(pre);
  const {
    config: { listKey, fileField, searchField },
  } = field;
  let relatedList = field.getListByKey(listKey);
  const toolbar = useMemo(() => {
    return (
      <ListProvider list={relatedList}>
        <Toolbar
          tools={tools}
          fn={fn}
          preview={preview}
          setPreview={setPreview}
          relatedList={relatedList}
          fileField={fileField}
          searchField={searchField}
        />
      </ListProvider>
    );
  }, [tools]);
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

      <div
        css={{
          border: `1px ${colors.N20} solid`,
          borderRadius,
          padding: `${gridSize}px`,
        }}
      >
        {toolbar}
        {preview ? (
          <Value>{value}</Value>
        ) : (
          <CodeMirror
            value={value}
            onBeforeChange={(editor, data, value) => {
              onChange(value);
            }}
            options={{
              mode: 'gfm',
              theme: 'default mirrormark',
              tabSize: '2',
              lineWrapping: true,
              addModeClass: true,
              readOnly: isDisabled,
            }}
            editorDidMount={(editor, _value, cb) => {
              cb();
              const { tools, toggleAround, toggleBefore } = getTools(editor);
              setTools(tools);
              setFn({ toggleAround, toggleBefore });
            }}
          />
        )}
      </div>
    </FieldContainer>
  );
}
// const args = /^# (.*$)/gim.exec(value || "");
// const title = args && args.length > 1 ? args[1] : null;
