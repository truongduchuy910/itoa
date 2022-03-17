const Lak = ({ onSignIn = () => {}, onSignUp = () => {} }) => {
  return (
    <section className="min600 pdbt50 ">
      <div className="fv-login">
        <div className="container">
          <div className="box-login-two">
            <div className="row">
              {/*  */}

              <div className="col-sm-6 col-xs-12">
                <h1 className="title-box-login">Đăng nhập</h1>
                <div className="content-cus-form cus-login">
                  <div>
                    <form acceptCharset="utf-8" onSubmit={onSignIn}>
                      <input name="FormType" type="hidden" />
                      <input name="utf8" type="hidden" />
                      <div className="col_full">
                        <span className="not-null">*</span>
                        <span className="icon_checkout ico-email" />
                        <input
                          required={true}
                          type="phone"
                          title="phone"
                          name="phone"
                          placeholder="Số điện thoại của bạn"
                          className="form-control"
                        />
                      </div>
                      <div className="col_full">
                        <span className="not-null">*</span>
                        <span className="icon_checkout ico-pass" />
                        <input
                          required
                          type="password"
                          title="Mật khẩu"
                          name="password"
                          placeholder="Nhập mật khẩu"
                          className="form-control"
                        />
                      </div>
                      <div className="col_full nobottommargin action">
                        <button
                          className="button button-3d button-black nomargin"
                          name="login-form-submit"
                          type="submit"
                          value="login"
                        >
                          Đăng nhập
                        </button>
                        <a href="#">Quên mật khẩu?</a>
                      </div>
                      <input name="returnUrl" type="hidden" />
                    </form>
                  </div>
                  <div style={{ display: 'none' }} className="userbox">
                    <div className="acctitle">
                      <i className="fa fa-refresh" />
                      Quên mật khẩu
                    </div>
                    <div>
                      <form acceptCharset="utf-8" action="/account/recover" method="post">
                        <input name="FormType" type="hidden" />
                        <input name="utf8" type="hidden" />
                        <div className="col_full">
                          <span className="not-null">*</span>
                          <span className="icon_checkout ico-email" />
                          <input
                            required={true}
                            type="text"
                            title="email"
                            name="email"
                            placeholder="Nhập email của bạn"
                            className="form-control"
                          />
                        </div>
                        <div className="col_full nobottommargin text-center">
                          <button className="button button-3d button-black nomargin" type="submit">
                            Gửi
                          </button>
                          <button className="button button-3d button-red nomargin cancel">
                            Hủy
                          </button>
                        </div>
                        <input name="returnUrl" type="hidden" />
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {/*  */}
              <div className="col-sm-6 col-xs-12">
                <h1 className="title-box-login">Đăng ký thành viên mới</h1>
                <div className="content-cus-form cus-reg">
                  <form acceptCharset="utf-8" onSubmit={onSignUp}>
                    <input name="FormType" type="hidden" />
                    <input name="utf8" type="hidden" />
                    <input type="hidden" name="Token" />
                    <div className="col_full">
                      <span className="not-null">*</span>
                      <span className="icon_checkout ico-name" />
                      <input
                        required
                        type="text"
                        name="name"
                        title="Tên"
                        className="input-text "
                        placeholder="Tên"
                        size={30}
                      />
                    </div>

                    <div className="col_full">
                      <span className="not-null">*</span>
                      <span className="icon_checkout ico-email" />
                      <input
                        required={true}
                        type="phone"
                        title="Phone"
                        name="phone"
                        placeholder="Số điện thoại"
                        className="text"
                        size={30}
                      />
                    </div>
                    <div className="col_full">
                      <span className="not-null">*</span>
                      <span className="icon_checkout ico-pass" />
                      <input
                        required={true}
                        type="password"
                        name="password"
                        placeholder="Mật khẩu"
                        className="password text"
                        size={30}
                      />
                    </div>
                    <div className="col_full nobottommargin action">
                      <button
                        className="button button-3d button-black nomargin"
                        name="register-form-submit"
                        type="submit"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1613484421222 */
        a,
        button {
          -webkit-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
        }
        a:focus,
        button:focus {
          text-decoration: none;
          outline: none;
        }
        a:focus,
        a:hover {
          text-decoration: none;
          color: #86590d;
        }
        a,
        button,
        input {
          outline: medium none;
          color: #434343;
        }
        h1 {
          font-family: 'PN', sans-serif;
          font-weight: 500;
          color: #000000;
          margin-top: 0px;
          font-weight: 400;
          line-height: 1;
        }
        h1 {
          font-size: 36px;
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
        input:focus {
          background: transparent;
          border: 2px solid #86590d;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        #new-login,
        .pdbt50 {
          padding-top: 50px;
          padding-bottom: 50px;
        }
        @media (min-width: 992px) {
          .min600 {
            min-height: 600px;
          }
        }
        input[type='text'],
        input[type='password'],
        input[type='email'] {
          -webkit-appearance: none;
          border-radius: 0;
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/custommer.css?1613484421222 */
        h1.title-box-login {
          text-align: center;
          font-size: 16px;
          color: #666666;
          text-transform: uppercase;
          margin-bottom: 20px;
          margin-top: 20px;
        }
        .content-cus-form {
          width: 100%;
          margin: 0 auto;
        }
        .col_full {
          display: block;
          position: relative;
        }
        .content-cus-form .col_full > input {
          border: 1px solid #cccccc;
          height: 40px;
          border-radius: 0;
          font-weight: normal;
          padding-top: 0;
          padding-bottom: 0;
          outline: none !important;
          box-shadow: none !important;
          padding-left: 42px !important;
          width: 100%;
          margin-bottom: 15px !important;
        }
        .not-null {
          position: absolute;
          top: 10px;
          right: 5px;
          color: #ed1846;
          font-size: 20px;
          z-index: 1;
        }
        .icon_checkout {
          background: url(//bizweb.dktcdn.net/100/347/891/themes/710583/assets/icon-checkout.png?1612716331987)
            0 0 no-repeat;
          background-size: 300px;
          width: 22px;
          height: 22px;
          display: inline-block;
          position: absolute;
          top: 9px;
          left: 12px;
        }
        .icon_checkout.ico-email {
          background-position: 0 -44px;
        }
        .icon_checkout.ico-pass {
          background-position: 0 -154px;
        }
        .icon_checkout.ico-name {
          background-position: 0 -22px;
        }
        .content-cus-form .col_full.action {
          text-align: center;
        }
        .content-cus-form .col_full > button {
          width: 100%;
          margin-bottom: 20px !important;
          display: block;
          height: 40px;
          border: 1px solid #6f6a60;
          background: transparent;
          color: #6f6a60;
          -webkit-transition: all 300ms ease-in-out;
          -moz-transition: all 300ms ease-in-out;
          -ms-transition: all 300ms ease-in-out;
          -o-transition: all 300ms ease-in-out;
          transition: all 300ms ease-in-out;
        }
        .content-cus-form .col_full > button:hover {
          border: 1px solid #86590d;
          background: #86590d;
          color: #fff;
        }
        .content-cus-form .col_full.action a {
          font-weight: bold;
          text-decoration: underline !important;
        }
        .content-cus-form .col_full > button.cancel {
          width: auto;
          background: transparent !important;
          border: none !important;
          color: #666;
          text-transform: none;
          text-shadow: none;
          font-weight: bold;
          margin: 0 !important;
          float: none !important;
          display: inline-block;
          padding: 0;
          font-size: 14px;
          text-decoration: underline;
        }
        #recover-password .acctitle i {
          font-weight: normal;
          margin-right: 5px;
          font-size: 14px;
          line-height: 40px;
        }
        @media screen and (max-width: 991px) {
          .content-cus-form {
            width: 320px;
          }
        }
        @media screen and (max-width: 400px) {
          .content-cus-form {
            width: 280px;
          }
        }
        .userbox {
          padding: 0px 0px;
        }
        .col_full {
          display: block;
          position: relative;
        }
        .col_full input {
          display: block;
          width: 100%;
          padding: 0 10px;
          border: 1px solid #ccc;
          height: 40px;
          padding-left: 40px;
          margin-bottom: 10px;
          box-shadow: none !important;
          outline: none !important;
        }
        .not-null {
          position: absolute;
          top: 10px;
          right: 5px;
          color: #ed1846;
          font-size: 20px;
          z-index: 1;
        }
        .icon_checkout {
          background: url(//bizweb.dktcdn.net/100/347/891/themes/710583/assets/icon-checkout.png?1612716331987)
            0 0 no-repeat;
          background-size: 300px;
          width: 22px;
          height: 22px;
          display: inline-block;
          position: absolute;
          top: 9px;
          left: 12px;
        }
        .icon_checkout.ico-email {
          background-position: 0 -44px;
        }
        .icon_checkout.ico-pass {
          background-position: 0 -154px;
        }
        .icon_checkout.ico-name {
          background-position: 0 -22px;
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/responsives.css?1613484421222 */
        @media only screen and (min-width: 480px) and (max-width: 767px) {
          .container {
            width: 450px;
          }
        }
      `}</style>
    </section>
  );
};
export default Lak;
