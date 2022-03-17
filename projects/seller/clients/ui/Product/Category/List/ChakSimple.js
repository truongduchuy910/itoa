const ChakSimple = ({ allProductCategories = [] }) => {
  return (
    <div>
      {allProductCategories?.map((category) => {
        return (
          <div key={category.id}>
            <h3>{category.name}</h3>
          </div>
        );
      })}
    </div>
  );
};
export default ChakSimple;
