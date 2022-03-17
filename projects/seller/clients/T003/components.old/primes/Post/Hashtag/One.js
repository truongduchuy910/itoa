const Item = ({ data, onClick }) => {
  return <pre onClick={() => onClick(data)}>{data.name}</pre>;
};
export default Item;

const List = ({ onClick, data }) => {
  return data?.map((item) => (
    <Item key={item.id} data={item} onClick={(data) => onClick(data)} />
  ));
};
export default List;
