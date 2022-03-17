import { Fragment } from 'react';

const Lak = ({ href, title }) => {
  return (
    <Fragment>
      <div className="section-title mb-50 text-center my-5">
        <h2>
          <a href={href} title={title}>
            {title}
          </a>
        </h2>
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
        h2 {
          font-family: 'PN', sans-serif;
          font-weight: 500;
          color: #000000;
          margin-top: 0px;
          font-weight: 400;
          line-height: 1;
        }
        h2 a {
          color: inherit;
        }
        h2 {
          font-size: 30px;
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
        .section-title > h2 {
          font-size: 80px;
        }
        .section-title > h2 {
          margin-bottom: 0px;
          padding-bottom: 15px;
          font-family: 'SVN-Veneer';
          font-size: 40px;
          position: relative;
          display: inline-block;
        }
        .section-title > h2:after {
          content: '';
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
        .section-title {
          position: relative;
        }
        .section-title {
          text-transform: uppercase;
        }
        @media (max-width: 767px) {
          .mb-50 {
            margin-bottom: 30px;
          }
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/responsives.css?1613484421222 */
        @media (max-width: 767px) {
          .section-title > h2 > a {
            font-size: 35px;
          }
        }
        /*! CSS Used fontfaces */
        @font-face {
          font-family: 'PN';
          src: url(//theme.hstatic.net/1000324393/1000429977/14/PN-Regular2.ttf?v=1228)
            format('truetype');
        }
        @font-face {
          font-family: 'PN';
          src: url(//theme.hstatic.net/1000324393/1000429977/14/PN_SemiBold_gdi.ttf?v=1228)
            format('truetype');
          font-weight: 600;
        }
        @font-face {
          font-family: 'PN';
          src: url(//theme.hstatic.net/1000324393/1000429977/14/PN_SemiBold_gdi.ttf?v=1228)
            format('truetype');
          font-weight: bold;
        }
        @font-face {
          font-family: 'SVN-Veneer';
          src: url(//theme.hstatic.net/1000324393/1000429977/14/SVN-Veneer.eot?v=1228)
              format('embedded-opentype'),
            url('//theme.hstatic.net/1000314545/1000404148/14/SVN-Veneer.woff?v=796') format('woff'),
            url(//theme.hstatic.net/1000324393/1000429977/14/SVN-Veneer.ttf?v=1228)
              format('truetype'),
            url('//theme.hstatic.net/1000314545/1000404148/14/SVN-Veneer.svg?v=796#SVN-Veneer')
              format('svg');
          font-weight: normal;
          font-style: normal;
        }
      `}</style>
    </Fragment>
  );
};
export default Lak;
