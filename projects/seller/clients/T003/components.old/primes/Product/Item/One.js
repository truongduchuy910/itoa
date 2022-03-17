import { formatMoney } from '../../../utils/chip';

const One = ({ name, price, sale, image }) => {
  return (
    <div>
      <p>{name}</p>
      <p>{formatMoney(price)}</p>
      <p>{formatMoney(price - sale)}</p>
    </div>
  );
};
export default One;
