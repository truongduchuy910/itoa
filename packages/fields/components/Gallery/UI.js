import DocTitle from '@itoa/app-admin-ui/client/components/DocTitle';
import { HeaderInset } from '@itoa/app-admin-ui/client/pages/Home/components';
import React, { useState } from 'react';
import { Container } from '@arch-ui/layout';
import { PageTitle } from '@arch-ui/typography';
import GalleryDelete from './Delete';
import { ArrowDownIcon } from '@primer/octicons-react';
export default function UI({
  setKeyword,
  clickMore,
  allUploadImages = [],
  clickImage = () => {},
  showDelete,
  refetch,
  style,
  fileField,
  onClose,
}) {
  const [time, setTime] = useState();
  /**
   * @param {Event} e
   */
  function changeKeyword(e) {
    clearTimeout(time);
    setTime(
      setTimeout(() => {
        setKeyword(e.target.value);
      }, 500)
    );
  }
  return (
    <main style={style}>
      <div
        style={{
          position: 'fixed',
          height: '100vh',
          width: '100vw',
          top: 0,
          left: 0,
          zIndex: 2,
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.15)',
            padding: 100,
          }}
        >
          <div
            className="container-lg"
            style={{
              height: '100%',
              backgroundColor: 'white',
              zIndex: 3,
              borderRadius: 6,
              boxShadow: `0px 2px 5px 0px rgb(9 30 66 / 12%)`,
              transition: `box-shadow 111ms ease-out,transform 111ms ease-out`,
              padding: 13,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div style={{ flex: 1, overflowY: 'scroll' }}>
              {/**
               * BODY
               */}
              <DocTitle title="Kho ảnh" />
              <Container>
                <HeaderInset>
                  <PageTitle>Kho ảnh</PageTitle>
                </HeaderInset>
                <input
                  style={{
                    background: '#EBECF0',
                    border: '0',
                    borderRadius: '6px',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                    fontSize: '1.0rem',
                    minWidth: '1px',
                    padding: '8px 12px',
                    margin: 0,
                    marginBottom: 13,
                    outline: 'none',
                  }}
                  onChange={changeKeyword}
                  placeholder="Tìm kiếm..."
                />
                <div className="container-lg clearfix">
                  {allUploadImages.map(uploadImage => {
                    return (
                      <div
                        key={uploadImage.id}
                        className="col-sm-6 col-md-4 col-lg-3 p-2 float-left"
                      >
                        <div className="position-relative border p-2">
                          <img
                            src={uploadImage[fileField]?.publicUrl}
                            style={{ width: '100%' }}
                            onClick={() => clickImage(uploadImage)}
                          />
                          <small className="text-center">
                            {showDelete && (
                              <GalleryDelete
                                uploadImageId={uploadImage?.id}
                                style={{ marginRight: 5, cursor: 'pointer' }}
                                refetch={refetch}
                              />
                            )}
                            {uploadImage?.alt?.slice(0, 20)}
                          </small>
                        </div>
                      </div>
                    );
                  })}
                  <div className="col-sm-6 col-md-4 col-lg-3 p-2 float-left" onClick={clickMore}>
                    <div
                      className="position-relative border p-5 d-flex justify-content-center align-items-center"
                      style={{ cursor: 'pointer' }}
                    >
                      <ArrowDownIcon /> Tải thêm
                    </div>
                  </div>
                </div>
              </Container>
            </div>
            <div className="pt-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* <button className="btn btn-primary mr-3" onClick={clickSave} disabled={isSave}>
                {loading ? 'Đang tải...' : 'Lưu bản dịch'}
              </button> */}

              <button
                className="btn ml-auto"
                onClick={event => {
                  event.preventDefault();
                  onClose(event);
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
