import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Title from "../../../elements/Title";
import TitleLak from "../../../elements/Title/Lak";
import { formatMoney } from "../../../utils/chip";
import FAQ from "../../FAQ";
import FAQSimple from "../../FAQ/Simple";
import ProductList from "../List";
import ProductListLak from "../List/Lak";
import CartItemItemLak from "../Cart/Item/Item/Lak";
import { onToast } from "../../../elements/Toast/Simple";
import { refetchProductCart } from "../Cart";
import Field from "../../../Field";
import Image from "next/image";
import { Container } from "@chakra-ui/react";
import { refetchProductCartItemList } from "../Cart/Item/List";
const LakDetail = ({
  quickview = false,
  product,
  quantity,
  //
  clickPlus = (e) => {},
  clickMinus = (e) => {},
  addToCart = (e) => {},
  onChangeAttributeValues = (values) => {},
}) => {
  const router = useRouter();

  const [values, setValues] = useState([]);
  const onClickAttribute = ({ attribute, value }) => {
    // remove all value of attribute in values
    var temp = [];
    values?.map((a) => {
      var isIn = false;
      attribute.values.map((b) => {
        if (a.id === b.id) isIn = true;
      });
      if (!isIn) temp.push(a);
    });
    //
    temp.push(value);
    setValues(temp);
    onChangeAttributeValues(temp);
  };
  const [currentImage, setCurrentImage] = useState(
    `${encodeURI(product?.image?.publicUrl.replace(/\/md/g, ""))}`,
  );
  const [zoom, setZoom] = useState(false);
  var count = 0;
  product?.stocks?.map((stock) => (count += stock.quantity));
  const [err, setErr] = useState();
  const [sucessProduct, setSuccessProduct] = useState(false);
  const clickClose = (e) => {
    setSuccessProduct(false);
  };
  const clickCart = (e) => {
    router.push("/gio-hang");
  };
  return (
    <Container maxW="container.xl" py={2}>
      {sucessProduct && (
        <CartItemItemLak
          productCartItem={sucessProduct}
          onClose={clickClose}
          onClickCart={clickCart}
        />
      )}
      <div className="row pro-content">
        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="slider-image">
            <div id="slider" className="flexslider">
              <ul className="slides">
                <li>
                  <span>
                    <a className="fancybox-thumb" title="Hình chính">
                      <img
                        className="product-image-feature"
                        src={encodeURI(
                          currentImage ||
                            product?.image?.publicUrl.replace(/\/md/g, ""),
                        )}
                        onClick={() => {
                          setZoom((zoom) => !zoom);
                        }}
                        style={
                          zoom
                            ? {
                                scale: 2,
                                zIndex: 10,
                                top: 0,
                                left: 0,
                                maxHeight: "100vh",
                              }
                            : {}
                        }
                      />
                    </a>
                  </span>
                </li>
              </ul>
            </div>

            <div id="carousel" className="flexslider">
              <div
                className="flex-viewport"
                style={{ overflow: "hidden", position: "relative" }}
              >
                <ul
                  className="slides"
                  style={{
                    width: "400%",
                    transitionDuration: "0s",
                    transform: "translate3d(0px, 0px, 0px)",
                  }}
                >
                  {[{ file: product?.image }, ...(product?.images || [])]?.map(
                    (image, index) => {
                      return (
                        <li
                          key={index}
                          className={`product-thumb ${
                            currentImage ===
                              `${encodeURI(
                                image.file?.publicUrl.replace(/\/md/g, "/sm"),
                              )}` && `checked`
                          }`}
                          style={{
                            width: "48px",
                            marginRight: "10px",
                            float: "left",
                            display: "block",
                          }}
                          onClick={() => {
                            setCurrentImage(
                              `${encodeURI(
                                image.file?.publicUrl.replace(/\/md/g, ""),
                              )}`,
                            );
                          }}
                        >
                          <a
                            href="#"
                            data-image={`${encodeURI(
                              image.file?.publicUrl,
                            )}`}
                            data-zoom-image={`${encodeURI(
                              image.file?.publicUrl,
                            )}`}
                          >
                            <Image
                              width={200}
                              height={200}
                              layout="responsive"
                              objectFit="contain"
                              placeholder="blur"
                              blurDataURL="/assets/img/no-image.png"
                              src={`${encodeURI(
                                image.file?.publicUrl.replace(/\/md/g, "/sm"),
                              )}`}
                              draggable="false"
                            />
                          </a>
                        </li>
                      );
                    },
                  )}
                </ul>
              </div>
              <ul className="flex-direction-nav">
                <li className="flex-nav-prev">
                  <a className="flex-prev flex-disabled" href="#" tabIndex={-1}>
                    Previous
                  </a>
                </li>
                <li className="flex-nav-next">
                  <a className="flex-next flex-disabled" href="#" tabIndex={-1}>
                    Next
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-sm-6 col-xs-12">
          <div className="description-product">
            <div className="info-desc">
              <h1 className="title-product mt-4" itemProp="name">
                {product?.name}
              </h1>
              <div className="price pdPrice" itemProp="offers">
                <b>Giá:</b>
                {product?.sale ? (
                  <Fragment>
                    <span id="pro-price">
                      <span>
                        <Field>{product.sale}</Field> ₫
                      </span>
                    </span>
                    <span className="price">
                      <span
                        style={{
                          textDecorationLine: "line-through",
                          color: "var(--text)",
                          fontSize: 15,
                        }}
                      >
                        <Field>{product.price}</Field> ₫
                      </span>
                    </span>
                  </Fragment>
                ) : (
                  <span id="pro-price">
                    <span>
                      <Field>{product?.price || 0}</Field> ₫
                    </span>
                  </span>
                )}

                <span className="a-stock a2 hidden">
                  <link itemProp="availability" />
                  {product?.isOutOfStock ? "Hết hàng" : "Còn hàng"}
                </span>
              </div>
              <div className="cate">
                Trạng thái :
                <a id="price-preview">
                  {product?.isOutOfStock ? "Hết hàng" : "Còn hàng"}
                </a>
              </div>
              {/*  QUANTITY  */}
              <div className="mt-3">
                {values.length === product?.attributes.length
                  ? count
                    ? `Còn ${count} sản phẩm`
                    : `Hết hàng`
                  : `Vui lòng chọn thuộc tính`}
              </div>
              {/*  */}
              <div className="shortDesc ">
                <p></p>
              </div>
            </div>
            {!product?.isOutOfStock && (
              <div className="qty-cart row">
                <form
                  id="form-pro"
                  action="#"
                  method="get"
                  className="qty-number-cart col-6"
                >
                  <div className="qtytmt">
                    <input
                      readOnly={true}
                      type="button"
                      defaultValue="-"
                      className="qtyminus"
                      data-field="quantity"
                      onClick={clickMinus}
                    />
                    <input
                      readOnly={true}
                      type="text"
                      name="quantity"
                      value={quantity}
                      className="qty poneventnone"
                    />
                    <input
                      readOnly={true}
                      type="button"
                      defaultValue="+"
                      className="qtyplus"
                      data-field="quantity"
                      onClick={clickPlus}
                    />
                  </div>
                  {product?.attributes?.map((attribute) => {
                    return (
                      <div
                        key={attribute.id}
                        className="select-swatch mb-3"
                        style={{ display: "table", clear: "both" }}
                      >
                        <div
                          id="variant-swatch-0"
                          className="swatch clearfix"
                          data-option="option1"
                          data-option-index={0}
                        >
                          <div className="header-s">{attribute.label}</div>
                          <div className="select-swap">
                            {attribute.values
                              ?.slice()
                              ?.sort((a, b) => (a.value < b.value ? 1 : -1))
                              ?.map((value) => {
                                var exist = false;
                                values.map((v) => {
                                  if (v.id === value.id) exist = true;
                                });
                                return (
                                  <div
                                    key={value.id}
                                    data-value={value.value}
                                    className="n-sd swatch-element available mb-2"
                                    onClick={() => {
                                      onClickAttribute({ attribute, value });
                                    }}
                                  >
                                    <label
                                      style={{
                                        fontWeight: exist ? "bold" : "normal",
                                        textDecoration: exist
                                          ? "underline"
                                          : "none",
                                        color:
                                          exist && "var(--color-text-primary)",
                                        borderColor:
                                          exist && "var(--color-text-primary)",
                                      }}
                                    >
                                      {value.value}
                                    </label>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </form>
                <div className="link-detail col-6">
                  <a
                    className="add-to-c btnAddCart"
                    onClick={(e) => {
                      addToCart(e)
                        .then(({ data }) => {
                          setSuccessProduct(data.createProductCartItem);
                          refetchProductCart()();
                          refetchProductCartItemList()();
                        })
                        .catch((err) => {
                          const { graphQLErrors } = err;
                          if (graphQLErrors)
                            onToast()(graphQLErrors[0].message);
                          setErr(graphQLErrors);
                          refetchProductCart()();
                          refetchProductCartItemList()();
                        });
                    }}
                  >
                    Thêm vào giỏ
                  </a>
                </div>
              </div>
            )}

            <div className="list-pd-dt">
              <div className="sku-p">
                <b>Mã sản phẩm</b>
                <p>{product?.url}</p>
              </div>
              <FAQ UI={FAQSimple} />

              {/* <div className="share-p">
                <b>Chia sẻ</b>
                <ul>
                  <li>
                    <a
                      target="_blank"
                      href="https://facebook.com/sharer.php?u=https://lakshop.vn/versace-medusa-logo-multicolor-shirts"
                    >
                      <FontAwesomeIcon icon={"facebook-square"} />
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href="https://plus.google.com/share?url=//lakshop.vn/versace-medusa-logo-multicolor-shirts"
                      className="share-google"
                    >
                      <i className="fa fa-google-plus" />
                    </a>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      {/* detail-product */}
      {/* <div>
        {[{ file: product.image }, ...product?.images]?.map((image) => {
          return (
            <img
              className="img-detail"
              src={`${

                        ``

                    }image.file.publicUrl}`}
            />
          );
        })}
      </div> */}
      {!quickview && (
        <Fragment>
          <Tabs className="mt-5">
            <TabList>
              {product?.description && <Tab>Mô tả</Tab>}
              {product?.detail?.publicUrl && <Tab>Chi tiết</Tab>}
              {product?.guide && <Tab>Hướng dẫn</Tab>}
            </TabList>

            <TabPanels>
              {product?.description && (
                <TabPanel>
                  <Field>{product?.description}</Field>
                </TabPanel>
              )}
              {product?.detail?.publicUrl && (
                <TabPanel>
                  <Image
                    width={500}
                    height={500}
                    src={`${encodeURI(product?.detail?.publicUrl)}`}
                    layout="responsive"
                  />
                </TabPanel>
              )}
              {product?.guide && (
                <TabPanel>
                  <Field>{product?.guide}</Field>
                </TabPanel>
              )}
            </TabPanels>
          </Tabs>
          <Title UI={TitleLak} title={`Sản phẩm liên quan`} />

          <ProductList
            UI={ProductListLak}
            ProductWhereInput={{
              id_not: product?.id,
              categories_every: {
                id_in: product?.categories?.map((category) => category.id),
              },
            }}
            first={3}
          />
        </Fragment>
      )}
      <style jsx>{`
        a {
          background-color: transparent;
        }
        a:active,
        a:hover {
          outline: 0;
        }
        b {
          font-weight: 700;
        }
        .img-detail {
          max-width: 100%;
          margin-bottom: 15px;
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
        p {
          margin: 0 0 10px;
        }
        ul {
          margin-top: 0;
          margin-bottom: 10px;
        }
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
        ul {
          margin: 0px;
          padding: 0px;
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
        .list-pd-dt {
          padding-top: 25px;
        }
        .list-pd-dt > div {
          margin-bottom: 25px;
        }
        .list-pd-dt > div b {
          font-size: 14px;
          color: #545454;
          display: inline-block;
          width: 115px;
          position: relative;
          margin-right: 20px;
        }
        .list-pd-dt > div b:after {
          content: ":";
          position: absolute;
          right: -10px;
          top: 0;
        }
        .list-pd-dt > div p {
          font-size: 15px;
          color: #545454;
          display: inline-block;
          margin-bottom: 0;
        }
        .list-pd-dt > div.share-p ul {
          display: inline-block;
        }
        .list-pd-dt > div.share-p ul li {
          display: inline-block;
          margin-right: 20px;
        }
        .list-pd-dt > div.share-p ul li a {
          color: #000;
          -webkit-transition: all 300ms ease-in-out;
          -moz-transition: all 300ms ease-in-out;
          transition: all 300ms ease-in-out;
        }
        ul {
          list-style-position: inside;
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/all.css?1613484421222 */
        a {
          background-color: transparent;
        }
        a:active,
        a:hover {
          outline: 0;
        }
        input,
        select {
          margin: 0;
          font: inherit;
          color: inherit;
        }
        select {
          text-transform: none;
        }
        html input[type="button"] {
          -webkit-appearance: button;
          cursor: pointer;
        }
        input::-moz-focus-inner {
          padding: 0;
          border: 0;
        }
        input {
          line-height: normal;
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
          a[href^="javascript:"]:after {
            content: "";
          }
        }
        * {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        :after,
        :before {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        input,
        select {
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
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
        label {
          display: inline-block;
          max-width: 100%;
          margin-bottom: 5px;
          font-weight: 700;
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1613484421222 */
        a {
          -webkit-transition: all 0.3s ease-out 0s;
          -o-transition: all 0.3s ease-out 0s;
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
        a,
        input {
          outline: medium none;
          color: #434343;
        }
        label {
          font-size: 15px;
          font-weight: 400;
          color: #626262;
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
        select {
          width: 100%;
          border: 2px solid #eceff8;
          height: 45px;
          padding-left: 10px;
          -webkit-box-shadow: none;
          box-shadow: none;
          font-size: 14px;
          color: #626262;
        }
        option {
          background: #fff;
          border: 0px solid #626262;
          padding-left: 10px;
          font-size: 14px;
        }
        input:focus {
          background: transparent;
          border: 2px solid #86590d;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        .description-product .qty-cart {
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          padding: 30px 0;
        }
        .description-product .qty-cart:after {
          content: "";
          display: table;
          clear: both;
        }
        .description-product .qty-cart .qty-number-cart {
          float: left;
        }
        .description-product .qty-cart .qty-number-cart:after {
          content: "";
          display: table;
          clear: both;
        }
        .description-product .qty-cart .qty-number-cart input {
          border: 0;
          border-left: 1px solid #eee;
          outline: none;
          height: 50px;
          text-align: center;
          width: 50px;
          float: left;
          margin-right: 5px;
          border: 1px solid #eee;
          border-radius: 5px;
          background: #fff;
          color: #909090;
          font-size: 18px;
        }
        .description-product .qty-cart .qty-number-cart input[type="button"] {
          font-size: 24px;
          cursor: pointer;
        }
        .description-product .qty-cart .link-detail {
          float: left;
        }
        .description-product .qty-cart .link-detail:after {
          content: "";
          display: table;
          clear: both;
        }
        .description-product .qty-cart .link-detail > a {
          font-size: 13px;
          color: #fff;
          text-decoration: none;
          padding: 0 30px;
          background: #86590d;
          border: 1px solid;
          border-color: #86590d;
          display: inline-block;
          height: 45px;
          line-height: 45px;
          border-radius: 50px;
          text-transform: uppercase;
          float: left;
          -webkit-transition: all 300ms ease-in-out;
          -o-transition: all 300ms ease-in-out;
          transition: all 300ms ease-in-out;
        }
        .description-product .qty-cart .link-detail > a:hover {
          background: #fff;
          color: #86590d;
        }
        .description-product .qty-cart .qty-number-cart input {
          padding: 0;
        }
        .selector-wrapper {
          display: none;
        }
        .selector-wrapper {
          display: none;
        }
        .poneventnone {
          pointer-events: none;
        }
        input[type="text"],
        input[type="button"] {
          -webkit-appearance: none;
          border-radius: 0;
        }
        @media only screen and (max-width: 767px) {
          .description-product .qty-cart .qty-number-cart input {
            height: 40px;
            width: 40px;
          }
        }
        /*
* Prefixed by https://autoprefixer.github.io
* PostCSS: v7.0.29,
* Autoprefixer: v9.7.6
* Browsers: last 4 version
*/

        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/all.css?1613484421222 */
        a {
          background-color: transparent;
        }
        a:active,
        a:hover {
          outline: 0;
        }
        b {
          font-weight: 700;
        }
        h1 {
          margin: 0.67em 0;
          font-size: 2em;
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
          a[href^="javascript:"]:after {
            content: "";
          }
          p {
            orphans: 3;
            widows: 3;
          }
        }
        * {
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
        }
        :after,
        :before {
          -webkit-box-sizing: border-box;
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
        h1 {
          font-family: inherit;
          font-weight: 500;
          line-height: 1.1;
          color: inherit;
        }
        h1 {
          margin-top: 20px;
          margin-bottom: 10px;
        }
        h1 {
          font-size: 36px;
        }
        p {
          margin: 0 0 10px;
        }
        .hidden {
          display: none !important;
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1613484421222 */
        a {
          -webkit-transition: all 0.3s ease-out 0s;
          -o-transition: all 0.3s ease-out 0s;
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
        .price {
          text-decoration: line-through;
          color: #999;
          font-size: 14px;
          padding-right: 5px;
        }
        .hidden {
          display: none !important;
        }
        .description-product .info-desc h1 {
          font-size: 28px;
          color: #000;
          margin: 0;
          font-weight: bold;
        }
        .description-product .info-desc h1:after {
          content: "";
          display: block;
          width: 50px;
          height: 1px;
          background: #86590d;
          margin: 20px 0;
        }
        .description-product .info-desc .price {
          margin-bottom: 15px;
          text-decoration: initial;
        }
        .description-product .info-desc .price b {
          color: #000;
        }
        .description-product .info-desc .price span {
          font-size: 28px;
          display: inline-block;
          margin-right: 15px;
          color: var(--color-text-danger);
          font-weight: bold;
        }
        .description-product .info-desc .cate {
          font-size: 16px;
          color: #1c1c1c;
          margin-bottom: 15px;
          font-weight: bold;
        }
        .description-product .info-desc .cate a {
          color: var(--color-text-danger);
          text-decoration: none;
          display: inline-block;
          margin-left: 5px;
          cursor: default;
        }
        .description-product .info-desc p {
          font-size: 14px;
          color: #666;
          margin-bottom: 30px;
          margin-top: 10px;
        }
        #pro-price {
          padding-left: 15px;
        }

        .flex-direction-nav,
        .slides,
        .slides > li {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        .flexslider {
          padding: 0;
          margin: 0 0 60px;
          background: #fff;
          border: 4px solid #fff;
          position: relative;
          zoom: 1;
          border-radius: 4px;
          -webkit-box-shadow: "" 0 1px 4px rgba(0, 0, 0, 0.2);
          -o-box-shadow: "" 0 1px 4px rgba(0, 0, 0, 0.2);
          box-shadow: "" 0 1px 4px rgba(0, 0, 0, 0.2);
        }

        .flexslider .slides:after {
          display: block;
          clear: both;
          visibility: hidden;
          line-height: 0;
          height: 0;
        }
        .no-js .flexslider .slides > li:first-child {
          display: block;
        }
        .flexslider .slides {
          zoom: 1;
        }
        .flexslider .slides img {
          width: 100%;
          display: block;
          height: auto;
        }
        .flex-viewport {
          max-height: 2000px;
          -webkit-transition: all 1s ease;
          -o-transition: all 1s ease;
          transition: all 1s ease;
        }
        .flex-direction-nav a {
          text-decoration: none;
          display: block;
          width: 40px;
          height: 40px;
          margin: -20px 0 0;
          position: absolute;
          top: 50%;
          z-index: 10;
          overflow: hidden;
          opacity: 1;
          cursor: pointer;
          color: #000;
          text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
          -webkit-transition: all 0.3s ease-in-out;
          -o-transition: all 0.3s ease-in-out;
          transition: all 0.3s ease-in-out;
          background: 0 0;
          border: 0;
        }
        .flex-direction-nav a:before {
          font-family: flexslider-icon;
          font-size: 40px;
          display: inline-block;
          color: rgba(0, 0, 0, 0.8);
          text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
        }
        .flex-direction-nav .flex-prev {
          left: -50px;
        }
        .flex-direction-nav .flex-next {
          right: -50px;
          text-align: right;
        }
        .flexslider:hover .flex-direction-nav .flex-prev:hover {
          opacity: 1;
        }
        .flexslider:hover .flex-direction-nav .flex-next {
          opacity: 0.7;
        }
        .flexslider:hover .flex-direction-nav .flex-next:hover {
          opacity: 1;
        }
        .flex-direction-nav .flex-disabled {
          opacity: 0 !important;
          filter: alpha(opacity=0);
          cursor: default;
          z-index: -1;
        }
        @media screen and (max-width: 860px) {
          .flex-direction-nav .flex-prev {
            opacity: 1;
            left: 10px;
          }
          .flex-direction-nav .flex-next {
            opacity: 1;
            right: 10px;
          }
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1613484421222 */
        a {
          -webkit-transition: all 0.3s ease-out 0s;
          -o-transition: all 0.3s ease-out 0s;
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
        .image {
          margin-bottom: 25px;
        }
        .hidden {
          display: none !important;
        }
        .flexslider {
          margin: 0;
          background: 0;
          border: 0;
          border-radius: 0;
        }
        #carousel .flex-direction-nav a {
          font-size: 20px;
        }
        #carousel .flex-direction-nav a.flex-next {
          right: 0px;
        }
        #carousel .flex-direction-nav a.flex-next:before {
          font-family: "FontAwesome";
          font-size: 24px;
          display: block;
          text-align: center;
          color: #bdbdbd;
          -webkit-transition: all 300ms ease-in-out;
          -o-transition: all 300ms ease-in-out;
          transition: all 300ms ease-in-out;
          width: 40px;
          height: 40px;
          background: #f3f3f3;
          line-height: 40px;
          border-radius: 50%;
        }
        #carousel .flex-direction-nav a.flex-next:hover {
          right: 0px;
        }
        #carousel .flex-direction-nav a.flex-next:hover:before {
          background: #86590d;
          color: #fff;
        }
        #carousel .flex-direction-nav a.flex-prev {
          left: -0px;
        }
        #carousel .flex-direction-nav a.flex-prev:before {
          font-family: "FontAwesome";
          font-size: 24px;
          display: block;
          line-height: 40px;
          text-align: center;
          color: #bdbdbd;
          -webkit-transition: all 300ms ease-in-out;
          -o-transition: all 300ms ease-in-out;
          transition: all 300ms ease-in-out;
          width: 40px;
          height: 40px;
          background: #f3f3f3;
          line-height: 40px;
          border-radius: 50%;
        }
        #carousel .flex-direction-nav a.flex-prev:hover {
          left: 0px;
        }
        #carousel .flex-direction-nav a.flex-prev:hover:before {
          background: #86590d;
          color: #fff;
        }
        #carousel:hover .flex-direction-nav .flex-next {
          opacity: 1;
          right: 0px;
        }
        #carousel:hover .flex-direction-nav .flex-prev {
          opacity: 1;
          left: 0px;
        }
        #carousel ul .product-thumb {
          border: 1px solid #eaeaea;
          max-width: 86px;
        }
        #carousel ul .product-thumb.checked {
          border-color: #86590d;
        }
        #slider {
          border: 0;
          background: transparent;
        }
        img {
          max-width: 100%;
        }
        #slider {
          height: 100%;
        }
        img.product-image-feature {
          cursor: url(//bizweb.dktcdn.net/100/347/891/themes/710583/assets/pic-search.png?1612716331987),
            auto;
        }
        .image a {
          display: table;
          width: 100%;
          overflow: hidden;
        }
        .image a img {
          -webkit-transition: all 1s;
          -o-transition: all 1s;
          transition: all 1s;
        }
        .image a:hover img {
          -webkit-transform: scale(1.1);
          -ms-transform: scale(1.1);
          transform: scale(1.1);
        }
        ul {
          list-style-position: inside;
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/responsives.css?1613484421222 */
        #carousel {
          margin: 20px auto;
        }
        @media (max-width: 768px) {
          #carousel .flex-direction-nav a.flex-next,
          #carousel:hover .flex-direction-nav .flex-next {
            right: 10px;
          }
          #carousel .flex-direction-nav a.flex-prev,
          #carousel:hover .flex-direction-nav .flex-prev {
            left: 0;
          }
        }
        @media (max-width: 480px) {
          .slider-image #slider {
            margin: 0 auto;
          }
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1613484421222 */
        input {
          outline: medium none;
          color: #434343;
        }
        label {
          font-size: 15px;
          font-weight: 400;
          color: #626262;
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
        .description-product .qty-cart .qty-number-cart input {
          border: 0;
          border-left: 1px solid #eee;
          outline: none;
          height: 50px;
          text-align: center;
          width: 50px;
          float: left;
          margin-right: 5px;
          border: 1px solid #eee;
          border-radius: 5px;
          background: #fff;
          color: #909090;
          font-size: 18px;
        }
        .description-product .qty-cart .qty-number-cart input {
          padding: 0;
        }
        img {
          max-width: 100%;
        }
        .swatch {
          margin: 0.5em 0;
        }
        .swatch .header-s {
          font-weight: bold;
          display: inline-block;
          min-width: 200px;
          position: relative;
        }
        .swatch .header-s:before {
          content: "";
        }
        .swatch input {
          display: none;
        }
        .swatch label {
          float: left;
          min-width: 35px !important;
          height: 35px !important;
          margin: 0;
          text-align: center;
          line-height: 35px;
          white-space: nowrap;
          font-size: 12px;
          border: 1px solid #ccc;
          cursor: pointer;
          position: relative;
        }
        .swatch-element label {
          padding: 0 10px;
          margin-right: 5px;
        }
        .swatch .swatch-element {
          float: left;
          -webkit-transform: translateZ(0);
          -webkit-font-smoothing: antialiased;
          margin: 0px;
          display: inline-block;
          position: relative;
        }
        .crossed-out {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
        }
        .swatch .swatch-element .crossed-out {
          display: none;
        }
        .swatch .swatch-element.soldout .crossed-out {
          display: block;
        }
        .swatch .swatch-element.soldout label {
          filter: alpha(opacity=60);
          -khtml-opacity: 0.6;
          -moz-opacity: 0.6;
          opacity: 0.6;
        }
        .swatch .img-check {
          display: none;
          position: absolute;
          right: 0;
          bottom: 0;
        }
        .swatch-element label.sd {
          border: 1px solid #e4393c;
        }
        .swatch-element label.sd img.img-check {
          display: block;
        }
        @media only screen and (max-width: 767px) {
          .description-product .qty-cart .qty-number-cart input {
            height: 40px;
            width: 40px;
          }
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/responsives.css?1613484421222 */
        .header-s {
          vertical-align: top;
          line-height: 1;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        .swatch {
          margin-top: 0 !important;
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
        a {
          outline: medium none;
          color: #434343;
        }
        ul {
          margin: 0px;
          padding: 0px;
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
        .tab-content {
          width: 100%;
        }
        .tab-content .tab-pane {
          display: block;
          height: 0;
          max-width: 100%;
          visibility: hidden;
          overflow: hidden;
          opacity: 0;
          -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
        }
        .tab-content .tab-pane.active {
          height: auto;
          visibility: visible;
          opacity: 1;
          -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)";
          overflow: visible;
        }
        .dec-and-review-menu {
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
        }
        .dec-and-review-menu > li {
          list-style: none;
          position: relative;
          z-index: 9;
          display: inline-block;
          margin: 0 50px 0 0;
        }
        .dec-and-review-menu > li > a {
          font-size: 20px;
          color: #000;
          font-weight: 500;
          text-transform: capitalize;
          line-height: 25px;
          display: block;
          padding: 0 0 10px 0;
          position: relative;
        }
        .dec-and-review-menu > li > a:after {
          background: #86590d;
          bottom: -1px;
          content: "";
          display: block;
          height: 1px;
          left: 50%;
          position: absolute;
          right: 50%;
          width: 0;
          -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
        }
        .dec-and-review-menu > li:hover > a:after {
          left: 0;
          right: 0;
          width: 100%;
        }
        .dec-and-review-menu > li > a:hover {
          color: #000;
        }
        .nav > li > a:focus,
        .nav > li > a:hover {
          text-decoration: none;
          background-color: transparent;
        }
        .product-review-content-tab {
          border-top: 1px solid #e5e5e5;
          box-shadow: none;
          float: left;
          font-size: 16px;
          line-height: 1.8;
          margin: 0;
          padding: 0;
          padding: 10px 0px 0 0;
          width: 100%;
        }
        .tab-product-detail {
          margin-top: 30px;
        }
        .desc-tab {
          padding-top: 35px;
        }
        ul.nav.dec-and-review-menu li.active a:after {
          background: #000;
          bottom: -1px;
          content: "";
          display: block;
          height: 1px;
          left: 50%;
          position: absolute;
          right: 50%;
          width: 0;
          -webkit-transition: all 0.3s ease;
          transition: all 0.3s ease;
          left: 0;
          right: 0;
          width: 100%;
        }
        .tab-product-detail {
          display: table;
          clear: both;
        }
        img {
          max-width: 100%;
        }
        .fb-comments,
        .fb-comments > span,
        .fb-comments span iframe,
        .tab-product-detail {
          width: 100% !important;
        }
        .nav li {
          position: relative;
          clear: both;
        }
        ul {
          list-style-position: inside;
        }
      `}</style>
    </Container>
  );
};
export default LakDetail;
