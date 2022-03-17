import styles from './One.module.css';
const One = ({ value, onClick, file, active }) => {
  return (
    <div onClick={onClick} className={styles.box}>
      {file?.publicUrl && <img src={file.publicUrl} className={styles.img} />}
      <a
        className={styles.value}
        style={{
          textDecoration: active && 'underline',
          fontWeight: active && 'bold',
        }}
      >
        {value}
      </a>
    </div>
  );
};
export default One;
