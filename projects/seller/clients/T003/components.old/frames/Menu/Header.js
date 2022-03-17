import { useSubscription } from '@apollo/client';
import {
  faSearch,
  faShoppingBag,
  faUser,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ProductCart from '../../primes/Product/Cart';
import Count from '../../primes/Product/Cart/Count';
import styles from './Header.module.css';
import Mobile from './Mobile';
const MenuMobile = ({
  allProductCategories,
  page,
  onClickAccount,
  onClickWishList,
  onClickCart,
  onClickHome,
  onClickProductCategory,
  onClickBar,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.bg}>
        <div className="container">
          {/* DESKTOP */}
          <div className="d-none d-md-block">
            <div className={styles.navBox}>
              <h1 onClick={onClickHome} className={styles.brand}>
                {page.store}
              </h1>
              {allProductCategories?.map(one => {
                return (
                  <div key={one.id} className={styles.navItem}>
                    <div className="dropdown">
                      <a
                        onClick={() => {
                          onClickProductCategory(one);
                        }}
                      >
                        {one.name}
                      </a>
                      {one?.childs?.map(two => {
                        return (
                          <div key={two.id} className="dropdown-content">
                            <div key={two.id} className={styles.navItem}>
                              <a
                                onClick={() => {
                                  onClickProductCategory(two);
                                }}
                              >
                                / {two.name}
                              </a>
                              {two?.childs?.map(three => {
                                return (
                                  <div key={three.id} className={styles.navItem}>
                                    <a
                                      onClick={() => {
                                        onClickProductCategory(three);
                                      }}
                                    >
                                      / {three.name}
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
              <div className={styles.iconBox}>
                <FontAwesomeIcon icon={faUser} className={styles.icon} onClick={onClickWishList} />
              </div>
              <div className={styles.iconCartBox}>
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className={styles.icon}
                  onClick={onClickCart}
                />
                <span className={styles.number}>
                  <ProductCart UI={Count} />
                </span>
              </div>
              <div className={styles.iconBox}>
                <FontAwesomeIcon icon={faSearch} className={styles.icon} onClick={onClickAccount} />
              </div>
              <div className="d-md-none">
                <div
                  className={styles.iconBox}
                  onClick={() => {
                    setOpen(open => !open);
                  }}
                >
                  <FontAwesomeIcon icon={faBars} className={styles.icon} />
                </div>
              </div>
            </div>
          </div>
          {/* MOBILE */}
          <div className="d-block d-md-none">
            <div className={styles.navBox}>
              <div
                className={styles.iconBoxMB}
                onClick={() => {
                  setOpen(open => setOpen(!open));
                }}
              >
                {open ? (
                  <FontAwesomeIcon icon={faTimes} className={styles.icon} spin={true} />
                ) : (
                  <FontAwesomeIcon icon={faBars} className={styles.icon} />
                )}
              </div>
              <h1 onClick={onClickHome} className={styles.brandMobile}>
                {page.store}
              </h1>
              <div className={styles.iconCartBox}>
                <FontAwesomeIcon
                  icon={faShoppingBag}
                  className={styles.icon}
                  onClick={onClickCart}
                />
                <span className={styles.number}>
                  <ProductCart UI={Count} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Mobile open={open} />
    </header>
  );
};
export default MenuMobile;
