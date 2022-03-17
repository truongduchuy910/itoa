import React, { Fragment, useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import DocTitle from "@itoa/app-admin-ui/client/components/DocTitle";
import { Container } from "@arch-ui/layout";
import { PageTitle } from "@arch-ui/typography";
import { HeaderInset } from "@itoa/app-admin-ui/client/pages/Home/components";
import { PencilIcon, CheckIcon } from "@primer/octicons-react";
export default function Stock() {
  const [keyword, setKeyword] = useState();
  const changeInput = (e) => {
    const { value } = e.target;
    if (value.length > 2) setKeyword(value);
  };
  const { loading, error, data, previousData, refetch } = useQuery(
    gql`
      query($skip: Int, $where: ProductWhereInput) {
        allProducts(first: 12, skip: $skip, where: $where) {
          id
          name
          stocks {
            id
            quantity
            attributeValues {
              id
              value
            }
          }
          attributes {
            id
            name
            label
          }
        }
      }
    `,
    { variables: { where: { name_contains_i: keyword } } }
  );
  const { allProducts = [] } = data || previousData || {};
  const changeItem = () => {
    refetch();
  };
  return (
    <Fragment>
      <DocTitle title="Xuất đơn hàng" />
      <Container>
        <HeaderInset>
          <PageTitle>Kho</PageTitle>
        </HeaderInset>
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            Nhập tên sản phẩm
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="tên sản phẩm"
            aria-label="tên sản phẩm"
            aria-describedby="basic-addon1"
            onChange={changeInput}
          />
        </div>
        <div className="clearfix">
          {!loading && !error
            ? allProducts.map((product, index) => (
                <Item key={index} product={product} onChange={changeItem} />
              ))
            : "Loading..."}
        </div>
      </Container>
    </Fragment>
  );
}

function Item({ product, onChange }) {
  const [open, setOpen] = useState(false);
  const stocks = product?.stocks
    ?.slice()
    ?.sort((a, b) => (a.value < b.value ? 1 : -1));

  return (
    <div className="col-sm-6 col-md-3 float-left p-1">
      <div className="border p-2">
        <h6>
          {product.name}
          {product.attributes.map((attribute, index) => {
            return (
              <span key={index} className="badge bg-primary">
                {attribute.lable} {attribute.name}
              </span>
            );
          })}
          <span
            className="ml-3"
            style={{ cursor: "pointer" }}
            onClick={() => setOpen((open) => !open)}
          >
            {open ? <CheckIcon /> : <PencilIcon />}
          </span>
        </h6>

        {open ? (
          stocks.map((stock) => {
            return (
              <StockItem key={stock.id} stock={stock} onChange={onChange} />
            );
          })
        ) : (
          <StockItemShort stocks={stocks} />
        )}
      </div>
    </div>
  );
}
function StockItem({ stock, onChange }) {
  const { attributeValues } = stock;
  const [onUpdate, resultUpdate] = useMutation(gql`
    mutation($id: ID!, $data: ProductStockUpdateInput) {
      updateProductStock(id: $id, data: $data) {
        id
      }
    }
  `);
  const blurInput = (e) => {
    if (!resultUpdate.loading && stock.id)
      onUpdate({
        variables: { id: stock.id, data: { quantity: Number(e.target.value) } },
      })
        .then(() => {
          onChange();
        })
        .catch((e) => console.log(e));
  };
  const str = attributeValues.map((value) => value.value).join(", ");
  return (
    <form
      style={{ display: "inline-block" }}
      className="m-1"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        blurInput(e);
      }}
    >
      <label htmlFor={str}>{str}</label>
      <input
        id={str}
        onBlur={blurInput}
        placeholder={stock.quantity}
        type="text"
        className="form-control input-sm ml-1"
        style={{ maxWidth: 60 }}
        placeholder={stock.quantity}
        aria-label={stock.quantity}
        aria-describedby="basic-addon1"
      />
    </form>
  );
}
function StockItemShort({ stocks, onClick }) {
  return (
    <div style={{ cursor: "pointer" }} onClick={onClick} className="mb-3">
      {stocks.map((stock, index) => (
        <button key={index} type="button" className="btn btn-sm m-1">
          {stock?.attributeValues?.map((value) => value.value).join(", ")}{" "}
          <span className="badge bg-secondary">{stock.quantity}</span>
        </button>
      ))}
    </div>
  );
}
