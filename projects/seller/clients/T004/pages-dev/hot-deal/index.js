import Products from "../../components/primes/Product/List";

const Discount = () => {
  return (
    <div className="container">
      <Products
        option={`Lak`}
        ProductWhereInput={{ status: "hotDeal" }}
        first={100}
      />
    </div>
  );
};
export default Discount;
