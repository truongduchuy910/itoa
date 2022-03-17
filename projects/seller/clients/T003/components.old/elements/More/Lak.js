import styles from './Lak.module.css';
const Lak = ({ onClick }) => {
  return (
    <div className={styles.frame}>
      <div
        className={styles.box}
        onClick={() => {
          onClick();
        }}
      >
        Xem thêm sản phẩm...
      </div>
    </div>
  );
};
export default Lak;
