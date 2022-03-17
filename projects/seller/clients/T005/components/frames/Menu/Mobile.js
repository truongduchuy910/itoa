// import { Option } from "../../../pages/danh-muc/[[...id]]";
import styles from "./Mobile.module.css";
const Mobile = ({ open }) => {
  return (
    <div
      className={styles.box}
      style={{
        transform: open ? `translateX(0)` : `translateX(-80vw)`,
      }}
    >
      <div className={styles.container}>
        {/* <Option /> */}
      </div>
    </div>
  );
};
export default Mobile;
