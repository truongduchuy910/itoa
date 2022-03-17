import { gql, useMutation } from "@apollo/client";
import { refetchProductCart } from ".";
import Title from "../../../elements/Title";
import TitleLak from "../../../elements/Title/Lak";
import { formatMoney } from "../../../utils/chip";
import ProductCartItemList from "./Item/List";
import ProductCartItemListLak from "./Item/List/Lak";
const Lak = ({
  ProductCart: productCart,
  refetch = () => {},
  deleteProdcutCartItem,
  onClickProduct = () => {},
  onClickCheckout = () => {},
  success,
  orderData,
}) => {
  var total = 0;
  productCart.items?.map((item) => {
    const price = (item.sale ? item.sale : item.price) * item.quantity;
    total = total + price;
  });

  const [onRemove, remove] = useMutation(gql`
    mutation($id: ID!) {
      deleteProductCartItem(id: $id) {
        id
      }
    }
  `);
  const clickRemove = (productCartItem) => {
    if (!remove.loading)
      onRemove({ variables: { id: productCartItem.id } })
        .then(() => {
          refetchProductCart()();
        })
        .catch((errors) => {
          refetchProductCart()();
        });
  };

  return (
    <div>
      {success ? <Success orderData={orderData} /> : null}
      <div className="mt-3">
        <Title UI={TitleLak} title="Giỏ hàng" />
      </div>
      <div className="row">
        <div className="col-md-8 col-sm-12 col-xs-12 listItem">
          <div className="table-cart-area">
            <div action="/cart" method="post" noValidate>
              <table className="table table-cart">
                <tbody>
                  <tr>
                    <th className="product">Sản phẩm</th>
                    <th className="qty">Số lượng</th>
                    <th className="linePrice">Tổng</th>
                    <th className="remove">Xóa</th>
                  </tr>
                  <ProductCartItemListLak
                    allProductCartItems={productCart.items}
                    clickRemove={clickRemove}
                  />
                </tbody>
              </table>
              {/* end table-cart */}
              <div className="button-action">
                <a
                  title="Tiếp tục"
                  className="cartContinue"
                  onClick={() => {
                    window.history.back();
                  }}
                >
                  Tiếp tục mua sắm
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-12 col-xs-12 listInfo">
          <div className="calculate-area">
            <div className="ct-ft-cart">
              <div className="total-cart">
                <div className="subtotal">
                  Tổng tiền <b> {formatMoney(total)}₫</b>
                </div>
                <div className="final-total text-center">
                  <button
                    title="Đặt hàng"
                    className="update-cart"
                    onClick={() => {
                      onClickCheckout();
                    }}
                  >
                    Đặt hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          .text-center {
            text-align: center;
          }
          @media (max-width: 720px) {
            .cartContinue {
              width: 100%;
              text-align: center;
            }
          }
          h4 {
            font-family: "PN", sans-serif;
            font-weight: 500;
            color: #000000;
            margin-top: 0px;
            font-weight: 400;
            line-height: 1;
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
          th {
            font-size: 13px;
          }
          span {
            font-size: 13px;
          }
          ::selection {
            background: #3399ff;
            color: #fff;
            text-shadow: none;
          }

          .button-action {
            padding: 20px 0;
          }
          .button-action:after {
            content: "";
            display: table;
            clear: both;
          }
          .button-action a {
            display: inline-block;
            border: 0;
            background: #86590d;
            height: 50px;
            padding: 0 40px;
            border-radius: 50px;
            font-size: 16px;
            text-decoration: none;
            line-height: 50px;
            transition: all 0.3s;
            color: #fff;
            text-transform: uppercase;
            font-weight: 300;
          }
          .button-action a:hover {
            background: #86590d;
            color: #fff;
          }
          .calculate-area {
            width: 100%;
            margin-bottom: 0px;
          }
          .calculate-area .ct-ft-cart {
            width: 100%;
            margin-bottom: 30px;
          }
          .calculate-area .ct-ft-cart:after {
            content: "";
            display: table;
            clear: both;
          }
          .calculate-area .ct-ft-cart .update-cart {
            display: inline-block;
            border: 1px solid transparent;
            border-color: #86590d;
            background: #86590d;
            height: 45px;
            padding: 0 30px;
            border-radius: 50px;
            font-size: 14px;
            line-height: 45px;
            transition: all 0.3s;
            text-decoration: none;
            color: #333;
            text-transform: uppercase;
            font-weight: 300;
            color: #fff;
          }
          .calculate-area .ct-ft-cart .update-cart:hover {
            background: #fff;
            color: #86590d;
          }
          .calculate-area .total-cart {
            border: 1px solid #eee;
            padding-top: 0px;
            margin-bottom: 20px;
          }
          .calculate-area .total-cart .subtotal {
            width: 100%;
            color: #787878;
            font-size: 16px;
            padding: 10px 25px;
          }
          .calculate-area .total-cart .subtotal b {
            float: right;
          }
          .calculate-area .total-cart .final-total {
            background: #fafafa;
            color: #333;
            font-size: 16px;
            padding: 25px;
            border-top: 1px solid #eee;
          }
          .calculate-area .total-cart .final-total:after {
            content: "";
            display: table;
            clear: both;
          }
          img {
            max-width: 100%;
          }
          table {
            width: 100%;
          }
          .eventnone {
            pointer-events: none;
          }
          input[type="text"],
          input[type="button"] {
            -webkit-appearance: none;
            border-radius: 0;
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
            background-size: 300px;
            width: 22px;
            height: 22px;
            display: inline-block;
            position: absolute;
            top: 9px;
            left: 12px;
          }
          .icon_checkout.ico-name {
            background-position: 0 -22px;
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
            background-size: 300px;
            width: 22px;
            height: 22px;
            display: inline-block;
            position: absolute;
            top: 9px;
            left: 12px;
          }
          .icon_checkout.ico-name {
            background-position: 0 -22px;
          }
        `}</style>
      </div>
    </div>
  );
};
export default Lak;
