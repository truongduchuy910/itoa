const Item = ({ title, thumbnail, url, onChooseItem = () => {} }) => {
  return (
    <div className="col-12 col-md-4">
      <div
        onClick={() => {
          onChooseItem(url);
        }}
      >
        <img src={thumbnail?.pubicUrl} />
        <h4>{title}</h4>
      </div>
    </div>
  );
};
const List = ({ allPosts, onChooseItem }) => {
  return (
    <div className="row">
      {allPosts?.map((item) => (
        <Item key={item.id} {...item} onChooseItem={onChooseItem} />
      ))}
    </div>
  );
};
export default List;
