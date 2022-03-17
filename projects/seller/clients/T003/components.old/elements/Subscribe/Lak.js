import { Fragment } from 'react';
import Title from '../Title';
import TitleLak from '../Title/Lak';

const Lak = () => {
  return (
    <Fragment>
      <div className="news-letter-area  mb-70">
        <div className="row">
          <div className="col-12">
            <Title UI={TitleLak} title="Đăng ký nhận tin" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="news-latter-box">
              <p>Nhập số điện thoại của bạn để nhận được tin tức mới nhất</p>
              <div className="news-letter-form text-center">
                <div
                  method="post"
                  id="mc-embedded-subscribe-form"
                  name="mc-embedded-subscribe-form"
                  target="_blank"
                >
                  <center>
                    <div id="mc-form" className="mc-form subscribe-form">
                      <input
                        id="mail"
                        type="email"
                        autoComplete="off"
                        name="EMAIL"
                        placeholder="Nhập email của bạn..."
                        required=""
                      />
                      <button id="mc-submit">Đăng kí </button>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1613484421222 */
        button {
          -webkit-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
        }
        button:focus {
          text-decoration: none;
          outline: none;
        }
        button,
        input {
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
        h2 {
          font-size: 30px;
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
        input:focus {
          background: transparent;
          border: 2px solid #86590d;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        .mb-50 {
          margin-bottom: 50px;
        }
        .mb-70 {
          margin-bottom: 70px;
        }
        .news-latter-box > p {
          font-size: 22px;
          text-align: center;
          margin-bottom: 50px;
        }
        .subscribe-form {
          display: inline-block;
          margin: auto;
          max-width: 100%;
          vertical-align: middle;
        }
        .subscribe-form input {
          background: var(--color-text-backdrop);
          border: none;
          border-bottom: 1px solid #e5e5e5;
          color: #666;
          display: block;
          float: left;
          font-size: 1em;
          height: 48px;
          line-height: 48px;
          max-width: 100%;
          padding: 0 10px;
          position: relative;
          text-align: left;
          var(--color-text-backdrop)-space: nowrap;
          width: 435px;
          border-radius: 4px;
        }
        .subscribe-form button {
          background: #86590d;
          border: none;
          color: var(--color-text-backdrop);
          float: left;
          font-size: 15px;
          font-weight: 500;
          height: 48px;
          letter-spacing: 0.03em;
          line-height: 48px;
          cursor: pointer;
          margin: 0 0 0 15px;
          max-width: 100%;
          padding: 0 32px;
          -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
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
          .subscribe-form {
            margin-bottom: 30px;
          }
          .subscribe-form button {
            height: 40px;
            line-height: 40px;
            float: none;
          }
          .news-latter-box > p {
            margin-bottom: 10px;
          }
        }
        button#mc-submit,
        .subscribe-form input {
          border-radius: 4px;
        }
        input[type='email'] {
          -webkit-appearance: none;
          border-radius: 0;
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/responsives.css?1613484421222 */
        @media (max-width: 767px) {
          .mb-70 {
            margin: 0;
          }
          .news-latter-box > p {
            font-size: 14px;
            line-height: 22px;
          }
          .subscribe-form input {
            border: 1px solid #e5e5e5;
            margin-bottom: 15px;
            border-radius: 0;
          }
          .subscribe-form button {
            margin: 0;
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
