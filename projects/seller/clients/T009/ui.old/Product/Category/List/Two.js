import styles from "./Two.module.css";
const Two = ({ allProductCategories, onClickItem }) => {
  return (
    <div className="row">
      {allProductCategories.map((category) => {
        return (
          category.file && (
            <div
              key={category.id}
              className="col-12 col-md-6"
              onClick={() =>
                onClickItem([{ name: category.name, url: category.url }])
              }
            >
              <div
                style={{
                  backgroundImage: `url(${

                    (category.file?.publicUrl || "/assets/img/no-image.png")
                  })`,
                }}
                className={styles.box}
              >
                <div className={styles.content}>
                  <div className={styles.name}>{category.name}</div>
                  <label className={styles.detail}>Xem ngay</label>
                </div>
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};
export default Two;
