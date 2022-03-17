import { Fragment, useState } from "react";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";
const Lak = ({
  allProductCategories,
  onClickProductCategory,
  prices,
  onClickPrice,
  onClickAllPrice,
  defaultPr,
  defaultCgr,
}) => {
  const [pr, setPr] = useState(-1);
  const [cgr, setCgr] = useState(false);

  return (
    <Fragment>
      <aside className="dqdt-sidebar sidebar left-content col-lg-3-fix sidebar-category">
        <div className="aside-filter">
          <div className="filter-container">
            <div
              className="filter-container__selected-filter"
              style={{ display: "none" }}
            >
              <div className="filter-container__selected-filter-header clearfix">
                <span className="filter-container__selected-filter-header-title">
                  <i className="fa fa-arrow-left hidden-sm-up" /> Bạn chọn
                </span>
                <a className="filter-container__clear-all">
                  Bỏ hết <i className="fa fa-angle-right" />
                </a>
              </div>
              <div className="filter-container__selected-filter-list">
                <ul />
              </div>
            </div>
          </div>
          {/* Lọc Hãng */}
          <aside className="aside-item sidebar-category collection-category dmsp">
            <div className="aside-title ">
              <h2 className="title-head margin-top-0 ">
                <span>Danh mục sản phẩm</span>
              </h2>
              <i className="fa fa-angle-down" />
            </div>
            <div className="aside-content">
              <nav className="nav-category navbar-toggleable-md">
                <ul className="nav navbar-pills">
                  {allProductCategories?.map((category) => {
                    const [open, setOpen] = useState(false);
                    return (
                      <li
                        key={category.id}
                        className="nav-item lv1 filter-item--green"
                      >
                        <a
                          title={category.name}
                          className="nav-link"
                          onClick={() => {
                            setCgr(category.id);
                            onClickProductCategory(category);
                          }}
                          style={{
                            textDecoration:
                              cgr == category.id ? "underline" : "",
                          }}
                        >
                          {category.name}
                        </a>
                        {category?.childs?.length ? (
                          <i
                            className="fas fa-angle-right fa"
                            onClick={() => {
                              setOpen((oepn) => !open);
                            }}
                          >
                            {open ? <AiOutlineDown /> : <AiOutlineRight />}
                          </i>
                        ) : null}
                        <ul
                          className="dropdown-menu"
                          style={{ display: "block" }}
                        >
                          {open &&
                            category?.childs?.map((category_1) => {
                              return (
                                <li
                                  key={category_1.key}
                                  className="nav-item lv2"
                                >
                                  <a
                                    className="nav-link"
                                    title={category_1.name}
                                    onClick={() => {
                                      setCgr(category_1.id);

                                      onClickProductCategory(category_1);
                                    }}
                                    style={{
                                      textDecoration:
                                        cgr == category_1.id ? "underline" : "",
                                    }}
                                  >
                                    {category_1.name}
                                  </a>
                                  {/* <i className="fas fa-angle-right fa" />
                                <ul
                                  className="dropdown-menu"
                                  style={{ display: "block" }}
                                >
                                  <li className="nav-item lv3">
                                    <a
                                      className="nav-link"
                                      title="Áo Jackets - Blazers - Coats"
                                      href="/ao-jackets-blazers-nam"
                                    >
                                      Áo Jackets - Blazers - Coats
                                    </a>
                                  </li>
                                  <li className="nav-item lv3">
                                    <a
                                      className="nav-link"
                                      title="Áo Sweaters - Sweatshirts - Cardigans"
                                      href="/ao-phong-len-ni-nam"
                                    >
                                      Áo Sweaters - Sweatshirts - Cardigans
                                    </a>
                                  </li>
                                  <li className="nav-item lv3">
                                    <a
                                      className="nav-link"
                                      title="Áo Sơ Mi"
                                      href="/ao-so-mi-nam"
                                    >
                                      Áo Sơ Mi
                                    </a>
                                  </li>
                                  <li className="nav-item lv3">
                                    <a
                                      className="nav-link"
                                      title="Áo T-shirts"
                                      href="/ao-khoac-nam"
                                    >
                                      Áo T-shirts
                                    </a>
                                  </li>
                                </ul>
                            */}
                                </li>
                              );
                            })}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>
          {/* End lọc hãng */}
          {/* Lọc giá */}
          {/* <aside className="aside-item filter-price">
            <div className="aside-title">
              <h2 className="title-head margin-top-0">
                <span>Khoảng giá</span>
              </h2>
              <i className="fa fa-angle-down" />
            </div>
            <div className="aside-content filter-group">
              <ul>
                <li
                  className="filter-item filter-item--check-box filter-item--green"
                  onClick={() => {
                    onClickAllPrice();
                  }}
                >
                  Tất cả
                </li>
                {prices.map((price, index) => {
                  return (
                    <li
                      key={index}
                      className="filter-item filter-item--check-box filter-item--green"
                      style={{
                        textDecoration: pr == index ? "underline" : "",
                      }}
                    >
                      <span
                        onClick={() => {
                          onClickPrice({ prices, index });
                          setPr(index);
                        }}
                      >
                        {index === 0
                          ? "Dưới " + formatMoney(prices[index + 1])
                          : index === prices.length - 1
                          ? "Trên " + formatMoney(prices[index])
                          : formatMoney(prices[index]) +
                            " - " +
                            formatMoney(prices[index + 1])}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>
      */}
          {/* End Lọc giá */}
          {/* Lọc Loại */}
          {/* End Lọc Loại */}
          {/* <aside className="aside-item filter-tag-style-1">
            <div className="aside-title">
              <h2 className="title-head margin-top-0">
                <span>Màu sắc</span>
              </h2>
              <i className="fa fa-angle-down" />
            </div>
            <div className="aside-content filter-group clearfix">
              <ul style={{ overflow: "visible" }}>
                <li className="filter-item color filter-item--check-box filter-item--green">
                  <span>
                    <label htmlFor="filter-vang1">
                      <input
                        type="checkbox"
                        id="filter-vang1"
                        data-group="tag1"
                        data-field="variants.title"
                        data-text="Vàng"
                        defaultValue="(Đen)"
                        data-operator="OR"
                      />
                      <i
                        className="fa vang"
                        style={{ backgroundColor: "#090909" }}
                      />
                      Đen
                    </label>
                  </span>
                </li>
                <li className="filter-item color filter-item--check-box filter-item--green">
                  <span>
                    <label htmlFor="filter-vang2">
                      <input
                        type="checkbox"
                        id="filter-vang2"
                        data-group="tag1"
                        data-field="variants.title"
                        data-text="Vàng"
                        defaultValue="(Trắng)"
                        data-operator="OR"
                      />
                      <i
                        className="fa vang"
                        style={{ backgroundColor: "#f0f0f0" }}
                      />
                      Trắng
                    </label>
                  </span>
                </li>
                <li className="filter-item color filter-item--check-box filter-item--green">
                  <span>
                    <label htmlFor="filter-vang3">
                      <input
                        type="checkbox"
                        id="filter-vang3"
                        data-group="tag1"
                        data-field="variants.title"
                        data-text="Vàng"
                        defaultValue="(Đỏ)"
                        data-operator="OR"
                      />
                      <i
                        className="fa vang"
                        style={{ backgroundColor: "#c91616" }}
                      />
                      Đỏ
                    </label>
                  </span>
                </li>
                <li className="filter-item color filter-item--check-box filter-item--green">
                  <span>
                    <label htmlFor="filter-vang4">
                      <input
                        type="checkbox"
                        id="filter-vang4"
                        data-group="tag1"
                        data-field="variants.title"
                        data-text="Vàng"
                        defaultValue="(Xám)"
                        data-operator="OR"
                      />
                      <i
                        className="fa vang"
                        style={{ backgroundColor: "#787878" }}
                      />
                      Xám
                    </label>
                  </span>
                </li>
                <li className="filter-item color filter-item--check-box filter-item--green">
                  <span>
                    <label htmlFor="filter-vang5">
                      <input
                        type="checkbox"
                        id="filter-vang5"
                        data-group="tag1"
                        data-field="variants.title"
                        data-text="Vàng"
                        defaultValue="(Vàng )"
                        data-operator="OR"
                      />
                      <i
                        className="fa vang"
                        style={{ backgroundColor: "#ff9dde" }}
                      />
                      Vàng
                    </label>
                  </span>
                </li>
              </ul>
            </div>
          </aside> */}
          {/* End Lọc theo Tag (Màu sắc)*/}
        </div>
      </aside>
      <style jsx>{`
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/all.css?1613484421222 */
        aside,
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
        input[type="checkbox"] {
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          padding: 0;
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
          h2 {
            orphans: 3;
            widows: 3;
          }
          h2 {
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
        h2 {
          font-family: inherit;
          font-weight: 500;
          line-height: 1.1;
          color: inherit;
        }
        h2 {
          margin-top: 20px;
          margin-bottom: 10px;
        }
        h2 {
          font-size: 30px;
        }
        ul {
          margin-top: 0;
          margin-bottom: 10px;
        }
        ul ul {
          margin-bottom: 0;
        }
        label {
          display: inline-block;
          max-width: 100%;
          margin-bottom: 5px;
          font-weight: 700;
        }
        input[type="checkbox"] {
          margin: 4px 0 0;
          margin-top: 1px;
          line-height: normal;
        }
        input[type="checkbox"]:focus {
          outline: 5px auto -webkit-focus-ring-color;
          outline-offset: -2px;
        }
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 1000;
          display: none;
          float: left;
          min-width: 160px;
          padding: 5px 0;
          margin: 2px 0 0;
          font-size: 14px;
          text-align: left;
          list-style: none;
          background-color: #fff;
          -webkit-background-clip: padding-box;
          background-clip: padding-box;
          border: 1px solid #ccc;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 4px;
          -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
        }
        .dropdown-menu > li > a {
          display: block;
          padding: 3px 20px;
          clear: both;
          font-weight: 400;
          line-height: 1.42857143;
          color: #333;
          white-space: nowrap;
        }
        .dropdown-menu > li > a:focus,
        .dropdown-menu > li > a:hover {
          color: #262626;
          text-decoration: none;
          background-color: #f5f5f5;
        }
        .nav {
          padding-left: 0;
          margin-bottom: 0;
          list-style: none;
        }
        .nav > li {
          position: relative;
          display: block;
        }
        .nav > li > a {
          position: relative;
          display: block;
          padding: 10px 15px;
        }
        .nav > li > a:focus,
        .nav > li > a:hover {
          text-decoration: none;
          background-color: #eee;
        }
        .clearfix:after,
        .clearfix:before,
        .nav:after,
        .nav:before {
          display: table;
          content: " ";
        }
        .clearfix:after,
        .nav:after {
          clear: both;
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
        a,
        input {
          outline: medium none;
          color: #434343;
        }
        h2 {
          font-family: "PN", sans-serif;
          font-weight: 500;
          color: #000000;
          margin-top: 0px;
          font-weight: 400;
          line-height: 1;
        }
        h2 {
          font-size: 30px;
        }
        ul {
          margin: 0px;
          padding: 0px;
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
        .nav > li > a:focus,
        .nav > li > a:hover {
          text-decoration: none;
          background-color: transparent;
        }
        @media (max-width: 767px) {
          nav ul {
            list-style: none;
          }
        }
        .left-content {
          margin-top: 0px;
        }
        .left-content .aside-item {
          margin-bottom: 25px;
        }
        .left-content .aside-item .aside-content {
          padding-bottom: 15px;
          padding-top: 15px;
        }
        .filter-group {
          padding: 10px 0px 0px 0px;
        }
        .filter-group ul {
          max-height: 235px;
          overflow-y: auto;
          padding: 0px;
          list-style: none;
        }
        .filter-group ul::-webkit-scrollbar-track {
          border-radius: 10px;
          background-color: #fff;
          width: 5px;
        }
        .filter-group ul::-webkit-scrollbar {
          width: 5px;
          background-color: #fff;
        }
        .filter-group ul::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: #e9edf5;
          width: 5px;
        }
        .filter-group {
          position: relative;
        }
        .filter-item {
          margin: 0;
          cursor: pointer;
          line-height: 28px;
          min-width: 100%;
          float: left;
          padding: 0px;
        }
        @media (max-width: 991px) {
          .filter-item {
            padding-right: 0px !important;
            padding: 0px !important;
          }
        }
        .filter-item * {
          cursor: pointer;
          color: #000;
          font-size: 14px;
          font-weight: 400;
        }
        .filter-item *:active {
          color: #86590d;
        }
        .filter-item.color {
          min-width: 20px;
          border: none !important;
          margin-bottom: 10px !important;
          margin-top: 10px;
          line-height: unset;
        }
        .filter-item.color label {
          width: 100%;
          height: 100%;
          display: inline-block;
          font-size: 0;
        }
        .filter-item.color .fa {
          margin-right: 10px;
          width: 30px;
          height: 30px;
          background: red;
          border-radius: 50%;
          position: relative;
        }
        @media (max-width: 1199px) {
          .filter-item.color .fa {
            margin-right: 7px;
          }
        }
        .filter-item.color .fa:before {
          display: none;
        }
        .filter-item.color input:checked + .fa:after {
          font-family: "FontAwesome";
          display: block;
          content: "\f00c";
          color: #fff;
          font-size: 14px;
          width: 30px;
          height: 30px;
          position: absolute;
          left: 8px;
          top: 7px;
        }
        .color input:checked + .fa:after {
          display: none;
        }
        .filter-item--green *:hover {
          color: #86590d;
        }
        .filter-item--check-box input {
          display: none;
        }
        .filter-item--check-box .fa {
          margin-right: 5px;
          width: 14px;
          font-size: 18px;
          line-height: 40px;
          position: relative;
          top: 2px;
        }
        .filter-item--check-box input + .fa:before {
          content: "";
          margin-right: 5px;
          border-radius: 30px;
          font-size: 18px;
          border: solid 1px #c6cddb;
          line-height: 40px;
          position: absolute;
          top: -15px;
          height: 15px !important;
          width: 15px;
        }
        .filter-item--check-box input:checked + .fa {
          color: #86590d;
        }
        .filter-item--check-box input:checked + .fa:before {
          border-color: #86590d;
        }
        .filter-item--check-box input:checked + .fa:after {
          font-family: "FontAwesome";
          content: "\f00c";
          color: #86590d;
          position: absolute;
          width: 15px;
          height: 15px;
          line-height: 15px;
          top: -15px;
          font-size: 11px;
          left: 2px;
        }
        .filter-container__selected-filter {
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #eee;
        }
        .filter-container__selected-filter-header {
          margin-bottom: 5px;
        }
        .filter-container__selected-filter-header-title {
          font-size: 18px;
          font-weight: bold;
          color: #0038ae;
        }
        .filter-container__clear-all {
          float: right;
          color: #333;
          margin-top: 3px;
        }
        .filter-container__selected-filter {
          margin-bottom: 10px;
          padding-bottom: 5px;
          border-bottom: 1px solid #eee;
        }
        .filter-container__selected-filter-header {
          margin-bottom: 5px;
        }
        .filter-container__selected-filter-header-title {
          font-size: 18px;
          font-weight: bold;
          color: #0038ae;
        }
        .filter-container__clear-all {
          float: right;
          color: #333;
          margin-top: 3px;
        }
        h2.title-head span {
          font-family: "SVN-Veneer";
          font-size: 24px;
        }
        .dmsp .aside-content {
          border-top: none;
          padding-top: 0px;
        }
        .dmsp .aside-content .navbar-pills .lv1:first-child a {
          border-top: none;
        }
        .dmsp .aside-content .navbar-pills .lv1 a {
          padding: 5px 20px 5px 0px;
        }
        .dmsp .aside-content .navbar-pills .lv1 .fas {
          top: 3px;
          right: -12px;
        }
        .dmsp .aside-content .navbar-pills .lv1 ul .lv2 a {
          padding-left: 15px !important;
        }
        .dmsp .aside-content .navbar-pills .lv1 ul .lv2 ul .lv3 a {
          padding-left: 30px !important;
        }
        .aside-item .aside-content {
          padding-bottom: 15px;
        }
        .aside-filter {
          background: #fff;
          margin-bottom: 0px;
        }
        .aside-filter .aside-item {
          margin-bottom: 0px;
        }
        .aside-filter .aside-item:last-child {
          margin-bottom: 0;
          border: none;
        }
        .aside-filter .aside-item:last-child .aside-content {
          margin-bottom: 0;
        }
        .sidebar-category .aside-content .nav-item .fas {
          cursor: pointer;
          width: 30px;
          height: 30px;
          margin-top: 0px;
          line-height: 28px;
          cursor: pointer;
          text-align: center;
          top: 0px;
          right: 0px;
          position: absolute;
        }
        .sidebar-category .aside-content .nav-item .dropdown-menu {
          width: 100%;
          border: 0;
          padding-left: 0px;
          box-shadow: none;
          margin-top: 0px;
          padding: 0px;
          position: static;
        }
        .aside-filter .filter-container {
          margin-bottom: 0px;
        }
        .aside-filter .aside-item .aside-title:after {
          display: none;
        }
        @media (min-width: 992px) {
          .aside-title i.fa {
            display: none;
          }
        }
        @media (max-width: 768px) {
          .aside-content {
            display: none;
          }
        }
        .aside-title {
          position: relative;
        }
        .aside-title i.fa {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          font-size: 23px;
        }
        [type="checkbox"]:checked {
          position: absolute;
          left: -9999px;
        }
        li.nav-item.lv1.filter-item--green {
          clear: both;
        }
        .dropdown-menu > li > a:focus,
        .dropdown-menu > li > a:hover {
          background: transparent;
          color: #86590d;
        }
        .dmsp .aside-content .navbar-pills .lv1 ul .lv2 a {
          padding-left: 15px !important;
          word-break: break-word;
          word-wrap: break-word;
          max-width: 100%;
          display: block;
          white-space: pre-wrap;
          white-space: -moz-pre-wrap;
          white-space: -pre-wrap;
          white-space: -o-pre-wrap;
          word-wrap: break-word;
          background: transparent;
          color: #000;
        }
        .nav li {
          position: relative;
          clear: both;
        }
        ul {
          list-style-position: inside;
        }

        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/all.css?1613484421222 */
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
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/style.css?1613484421222 */
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
        .filter-item * {
          cursor: pointer;
          color: #000;
          font-size: 14px;
          font-weight: 400;
        }
        .filter-item *:active {
          color: #86590d;
        }
        .filter-item--green *:hover {
          color: #86590d;
        }
        .filter-item--check-box .fa {
          margin-right: 5px;
          width: 14px;
          font-size: 18px;
          line-height: 40px;
          position: relative;
          top: 2px;
        }
        .filter-item--check-box input + .fa:before {
          content: "";
          margin-right: 5px;
          border-radius: 30px;
          font-size: 18px;
          border: solid 1px #c6cddb;
          line-height: 40px;
          position: absolute;
          top: -15px;
          height: 15px !important;
          width: 15px;
        }
        .filter-item--check-box input:checked + .fa {
          color: #86590d;
        }
        .filter-item--check-box input:checked + .fa:before {
          border-color: #86590d;
        }
        .filter-item--check-box input:checked + .fa:after {
          font-family: "FontAwesome";
          content: "\f00c";
          color: #86590d;
          position: absolute;
          width: 15px;
          height: 15px;
          line-height: 15px;
          top: -15px;
          font-size: 11px;
          left: 2px;
        }
      `}</style>
    </Fragment>
  );
};
export default Lak;
