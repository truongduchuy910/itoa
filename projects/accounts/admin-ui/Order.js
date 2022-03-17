import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState, Fragment } from "react";
import { PageTitle } from "@arch-ui/typography";
import DocTitle from "@itoa/app-admin-ui/client/components/DocTitle";
import { HeaderInset } from "@itoa/app-admin-ui/client/pages/Home/components";
import { Container } from "@arch-ui/layout";
import exportFromJSON from "export-from-json";
const Order = () => {
  const [current, setCurrent] = useState({ value: null });
  const [done, setDone] = useState({ value: null });

  const { data, error, loading, refetch } = useQuery(
    gql`
      query {
        allProductOrderStatuses {
          id
          value
          color
        }
        allPages {
          shipMoneySupport
        }
      }
    `
  );

  if (loading || error) return "Đang tải...";
  const { allProductOrderStatuses, allPages } = data;
  const [page] = allPages;

  return (
    <Fragment>
      <DocTitle title="Xuất đơn hàng" />
      <Container>
        <HeaderInset>
          <PageTitle>Xuất đơn hàng</PageTitle>
        </HeaderInset>
        <All
          refetch={refetch}
          allProductOrderStatuses={allProductOrderStatuses}
          page={page}
          ProductOrderWhereInput={{
            isExport: null,
          }}
        />

        <style jsx="true">{`
          td {
            padding-left: 13px;
            padding-right: 13px;
          }
          label {
            color: #888;
          }
        `}</style>
      </Container>
    </Fragment>
  );
};
export default Order;
function formatMoney(amount, decimalCount = 0, decimal = ".", thousands = ",") {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? "-" : "";
    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;
    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
      // +      " đ"
    );
  } catch (e) {}
}

const Status = ({ pre, allProductOrderStatuses, setCurrent = () => {} }) => {
  return (
    <div
      className="py-3"
      style={{
        position: "sticky",
        top: 0,
        backgroundColor: "#fff",
        padding: 13,
        marginBottom: 34,
      }}
    >
      {allProductOrderStatuses?.map((status) => {
        return (
          <span
            key={status.id}
            className="me-3"
            onClick={() => [setCurrent(status)]}
            style={{ cursor: "pointer" }}
          >
            <span className={`badge bg-${status.color || `secondary`}`}>
              {pre} {status.value}
            </span>
          </span>
        );
      })}
    </div>
  );
};
const All = ({ ProductOrderWhereInput, allProductOrderStatuses, page }) => {
  const [onUpdateProductOrders, resultUpdateProductOrders] = useMutation(gql`
    mutation($data: [ProductOrdersUpdateInput]) {
      updateProductOrders(data: $data) {
        id
      }
    }
  `);
  var first = 5,
    skip = 0;
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, error, loading, refetch, fetchMore } = useQuery(
    gql`
      query($first: Int, $skip: Int, $condition: ProductOrderWhereInput) {
        allProductOrders(
          first: $first
          skip: $skip
          sortBy: updatedAt_DESC
          where: $condition
        ) {
          id
          code
          status {
            id
            value
            color
          }
          items {
            id
            sale
            price
            quantity
            product {
              name
              image {
                publicUrl
              }
            }
            stock {
              id
              attributeValues {
                id
                value
              }
            }
          }
          payment
          discount {
            code
            value
            name
            type
          }
          total
          saving
          createdAt
          updatedAt
          contact {
            phone
            name
            address
            email
            message
          }
        }
      }
    `,
    {
      variables: {
        condition: ProductOrderWhereInput,
        first,
        skip,
      },
    }
  );
  if (loading || error) return "Đang tải...";
  const { allProductOrders } = data;
  const onClickMore = () => {
    if (!loading)
      fetchMore({
        variables: { skip: data.allProductOrders.length },
        updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
          return {
            ...previousResult,
            // Add the new allProductOrders data to the end of the old allProductOrders data.
            allProductOrders: [
              ...previousResult.allProductOrders,
              ...fetchMoreResult.allProductOrders,
            ],
          };
        },
      });
  };
  const clickExport = (e) => {
    exportFromJSON({
      data: allProductOrders.map((order) => {
        // update
        var {
          status: { value = "" },
          payment = "",
          discount,
          total = "",
          items = [],
          contact: {
            phone = "",
            name = "",
            address = "",
            email = "",
            message = "",
          },
        } = order;
        items = items.map((item) => {
          return `${item.quantity} ${item.product?.name} ${formatMoney(
            item.quantity * (item.sale ? item.sale : item.price)
          )} ${item.stock?.attributeValues
            ?.map((value) => value.value)
            ?.join(" | ")}`;
        });
        return {
          code: discount && discount.code,
          value,
          total,
          phone,
          name,
          address,
          email,
          message,
          payment,
          items: items.join(" "),
        };
      }),
      fileName: "download",
      exportType: "xls",
    });
    const data = allProductOrders.map((order) => {
      return { id: order.id, data: { isExport: true } };
    });
    onUpdateProductOrders({ variables: { data } })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        refetch();
      });
  };
  return (
    <Fragment>
      <button
        onClick={clickExport}
        className="btn btn-sm btn-outline-primary mb-4"
      >
        {resultUpdateProductOrders.loading
          ? "Loading..."
          : "Đánh dấu là đã xem"}
      </button>
      <div className="clearfix">
        {allProductOrders?.map((order, index) => {
          var count = page.shipMoneySupport;
          order.items.map((item) => {
            count += item.sale || item.price;
          });
          return (
            <div
              key={index}
              style={{ marginBottom: 34, padding: 13 }}
              className="card col-12 col-md-6 float-left"
            >
              <p className="me-2">
                📆 {new Date(order.updatedAt).toLocaleString()}
              </p>
              <p className="p-0 m-0">
                {order?.contact?.name}{" "}
                <a href={`tel:${order?.contact?.phone}`}>
                  {order?.contact?.phone}
                </a>
              </p>
              <p className="p-0 m-0"></p>
              <p className="p-0 m-0">{order?.contact?.address}</p>
              <p className="p-0 m-0">{order?.contact?.email}</p>
              <p className="p-0 m-0">{order?.contact?.message}</p>
              <p>{formatMoney(count)}</p>
              <p>{order.payment}</p>
              <p>{order?.discount?.code}</p>
              {order?.items.map((item) => {
                return (
                  <table key={item.id}>
                    <tbody>
                      <tr>
                        <td>{item.quantity} </td>
                        <td> {item.product?.name} </td>
                        <td>
                          {formatMoney(
                            item.quantity * (item.sale ? item.sale : item.price)
                          )}
                        </td>
                        <td>
                          {" "}
                          {item.stock?.attributeValues
                            ?.map((value) => value.value)
                            ?.join(",")}{" "}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                );
              })}
            </div>
          );
        })}
      </div>
      <hr />
      {!loadingMore && (
        <button
          className="btn btn-sm btn-primary my-3"
          onClick={() => {
            onClickMore();
          }}
        >
          Xem thêm
        </button>
      )}
    </Fragment>
  );
};
