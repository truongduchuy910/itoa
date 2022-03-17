import { Fragment, useState } from "react";
import ProductCart from "../../primes/Product/Cart";
import Count from "../../primes/Product/Cart/Count";
/**
 *
 * @param {Array} allProductCategories
 */
const Lak = ({
  allProductCategories = [],
  onClickHome,
  onClickAccount,
  onClickCart,
  onClickProductCategory,
  onClickHotDeal,
  page,
}) => {
  const [isActive, setIsActive] = useState(false);
  const onClickBar = () => {
    setIsActive(!isActive);
  };
  const categories = allProductCategories?.slice()?.sort((a, b) => {
    return a.prioritize > b.prioritize ? 1 : -1;
  });
  return (
    <Fragment>
      <header className="no-index ">
        <div className="container">
          <div className="row row-ibl mid">
            <a
              className="cart-head visible-xs visible-sm"
              style={{ position: "relative" }}
              onClick={() => {
                onClickCart();
              }}
            >
              <img
                src="https://theme.hstatic.net/1000319111/1000411564/14/cart-icon.png?v=1032"
                alt="cart"
                title="Cart"
              />
              <span className="hd-cart-count pb-1">
                <ProductCart UI={Count} />
              </span>
            </a>
            <div className="col-12 col-md-3 centermb p-0">
              <a
                className="logo"
                onClick={() => {
                  onClickHome();
                }}
              >
                <h1
                  style={{
                    color: "var(--color-text-backdrop)",
                    fontSize: 24,
                    margin: 0,
                    textTransform: "uppercase",
                  }}
                >
                  {page.store}
                </h1>
              </a>
            </div>
            <div className="col text-right hidden-xs hidden-sm">
              <nav className="main-nav">
                <ul id="menu-main-menu" className="">
                  {categories?.map((category) => {
                    return (
                      <li
                        key={category.id}
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children"
                      >
                        <a
                          title={category.name}
                          onClick={() => {
                            onClickProductCategory(category);
                          }}
                        >
                          {category.name}
                        </a>
                        <ul className="sub-menu">
                          {category?.childs?.map((category_1) => {
                            return (
                              <li
                                key={category_1.id}
                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children"
                              >
                                <a
                                  title={category_1.name}
                                  onClick={() => {
                                    onClickProductCategory(category_1);
                                  }}
                                >
                                  {category_1.name}
                                </a>
                                <ul className="sub-menu">
                                  {category_1?.childs?.map((category_2) => {
                                    return (
                                      <li
                                        key={category_2.id}
                                        className="menu-item menu-item-type-custom menu-item-object-custom"
                                      >
                                        <a
                                          title={category_2.name}
                                          onClick={() => {
                                            onClickProductCategory(category_2);
                                          }}
                                        >
                                          {category_2.name}
                                        </a>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children">
                    <a title={"Hot Deal"} onClick={onClickHotDeal}>
                      Hot Deal
                    </a>
                  </li>
                </ul>
              </nav>
              {/* <div className="search" id="sea">
                <button type="button" data-show="#search" id="search-des">
                  <img
                    src="https://theme.hstatic.net/1000324393/1000429977/14/pic-search.png?v=1231"
                    alt="search"
                    title="Search"
                  />
                </button>
                <div className="ct">
                  <form className="search-fr" action="/danh-muc">
                    <div className="form-input">
                      <input
                        name="tu-khoa"
                        id="search"
                        placeholder="Tìm kiếm..."
                        type="text"
                        required="required"
                      />
                      <button type="submit">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </form>
                </div>
              </div> */}
              <div className="search fixacc">
                <a
                  className="cart-head"
                  onClick={() => {
                    onClickAccount();
                  }}
                  style={{ position: "relative" }}
                >
                  {/* {authenticatedUser ? (
                    <FontAwesomeIcon
                      icon={faUser}
                      style={{
                        color: "var(--color-text-backdrop)",
                        fontSize: 21,
                        marginLeft: 13,
                        marginRight: 13,
                        marginBottom: -5,
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faSignInAlt}
                      style={{
                        color: "var(--color-text-backdrop)",
                        fontSize: 21,
                        marginLeft: 13,
                        marginRight: 13,
                        marginBottom: -5,
                      }}
                    />
                  )} */}
                </a>
              </div>
              <div className="search">
                <a
                  className="cart-head"
                  onClick={() => {
                    onClickCart();
                  }}
                  style={{ position: "relative" }}
                >
                  <img
                    src="https://theme.hstatic.net/1000319111/1000411564/14/cart-icon.png?v=1032"
                    alt="cart"
                    title="Cart"
                  />
                  <span className="hd-cart-count pb-1">
                    <ProductCart UI={Count} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`sub-head ${isActive ? "active" : ""}`}
          onClick={onClickBar}
        >
          {isActive && (
            <style>{`
              body {
                overflow: hidden;
              }
            `}</style>
          )}
          <button className={`snav-btn ${isActive ? "active" : ""}`}>
            <i></i>
            <i></i>
            <i></i>
          </button>
          <div className="main">
            <div className="bar">
              <a
                className="nv-logo"
                href="/"
                title=""
                style={{ color: "white" }}
              >
                #{page.slogan}
              </a>
              <form className="search-fr">
                {/* <input
                  name="tu-khoa"
                  id="search2"
                  placeholder="Tìm kiếm..."
                  type="text"
                  required="required"
                /> */}
                <button type="submit">
                  <i className="fa fa-search"></i>
                </button>
              </form>
              <nav>
                <ul id="menu-main-menu2">
                  {categories?.map((category) => {
                    return (
                      <li
                        key={category.id}
                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu_cl"
                      >
                        <button type="button" className="nav-drop active" />
                        <a
                          onClick={() => {
                            onClickProductCategory(category);
                          }}
                        >
                          {category.name}
                        </a>
                        <ul className="sub-menu" style={{ display: "block" }}>
                          {category?.childs?.map((category_1) => {
                            return (
                              <li
                                key={category_1.id}
                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children"
                              >
                                <a
                                  onClick={() => {
                                    onClickProductCategory(category_1);
                                  }}
                                >
                                  {category_1.name}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    );
                  })}
                  <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu_cl">
                    <button type="button" className="nav-drop active" />
                    <a onClick={onClickHotDeal}>Hot Deal</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <style jsx>{`
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/all.css?1613484421222 */
        header,
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
        button,
        input {
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
        button::-moz-focus-inner,
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
          img {
            page-break-inside: avoid;
          }
          img {
            max-width: 100% !important;
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
        button,
        input {
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
        img {
          vertical-align: middle;
        }
        .text-right {
          text-align: right;
        }
        ul {
          margin-top: 0;
          margin-bottom: 10px;
        }
        ul ul {
          margin-bottom: 0;
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
        .col-md-10,
        .col-md-2,
        .col-xs-12 {
          position: relative;
          min-height: 1px;
          padding-right: 15px;
          padding-left: 15px;
        }
        .col-xs-12 {
          float: left;
        }
        .col-xs-12 {
          width: 100%;
        }
        @media (min-width: 992px) {
          .col-md-10,
          .col-md-2 {
            float: left;
          }
          .col-md-10 {
            width: 83.33333333%;
          }
          .col-md-2 {
            width: 16.66666667%;
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
        .visible-sm,
        .visible-xs {
          display: none !important;
        }
        @media (max-width: 767px) {
          .visible-xs {
            display: block !important;
          }
        }
        @media (min-width: 768px) and (max-width: 991px) {
          .visible-sm {
            display: block !important;
          }
        }
        @media (max-width: 767px) {
          .hidden-xs {
            display: none !important;
          }
        }
        @media (min-width: 768px) and (max-width: 991px) {
          .hidden-sm {
            display: none !important;
          }
        }
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
        ul {
          margin: 0px;
          padding: 0px;
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
        input:focus {
          background: transparent;
          border: 2px solid #86590d;
        }
        ::-moz-placeholder {
          color: #444;
          font-size: 13px;
        }
        .search button {
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .row.row-ibl.mid {
          align-items: center;
          display: flex;
        }
        img {
          max-width: 100%;
        }
        header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          padding: 15px 0;
          z-index: 9;
          background: rgba(0, 0, 0, 0.75);
        }
        button#search-des {
          margin-top: 5px;
        }
        header .logo {
          display: inline-block;
          vertical-align: middle;
        }
        header .logo img {
          display: block;
          max-width: 120px;
        }
        .main-nav {
          display: inline-block;
          vertical-align: middle;
          font-family: "PN";
        }
        .main-nav > ul > li {
          display: inline-block;
          vertical-align: middle;
          margin-right: 20px;
        }
        .main-nav > ul > li > a {
          text-transform: uppercase;
          font-size: 17px;
          color: #ffffff;
          display: block;
          padding: 3px 0;
          border-bottom: solid 1px transparent;
        }
        .main-nav > ul > li:hover > a {
          border-color: var(--color-text-backdrop);
        }
        .main-nav li {
          position: relative;
          text-align: left;
        }
        .main-nav li ul {
          list-style: none;
          position: absolute;
          min-width: 220px;
          -webkit-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
          z-index: 99;
          margin-top: 10px;
          pointer-events: none;
          opacity: 0;
          padding-top: 5px;
        }
        .main-nav li ul ul {
          left: 100%;
          top: 0;
          padding-top: 0;
          padding-left: 5px;
        }
        .main-nav li ul a {
          background: rgba(32, 32, 32, 0.85);
          display: block;
          text-transform: uppercase;
          color: #ffffff;
          font-size: 13px;
          padding: 10px 15px;
          border-bottom: solid 1px rgba(255, 255, 255, 0.3);
        }
        .main-nav li ul li:hover > a {
          background: #202020;
        }
        .main-nav li:hover > ul {
          margin-top: 0;
          pointer-events: all;
          opacity: 1;
        }
        .search {
          display: inline-block;
          vertical-align: middle;
          position: relative;
        }
        .search > button img {
          display: block;
        }
        .search .ct {
          position: absolute;
          background: rgba(255, 255, 255, 0.7);
          padding: 15px 20px;
          width: 300px;
          right: 0;
          -webkit-box-shadow: 0 0 5px 0 rgba(102, 102, 102, 0.4);
          box-shadow: 0 0 5px 0 rgba(102, 102, 102, 0.4);
          display: none;
          border-radius: 3px;
          z-index: 2;
        }
        div#sea:hover .ct {
          display: block !important;
        }
        .search-fr {
          position: relative;
        }
        .search-fr input {
          width: 100%;
          height: 38px;
          border: none;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.7);
          padding: 0 10px;
        }
        .search-fr button {
          background: transparent;
          border: none;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 10px;
          color: #202020;
          font-size: 16px;
        }
        .sub-head {
          position: absolute !important;
          display: none;
          text-align: right;
          top: 21px !important;
          z-index: 999;
        }
        .sub-head .main {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 5;
          background: rgba(255, 255, 255, 0.9);
          -webkit-transition: all cubic-bezier(0.77, 0, 0.175, 1) 0.5s;
          transition: all cubic-bezier(0.77, 0, 0.175, 1) 0.5s;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
          opacity: 0;
        }
        .sub-head .main .bar {
          text-transform: uppercase;

          display: inline-block;
          vertical-align: middle;
          text-align: left;
          background: rgba(0, 0, 0, 0.8);
          width: 380px;
          height: 100%;
          padding: 40px 20px 20px;
          overflow: auto;
        }
        .sub-head .main .bar .nv-logo {
          display: inline-block;
          vertical-align: middle;
          margin-bottom: 20px;
          -webkit-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
          opacity: 0;
        }
        .sub-head .main .bar .nv-logo img {
          max-width: 200px;
        }
        .sub-head .main .bar .search-fr {
          margin-bottom: 20px;
        }
        .sub-head .main .bar nav a {
          display: block;
          font-size: 18px;
          color: var(--color-text-backdrop);
          padding: 10px 0;
        }
        .sub-head .main .bar nav a:hover {
          color: #ff5400;
        }
        .sub-head .main .bar nav ul ul {
          display: none;
        }
        .sub-head .main .bar nav ul ul a {
          font-size: 18px;
          padding-left: 25px;
        }
        .sub-head .main .bar nav ul ul ul a {
          padding-left: 50px;
        }
        .sub-head .main .bar nav .nav-drop {
          background: transparent;
          border: none;
          width: 40px;
          height: 40px;
          float: right;
          margin-top: 0;
          font-size: 17px;
          line-height: 40px;
          text-align: center;
          top: 0;
          position: relative;
          z-index: 1;
          cursor: pointer;
          margin-top: 1px;
          font-style: normal;
          color: var(--color-text-backdrop);
        }
        .sub-head .main .bar nav .nav-drop:after {
          font-family: "FontAwesome";
          content: "\f067";
        }
        .sub-head .main .bar nav > ul > li {
          -webkit-transform: translate(0, -50px);
          transform: translate(0, -50px);
          -webkit-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
          opacity: 0;
        }
        .sub-head.active .main {
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
          opacity: 1;
        }
        .sub-head.active .main .bar .nv-logo {
          opacity: 1;
          -webkit-transition-delay: 0.3s;
          transition-delay: 0.3s;
        }
        .sub-head.active .main .bar nav > ul > li {
          -webkit-transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
          transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
          -webkit-transform: translate(0, 0);
          transform: translate(0, 0);
          opacity: 1;
        }
        .snav-btn {
          display: inline-block;
          vertical-align: middle;
          width: 30px;
          margin-right: 15px;
          -webkit-transition: all 0.35s ease-in-out;
          transition: all 0.35s ease-in-out;
          position: relative;
          z-index: 6;
        }
        .snav-btn i {
          width: 20px;
          display: block;
          margin: 5px 0;
          height: 2px;
          background: var(--color-text-backdrop);
          -webkit-transition: all 0.35s ease-in-out;
          transition: all 0.35s ease-in-out;
        }
        .snav-btn:hover {
          padding-left: 5px;
        }
        .snav-btn:hover i:nth-child(2) {
          margin-right: 5px;
        }
        .snav-btn:hover i:nth-child(3) {
          margin-right: 3px;
        }
        .snav-btn.active {
          padding-left: 5px;
        }
        .snav-btn.active i:nth-child(1) {
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        .snav-btn.active i:nth-child(2) {
          opacity: 0;
          margin-right: 0px;
          margin-left: -5px;
        }
        .snav-btn.active i:nth-child(3) {
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          margin-top: -14px;
          margin-right: 0px;
        }
        .hd-cart-count {
          position: absolute;
          top: calc(50% + 5px);
          left: 50%;
          -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
          display: inline-block;
          width: 100%;
          font-weight: bold;
          color: #345372;
          text-align: center;
        }
        .cart-head {
          position: relative;
          display: inline-block;
          margin-bottom: 5px;
          margin-left: 3px;
          width: auto;
        }
        .cart-head img {
          max-width: 23px;
        }
        #sea img {
          max-width: 21px;
        }
        @media (max-width: 991px) {
          .sub-head .main .bar .nv-logo {
            display: block !important;
            text-align: center;
          }
          .centermb {
            text-align: center;
          }
          a.cart-head.visible-sm {
            position: absolute !important;
            right: 15px;
            margin: 0;
            z-index: 999;
          }
        }
        .sub-head.active .main .bar nav > ul li {
          list-style: none;
        }
        .sub-head .main {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          z-index: 5;
          background: rgba(255, 255, 255, 0.9);
          -webkit-transition: all cubic-bezier(0.77, 0, 0.175, 1) 0.5s;
          transition: all cubic-bezier(0.77, 0, 0.175, 1) 0.5s;
          -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
          -webkit-transform: scaleY(0);
          transform: scaleY(0);
          opacity: 0;
        }
        .sub-head .main .bar {
          display: inline-block;
          vertical-align: middle;
          text-align: left;
          background: rgba(0, 0, 0, 0.8);
          width: 380px;
          height: 100%;
          padding: 40px 20px 20px;
          overflow: auto;
        }
        .sub-head .main .bar .nv-logo {
          display: inline-block;
          vertical-align: middle;
          margin-bottom: 20px;
          -webkit-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
          opacity: 0;
        }
        .sub-head .main .bar .nv-logo img {
          max-width: 200px;
        }
        .sub-head .main .bar .search-fr {
          margin-bottom: 20px;
        }
        .sub-head .main .bar nav a {
          display: block;
          font-size: 18px;
          color: var(--color-text-backdrop);
          padding: 10px 0;
        }
        .sub-head .main .bar nav a:hover {
          color: #ff5400;
        }
        .sub-head .main .bar nav ul ul {
          display: none;
        }
        .sub-head .main .bar nav ul ul a {
          font-size: 18px;
          padding-left: 25px;
        }
        .sub-head .main .bar nav ul ul ul a {
          padding-left: 50px;
          padding-right: 30px;
        }
        .sub-head .main .bar nav .nav-drop {
          width: 40px;
          height: 40px;
          float: right;
          margin-top: 0;
          font-size: 17px;
          line-height: 40px;
          text-align: center;
          top: 0;
          position: relative;
          z-index: 1;
          cursor: pointer;
          margin-top: 1px;
          font-style: normal;
          color: var(--color-text-backdrop);
        }
        .sub-head .main .bar nav .nav-drop:after {
          font-family: "FontAwesome";
          content: "\f067";
        }
        .sub-head .main .bar nav > ul > li {
          -webkit-transform: translate(0, -50px);
          transform: translate(0, -50px);
          -webkit-transition: all 0.2s ease-in-out;
          transition: all 0.2s ease-in-out;
          opacity: 0;
        }
        .sub-head.active .main {
          -webkit-transform: scaleY(1);
          transform: scaleY(1);
          opacity: 1;
        }
        .sub-head.active .main .bar .nv-logo {
          opacity: 1;
          -webkit-transition-delay: 0.3s;
          transition-delay: 0.3s;
        }
        .sub-head.active .main .bar nav > ul > li {
          -webkit-transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
          transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 1s;
          -webkit-transform: translate(0, 0);
          transform: translate(0, 0);
          opacity: 1;
        }
        .snav-btn {
          background: transparent;
          border: none;
          display: inline-block;
          vertical-align: middle;
          width: 30px;
          margin-right: 15px;
          -webkit-transition: all 0.35s ease-in-out;
          transition: all 0.35s ease-in-out;
          position: relative;
          z-index: 6;
        }
        .snav-btn i {
          display: block;
          margin: 5px 0;
          height: 2px;
          background: var(--color-text-backdrop);
          -webkit-transition: all 0.35s ease-in-out;
          transition: all 0.35s ease-in-out;
        }
        .snav-btn:hover {
          padding-left: 5px;
        }
        .snav-btn:hover i:nth-child(2) {
          margin-right: 5px;
        }
        .snav-btn:hover i:nth-child(3) {
          margin-right: 3px;
        }
        .snav-btn.active {
          padding-left: 5px;
        }
        .snav-btn.active i:nth-child(1) {
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
        }
        .snav-btn.active i:nth-child(2) {
          opacity: 0;
          margin-right: 0px;
          margin-left: -5px;
        }
        .snav-btn.active i:nth-child(3) {
          -webkit-transform: rotate(-45deg);
          transform: rotate(-45deg);
          margin-top: -14px;
          margin-right: 0px;
        }
        @media (max-width: 991px) {
          .sub-head {
            display: block;
          }
        }
        header.no-index {
          position: static;
        }
        @media (max-width: 768px) {
          .snav-btn {
            margin-right: 0;
          }
        }
        @media (max-width: 1204px) {
          header .logo img {
            max-width: 130px;
          }
        }
        @media (max-width: 767px) {
          .cart-head img {
            max-width: 20px;
            margin-bottom: 1px;
          }
          a.cart-head.visible-xs {
            position: absolute !important;
            right: 15px;
            margin: 0;
            z-index: 999;
          }
          .sub-head {
            left: 15px !important;
          }
          .centermb {
            text-align: center;
          }
          .sub-head .main .bar {
            padding: 12px 20px 20px;
          }
          nav ul {
            list-style: none;
          }
          .sub-head {
            display: block;
            top: 12px !important;
          }
          header .logo img {
            max-width: 100px;
          }
          header {
            padding: 10px 0;
          }
        }
        ul#menu-main-menu li {
          list-style: none;
        }
        .sub-head.active .main {
          top: 0 !important;
        }
        .fixacc i {
          font-size: 26px;
          color: var(--color-text-backdrop);
          margin-top: 10px;
          margin-right: 6px;
        }
        header {
          background: #494a48;
        }
        ul {
          list-style-position: inside;
        }
        input[type="text"] {
          -webkit-appearance: none;
          border-radius: 0;
        }
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/responsives.css?1613484421222 */
        @media (max-width: 1200px) {
          .main-nav > ul > li {
            display: inline-block;
            vertical-align: middle;
            margin-right: 10px;
          }
        }
        @media (min-width: 1023px) and (max-width: 1025px) {
          .main-nav li ul {
            display: none;
          }
        }
        @media (max-width: 767px) {
          .hidden-xs {
            display: none !important;
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
        .fa-search:before {
          content: "\f002";
        }
        .fa-user:before {
          content: "\f007";
        }
      `}</style>
    </Fragment>
  );
};
export default Lak;
