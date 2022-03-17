import Value from '../Value/One';
const Item = ({ name, values, onClick, selections }) => {
  return (
    <div>
      <p>{name}</p>
      {values.map(value => {
        var active = false;
        selections.map(selection => {
          if (selection.value.id === value.id) active = true;
        });
        return (
          <Value
            active={active}
            key={value.id}
            {...value}
            onClick={() => {
              onClick(value);
            }}
          />
        );
      })}
    </div>
  );
};
const One = ({ allProductAttributes, onClick, selections }) => {
  return allProductAttributes.map(attribute => (
    <Item
      key={attribute.id}
      {...attribute}
      selections={selections}
      onClick={value => {
        onClick({ attribute, value });
      }}
    />
  ));
};
export default One;
