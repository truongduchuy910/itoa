import { faMinusSquare, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import styles from "./One.module.css";
const ItemThree = ({ name, url, onClickItem, activeUrls }) => {
  return (
    <li>
      <a
        className={styles.three}
        onClick={() => onClickItem([{ name, url }])}
        className={activeUrls.includes(url) ? styles.active : null}
      >
        {name}
      </a>
    </li>
  );
};
const ItemTwo = ({ childs, name, url, onClickItem, activeUrls }) => {
  return (
    <li>
      <a
        className={styles.two}
        onClick={() => onClickItem([{ name, url }])}
        className={activeUrls.includes(url) ? styles.active : null}
      >
        {name}
      </a>
      {childs &&
        childs.map((child) => (
          <ItemThree
            activeUrls={activeUrls}
            key={child.id}
            {...child}
            onClickItem={(childItem) =>
              onClickItem([{ name, url }, ...childItem])
            }
          />
        ))}
    </li>
  );
};
const ItemOne = ({ childs, name, url, onClickItem, activeUrls }) => {
  const [open, setOpen] = useState(activeUrls.includes(url));
  return (
    <li>
      <div className={styles.one}>
        <a
          onClick={() => onClickItem([{ name, url }])}
          className={activeUrls.includes(url) ? styles.active : null}
        >
          {name}
        </a>
        {childs?.length > 0 && (
          <a
            onClick={() => {
              setOpen((open) => !open);
            }}
            className={styles.collapse}
          >
            {open ? (
              <span className={styles.iconBox}>
                <FontAwesomeIcon className={styles.icon} icon={faMinusSquare} />
              </span>
            ) : (
              <span className={styles.iconBox}>
                <FontAwesomeIcon className={styles.icon} icon={faPlusSquare} />
              </span>
            )}
          </a>
        )}
      </div>
      <ul>
        {open && childs.length
          ? childs.map((child) => (
              <ItemTwo
                activeUrls={activeUrls}
                key={child.id}
                {...child}
                onClickItem={(childItem) =>
                  onClickItem([{ name, url }, ...childItem])
                }
              />
            ))
          : null}
      </ul>
    </li>
  );
};
const One = ({
  allProductCategories,
  onClickItem,
  activeUrls = [],
  open,
  setOpen,
}) => {
  return (
    <div>
      <h4 className={styles.title}>Danh mục sản phẩm</h4>
      <ul>
        {allProductCategories.map((category) => (
          <ItemOne
            activeUrls={activeUrls}
            key={category.id}
            {...category}
            onClickItem={(items) => onClickItem(items)}
          />
        ))}
      </ul>
      <a
        onClick={() => {
          setOpen((open) => !open);
        }}
      >
        {/* {open ? (
          <span className={styles.moreBox}>
            <FontAwesomeIcon className={styles.icon} icon={faChevronUp} />
          </span>
        ) : (
          <span className={styles.moreBox}>
            <FontAwesomeIcon className={styles.icon} icon={faChevronDown} />
          </span>
        )} */}
      </a>
    </div>
  );
};
export default One;
