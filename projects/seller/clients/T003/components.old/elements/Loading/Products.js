import styles from './Products.module.css';
const Product = ({ variant: { quantity = 8 } }) => {
  return (
    <div className="row">
      {new Array(quantity).map(item => (
        <div className="col-6 col-md-4 ">
          <div className={styles.loading}></div>
        </div>
      ))}
    </div>
  );
};
export default Product;
