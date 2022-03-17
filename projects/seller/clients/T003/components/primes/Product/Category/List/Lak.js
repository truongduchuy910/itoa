const Lak = ({ allProductCategories, onClickProductCategory = (category) => {} }) => {
  return (
    <div className="indoor-plant-area pt-5 xxx-banner">
      <div className="---">
        <div className="row">
          {/*Section Title Start*/}
          {allProductCategories?.map((category) => {
            return (
              <div key={category.id} className="col-xs-12 col-sm-6 mb-4">
                <a
                  title={category.name}
                  onClick={() => {
                    onClickProductCategory(category);
                  }}
                >
                  <img
                    src={`${category.file?.publicUrl.replace(
                      "/img",
                      "/img-md"
                    )}`}
                    alt="#"
                  />
                </a>
                <div className="cap-xxx">
                  <h3>{category.name}</h3>
                  <p>Xem ngay</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        /*! CSS Used from: https://bizweb.dktcdn.net/100/347/891/themes/710583/assets/all.css?1613484421222 */
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
          h3,
          p {
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
        h3 {
          font-family: inherit;
          font-weight: 500;
          line-height: 1.1;
          color: inherit;
        }
        h3 {
          margin-top: 20px;
          margin-bottom: 10px;
        }
        h3 {
          font-size: 24px;
        }
        p {
          margin: 0 0 10px;
        }
        .row {
          margin-right: -15px;
          margin-left: -15px;
        }
        .col-sm-6,
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
        @media (min-width: 768px) {
          .col-sm-6 {
            float: left;
          }
          .col-sm-6 {
            width: 50%;
          }
        }
        .row:after,
        .row:before {
          display: table;
          content: " ";
        }
        .row:after {
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
        a {
          outline: medium none;
          color: #434343;
        }
        h3 {
          font-family: "PN", sans-serif;
          font-weight: 500;
          color: #000000;
          margin-top: 0px;
          font-weight: 400;
          line-height: 1;
        }
        h3 {
          font-size: 24px;
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
        .pt-50 {
          margin-bottom: 50px;
        }
        img {
          max-width: 100%;
        }
        .cap-xxx h3 {
          color: #fff;
          font-weight: bold;
          pointer-events: none;
        }
        .cap-xxx {
          pointer-events: none;
          left: 50%;
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          color: #fff;
          text-align: center;
        }
        .xxx-banner img:hover {
          transform: scale(1.1);
          overflow: hidden;
        }
        .xxx-banner img {
          transition: all 4s;
        }
        .xxx-banner a {
          display: inline-block;
          overflow: hidden;
        }
        @media (max-width: 767px) {
          .pt-50 {
            margin-bottom: 30px;
          }
          .xxx-banner a {
            display: inline-block;
            overflow: initial;
          }
        }
        @media (max-width: 768px) {
          .xxx-banner .col-sm-6:first-child img {
            margin-bottom: 15px;
          }
        }
      `}</style>
    </div>
  );
};
export default Lak;
