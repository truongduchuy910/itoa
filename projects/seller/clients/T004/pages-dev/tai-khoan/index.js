import { useApolloClient, gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Breadcrumb from "../../components/elements/Breadcrumb";
import Error from "../../components/elements/Error";
import Loading from "../../components/elements/Loading";
import { SignOutMutation } from "../../components/primes/User/Auth";
const GET_USER = gql`
  query {
    allContacts {
      phone
      name
      address
      isDefault
    }
    allProductOrders {
      id
      contact {
        name
        phone
        address
      }
      items {
        id
        product {
          name
        }
        sale
        price
        quantity
        variables {
          id
          value
        }
      }
      createdAt
    }
    authenticatedUser {
      id
      name
      phone
      isAdmin
      isSeller
    }
  }
`;
const Account = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [signOut] = useMutation(SignOutMutation);

  const { data, error, loading } = useQuery(GET_USER);
  if (loading) return <Loading />;
  if (error) return <Error {...data} />;
  const { authenticatedUser: User, allContacts, allProductOrders } = data;
  if (!User) {
    router.push("/tai-khoan/dang-nhap");
  }
  const onSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    signOut()
      .then(() => {
        client
          .resetStore()
          .then(() => {})
          .catch(() => {});
        router.push({ pathname: "/tai-khoan/dang-nhap" }).then(() => {});
      })
      .catch(() => {
        router.push("/");
      });
  };
  return (
    <Fragment>
      <Breadcrumb
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Tài khoản", url: "/gio-hang" },
        ]}
      />
      <div className="container">
        <div className="row my-5">
          <div className="col-main col-sm-9">
            <div className="my-account">
              <div className="page-title">
                <h1>Thông tin tài khoản</h1>
              </div>
              <div className="dashboard">
                <div className="welcome-msg">
                  {" "}
                  <strong>Xin chào, {User?.name || "bạn"}</strong>
                  <p />
                </div>
                <div className="recent-orders">
                  <div className="title-buttons">
                    <strong>Đơn hàng gần nhất</strong>{" "}
                  </div>
                  <div className="table-responsive">
                    {allProductOrders?.lenght ? (
                      <table className="data-table" id="my-orders-table">
                        <colgroup>
                          <col />
                          <col />
                          <col />
                          <col />
                          <col />
                          <col />
                        </colgroup>
                        <thead>
                          <tr className="first last">
                            <th>Đơn hàng #</th>
                            <th>Ngày</th>
                            <th>Chuyển đến</th>
                            {/* <th>
                            <span className="nobr">Giá trị đơn hàng</span>
                          </th>
                          <th>Tình trạng thanh toán</th> */}
                            <th>&nbsp;</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allProductOrders.map((order) => {
                            return (
                              <tr key={order.id}>
                                <td
                                  style={{
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                  }}
                                >
                                  {order.id}
                                </td>
                                <td>
                                  {new Date(
                                    order.createdAt
                                  ).toLocaleDateString()}
                                </td>
                                <td>
                                  {`${order.contact.name} ${order.contact.address} ${order.contact.phone}`}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    ) : (
                      <p>Không có đơn hàng nào.</p>
                    )}
                  </div>
                </div>
                <div className="product-pagination xxnobo"></div>
              </div>
            </div>
          </div>
          <aside className="col-right sidebar col-sm-3">
            <div className="block block-account">
              {/* <div className="block-title">Tài khoản của tôi</div> */}
              <div className="block-content">
                {/* <p>
                  Tên tài khoản: <strong>Huy Trần</strong>
                </p>
                <p>
                  Địa chỉ: <strong>100 Nguyễn Lương Bằng</strong>
                </p>
                <p>
                  Địa chỉ 2: <strong />
                </p>
                <p>
                  Thành phố:<strong> Đà Nẵng</strong>
                </p>
                <p>
                  {" "}
                  Quốc gia:<strong>Vietnam</strong>
                </p>
                <p>
                  Số điện thoại:<strong>0332813077</strong>
                </p>
                <p>
                  <a href="/account/addresses" className="button">
                    Sổ địa chỉ (2)
                  </a>
                </p> */}
                <p>
                  <a className="button" onClick={() => onSignOut()}>
                    Đăng xuất
                  </a>
                </p>
              </div>
            </div>
          </aside>
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
          h1 {
<<<<<<< HEAD
            
=======
            font-family: "PN", sans-serif;
>>>>>>> 8735ef09abbd805017a825431cae376006842f3f
            font-weight: 500;
            color: #000000;
            margin-top: 0px;
            font-weight: 400;
            line-height: 1;
          }
          h1 {
            font-size: 36px;
          }
          p {
            margin-bottom: 15px;
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
          thead {
            background-color: #f6f6f6;
          }
          .product-pagination {
            margin-top: 20px;
          }
          .data-table thead th {
            color: #333;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            line-height: 20px;
            padding: 10px;
          }
          table {
            width: 100%;
          }
          .page-title h1 {
            font-family: "SVN-Veneer";
            font-size: 26px;
          }
          /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/custommer.css?1613484421222 */
          .block-content p {
            line-height: 1.5;
            margin: 5px 0px;
          }
          .block-content a.button {
            border: 1px solid #ddd;
            background: #fff;
            padding: 5px 12px;
            display: inline-block;
            margin: 10px 0;
            font-size: 12px;
          }
          #my-orders-table tr td {
            padding: 5px 10px;
          }
          @media screen and (max-width: 479px) {
            #my-orders-table tr td {
              white-space: nowrap;
            }
          }
        `}</style>
      </div>
    </Fragment>
  );
};
export default Account;
