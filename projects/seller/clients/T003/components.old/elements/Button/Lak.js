import { Fragment } from 'react';

const Lak = () => {
  return (
    <Fragment>
      <div className="view-all-product text-center">
        <a href="/san-pham-noi-bat" className="btnx">
          <span className="btn-content">Xem tất cả</span>
          <span className="icon">
            <i className="fa fa-arrow-right" />
          </span>
        </a>
      </div>
      <style jsx>{`
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
        .icon {
          float: left;
          padding-top: 6px;
          color: #fff;
          font-size: 18px;
        }
        .btnx {
          border-radius: 4px;
          border: 2px solid #86590d;
          color: #86590d;
          display: inline-block;
          margin: 0 0.25em;
          overflow: hidden;
          padding: 10px 57px 10px 16px;
          position: relative;
          text-decoration: none;
          line-height: 1;
        }
        .btnx .btn-content {
          font-size: 1em;
          line-height: 1.2;
          padding: 0 26px;
          position: relative;
          right: 0;
          transition: right 300ms ease;
          display: block;
          text-align: left;
        }
        .btnx .icon {
          border-left: 1px solid #86590d;
          position: absolute;
          right: 0;
          text-align: center;
          top: 50%;
          transition: all 300ms ease;
          transform: translateY(-50%);
          width: 58px;
          height: 70%;
          color: #86590d;
        }
        .btnx .icon i {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          left: 50%;
        }
        .btnx:after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
          background-color: #86590d;
          opacity: 0;
          transition: opacity 300ms ease;
        }
        .btnx:hover .btn-content {
          right: 100%;
        }
        .btnx:hover .icon {
          border-left: 0;
          font-size: 1.4em;
          width: 100%;
        }
        .btnx:hover:after {
          opacity: 0.2;
        }
      `}</style>
    </Fragment>
  );
};
