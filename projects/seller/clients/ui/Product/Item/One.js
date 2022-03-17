import Field from "@itoa/ui/Field";

const One = ({ name, price, sale, image }) => {
  return (
    <div>
      <p>{name}</p>
      <p>{<Field>{price}</Field>}</p>
      <p>{<Field>{price - sale}</Field>}</p>
    </div>
  );
};
export default One;
