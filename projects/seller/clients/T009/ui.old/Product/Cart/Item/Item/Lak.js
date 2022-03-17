import Image from "next/image";
export default function ProductCartItemItemLak({
  productCartItem: { product, quantity, sale, price },
  onClose,
  onClickCart,
}) {
  return (
    <div
      className="modal fade in"
      id="addCartModal"
      tabIndex={-1}
      role="dialog"
      aria-hidden="false"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title ">
              <i className="fa fa-check-square-o" aria-hidden="true" /> Thêm vào
              giỏ thành công
            </h4>
            <button
              onClick={() => {
                onClose();
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-4 col-xs-5 imgCartItem">
                <Image
                  className="p-product-image-feature"
                  alt="Tên sản phẩm"
                  width={300}
                  height={300}
                  src={product?.image?.publicUrl || "/assets/img/no-image.png"}
                />
              </div>
              <div className="col-sm-8 col-xs-7 imgCartDetail">
                <h3 className="itemCartTile" />
                <h3 style={{ textTransform: "capitalize" }}>{product.name}</h3>
                <div className="itemCartPrice">
                  <div className="product-price">
                    <span className="p-price ">
                      {<Field>{sale ? sale : price}</Field>} ₫
                    </span>
                  </div>
                </div>
                <span className="itemCartQty">Số lương mua: {quantity}</span>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="close continueShopping"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => {
                onClose();
              }}
            >
              Tiếp tục mua sắm
            </button>
            <button
              type="button"
              className="close viewCartPage"
              onClick={() => onClickCart()}
            >
              Xem giỏ hàng
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/all.css?1613484421222 */
        img {
          border: 0;
        }
        button {
          margin: 0;
          font: inherit;
          color: inherit;
        }
        button {
          overflow: visible;
        }
        button {
          text-transform: none;
        }
        button {
          -webkit-appearance: button;
          cursor: pointer;
        }
        button::-moz-focus-inner {
          padding: 0;
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
          img {
            page-break-inside: avoid;
          }
          img {
            max-width: 100% !important;
          }
          h3 {
            orphans: 3;
            widows: 3;
          }
          h3 {
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
        button {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        img {
          vertical-align: middle;
        }
        h3,
        h4 {
          font-family: inherit;
          font-weight: 500;
          line-height: 1.1;
          color: inherit;
        }
        h3 {
          margin-top: 20px;
          margin-bottom: 10px;
        }
        h4 {
          margin-top: 10px;
          margin-bottom: 10px;
        }
        h3 {
          font-size: 24px;
        }
        h4 {
          font-size: 18px;
        }
        .row {
          margin-right: -15px;
          margin-left: -15px;
        }
        .col-sm-4,
        .col-sm-8,
        .col-xs-5,
        .col-xs-7 {
          position: relative;
          min-height: 1px;
          padding-right: 15px;
          padding-left: 15px;
        }
        .col-xs-5,
        .col-xs-7 {
          float: left;
        }
        .col-xs-7 {
          width: 58.33333333%;
        }
        .col-xs-5 {
          width: 41.66666667%;
        }
        @media (min-width: 768px) {
          .col-sm-4,
          .col-sm-8 {
            float: left;
          }
          .col-sm-8 {
            width: 66.66666667%;
          }
          .col-sm-4 {
            width: 33.33333333%;
          }
        }
        .fade {
          opacity: 0;
          -webkit-transition: opacity 0.15s linear;
          -o-transition: opacity 0.15s linear;
          transition: opacity 0.15s linear;
        }
        .fade.in {
          opacity: 1;
        }
        .close {
          float: right;
          font-size: 21px;
          font-weight: 700;
          line-height: 1;
          color: #000;
          text-shadow: 0 1px 0 #fff;
          filter: alpha(opacity=20);
          opacity: 0.2;
        }
        .close:focus,
        .close:hover {
          color: #000;
          text-decoration: none;
          cursor: pointer;
          filter: alpha(opacity=50);
          opacity: 0.5;
        }
        button.close {
          -webkit-appearance: none;
          padding: 0;
          cursor: pointer;
          background: 0 0;
          border: 0;
        }
        .modal {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 1050;
          display: none;
          overflow: hidden;
          -webkit-overflow-scrolling: touch;
          outline: 0;
        }
        .modal.fade .modal-dialog {
          -webkit-transition: -webkit-transform 0.3s ease-out;
          -o-transition: -o-transform 0.3s ease-out;
          transition: transform 0.3s ease-out;
          -webkit-transform: translate(0, -25%);
          -ms-transform: translate(0, -25%);
          -o-transform: translate(0, -25%);
          transform: translate(0, -25%);
        }
        .modal.in .modal-dialog {
          -webkit-transform: translate(0, 0);
          -ms-transform: translate(0, 0);
          -o-transform: translate(0, 0);
          transform: translate(0, 0);
        }
        .modal-dialog {
          position: relative;
          width: auto;
          margin: 10px;
        }
        .modal-content {
          position: relative;
          background-color: #fff;
          -webkit-background-clip: padding-box;
          background-clip: padding-box;
          border: 1px solid #999;
          border: 1px solid rgba(0, 0, 0, 0.2);
          border-radius: 6px;
          outline: 0;
          -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
          box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
        }
        .modal-header {
          padding: 15px;
          border-bottom: 1px solid #e5e5e5;
        }
        .modal-header .close {
          margin-top: -2px;
        }
        .modal-title {
          margin: 0;
          line-height: 1.42857143;
        }
        .modal-body {
          position: relative;
          padding: 15px;
        }
        .modal-footer {
          padding: 15px;
          text-align: right;
          border-top: 1px solid #e5e5e5;
        }
        @media (min-width: 768px) {
          .modal-dialog {
            width: 600px;
            margin: 30px auto;
          }
          .modal-content {
            -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
          }
        }
        @media (min-width: 992px) {
          .modal-lg {
            width: 900px;
          }
        }
        .modal-footer:after,
        .modal-footer:before,
        .modal-header:after,
        .modal-header:before,
        .row:after,
        .row:before {
          display: table;
          content: " ";
        }
        .modal-footer:after,
        .modal-header:after,
        .row:after {
          clear: both;
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1613484421222 */
        button {
          -webkit-transition: all 0.3s ease-out 0s;
          transition: all 0.3s ease-out 0s;
        }
        button:focus {
          text-decoration: none;
          outline: none;
        }
        button {
          outline: medium none;
          color: #434343;
        }
        h3,
        h4 {
          font-weight: 500;
          color: #000000;
          margin-top: 0px;
          font-weight: 400;
          line-height: 1;
        }
        h3 {
          font-size: 24px;
        }
        h4 {
          font-size: 18px;
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
        .product-price {
          position: relative;
        }
        .modal-header {
          border: none;
          padding: 0;
        }
        .modal-header .close {
          padding: 0;
          background: transparent;
          border-radius: 3px;
          height: 30px;
          width: 30px;
          line-height: 28px;
          display: block;
          color: #999;
          text-shadow: 0 1px 0 #fff;
          font-weight: 700;
          font-size: 16px;
          position: absolute;
          top: 40px;
          right: 30px;
          z-index: 999;
        }
        .modal-body {
          padding: 34px 20px 0 20px;
          position: relative;
        }
        #addCartModal .modal-dialog {
          margin: auto;
          top: 15%;
        }
        #addCartModal .modal-body {
          padding: 15px;
        }
        h4.modal-title {
          color: #fff;
          font-size: 20px;
          text-align: center;
          text-transform: uppercase;
        }
        img {
          max-width: 100%;
        }
        #addCartModal .modal-dialog {
          width: 400px;
        }
        #addCartModal .modal-dialog .modal-content {
          border-radius: 0;
        }
        #addCartModal .modal-header {
          padding: 10px 0px;
          position: relative;
        }
        #addCartModal h4.modal-title {
          color: #86590d;
          font-size: 15px;
          padding: 0;
        }
        #addCartModal .modal-header button {
          background: url("https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/fancybox_sprite.png")
            top left no-repeat;
          width: 35px;
          height: 35px;
          opacity: 1;
          filter: alpha(opacity=1);
          position: absolute;
          top: -10px;
          right: -15px;
        }
        .itemCartPrice {
          color: #86590d;
          font-size: 17px;
        }
        .itemCartPrice span {
          display: inline-block;
          vertical-align: middle;
        }
        .itemCartPrice del {
          color: #999999;
          font-size: 12px;
          margin-left: 5px;
          vertical-align: middle;
          display: inline-block;
        }
        .imgCartDetail {
          padding: 0px;
        }
        .imgCartDetail h3 {
          padding-right: 10px;
          line-height: 1.3;
        }
        #addCartModal .modal-footer {
          text-align: center;
          border: none;
          padding: 0;
        }
        #addCartModal .modal-footer button {
          display: inline-block;
          float: none;
          font-size: 14px;
          height: 35px;
          padding: 0px 10px;
          margin: 0px 5px;
          border: 1px solid #86590d;
          color: #fff;
          background: #86590d;
          opacity: 1;
          filter: alpha(opacity=100);
          text-shadow: none;
          font-weight: normal;
          margin-bottom: 10px;
        }
        @media only screen and (max-width: 767px) {
          #addCartModal .modal-dialog {
            max-width: 90%;
          }
          #addCartModal .modal-dialog {
            overflow: unset !important;
            padding-top: 30px !important;
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
        .fa-check-square-o:before {
          content: "\f046";
        }
      `}</style>
    </div>
  );
}
