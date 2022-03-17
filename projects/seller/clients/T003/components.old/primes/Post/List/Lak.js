import { createRef, Fragment, useEffect, useRef, useState } from 'react';

const Lak = () => {
  const container = useRef(null);
  const content = useRef(null);
  const item = useRef(null);

  const [translate, setTranslate] = useState(0);
  useEffect(() => {
    const ani = setInterval(() => {
      setTranslate(translate =>
        translate < content.current?.offsetWidth ? translate + container.current?.offsetWidth : 0
      );
    }, 2000);
    return () => {
      clearInterval(ani);
    };
  });
  const onClickRight = () => {
    setTranslate(translate =>
      translate <= content.current?.offsetWidth ? translate + item.current?.offsetWidth : 0
    );
  };
  const onClickLeft = () => {
    setTranslate(translate => (translate > 0 ? translate - item.current?.offsetWidth : 0));
  };
  return (
    <Fragment>
      <section id="home-articles">
        <div className="container">
          <div className="row">
            <div className="col-12"></div>
            <div className="grid">
              <div
                ref={container}
                id="owl-home-articles-slider"
                className="owl-carousel owl-theme owlDesign owl-loaded"
              >
                <div className="owl-stage-outer">
                  <div
                    ref={content}
                    className="owl-stage"
                    style={{
                      transform: `translate3d(-${translate}px, 0px, 0px)`,
                      transition: 'all 1s ease 0s',
                      width: '6400px',
                    }}
                  >
                    <div
                      ref={item}
                      className="owl-item cloned"
                      style={{ width: '370px', marginRight: '30px' }}
                    >
                      <div className="item grid__item">
                        <a href="/lakshop-x-jury-1" className="article-item text-center">
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/screen-shot-2019-03-15-at-12-16-59.png?v=1552627047947"
                              data-src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/screen-shot-2019-03-15-at-12-16-59.png?v=1552627047947"
                              alt="LAKSHOP x JURY (1)"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">LAKSHOP x JURY (1)</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 15/03/2019
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc">...</div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{ width: '370px', marginRight: '30px' }}
                    >
                      <div className="item grid__item">
                        <a href="/lakshop-x-park-hill" className="article-item text-center">
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/1-28947e8d-d92b-41f3-8705-723152c1e898.jpg?v=1552897498610"
                              data-src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/1-28947e8d-d92b-41f3-8705-723152c1e898.jpg?v=1552897498610"
                              alt="LAKSHOP x PARK HILL"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">LAKSHOP x PARK HILL</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 15/03/2019
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{ width: '370px', marginRight: '30px' }}
                    >
                      <div className="item grid__item">
                        <a href="/lakshop-x-song-hong" className="article-item text-center">
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/1.jpg?v=1552896922123"
                              data-src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/1.jpg?v=1552896922123"
                              alt="LAKSHOP x SÔNG HỒNG"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">LAKSHOP x SÔNG HỒNG</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 15/03/2019
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: '370px', marginRight: '30px' }}
                    >
                      <div className="item grid__item">
                        <a
                          href="/balmain-spring-2020-menswear"
                          className="article-item text-center"
                        >
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="https://assets.vogue.com/photos/5d41ae9ea580b0000893aa18/master/pass/_ALE0575.jpg"
                              data-src="https://assets.vogue.com/photos/5d41ae9ea580b0000893aa18/master/pass/_ALE0575.jpg"
                              alt="BALMAIN SPRING 2020 MENSWEAR"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">BALMAIN SPRING 2020 MENSWEAR</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 20/02/2020
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc">...</div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: '370px', marginRight: '30px' }}
                    >
                      <div className="item grid__item">
                        <a
                          href="/louis-vuitton-fall-2020-menswear"
                          className="article-item text-center"
                        >
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="https://assets.vogue.com/photos/5e206fcbbd980b00088121ca/master/pass/_ALE0252.jpg"
                              data-src="https://assets.vogue.com/photos/5e206fcbbd980b00088121ca/master/pass/_ALE0252.jpg"
                              alt="Louis Vuitton FALL 2020 MENSWEAR"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">Louis Vuitton FALL 2020 MENSWEAR</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 20/02/2020
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc">...</div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{ width: '370px', marginRight: '30px' }}
                    >
                      <div className="item grid__item">
                        <a
                          href="/dior-men-pre-fall-2020-menswear"
                          className="article-item text-center"
                        >
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="https://assets.vogue.com/photos/5de71284a326fe0008f9e749/master/pass/IS5_0663.jpg"
                              data-src="https://assets.vogue.com/photos/5de71284a326fe0008f9e749/master/pass/IS5_0663.jpg"
                              alt="DIOR MEN PRE-FALL 2020 MENSWEAR"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">DIOR MEN PRE-FALL 2020 MENSWEAR</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 20/02/2020
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc">...</div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="owl-item" style={{ width: '370px', marginRight: '30px' }}>
                      <div className="item grid__item">
                        <a
                          href="/gucci-fall-2020-ready-to-wear"
                          className="article-item text-center"
                        >
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="https://assets.vogue.com/photos/5e4d7ec1f069330008081462/master/pass/00019-Gucci-Fall-20-RTW-GORUNWAY.jpg"
                              data-src="https://assets.vogue.com/photos/5e4d7ec1f069330008081462/master/pass/00019-Gucci-Fall-20-RTW-GORUNWAY.jpg"
                              alt="GUCCI FALL 2020 READY-TO-WEAR"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">GUCCI FALL 2020 READY-TO-WEAR</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 20/02/2020
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="owl-item" style={{ width: '370px', marginRight: '30px' }}>
                      <div className="item grid__item">
                        <a href="/lakshop-x-guangzhou-opera" className="article-item text-center">
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="https://scontent.fhan3-2.fna.fbcdn.net/v/t31.0-8/18527304_1339701376117869_2307836212889000932_o.jpg?_nc_cat=103&_nc_oc=AQmP1MHmvsCnjaKuylw63nRVvPdN5igWE1iYTAdlQBOwsX3IrmU7Qq6L3XGZTWrm2hw&_nc_ht=scontent.fhan3-2.fna&oh=60840b1fe2eb8904e2aadd233de5c7c0&oe=5D25BDE0"
                              data-src="https://scontent.fhan3-2.fna.fbcdn.net/v/t31.0-8/18527304_1339701376117869_2307836212889000932_o.jpg?_nc_cat=103&_nc_oc=AQmP1MHmvsCnjaKuylw63nRVvPdN5igWE1iYTAdlQBOwsX3IrmU7Qq6L3XGZTWrm2hw&_nc_ht=scontent.fhan3-2.fna&oh=60840b1fe2eb8904e2aadd233de5c7c0&oe=5D25BDE0"
                              alt="LAKSHOP x GUANGZHOU OPERA"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">LAKSHOP x GUANGZHOU OPERA</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 17/03/2019
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc">...</div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="owl-item" style={{ width: '370px', marginRight: '30px' }}>
                      <div className="item grid__item">
                        <a href="/lakshop-x-guangzhou" className="article-item text-center">
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="https://scontent.fhan4-1.fna.fbcdn.net/v/t31.0-8/18121580_1321889611232379_7489372040733297924_o.jpg?_nc_cat=105&_nc_oc=AQkJBX3MWT0dSGMz-xFChauAeGKaItEDoFlL_Y4ZC3p8_NWpR2PBjBVNgPQGF31lttM&_nc_ht=scontent.fhan4-1.fna&oh=f5bcc26713aa22461a82a21640d55b03&oe=5D4EE244"
                              data-src="https://scontent.fhan4-1.fna.fbcdn.net/v/t31.0-8/18121580_1321889611232379_7489372040733297924_o.jpg?_nc_cat=105&_nc_oc=AQkJBX3MWT0dSGMz-xFChauAeGKaItEDoFlL_Y4ZC3p8_NWpR2PBjBVNgPQGF31lttM&_nc_ht=scontent.fhan4-1.fna&oh=f5bcc26713aa22461a82a21640d55b03&oe=5D4EE244"
                              alt="LAKSHOP x JURY (2)"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">LAKSHOP x JURY (2)</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 17/03/2019
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc">
                              Glad to have an old frend from come over to china and take a photos ,
                              just as we did 2015 in Hanoi with 'THU HÀ NỘI LOOKBOOK" Xem full album
                              =&gt; goo.gl/hVDlQK ------------------------------- ...
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="owl-item" style={{ width: '370px', marginRight: '30px' }}>
                      <div className="item grid__item">
                        <a href="/winter" className="article-item text-center">
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="https://scontent.fhan4-1.fna.fbcdn.net/v/t31.0-8/14711153_1124186761002666_2383127358853210017_o.jpg?_nc_cat=104&_nc_oc=AQmcyyFJ-J1BUVmhaPjy1GWV-qLuZkOTgWu7xdHimaQfmH8lET8dqBt0BzsWyITmlts&_nc_ht=scontent.fhan4-1.fna&oh=ba5c1626393851825cfb5b51db3c730b&oe=5D0E4E40"
                              data-src="https://scontent.fhan4-1.fna.fbcdn.net/v/t31.0-8/14711153_1124186761002666_2383127358853210017_o.jpg?_nc_cat=104&_nc_oc=AQmcyyFJ-J1BUVmhaPjy1GWV-qLuZkOTgWu7xdHimaQfmH8lET8dqBt0BzsWyITmlts&_nc_ht=scontent.fhan4-1.fna&oh=ba5c1626393851825cfb5b51db3c730b&oe=5D0E4E40"
                              alt="LAK SHOP x WINTER"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">LAK SHOP x WINTER</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 17/03/2019
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="owl-item" style={{ width: '370px', marginRight: '30px' }}>
                      <div className="item grid__item">
                        <a href="/lakshop-x-jury-1" className="article-item text-center">
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/screen-shot-2019-03-15-at-12-16-59.png?v=1552627047947"
                              data-src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/screen-shot-2019-03-15-at-12-16-59.png?v=1552627047947"
                              alt="LAKSHOP x JURY (1)"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">LAKSHOP x JURY (1)</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 15/03/2019
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc">...</div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="owl-item" style={{ width: '370px', marginRight: '30px' }}>
                      <div className="item grid__item">
                        <a href="/lakshop-x-park-hill" className="article-item text-center">
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/1-28947e8d-d92b-41f3-8705-723152c1e898.jpg?v=1552897498610"
                              data-src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/1-28947e8d-d92b-41f3-8705-723152c1e898.jpg?v=1552897498610"
                              alt="LAKSHOP x PARK HILL"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">LAKSHOP x PARK HILL</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 15/03/2019
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="owl-item" style={{ width: '370px', marginRight: '30px' }}>
                      <div className="item grid__item">
                        <a href="/lakshop-x-song-hong" className="article-item text-center">
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/1.jpg?v=1552896922123"
                              data-src="//bizweb.dktcdn.net/thumb/grande/100/347/891/articles/1.jpg?v=1552896922123"
                              alt="LAKSHOP x SÔNG HỒNG"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">LAKSHOP x SÔNG HỒNG</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 15/03/2019
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc"></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{ width: '370px', marginRight: '30px' }}
                    >
                      <div className="item grid__item">
                        <a
                          href="/balmain-spring-2020-menswear"
                          className="article-item text-center"
                        >
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="https://assets.vogue.com/photos/5d41ae9ea580b0000893aa18/master/pass/_ALE0575.jpg"
                              data-src="https://assets.vogue.com/photos/5d41ae9ea580b0000893aa18/master/pass/_ALE0575.jpg"
                              alt="BALMAIN SPRING 2020 MENSWEAR"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">BALMAIN SPRING 2020 MENSWEAR</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 20/02/2020
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc">...</div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{ width: '370px', marginRight: '30px' }}
                    >
                      <div className="item grid__item">
                        <a
                          href="/louis-vuitton-fall-2020-menswear"
                          className="article-item text-center"
                        >
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="https://assets.vogue.com/photos/5e206fcbbd980b00088121ca/master/pass/_ALE0252.jpg"
                              data-src="https://assets.vogue.com/photos/5e206fcbbd980b00088121ca/master/pass/_ALE0252.jpg"
                              alt="Louis Vuitton FALL 2020 MENSWEAR"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">Louis Vuitton FALL 2020 MENSWEAR</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 20/02/2020
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc">...</div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{ width: '370px', marginRight: '30px' }}
                    >
                      <div className="item grid__item">
                        <a
                          href="/dior-men-pre-fall-2020-menswear"
                          className="article-item text-center"
                        >
                          <div className="article-img">
                            <img
                              className="lazyload"
                              src="https://assets.vogue.com/photos/5de71284a326fe0008f9e749/master/pass/IS5_0663.jpg"
                              data-src="https://assets.vogue.com/photos/5de71284a326fe0008f9e749/master/pass/IS5_0663.jpg"
                              alt="DIOR MEN PRE-FALL 2020 MENSWEAR"
                            />
                          </div>
                          <div className="article-item-normal">
                            <div className="article-title">DIOR MEN PRE-FALL 2020 MENSWEAR</div>
                            <div className="article-info">
                              <div className="article-date">
                                <i className="fa fa-calendar" /> 20/02/2020
                              </div>
                            </div>
                          </div>
                          <div className="article-item-hover">
                            <div className="article-desc">...</div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="owl-controls">
                  <div className="owl-nav">
                    <div className="owl-prev" style={{}} onClick={onClickLeft}>
                      ‹
                    </div>
                    <div className="owl-next" style={{}} onClick={onClickRight}>
                      ›
                    </div>
                  </div>
                  <div className="owl-dots" style={{ display: 'none' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/all.css?1613484421222 */
        section {
          display: block;
        }
        a {
          background-color: transparent;
        }
        a:active,
        a:hover {
          outline: 0;
        }
        img {
          border: 0;
        }
        @media print {
          *,
          :after,
          :before {
            color: #000 !important;
            text-shadow: none !important;
            background: 0 0 !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
          }
          a,
          a:visited {
            text-decoration: underline;
          }
          a[href]:after {
            content: ' (' attr(href) ')';
          }
          img {
            page-break-inside: avoid;
          }
          img {
            max-width: 100% !important;
          }
        }
        * {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        :after,
        :before {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
        }
        a {
          color: #337ab7;
          text-decoration: none;
        }
        a:focus,
        a:hover {
          color: #23527c;
          text-decoration: underline;
        }
        a:focus {
          outline: 5px auto -webkit-focus-ring-color;
          outline-offset: -2px;
        }
        img {
          vertical-align: middle;
        }
        .text-center {
          text-align: center;
        }
        .container {
          padding-right: 15px;
          padding-left: 15px;
          margin-right: auto;
          margin-left: auto;
        }
        @media (min-width: 768px) {
          .container {
            width: 750px;
          }
        }
        @media (min-width: 992px) {
          .container {
            width: 970px;
          }
        }
        @media (min-width: 1200px) {
          .container {
            width: 1170px;
          }
        }
        .row {
          margin-right: -15px;
          margin-left: -15px;
        }
        .container:after,
        .container:before,
        .row:after,
        .row:before {
          display: table;
          content: ' ';
        }
        .container:after,
        .row:after {
          clear: both;
        }
        .owl-carousel,
        .owl-carousel .owl-item {
          -webkit-tap-highlight-color: transparent;
          position: relative;
        }
        .owl-carousel {
          display: none;
          width: 100%;
          z-index: 1;
        }
        .owl-carousel .owl-stage {
          position: relative;
          -ms-touch-action: pan-Y;
          -webkit-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
        }
        .owl-carousel .owl-stage:after {
          content: '.';
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .owl-carousel .owl-stage-outer {
          position: relative;
          overflow: hidden;
          -webkit-transform: translate3d(0, 0, 0);
        }
        .owl-carousel .owl-controls .owl-nav .owl-next,
        .owl-carousel .owl-controls .owl-nav .owl-prev {
          cursor: pointer;
          cursor: hand;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .owl-carousel.owl-loaded {
          display: block;
        }
        .owl-carousel .owl-item {
          min-height: 1px;
          float: left;
          -webkit-backface-visibility: hidden;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .owl-carousel .owl-item img {
          display: block;
          width: 100%;
          -webkit-transform-style: preserve-3d;
          transform-style: preserve-3d;
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1613484421222 */
        a {
          -webkit-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
        }
        a:focus {
          text-decoration: none;
          outline: none;
        }
        a:focus,
        a:hover {
          text-decoration: none;
          color: #86590d;
        }
        a {
          outline: medium none;
          color: #434343;
        }
        *::-moz-selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        ::-moz-selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        ::selection {
          background: #3399ff;
          color: #fff;
          text-shadow: none;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        .owlDesign.owl-carousel .owl-controls .owl-nav div {
          width: 30px;
          height: 50px;
          font-size: 50px;
          line-height: 40px;
          text-align: center;
          background: rgba(255, 255, 255, 0.8);
          border: 1px solid;
          border-color: #86590d;
          color: #86590d;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          transition: all 0.4s ease-in-out 0s;
          -moz-transition: all 0.4s ease-in-out 0s;
          -o-transition: all 0.4s ease-in-out 0s;
          -webkit-transition: all 0.4s ease-in-out 0s;
          -ms-transition: all 0.4s ease-in-out 0s;
          font-family: -webkit-body;
          opacity: 0;
          filter: alpha(opacity=0);
          visibility: hidden;
        }
        .owlDesign:hover .owl-controls .owl-nav div {
          opacity: 1;
          filter: alpha(opacity=100);
          visibility: visible;
        }
        .owlDesign:hover .owl-controls .owl-nav div:hover {
          background: #86590d;
          color: #fff;
        }
        .owlDesign.owl-carousel .owl-controls .owl-nav div.owl-next {
          right: -30px;
        }
        .owlDesign.owl-carousel .owl-controls .owl-nav div.owl-prev {
          left: -30px;
        }
        .owlDesign:hover .owl-controls .owl-nav div.owl-next {
          right: 0px;
        }
        .owlDesign:hover .owl-controls .owl-nav div.owl-prev {
          left: 0px;
        }
        .owlDesign .owl-controls .owl-dots {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 5px;
          line-height: 1;
          font-size: 0;
          padding: 5px;
          background: #f4f8fa;
          display: none !important;
        }
        img {
          max-width: 100%;
        }
        .article-item {
          display: block;
          position: relative;
          overflow: hidden;
        }
        .article-item .article-img img {
          width: 100%;
        }
        .article-item .article-item-normal {
          opacity: 1;
          position: absolute;
          left: 15px;
          right: 15px;
          bottom: 15px;
          z-index: 1;
          padding: 15px;
          background: rgba(0, 0, 0, 0.7);
        }
        .article-item .article-item-normal .article-title {
          color: #fff;
          margin-bottom: 10px;
        }
        .article-item .article-item-normal .article-info > div {
          display: inline-block;
          margin-right: 5px;
          color: #fff;
        }
        .article-item .article-item-normal .article-info > div:last-child {
          margin: 0px;
        }
        .article-item .article-item-hover {
          opacity: 0;
          position: absolute;
          top: 15px;
          right: 15px;
          left: 15px;
          bottom: 15px;
          background: rgba(0, 0, 0, 0.7);
          padding: 15px;
          color: #fff;
          text-align: justify;
        }
        #home-articles {
          margin-bottom: 50px;
        }
        #home-articles .owl-controls {
          margin: 0;
        }
        .article-info i {
          font-size: 13px;
          margin-right: 2px;
        }
        .article-item .article-item-hover,
        .article-item .article-item-normal,
        .item .article-img img {
          -webkit-transition: all 0.3s ease;
          -moz-transition: all 0.3s ease;
          transition: all 0.3s ease;
        }
        @media (min-width: 1024px) {
          .article-item:hover .article-img img {
            transform: scale(1.05);
          }
          .article-item:hover .article-item-normal {
            opacity: 0;
          }
          .article-item:hover .article-item-hover {
            opacity: 1;
          }
        }
        @media (max-width: 767px) {
          #home-articles {
            margin-bottom: 30px;
          }
        }
        @media only screen and (min-width: 992px) and (max-width: 1199px) {
          .owl-carousel {
            overflow: hidden;
          }
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/responsives.css?1613484421222 */
        @media (max-width: 768px) {
          .owlDesign.owl-carousel .owl-controls .owl-nav div {
            opacity: 1;
            visibility: visible;
          }
          .owlDesign.owl-carousel .owl-controls .owl-nav div.owl-prev {
            left: 0px;
          }
          .owlDesign.owl-carousel .owl-controls .owl-nav div.owl-next {
            right: 0px;
          }
        }
        @media only screen and (min-width: 480px) and (max-width: 767px) {
          .container {
            width: 450px;
          }
        }
      `}</style>
    </Fragment>
  );
};
export default Lak;
