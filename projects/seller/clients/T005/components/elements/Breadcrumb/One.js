import { FaArrowLeft } from "react-icons/fa";
import { BreadcrumbJsonLd } from "next-seo";
import { useRouter } from "next/router";
import styles from "./One.module.css";
const One = ({ items = [] }) => {
  const router = useRouter();
  return (
    <div className="sticky-top">
      {/* SEO */}
      <BreadcrumbJsonLd
        itemListElements={items.map((item, index) => ({
          position: index,
          name: item.name,
          item: "",
        }))}
      />
      <div className={styles.bg}>
        <div className="container">
          <div className={styles.box}>
            <span
              className={styles.back}
              onClick={() => {
                history.back();
              }}
            >
              <FaArrowLeft style={{ maxWidth: 24, display: "inline-block" }} />
            </span>
            {items.map((item, index) => (
              <span
                key={item.name}
                onClick={() => {
                  router.push(item.url);
                }}
              >
                {item.name}
                {index !== items.length - 1 && " / "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default One;
