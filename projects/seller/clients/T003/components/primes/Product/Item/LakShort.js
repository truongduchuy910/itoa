import { gql, useMutation } from "@apollo/client";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useState } from "react";
import Error from "../../../elements/Error";
import { formatMoney } from "../../../utils/chip";
import { refetchProductCartCount } from "../Cart/Count";

const ProductCartItemLakShort = ({
  item,
  deleteProdcutCartItem,
  refetch,
  onClickProduct,
}) => {
  const [fixed, setFixed] = useState(false);
  const [update, { error }] = useMutation(gql`
    mutation($id: ID!, $data: ProductCartItemUpdateInput) {
      updateProductCartItem(id: $id, data: $data) {
        id
        quantity
      }
    }
  `);
  const price = (item.sale ? item.sale : item.price) * item.quantity;
  const [quantity, setQuantity] = useState(item.quantity);
  const [minusDelay, setMinusDelay] = useState();
  const minus = ({ id }) => {
    setQuantity((quantity) => (quantity > 1 ? --quantity : 1));
    clearTimeout(minusDelay);
    setMinusDelay(
      setTimeout(() => {
        const variables = {
          id,
          data: { quantity: quantity - 1 > 0 ? quantity - 1 : 1 },
        };
        update({
          variables,
        })
          .then((d) => {
            refetchProductCartCount()();
          })
          .catch((e) => {
            setFixed(true);
          });
      }, 1000)
    );
  };
  const [plusDelay, setPlusDelay] = useState();

  const plus = ({ id }) => {
    setQuantity((quantity) => ++quantity);
    clearTimeout(plusDelay);
    setPlusDelay(
      setTimeout(() => {
        const variables = {
          id,
          data: { quantity: quantity - 1 > 0 ? quantity - 1 : 1 },
        };
        update({ variables: { id, data: { quantity: quantity + 1 } } })
          .then((d) => {
            refetchProductCartCount()();
          })
          .catch((e) => {
            setFixed(true);
          });
      }, 1000)
    );
  };
  const [deleting, setDeleting] = useState(false);
  return (
    <tr key={item.id} className="cartItem">
      <td className="product">
        <div className="thumb-cart row">
          {error && <Error error={error} />}

          <a
            onClick={() => onClickProduct(item.product.url)}
            title={item.product.name}
            className="col-12 col-md-4 mt-4"
          >
            <img
              src={`${
                
                  process.env.CMS
                  
              }${item.product?.image?.publicUrl}`}
              alt={item.product.name}
              style={{ marginBottom: 21, width: "100%" }}
            />
          </a>
          <div className="col">
            <a
              onClick={() => onClickProduct(item.product.url)}
              title={item.product.name}
            >
              <h4
                style={{
                  textTransform: "capitalize",
                  marginBottom: 13,
                }}
              >
                {item.product.name}
              </h4>
            </a>
            {item.sale ? (
              <Fragment>
                <span>{formatMoney(item.sale)}₫</span>
                <div className="variant_title old">
                  {formatMoney(item.price)}₫
                </div>
              </Fragment>
            ) : (
              <span style={{ marginBottom: 8 }}>
                {formatMoney(item.price)}₫
              </span>
            )}
            <div style={{ marginBottom: 34 }}>
              {item.stock?.attributeValues?.map((variable) => {
                return (
                  <span className="var" key={variable.id}>
                    {variable.value}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </td>
      <td className="qty">
        <div className="qty-number">
          <input
            type="button"
            defaultValue="-"
            className="qtyminus"
            field="quantity"
            onClick={() => {
              minus({ id: item.id });
            }}
          />
          <input
            type="text"
            size={4}
            name="quantity"
            min={1}
            dataid={41471311}
            id="updates_6"
            readOnly
            value={quantity}
            className="tc item-quantity eventnone qty"
          />
          <input
            type="button"
            defaultValue="+"
            className="qtyplus"
            field="quantity"
            onClick={() => {
              plus({ id: item.id });
            }}
          />
        </div>
      </td>
      <td className="linePrice">
        <b>{formatMoney(price)}₫</b>
      </td>
      <td className="remove">
        <a
          title="Xóa"
          className="remove-item"
          onClick={async () => {
            if (!deleting) {
              try {
                setDeleting(true);
                const { data } = await deleteProdcutCartItem({
                  variables: { id: item.id },
                });

                refetch();
                setDeleting(false);
              } catch (e) {
                console.log(e);
              }
            }
          }}
        >
          <FontAwesomeIcon
            icon={faTrash}
            style={{
              padding: 10,
              fontSize: 34,
              cursor: "pointer",
            }}
          />
        </a>
      </td>
      <style jsx>{`
        div,
        b {
          font-size: 14px;
        }
        input {
          margin: 0;
          font: inherit;
          color: inherit;
        }
        input::-moz-focus-inner {
          padding: 0;
          border: 0;
        }
        input {
          line-height: normal;
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
        input {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }
        input {
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
        input:focus {
          background: transparent;
          border: 2px solid #86590d;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        input[type="text"] {
          -webkit-appearance: none;
          border-radius: 0;
        }
        .thumb-cart {
          display: flex;
          align-items: center;
          max-width: 400px;
        }
        .var {
          margin-right: 13px;
          text-decoration: underline;
        }
        .thumb-cart > a {
        }
        .ip {
          margin-bottom: 12px;
          width: 100%;
          border-radius: 21px;
          border: 1px solid #eee;
          padding-left: 13px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px !important;
          opacity: 0.6;
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
        input:focus {
          background: transparent;
          border: 2px solid #86590d;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        .table.table-cart {
          border-color: #eee;
          border-bottom: 1px solid #eee;
        }
        .table.table-cart tr {
          border-color: #eee;
        }
        .table.table-cart th {
          font-size: 14px;
          color: #333;
          text-align: left;
          font-weight: 400;
          border-color: #eee;
          padding: 10px 0;
        }
        .table.table-cart td {
          font-size: 16px;
          color: #1c1c1c;
          text-align: left;
          vertical-align: middle;
          padding: 10px 0;
          border-color: #eee;
        }

        .table.table-cart td a.remove-item {
          font-size: 16px;
          color: #000;
          text-align: left;
        }
        .table.table-cart td b {
          font-size: 16px;
          color: #1c1c1c;
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
        }
        a,
        input {
          outline: medium none;
          color: #434343;
        }
        .table.table-cart td .thumb-cart:after {
          content: "";
          display: table;
          clear: both;
        }
        .table.table-cart td .thumb-cart img {
          float: left;
        }
        .table.table-cart td .thumb-cart h4 {
          font-size: 16px;
          color: #000;
          text-align: left;
          margin: 0;
          padding-top: 30px;
          margin-bottom: 10px;
        }
        .table.table-cart td .thumb-cart span {
          font-size: 13px;
          color: #000;
          text-align: left;
          display: block;
        }
        @media (max-width: 480px) {
          .calculate-area .ct-ft-cart {
            margin-bottom: 0px;
          }
          .table.table-cart td .thumb-cart img {
            float: none;
          }
          .qty-number input {
            padding: 0;
          }
          .table.table-cart td .thumb-cart h4 {
            padding: 0;
            margin-top: 10px;
            font-size: 14px;
          }
          span {
            margin-bottom: 13px;
          }
          .table.table-cart td .thumb-cart span {
            font-size: 13px;
          }
          .table.table-cart th,
          .table.table-cart td {
            max-width: 125px;
          }
          .qty-number input[type="button"] {
            width: 20px;
            border: 0;
          }
        }
        .qty-number {
          border-radius: 50px;
          overflow: hidden;
          display: inline-block;
          border: none;
          width: 100px;
        }
        .qty-number:after {
          content: "";
          display: table;
          clear: both;
        }
        .qty-number input {
          border: 0;
          border-left: 1px solid #eee;
          outline: none;
          text-align: center;
          float: left;
          border-right: 1px solid #eee;
          background: #fff;
        }
        .qty-number input[type="button"] {
          width: 20px;
          border: 0;
        }
        @media only screen and (max-width: 767px) {
          .table-cart-area {
            text-align: center;
          }
          .button-action a {
            display: block;
            margin-bottom: 15px;
          }
        }

        @media (max-width: 320px) {
          .table.table-cart th,
          .table.table-cart td {
            max-width: 100px;
          }
        }
      `}</style>
    </tr>
  );
};
export default ProductCartItemLakShort;
