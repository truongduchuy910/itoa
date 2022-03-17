const Leonardo = () => {
  return (
    <div id="shopify-section-header" className="shopify-section shopify-section--header">
      <div id="Search" className="Search" aria-hidden="true">
        <div className="Search__Inner">
          <div className="Search__SearchBar">
            <form action="/search" name="GET" role="search" className="Search__Form">
              <div className="Search__InputIconWrapper">
                <span className="hidden-tablet-and-up">
                  <svg className="Icon Icon--search" role="presentation" viewBox="0 0 18 17">
                    <g
                      transform="translate(1 1)"
                      stroke="currentColor"
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="square"
                    >
                      <path d="M16 16l-5.0752-5.0752" />
                      <circle cx="6.4" cy="6.4" r="6.4" />
                    </g>
                  </svg>
                </span>
                <span className="hidden-phone">
                  <svg
                    className="Icon Icon--search-desktop"
                    role="presentation"
                    viewBox="0 0 21 21"
                  >
                    <g
                      transform="translate(1 1)"
                      stroke="currentColor"
                      strokeWidth={2}
                      fill="none"
                      fillRule="evenodd"
                      strokeLinecap="square"
                    >
                      <path d="M18 18l-5.7096-5.7096" />
                      <circle cx="7.2" cy="7.2" r="7.2" />
                    </g>
                  </svg>
                </span>
              </div>
              <input
                type="search"
                className="Search__Input Heading"
                name="q"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder="Tìm kiếm..."
                autofocus
              />
              <input type="hidden" name="type" defaultValue="product" />
            </form>
            <button className="Search__Close Link Link--primary" data-action="close-search">
              <svg className="Icon Icon--close" role="presentation" viewBox="0 0 16 14">
                <path
                  d="M15 0L1 14m14 0L1 0"
                  stroke="currentColor"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="Search__Results" aria-hidden="true" />
        </div>
      </div>
      <header
        id="section-header"
        className="Header Header--initialized Header--center"
        data-section-id="header"
        data-section-type="header"
        data-section-settings='{
  "navigationStyle": "center",
  "hasTransparentHeader": false,
  "isSticky": true
}'
        role="banner"
      >
        <div className="Header__Wrapper">
          <div className="Header__FlexItem Header__FlexItem--fill">
            <button
              className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable hidden-desk"
              aria-expanded="false"
              data-action="open-drawer"
              data-drawer-id="sidebar-menu"
              aria-label="Điều hướng mở"
            >
              <span className="hidden-tablet-and-up">
                <svg className="Icon Icon--nav" role="presentation" viewBox="0 0 20 14">
                  <path d="M0 14v-1h20v1H0zm0-7.5h20v1H0v-1zM0 0h20v1H0V0z" fill="currentColor" />
                </svg>
              </span>
              <span className="hidden-phone">
                <svg className="Icon Icon--nav-desktop" role="presentation" viewBox="0 0 24 16">
                  <path
                    d="M0 15.985v-2h24v2H0zm0-9h24v2H0v-2zm0-7h24v2H0v-2z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
            <nav
              className="Header__MainNav hidden-pocket hidden-lap"
              aria-label="Chuyển hướng chính"
            >
              <ul className="HorizontalList HorizontalList--spacingExtraLoose">
                <li className="HorizontalList__Item ">
                  <a
                    href="https://www.leonardo.vn/collections/all/new-arrived"
                    className="Heading u-h6"
                  >
                    New Arrivals
                    <span className="Header__LinkSpacer">New Arrivals</span>
                  </a>
                </li>
                <li className="HorizontalList__Item " aria-haspopup="true">
                  <a href="https://www.leonardo.vn/collections/all/male" className="Heading u-h6">
                    MEN<span className="Header__LinkSpacer">MEN</span>
                  </a>
                  <div className="MegaMenu  " aria-hidden="true">
                    <div className="MegaMenu__Inner">
                      <div className="MegaMenu__Item MegaMenu__Item--fit">
                        <a
                          href="/collections/vi-da-nam"
                          className="MegaMenu__Title Heading Text--subdued u-h7"
                        >
                          VÍ DA
                        </a>
                        <ul className="Linklist">
                          <li className="Linklist__Item">
                            <a href="/collections/vi-da-nam" className="Link Link--secondary">
                              Xem tất cả
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/vi-nam" className="Link Link--secondary">
                              Ví thường
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/vi-dai-nam/male" className="Link Link--secondary">
                              Ví dài
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/vi-mini" className="Link Link--secondary">
                              Ví mini
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/vi-card/male" className="Link Link--secondary">
                              Ví đựng card
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="MegaMenu__Item MegaMenu__Item--fit">
                        <a
                          href="/collections/giay-da"
                          className="MegaMenu__Title Heading Text--subdued u-h7"
                        >
                          GIÀY DA
                        </a>
                        <ul className="Linklist">
                          <li className="Linklist__Item">
                            <a href="/collections/giay-da" className="Link Link--secondary">
                              Xem tất cả
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/giay-derby" className="Link Link--secondary">
                              Derby
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/giay-boots" className="Link Link--secondary">
                              Boots
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/giay-loafer" className="Link Link--secondary">
                              Loafer
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/slippers" className="Link Link--secondary">
                              Slippers
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/sandal" className="Link Link--secondary">
                              Dép
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/v-ph-ki-n" className="Link Link--secondary">
                              Vớ &amp; Phụ kiện
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="MegaMenu__Item MegaMenu__Item--fit">
                        <a
                          href="/collections/bags/male"
                          className="MegaMenu__Title Heading Text--subdued u-h7"
                        >
                          BALO/TÚI XÁCH
                        </a>
                        <ul className="Linklist">
                          <li className="Linklist__Item">
                            <a href="/collections/bags/male" className="Link Link--secondary">
                              Xem tất cả
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/balo" className="Link Link--secondary">
                              Balo
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/tui-xach-1" className="Link Link--secondary">
                              Túi xách
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/tui-deo-cheo" className="Link Link--secondary">
                              Túi đeo chéo
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="MegaMenu__Item MegaMenu__Item--fit">
                        <a
                          href="/collections/phu-kien"
                          className="MegaMenu__Title Heading Text--subdued u-h7"
                        >
                          PHỤ KIỆN{' '}
                        </a>
                        <ul className="Linklist">
                          <li className="Linklist__Item">
                            <a href="/collections/phu-kien" className="Link Link--secondary">
                              Xem tất cả
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/clutch" className="Link Link--secondary">
                              Clutch
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a
                              href="/collections/that-lung-nam/male"
                              className="Link Link--secondary"
                            >
                              Thắt lưng
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/day-da-dong-ho" className="Link Link--secondary">
                              Dây da đồng hồ
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a
                              href="/collections/phu-kien-do-cong-nghe"
                              className="Link Link--secondary"
                            >
                              Bao da iPhone/Macbook/Passport
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="HorizontalList__Item " aria-haspopup="true">
                  <a href="https://www.leonardo.vn/collections/all/female" className="Heading u-h6">
                    WOMEN<span className="Header__LinkSpacer">WOMEN</span>
                  </a>
                  <div className="MegaMenu MegaMenu--spacingEvenly " aria-hidden="true">
                    <div className="MegaMenu__Inner">
                      <div className="MegaMenu__Item MegaMenu__Item--fit">
                        <a
                          href="/collections/vi-da-nu/female"
                          className="MegaMenu__Title Heading Text--subdued u-h7"
                        >
                          VÍ DA
                        </a>
                        <ul className="Linklist">
                          <li className="Linklist__Item">
                            <a href="/collections/vi-da-nu/female" className="Link Link--secondary">
                              Xem tất cả
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a
                              href="/collections/vi-dai-nu/Female"
                              className="Link Link--secondary"
                            >
                              Ví dài
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/vi-card/female" className="Link Link--secondary">
                              Ví đựng card
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="MegaMenu__Item MegaMenu__Item--fit">
                        <a
                          href="/collections/bags"
                          className="MegaMenu__Title Heading Text--subdued u-h7"
                        >
                          BALO/TÚI XÁCH
                        </a>
                        <ul className="Linklist">
                          <li className="Linklist__Item">
                            <a href="/collections/bags" className="Link Link--secondary">
                              Xem tất cả
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/balo" className="Link Link--secondary">
                              Balo
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/tui-xach-1" className="Link Link--secondary">
                              Túi xách
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/tui-deo-cheo" className="Link Link--secondary">
                              Túi đeo chéo
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="MegaMenu__Item MegaMenu__Item--fit">
                        <a
                          href="/collections/phu-kien"
                          className="MegaMenu__Title Heading Text--subdued u-h7"
                        >
                          PHỤ KIỆN
                        </a>
                        <ul className="Linklist">
                          <li className="Linklist__Item">
                            <a href="/collections/phu-kien" className="Link Link--secondary">
                              Xem tất cả
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a
                              href="/collections/phu-kien-do-cong-nghe"
                              className="Link Link--secondary"
                            >
                              Bao da iPhone/Macbook/Passport
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/clutch" className="Link Link--secondary">
                              Clutch
                            </a>
                          </li>
                          <li className="Linklist__Item">
                            <a href="/collections/day-da-dong-ho" className="Link Link--secondary">
                              Dây da đồng hồ
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="HorizontalList__Item ">
                  <a href="/blogs/news" className="Heading u-h6">
                    BLOG<span className="Header__LinkSpacer">BLOG</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="Header__FlexItem Header__FlexItem--logo">
            <h1 className="Header__Logo">
              <a href="/" className="Header__LogoLink">
                <img
                  className="Header__LogoImage Header__LogoImage--primary"
                  src="//cdn.shopify.com/s/files/1/1236/1344/files/1e2f29-01_140x.png?v=1606900514"
                  srcSet="//cdn.shopify.com/s/files/1/1236/1344/files/1e2f29-01_140x.png?v=1606900514 1x, //cdn.shopify.com/s/files/1/1236/1344/files/1e2f29-01_140x@2x.png?v=1606900514 2x"
                  width={140}
                  alt="Leonardo"
                />
              </a>
            </h1>
          </div>
          <div className="Header__FlexItem Header__FlexItem--fill">
            <nav className="Header__SecondaryNav hidden-phone">
              <ul className="HorizontalList HorizontalList--spacingLoose hidden-pocket hidden-lap">
                <li className="HorizontalList__Item">
                  <a
                    href="/search"
                    className="Heading Link Link--primary Text--subdued u-h8"
                    data-action="toggle-search"
                  >
                    Tìm kiếm
                  </a>
                </li>
                <li className="HorizontalList__Item">
                  <a
                    href="/cart"
                    className="Heading u-h6"
                    data-action="open-drawer"
                    data-drawer-id="sidebar-cart"
                    aria-label="Xem giỏ hàng"
                  >
                    Giỏ hàng (<span className="Header__CartCount">0</span>)
                  </a>
                </li>
              </ul>
            </nav>
            <a
              href="/search"
              className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable hidden-desk"
              data-action="toggle-search"
              aria-label="Tìm kiếm"
            >
              <span className="hidden-tablet-and-up">
                <svg className="Icon Icon--search" role="presentation" viewBox="0 0 18 17">
                  <g
                    transform="translate(1 1)"
                    stroke="currentColor"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="square"
                  >
                    <path d="M16 16l-5.0752-5.0752" />
                    <circle cx="6.4" cy="6.4" r="6.4" />
                  </g>
                </svg>
              </span>
              <span className="hidden-phone">
                <svg className="Icon Icon--search-desktop" role="presentation" viewBox="0 0 21 21">
                  <g
                    transform="translate(1 1)"
                    stroke="currentColor"
                    strokeWidth={2}
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="square"
                  >
                    <path d="M18 18l-5.7096-5.7096" />
                    <circle cx="7.2" cy="7.2" r="7.2" />
                  </g>
                </svg>
              </span>
            </a>
            <a
              href="/cart"
              className="Header__Icon Icon-Wrapper Icon-Wrapper--clickable hidden-desk"
              data-action="open-drawer"
              data-drawer-id="sidebar-cart"
              aria-expanded="false"
              aria-label="Xem giỏ hàng"
            >
              <span className="hidden-tablet-and-up">
                <svg className="Icon Icon--cart" role="presentation" viewBox="0 0 17 20">
                  <path
                    d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="hidden-phone">
                <svg className="Icon Icon--cart-desktop" role="presentation" viewBox="0 0 19 23">
                  <path
                    d="M0 22.985V5.995L2 6v.03l17-.014v16.968H0zm17-15H2v13h15v-13zm-5-2.882c0-2.04-.493-3.203-2.5-3.203-2 0-2.5 1.164-2.5 3.203v.912H5V4.647C5 1.19 7.274 0 9.5 0 11.517 0 14 1.354 14 4.647v1.368h-2v-.912z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="Header__CartDot " />
            </a>
          </div>
        </div>
      </header>
      <style
        dangerouslySetInnerHTML={{
          __html:
            ':root {\n      --use-sticky-header: 1;\n      --use-unsticky-header: 0;\n    }\n\n    .shopify-section--header {\n      position: -webkit-sticky;\n      position: sticky;\n    }@media screen and (max-width: 640px) {\n      .Header__LogoImage {\n        max-width: 95px;\n      }\n    }:root {\n      --header-is-not-transparent: 1;\n      --header-is-transparent: 0;\n    }',
        }}
      />
      <style jsx>{`
        /*! CSS Used from: https://cdn.shopify.com/s/files/1/1236/1344/t/20/assets/theme.scss.css?v=9346683118417552595 */
        *,
        *:before,
        *:after {
          box-sizing: border-box !important;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        header,
        nav {
          display: block;
        }
        :active {
          outline: none;
        }
        a {
          color: inherit;
          background-color: transparent;
          text-decoration: none;
        }
        a:active,
        a:hover {
          outline: 0;
        }
        h1 {
          margin-top: 0;
          font-size: inherit;
          font-weight: inherit;
        }
        h1:last-child {
          margin-bottom: 0;
        }
        img {
          max-width: 100%;
          height: auto;
          border-style: none;
          vertical-align: top;
        }
        svg:not(:root) {
          overflow: hidden;
        }
        ul {
          margin: 0;
          padding: 0;
          list-style-position: inside;
        }
        button,
        input {
          color: inherit;
          font: inherit;
          margin: 0;
        }
        button {
          padding: 0;
          overflow: visible;
          background: none;
          border: none;
          border-radius: 0;
          -webkit-appearance: none;
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
          border: 0;
          padding: 0;
        }
        input {
          line-height: normal;
          border-radius: 0;
        }
        input[type='search'] {
          -webkit-appearance: none;
          box-sizing: content-box;
        }
        input::-webkit-input-placeholder {
          color: inherit;
        }
        input::-moz-placeholder {
          color: inherit;
        }
        input:-ms-input-placeholder {
          color: inherit;
        }
        input::-ms-input-placeholder {
          color: inherit;
        }
        input::placeholder {
          color: inherit;
        }
        @media screen and (max-width: 640px) {
          .hidden-phone {
            display: none !important;
          }
        }
        @media screen and (min-width: 641px) {
          .hidden-tablet-and-up {
            display: none !important;
          }
        }
        @media screen and (max-width: 1007px) {
          .hidden-pocket {
            display: none !important;
          }
        }
        @media screen and (min-width: 1008px) and (max-width: 1239px) {
          .hidden-lap {
            display: none !important;
          }
        }
        @media screen and (min-width: 1240px) {
          .hidden-desk {
            display: none !important;
          }
        }
        body:not(.is-tabbing) button:focus,
        body:not(.is-tabbing) input:focus {
          outline: none;
        }
        .Link {
          transition: color 0.2s ease-in-out, opacity 0.2s ease-in-out;
        }
        .supports-hover .Link--primary:hover {
          color: #333333;
        }
        .supports-hover .Link--secondary:hover {
          color: #333333;
        }
        .Heading {
          font-family: Futura, sans-serif;
          font-weight: 500;
          font-style: normal;
          color: #333333;
          transition: color 0.2s ease-in-out;
        }
        .Text--subdued {
          color: #333333;
        }
        .Icon-Wrapper--clickable {
          position: relative;
          background: transparent;
        }
        .Icon-Wrapper--clickable::before {
          position: absolute;
          content: '';
          top: -8px;
          right: -12px;
          left: -12px;
          bottom: -8px;
          transform: translateZ(0);
        }
        .Icon {
          display: inline-block;
          height: 1em;
          width: 1em;
          fill: currentColor;
          vertical-align: middle;
          stroke-width: 1px;
          background: none;
          pointer-events: none;
        }
        .u-h6 {
          font-size: 12px;
        }
        .u-h7 {
          font-size: 11px;
        }
        .u-h8 {
          font-size: 10px;
        }
        @media screen and (min-width: 641px) {
          .u-h6 {
            font-size: 12px;
          }
          .u-h7 {
            font-size: 11px;
          }
          .u-h8 {
            font-size: 10px;
          }
        }
        .HorizontalList {
          list-style: none;
          margin: -6px -8px;
        }
        .HorizontalList__Item {
          display: inline-block;
          margin: 6px 8px 6px 8px;
        }
        .HorizontalList__Item > .Link {
          display: inline-block;
        }
        .HorizontalList--spacingLoose {
          margin-left: -14px;
          margin-right: -14px;
        }
        .HorizontalList--spacingLoose .HorizontalList__Item {
          margin-right: 14px;
          margin-left: 14px;
        }
        .HorizontalList--spacingExtraLoose {
          margin-left: -17px;
          margin-right: -17px;
        }
        .HorizontalList--spacingExtraLoose .HorizontalList__Item {
          margin-right: 17px;
          margin-left: 17px;
        }
        @media screen and (min-width: 1240px) {
          .HorizontalList--spacingExtraLoose {
            margin-left: -21px;
            margin-right: -21px;
          }
          .HorizontalList--spacingExtraLoose .HorizontalList__Item {
            margin-right: 21px;
            margin-left: 21px;
          }
        }
        .Linklist {
          list-style: none;
          padding: 0;
        }
        .Linklist__Item {
          position: relative;
          display: block;
          margin-bottom: 12px;
          width: 100%;
          line-height: 1.5;
          text-align: left;
          transition: all 0.2s ease-in-out;
        }
        .Linklist__Item:last-child {
          margin-bottom: 0 !important;
        }
        .Linklist__Item::before {
          position: absolute;
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          top: calc(50% - 3px);
          left: 0;
          border-radius: 100%;
          background: #333333;
          opacity: 0;
          transition: opacity 0.1s ease-in-out;
        }
        .Linklist__Item > .Link {
          display: block;
          width: 100%;
          text-align: inherit;
        }
        .shopify-section--header {
          position: relative;
          width: 100%;
          top: 0;
          left: 0;
          z-index: 5;
        }
        .Header .Heading,
        .Header .Link--secondary,
        .Header .Link--primary:hover {
          color: #333333;
        }
        .Header .Text--subdued,
        .Header .Link--primary,
        .Header .Link--secondary:hover {
          color: #333333;
        }
        .Header {
          background: white;
          color: #333333;
          box-shadow: 0 -1px #e0e0e0 inset;
          transition: background 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
        }
        .Header__Wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 18px;
        }
        .Header__Logo {
          position: relative;
          margin-bottom: 0;
        }
        .Header__LogoLink,
        .Header__LogoImage {
          display: block;
        }
        .Header__LogoImage {
          margin: 0 auto;
          transition: opacity 0.3s ease-in-out;
        }
        .Header__Icon {
          display: inline-block;
          line-height: 1;
          transition: color 0.2s ease-in-out;
        }
        .Header__Icon span {
          display: block;
        }
        .Header__Icon + .Header__Icon {
          margin-left: 18px;
        }
        .Header__Icon .Icon--nav {
          height: 14px;
          width: 20px;
        }
        .Header__Icon .Icon--cart {
          width: 17px;
          height: 20px;
        }
        .Header__Icon .Icon--search {
          position: relative;
          top: 1px;
          width: 18px;
          height: 17px;
        }
        .Header__FlexItem {
          display: flex;
        }
        .Header__FlexItem--fill {
          flex: 1 0 0;
          align-items: center;
        }
        .Header__FlexItem--fill:last-child {
          justify-content: flex-end;
        }
        .Header__CartDot {
          position: absolute;
          top: 2px;
          right: -6px;
          width: 8px;
          height: 8px;
          border-radius: 100%;
          background-color: #333333;
          box-shadow: 0 0 0 2px white;
          transform: scale(0);
          transition: all 0.3s ease-in-out;
        }
        @media screen and (min-width: 641px) {
          .Header__Wrapper {
            padding: 18px 30px;
          }
          .Header__LogoImage {
            max-width: 100%;
          }
          .Header__Icon + .Header__Icon {
            margin-left: 25px;
          }
          .Header__Icon .Icon--nav-desktop {
            height: 17px;
            width: 24px;
          }
          .Header__Icon .Icon--cart-desktop {
            height: 23px;
            width: 19px;
          }
          .Header__Icon .Icon--search-desktop {
            position: relative;
            top: 2px;
            width: 21px;
            height: 21px;
          }
        }
        @media screen and (min-width: 1240px) {
          .js .Header__Wrapper {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
          }
          .Header:not(.Header--sidebar) .Header__Wrapper {
            padding: 18px 50px;
          }
          .Header__MainNav {
            margin-right: 45px;
          }
          .Header--center .Header__Wrapper.Header__Wrapper {
            padding-bottom: 24px;
          }
          .Header--center .Header__MainNav {
            position: absolute;
            bottom: 0;
            left: 0;
            padding-bottom: 18px;
            width: 100%;
            text-align: center;
          }
          .Header--center .Header__MainNav .HorizontalList {
            margin-left: 0;
            margin-right: 0;
          }
          .Header--center .Header__FlexItem {
            margin-bottom: 40px;
          }
          .Header--initialized .Header__Wrapper {
            opacity: 1;
          }
        }
        .Header__LinkSpacer {
          position: absolute;
          display: block;
          bottom: 0;
          color: transparent;
          pointer-events: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .Header__LinkSpacer::after {
          position: absolute;
          content: '';
          bottom: 0;
          left: 0;
          width: 100%;
          opacity: 0;
          transform: scale(0, 1);
          transform-origin: left center;
          border-bottom: 2px solid #333333;
          transition: transform 0.3s, opacity 0.3s;
        }
        .MegaMenu {
          position: absolute;
          padding: 20px 0;
          width: 100%;
          left: 0;
          top: 100%;
          visibility: hidden;
          opacity: 0;
          max-height: 600px;
          overflow: auto;
          -ms-scroll-chaining: none;
          overscroll-behavior: contain;
          text-align: left;
          background: white;
          border-bottom: 1px solid #e0e0e0;
          transition: all 0.3s ease-in-out;
        }
        .MegaMenu__Inner {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: nowrap;
          max-width: 1450px;
          margin: 0 auto;
          padding: 0 10px;
        }
        .MegaMenu--spacingEvenly .MegaMenu__Inner {
          justify-content: space-around;
          justify-content: space-evenly;
        }
        .MegaMenu__Item {
          margin: 20px 40px;
          flex-shrink: 1;
        }
        .MegaMenu__Item--fit {
          flex-shrink: 0;
        }
        .MegaMenu__Title {
          display: block;
          margin-bottom: 20px;
        }
        .Search {
          display: block;
          position: absolute;
          top: 100%;
          width: 100%;
          background: white;
          pointer-events: none;
          visibility: hidden;
          opacity: 0;
          transform: translateY(-25px);
          transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out,
            visibility 0.15s ease-in-out;
          z-index: -1;
        }
        .Search__Inner {
          padding: 14px 18px;
          max-height: calc(100vh - 60px);
          overflow: auto;
          -webkit-overflow-scrolling: touch;
        }
        .Search__SearchBar {
          display: flex;
          align-items: center;
        }
        .Search__Form {
          display: flex;
          align-items: center;
          flex: 1 0 auto;
        }
        .Search__Form .Icon--search {
          width: 18px;
          height: 17px;
        }
        .Search__Form .Icon--search-desktop {
          width: 21px;
          height: 21px;
        }
        .Search__InputIconWrapper {
          position: relative;
          top: -1px;
          margin-right: 12px;
          color: #333333;
        }
        .Search__Input {
          background: none;
          width: 100%;
          border: none;
          font-size: 15px;
          vertical-align: middle;
        }
        .Search__Input::-webkit-input-placeholder {
          color: #333333;
        }
        .Search__Input::-moz-placeholder {
          color: #333333;
        }
        .Search__Input:-ms-input-placeholder {
          color: #333333;
        }
        .Search__Input::-ms-input-placeholder {
          color: #333333;
        }
        .Search__Input::placeholder {
          color: #333333;
        }
        .Search__Input::-ms-clear {
          display: none;
        }
        .Search__Close {
          color: #333333;
          font-size: 15px;
          line-height: 1;
        }
        .Search__Results {
          display: none;
          margin-top: 30px;
          margin-bottom: 30px;
        }
        @media screen and (min-width: 641px) {
          .Search__Inner {
            padding: 28px 50px;
          }
          .Search__Input {
            font-size: 18px;
          }
          .Search__InputIconWrapper {
            margin-right: 20px;
          }
          .Search__Close {
            font-size: 16px;
          }
          .Search__Close svg {
            stroke-width: 1.25px;
          }
          .Search__Results {
            margin-top: 70px;
            margin-bottom: 48px;
          }
        }
        /*! CSS Used from: https://cdn.shopify.com/s/files/1/1236/1344/t/20/assets/custom.scss.css?v=11288314996183086830 */
        .Heading {
          font-family: 'Gramond Premier Pro Medium Caption';
        }
        .Header__MainNav .HorizontalList__Item > a {
          font-family: 'Aviano Sans Regular';
        }
        .Header__MainNav .HorizontalList__Item .MegaMenu .MegaMenu__Item a {
          font-family: 'Gramond Premier Pro Medium Caption';
        }
        .Header__SecondaryNav .HorizontalList__Item a {
          font-family: 'Gramond Premier Pro Medium Caption';
          font-size: 0.9rem;
        }
        /*! CSS Used from: Embedded */
        .shopify-section--header {
          position: -webkit-sticky;
          position: sticky;
        }
        @media screen and (max-width: 640px) {
          .Header__LogoImage {
            max-width: 95px;
          }
        }
        /*! CSS Used fontfaces */
        @font-face {
          font-family: Futura;
          font-weight: 500;
          font-style: normal;
          font-display: fallback;
          src: url('https://fonts.shopifycdn.com/futura/futura_n5.5632c6d8a6da9141ef40e51d14264a007bcae7e5.woff2?h1=bGVvbmFyZG8udm4&hmac=9848fb4e99b434e3ba2b71a16bcc1da9f59bb205cbfe1361bac38cdcea84a90c')
              format('woff2'),
            url('https://fonts.shopifycdn.com/futura/futura_n5.ea788239cf399e57dbdfe80e24bba751e5c2a36c.woff?h1=bGVvbmFyZG8udm4&hmac=ed341b8239b7dd8654396c4fb424a76eb07226a41b72c812cbae787b3f806262')
              format('woff');
        }
        @font-face {
          font-family: Futura;
          font-weight: 400;
          font-style: normal;
          font-display: fallback;
          src: url('https://fonts.shopifycdn.com/futura/futura_n4.df36ce3d9db534a4d7947f4aa825495ed740e410.woff2?h1=bGVvbmFyZG8udm4&hmac=94d060352736de03a9db2679fa2c5aca00a3c977f7fa59d63c18b09167b4f446')
              format('woff2'),
            url('https://fonts.shopifycdn.com/futura/futura_n4.6bce24beb4ba1ff4ddeb20f7cd6e2fa513a3d6ec.woff?h1=bGVvbmFyZG8udm4&hmac=77d5bda830ff0642034e320addbd33a6ed13ceef0d3581704923d2e9a0202c95')
              format('woff');
        }
        @font-face {
          font-family: Futura;
          font-weight: 700;
          font-style: normal;
          font-display: fallback;
          src: url('https://fonts.shopifycdn.com/futura/futura_n7.153f8fffad8e901382179997bbb87aa7a5ff33b3.woff2?h1=bGVvbmFyZG8udm4&hmac=a563cc9673b8b4a6bd24a3e24882ef45e82baf2806d7e8a3357d4962551fa8f6')
              format('woff2'),
            url('https://fonts.shopifycdn.com/futura/futura_n7.711e9243b3eccc2745ecf4731eba61651a122376.woff?h1=bGVvbmFyZG8udm4&hmac=8266765d894cfc70a278f90261178d5abe221b2d1b8959d1338f6f4db31b98fd')
              format('woff');
        }
        @font-face {
          font-family: Futura;
          font-weight: 400;
          font-style: oblique;
          font-display: fallback;
          src: url('https://fonts.shopifycdn.com/futura/futura_o4.9747e2e6ed2f11b894984527c927b42234e48815.woff2?h1=bGVvbmFyZG8udm4&hmac=0e1f62ff098a8cad7945538ecb8c3f1bb9d1733b627a5647865614454e49857a')
              format('woff2'),
            url('https://fonts.shopifycdn.com/futura/futura_o4.d5edc6b1d9a050bbe0beb9093d73b883bf18c6c1.woff?h1=bGVvbmFyZG8udm4&hmac=206ef4d600872edcd064c1002482faf8eba664420831eaaf4e917db96fb5b456')
              format('woff');
        }
        @font-face {
          font-family: Futura;
          font-weight: 700;
          font-style: oblique;
          font-display: fallback;
          src: url('https://fonts.shopifycdn.com/futura/futura_o7.ece1472e1fefbb598873ba72dc2bfa2e050347c1.woff2?h1=bGVvbmFyZG8udm4&hmac=02775c601c2c57a7d498787feb24ba99bc1f2c6dc49fc964970bf253999104d1')
              format('woff2'),
            url('https://fonts.shopifycdn.com/futura/futura_o7.7028291332320745f0217c346c800da7522a22b2.woff?h1=bGVvbmFyZG8udm4&hmac=d9e349f4b86af039a7a63ff85575a31ee8bf8d42b13c7c345c925e73c7884b01')
              format('woff');
        }
        @font-face {
          font-family: 'Gramond Premier Pro Medium Caption';
          src: url('//cdn.shopify.com/s/files/1/1236/1344/t/20/assets/GaramondPremrPro-MedCapt.otf?v=17607029276988997174')
            format('opentype');
        }
        @font-face {
          font-family: 'Aviano Sans Regular';
          src: url('//cdn.shopify.com/s/files/1/1236/1344/t/20/assets/Aviano%20Sans%20Regular.otf?v=13798811745926776141')
            format('opentype');
        }
      `}</style>
    </div>
  );
};
export default Leonardo;
