import React, { Fragment } from 'react';
import logoSrc from './logo.svg';
import Bg from './bg.svg';
export default function Logo() {
  return (
    <Fragment>
      {/* <img src={Bg} style={{ position: "absolute", bottom: 0, zIndex: -1 }} /> */}
      <div style={{ textAlign: 'center', color: '#6c757d', width: 300 }}>
        <img src={logoSrc} />
        {/* <p>
          Created and developed by students of Da Nang University of Science and
          Technology
        </p> */}
        {/* <a style={{ color: "#094a5a" }} href="tel:0372672048">
          Tel: 033 281 3077
        </a> */}
        <p>Made with ❤️ by Itoa.vn</p>
      </div>
    </Fragment>
  );
}
