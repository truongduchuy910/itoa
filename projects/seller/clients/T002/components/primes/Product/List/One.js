import Link from "next/link";

import { Fragment } from "react";
import Loading from "../../../elements/Loading";
import More from "../../../elements/More";
import Field from "../../../Field";
import { formatMoney } from "../../../utils/chip";
import styles from "./One.module.css";
const Item = ({ name, price, sale, image, url }) => {
  return (
    <div className="col-6 col-md-4 col-lg-3">
      <div>
        <Link
          href={`/san-pham/[id]`}
          as={{ pathname: `/san-pham/${encodeURI(url)}` }}
        >
          <a>
            <span className={styles.brand}>mayberoom.vn</span>
            <div
              className={styles.frame}
              style={{
                backgroundImage: encodeURI(
                  image?.publicUrl
                    ? `url('${image.publicUrl}')`
                    : `url("/assets/img/no-image.png")`,
                ),
              }}
            ></div>
            <p className={styles.name}>{name}</p>
            <div className={styles.box}>
              {sale ? (
                <Fragment>
                  <span className={styles.price}>{<Field>{sale}</Field>}</span>
                  <span className={styles.old}>{<Field>{price}</Field>}</span>
                </Fragment>
              ) : (
                <Fragment>
                  <span className={styles.price}>{<Field>{price}</Field>}</span>
                </Fragment>
              )}
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};
const One = ({ allProducts, _allProductsMeta, loadingMore, onClickMore }) => {
  return (
    <div className="row">
      {allProducts.map((product) => (
        <Item key={product.id} {...product} />
      ))}
      {loadingMore ? (
        <Loading option={1} />
      ) : (
        allProducts.length < _allProductsMeta?.count && (
          <More onClick={onClickMore} option={`Lak`} />
        )
      )}
    </div>
  );
};
export default One;
