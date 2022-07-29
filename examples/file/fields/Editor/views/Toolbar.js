/** @jsx jsx */
import { forwardRef, useEffect, Fragment, useState, useRef } from 'react';
import { gql, useApolloClient } from '@apollo/client';
import { jsx } from '@emotion/core';
import { CreateItemModal, useList } from '@itoa/app-admin-ui/components';
import { EyeIcon, PencilIcon, UploadIcon, SmileyIcon, FileMediaIcon } from '@primer/octicons-react';
import { gridSize, colors } from '@arch-ui/theme';
import { A11yText } from '@arch-ui/typography';
import Tooltip from '@arch-ui/tooltip';
// import 'codemirror';
// import 'codemirror/mode/markdown/markdown';
// import 'codemirror/mode/gfm/gfm';
// import Gallery from '../../../../components/Gallery';
import EmojiPicker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react';
const ToolbarButton = forwardRef((props, ref) => {
  return (
    <button
      type="button"
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 0,
        cursor: 'pointer',
        fontSize: 16,
        outline: 'none',
      }}
      ref={ref}
      {...props}
    />
  );
});

const IconToolbarButton = ({
  isActive,
  label,
  icon,
  value,
  tooltipPlacement = 'top',
  ...props
}) => {
  return (
    <Tooltip placement={tooltipPlacement} css={{ margin: gridSize * 2 }} content={label}>
      {ref => (
        <ToolbarButton
          type="button"
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: 0,
            cursor: 'pointer',
            fontSize: 16,
            outline: 'none',
          }}
          ref={ref}
          {...props}
        >
          {icon}
          <A11yText>{label}</A11yText>
          <span style={{ marginLeft: 5 }}>{value}</span>
        </ToolbarButton>
      )}
    </Tooltip>
  );
};
export default function Toolbar({
  tools,
  fn,
  relatedList,
  preview,
  setPreview,
  fileField,
  searchField,
}) {
  const client = useApolloClient();
  const { openCreateItemModal } = useList();
  /**
   * @param {Event} e
   */
  function clickUpload(e) {
    openCreateItemModal(e);
  }
  const [isOpenGallery, setIsOpenGallery] = useState(false);
  const [isOpenEmoji, setIsOpenEmoji] = useState(false);
  function insertUploadImage(UploadImage) {
    client
      .query({
        query: gql`
    query ($id: ID!) {
      ${relatedList.key}(where: { id: $id }) {
        id
        ${fileField} {
          publicUrl
        }
        ${searchField}
      }
    }
  `,
        variables: { id: UploadImage.id },
      })
      .then(({ data }) => {
        if (data[relatedList.key]) {
          const search = data[relatedList.key][searchField];
          const src = encodeURI(data[relatedList.key][fileField].publicUrl);
          fn.toggleAround('\n![', `${search || src}](${src})\n`);
        }
      })
      .catch(e => {
        console.error(e);
      });
  }

  var prefillData = relatedList.fields;
  const refFrame = useRef();
  function handleClickOutside(event) {
    if (refFrame && refFrame.current && !refFrame.current.contains(event.target)) {
      setIsOpenGallery(false);
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  });
  function clickImage(uploadImage) {
    setIsOpenGallery(false);
    insertUploadImage(uploadImage);
  }
  function createImage({ data }) {
    insertUploadImage(data[relatedList.gqlNames.createMutationName]);
  }

  /**
   *
   * @param {Event} event
   * @param {Object} emoji
   */
  function onEmojiClick(event, emoji) {
    fn.toggleAround(' ', emoji?.emoji);
    setIsOpenEmoji(false);
  }
  /**
   * @param {Event} e
   */
  function clickPreview() {
    setPreview(preview => !preview);
  }
  /**
   * @param {Event} e
   */
  function clickImagePicker(e) {
    console.log(e.target.value);
    setIsOpenGallery(true);
  }
  /**
   * @param {Event} e
   */
  function clickEmojiPicker(e) {
    console.log(e.target.value);
    setIsOpenEmoji(status => !status);
  }
  return (
    <Fragment>
      <div
        css={{
          display: 'flex',
          padding: `${gridSize}px 0`,
          borderBottom: `1px solid ${colors.N10}`,
          marginBottom: `${gridSize}px`,
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
        }}
      >
        <IconToolbarButton
          icon={preview ? <PencilIcon /> : <EyeIcon />}
          onClick={clickPreview}
          label={preview ? 'Sửa' : 'Xem'}
        />
        {!preview && (
          <Fragment>
            <IconToolbarButton
              icon={<FileMediaIcon />}
              onClick={clickImagePicker}
              label={'Chọn hình có sẵn'}
            />
            <IconToolbarButton
              icon={<SmileyIcon />}
              onClick={clickEmojiPicker}
              label={'Chọn hình có sẵn'}
            />
            <IconToolbarButton icon={<UploadIcon />} onClick={clickUpload} label={'Tải ảnh lên'} />
            <span style={{ marginLeft: 13, marginRight: 13 }}>|</span>
            {tools.map(({ action, label, icon: Icon, isHide }) => {
              return (
                !isHide && (
                  <IconToolbarButton key={label} icon={<Icon />} onClick={action} label={label} />
                )
              );
            })}
          </Fragment>
        )}
      </div>

      <CreateItemModal prefillData={prefillData} onCreate={createImage} />

      {/* {isOpenGallery && (
        <Gallery
          clickImage={clickImage}
          searchField={searchField}
          fileField={fileField}
          relatedList={relatedList}
          onClose={() => {
            setIsOpenGallery(false);
          }}
        />
      )} */}
      {isOpenEmoji && (
        <div style={{ position: 'absolute', zIndex: 14 }}>
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            disableSkinTonePicker
            skinTone={SKIN_TONE_NEUTRAL}
            disableSearchBar
            native
            preload
            disableAutoFocus={false}
            groupVisibility={{
              recently_used: false,
            }}
          />
        </div>
      )}
    </Fragment>
  );
}
