import { Fragment, useEffect, useRef, useState } from "react";

const Lak = () => {
  const container = useRef(null);
  const content = useRef(null);
  const item = useRef(null);

  const [translate, setTranslate] = useState(0);
  useEffect(() => {
    const ani = setInterval(() => {
      setTranslate((translate) =>
        translate < content.current?.offsetWidth
          ? translate + container.current?.offsetWidth
          : 0
      );
    }, 2000);
    return () => {
      clearInterval(ani);
    };
  });
  const onClickRight = () => {
    setTranslate((translate) =>
      translate <= content.current?.offsetWidth
        ? translate + item.current?.offsetWidth
        : 0
    );
  };
  const onClickLeft = () => {
    setTranslate((translate) =>
      translate > 0 ? translate - item.current?.offsetWidth : 0
    );
  };
  return (
    <Fragment>
      <div className="brand-area ">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="section-title text-center mb-50"
                title="Thương hiệu"
              >
                <h2>Thương hiệu</h2>
              </div>
            </div>
            <div className="col-12">
              <div
                ref={container}
                className="brand-active owl-carousel owl-theme owlDesign owl-loaded"
              >
                <div className="owl-stage-outer">
                  <div
                    ref={content}
                    className="owl-stage"
                    style={{
                      transform: `translate3d(-${translate}px, 0px, 0px)`,
                      transition: "all 1s ease 0s",
                      width: "3744px",
                    }}
                  >
                    <div
                      ref={item}
                      className="owl-item cloned"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.instagram.com/lakshop/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand2.png?1613484421222"
                            alt="instagram"
                            title="instagram "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      ref={item}
                      className="owl-item cloned"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.facebook.com/LakShop2012/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand3.png?1613484421222"
                            alt="facebook"
                            title="facebook "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.instagram.com/lakshop/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand4.png?1613484421222"
                            alt="instagram"
                            title="instagram "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.facebook.com/LakShop2012/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand5.png?1613484421222"
                            alt="facebook"
                            title="facebook "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.instagram.com/lakshop/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand6.png?1613484421222"
                            alt="instagram"
                            title="instagram "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.facebook.com/LakShop2012/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand1.png?1613484421222"
                            alt="facebook"
                            title="facebook "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.instagram.com/lakshop/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand2.png?1613484421222"
                            alt="instagram"
                            title="instagram "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.facebook.com/LakShop2012/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand3.png?1613484421222"
                            alt="facebook"
                            title="facebook "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.instagram.com/lakshop/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand4.png?1613484421222"
                            alt="instagram"
                            title="instagram "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.facebook.com/LakShop2012/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand5.png?1613484421222"
                            alt="facebook"
                            title="facebook "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item active"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.instagram.com/lakshop/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand6.png?1613484421222"
                            alt="instagram"
                            title="instagram "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned active"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.facebook.com/LakShop2012/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand1.png?1613484421222"
                            alt="facebook"
                            title="facebook "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.instagram.com/lakshop/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand2.png?1613484421222"
                            alt="instagram"
                            title="instagram "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.facebook.com/LakShop2012/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand3.png?1613484421222"
                            alt="facebook"
                            title="facebook "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.instagram.com/lakshop/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand4.png?1613484421222"
                            alt="instagram"
                            title="instagram "
                          />
                        </a>
                      </div>
                    </div>
                    <div
                      className="owl-item cloned"
                      style={{
                        width: "content.current?.offsetWidthpx",
                        marginRight: "0px",
                      }}
                    >
                      <div className="single-brand img-full">
                        <a href="https://www.facebook.com/LakShop2012/">
                          <img
                            draggable="false"
                            src="//bizweb.dktcdn.net/100/347/891/themes/710583/assets/brand5.png?1613484421222"
                            alt="facebook"
                            title="facebook "
                          />
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
                  <div className="owl-dots" style={{ display: "block" }}>
                    <div className="owl-dot active">
                      <span />
                    </div>
                    <div className="owl-dot">
                      <span />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/all.css?1613484421222 */
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
            content: " (" attr(href) ")";
          }
          img {
            page-break-inside: avoid;
          }
          img {
            max-width: 100% !important;
          }
          h2 {
            orphans: 3;
            widows: 3;
          }
          h2 {
            page-break-after: avoid;
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
        h2 {
          font-family: inherit;
          font-weight: 500;
          line-height: 1.1;
          color: inherit;
        }
        h2 {
          margin-top: 20px;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 30px;
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
          content: " ";
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
        }
        .owl-carousel .owl-stage:after {
          content: ".";
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
        .owl-carousel .owl-controls .owl-dot,
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
        .img-full img {
          width: 100%;
        }
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
        h2 {
          
          font-weight: 500;
          color: #000000;
          margin-top: 0px;
          font-weight: 400;
          line-height: 1;
        }
        h2 {
          font-size: 30px;
        }
        *::-moz-selection {
          background: #3399ff;
          color: var(--color-text-backdrop);
          text-shadow: none;
        }
        ::-moz-selection {
          background: #3399ff;
          color: var(--color-text-backdrop);
          text-shadow: none;
        }
        ::selection {
          background: #3399ff;
          color: var(--color-text-backdrop);
          text-shadow: none;
        }
        .section-title > h2 {
          font-size: 80px;
        }
        .section-title > h2 {
          margin-bottom: 0px;
          padding-bottom: 15px;
          font-family: "SVN-Veneer";
          font-size: 40px;
          position: relative;
          display: inline-block;
        }
        .section-title > h2:after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -1px;
          width: 100%;
          height: 3px;
          background: #3a3a3a;
          margin: 0px auto;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        .mb-50 {
          margin-bottom: 50px;
        }
        .brand-active .single-brand img {
          -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)";
          -webkit-transition: all 0.3s ease-in-out;
          transition: all 0.3s ease-in-out;
        }
        .brand-active .single-brand img:hover {
          opacity: 1;
          -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
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
          color: var(--color-text-backdrop);
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
        .owlDesign .owl-controls .owl-dots .owl-dot {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: transparent;
          border: 1px solid;
          border-color: #86590d;
          margin: 0px 3px;
          line-height: 1;
        }
        .owlDesign .owl-controls .owl-dots .owl-dot.active {
          background: #86590d;
        }
        img {
          max-width: 100%;
        }
        .section-title {
          position: relative;
        }
        .section-title {
          text-transform: uppercase;
        }
        .img-full img {
          -webkit-transition: all 0.6s ease;
          -moz-transition: all 0.6s ease;
          transition: all 0.6s ease;
        }
        .brand-area {
          margin-bottom: 50px;
        }
        @media (max-width: 767px) {
          .mb-50 {
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
