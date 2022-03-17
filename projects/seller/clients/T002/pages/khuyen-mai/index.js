import Products from '../../components/primes/Product/List';
const Discount = () => {
  return (
    <div className="container">
      <Products ProductWhereInput={{ sale_gt: 0 }} first={100} />
    </div>
  );
};
export default Discount;
