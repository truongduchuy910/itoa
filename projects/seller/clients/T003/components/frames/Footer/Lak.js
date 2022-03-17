import { AiOutlineMail, AiOutlineHome, AiOutlinePhone } from "react-icons/ai";
import { Fragment } from "react";

const Lak = ({
  allPages: [{ store, email, phone, address }],
  onClickProductCategory,
  allProductCategories,
}) => {
  const categories = allProductCategories?.slice()?.sort((a, b) => {
    return a.prioritize > b.prioritize ? 1 : -1;
  });
  return (
    <Fragment>
      <footer>
        <div className="footer-container">
          <div className="footer-middle-area bg-footer">
            <div className="container">
              <div className="row">
                <div className="col-lg-3 col-md-6">
                  <div className="single-footer-widget mb-30">
                    <div className="footer-logo">
                      <a href="/">
                        <h4 style={{ textTransform: "uppercase" }}>{store}</h4>
                        <p>{}</p>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="single-footer-widget mb-30">
                    <div className="footer-info">
                      <div className="icon">
                        <AiOutlineHome />
                      </div>
                      <p dangerouslySetInnerHTML={{ __html: address }}></p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="single-footer-widget mb-30">
                    <div className="footer-info">
                      <div className="icon fz18">
                        <AiOutlineMail />
                      </div>
                      <p>
                        Email:
                        <br />
                        {email}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-6">
                  <div className="single-footer-widget mb-30">
                    <div className="footer-info">
                      <div className="icon">
                        <AiOutlinePhone />
                      </div>
                      <p>
                        Phone: <br />
                        <a href={`tel:${phone}`}>{phone}</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom-area bg-footer  pb-50">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="footer-menu text-center">
                    <nav className="sticky mt-3">
                      <ul>
                        {categories?.map((category) => {
                          return (
                            <li
                              key={category.id}
                              onClick={() => {
                                onClickProductCategory(category);
                              }}
                            >
                              <a title="NAM">{category.name}</a>
                            </li>
                          );
                        })}
                      </ul>
                    </nav>
                  </div>
                  <div className="footer-copyright">
                    <p>
                      <a
                        title="Loaloa.tech"
                        href="https://seller.itoa.vn"
                        rel="nofollow"
                        target="_blank"
                      >
                        Made with ❤️ by Itoa.vn
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <style jsx>
        {`
          /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/all.css?1612716331987 */
          footer,
          nav {
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
              content: " (" attr(href) ")";
            }
            img {
              page-break-inside: avoid;
            }
            img {
              max-width: 100% !important;
            }
            p {
              orphans: 3;
              widows: 3;
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
          p {
            margin: 0 0 10px;
          }
          .text-center {
            text-align: center;
          }
          ul {
            margin-top: 0;
            margin-bottom: 10px;
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
          .col-lg-3,
          .col-md-12,
          .col-md-6 {
            position: relative;
            min-height: 1px;
            padding-right: 15px;
            padding-left: 15px;
          }
          @media (min-width: 992px) {
            .col-md-12,
            .col-md-6 {
              float: left;
            }
            .col-md-12 {
              width: 100%;
            }
            .col-md-6 {
              width: 50%;
            }
          }
          @media (min-width: 1200px) {
            .col-lg-3 {
              float: left;
            }
            .col-lg-3 {
              width: 25%;
            }
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
          /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1612716331987 */
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
          ul {
            margin: 0px;
            padding: 0px;
          }
          p {
            margin-bottom: 15px;
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
          ::-moz-placeholder {
            color: #444;
            font-size: 13px;
          }
          .mb-30 {
            margin-bottom: 30px;
          }
          .pb-50 {
            padding-bottom: 50px;
          }
          .bg-footer {
            background: #494a48 !important;
          }
          .footer-middle-area {
            padding-top: 30px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          }
          .footer-info {
            padding: 10px 0;
          }
          .icon {
            float: left;
            padding-top: 6px;
            color: var(--color-text-backdrop);
            font-size: 18px;
          }
          .footer-info > p {
            font-size: 15px;
            line-height: 21px;
            margin-left: 35px;
            color: #ececec;
            margin-bottom: 0;
          }
          .footer-payments-image {
            text-align: center;
            padding: 5px 0;
            margin: 20px 0;
          }
          .footer-menu ul > li {
            display: inline-block;
            list-style: none;
            border-right: 1px solid #999999;
            line-height: 13px;
          }
          .footer-menu ul > li:last-child {
            border-right: 0;
          }
          .footer-menu ul > li > a {
            color: #ececec;
            font-size: 12px;
            font-weight: 500;
            display: block;
            letter-spacing: 1px;
            padding: 0 15px;
            text-transform: uppercase;
          }
          .footer-menu ul > li:first-child > a {
            padding-left: 0;
          }
          .footer-menu ul > li:last-child > a {
            padding-right: 0;
          }
          .footer-menu ul > li > a:hover {
            color: var(--color-text-backdrop);
            text-decoration: underline;
          }
          .footer-copyright > p {
            text-align: center;
            margin-bottom: 0;
            font-size: 14px;
            line-height: 16px;
            color: #ececec;
            margin-top: 10px;
          }
          .footer-copyright > p > a {
            color: var(--color-text-backdrop);
          }
          .footer-copyright > p > a:hover {
            text-decoration: underline;
          }
          img {
            max-width: 100%;
          }
          @media (max-width: 767px) {
            nav ul {
              list-style: none;
            }
          }
          .single-footer-widget.mb-30 {
            height: 62px;
            display: flex;
            align-items: center;
          }
          .fz18 {
            font-size: 18px;
          }
          .footer-payments-image img {
            max-height: 40px;
          }
          ul {
            list-style-position: inside;
          }
          .footer-middle-area a {
            color: #ececec;
          }
          /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/responsives.css?1612716331987 */
          @media (max-width: 767px) {
            .footer-payments-image img {
              width: 100%;
            }
            .footer-copyright > p {
              margin-top: 20px;
            }
          }
          @media only screen and (min-width: 480px) and (max-width: 767px) {
            .container {
              width: 450px;
            }
          }
          /*! CSS Used from: https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css */
          .fa {
            display: inline-block;
            font: normal normal normal 14px/1 FontAwesome;
            font-size: inherit;
            text-rendering: auto;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            transform: translate(0, 0);
          }
          .fa-home:before {
            content: "\f015";
          }
          .fa-envelope:before {
            content: "\f0e0";
          }
          .fa-mobile:before {
            content: "\f10b";
          }
        `}
      </style>
    </Fragment>
  );
};
export default Lak;
