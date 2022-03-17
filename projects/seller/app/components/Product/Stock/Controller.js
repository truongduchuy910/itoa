import { gql, useQuery } from "@apollo/client";

const ProductStock = ({
  productStockWhereInput,
  first,
  skip,
  onLoad = () => {},
}) => {
  const {
    loading,
    error,
    data = {},
  } = useQuery(
    gql`
      query ProductStock(
        $first: Int
        $skip: Int
        $productStockWhereInput: ProductStockWhereInput
      ) {
        allProductStocks(
          first: $first
          skip: $skip
          where: $productStockWhereInput
        ) {
          id
          quantity
        }
      }
    `,
    {
      variables: {
        productStockWhereInput,
        skip,
        first,
      },
    }
  );
  const { allProductStocks } = data;
  var quantity = 0;
  data?.allProductStocks?.map((stock) => {
    quantity += stock?.quantity || 0;
  });
  onLoad(data);
  return allProductStocks?.length
    ? quantity
      ? `Còn sản ${quantity} phẩm`
      : `Hết hàng`
    : `Số lượng chưa cập nhật`;
};

export default ProductStock;
