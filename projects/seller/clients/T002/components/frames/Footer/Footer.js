import styles from "./Footer.module.css";
const Footer = ({ store }) => {
  return (
    <footer className={styles.box}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4">
            <h5>{store}</h5>
            <hr />
            <p>Hotline: 0333 628 688</p>
            <p>Hướng dẫn đặt hàng</p>
          </div>
          <div className="col-12 col-md-4">
            <h5>Hệ thống</h5>
            <hr />
            <p>T10 Times City, Quận Hai Bà Trưng, Hà Nội</p>
            <p>8B Nguyễn Văn Thủ, Đa Khao, Quận 1, Hồ Chí Minh</p>
          </div>
          <div className="col-12 col-md-4">
            <h5>Facebook</h5>
            <hr />
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
