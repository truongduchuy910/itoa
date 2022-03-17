import Products from '../../components/primes/Product/List';

const Discount = () => {
  return (
    <div className="container">
      <Products ProductWhereInput={{ status: 'bestSeller' }} first={100} />
    </div>
  );
};
export default Discount;
