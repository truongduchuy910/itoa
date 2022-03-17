const ChakSimple = ({ allProductCategories = [] }) => {
  return (
    <div>
      {allProductCategories?.map(category => {
        return (
          <div>
            <h3>{category.name}</h3>
          </div>
        );
      })}
    </div>
  );
};
export default ChakSimple;
