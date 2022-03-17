import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Products.module.css';
const Products = ({ onClick }) => {
  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div
        className={styles.more}
        onClick={() => {
          onClick();
        }}
      >
        <div className={styles.center}>
          <span>Xem thêm sản phẩm...</span>
          {/* <span className={styles.icon}>
            <FontAwesomeIcon icon={faArrowRight} />
          </span> */}
        </div>
      </div>
    </div>
  );
};
export default Products;
