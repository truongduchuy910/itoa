import Field from "../Field";

export default function Percent({ price, sale, step = 5 }) {
  return Number(sale) ? (
    <Field step={step}>{100 - (Number(sale) / Number(price)) * 100}</Field>
  ) : null;
}
