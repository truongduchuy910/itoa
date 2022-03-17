import { gql, useQuery } from '@apollo/client';
import Loading from '../../../elements/Loading';

const ProductStock = ({ ProductStockWhereInput, onLoad = () => {} }) => {
  const { loading, error, data } = useQuery(
    gql`
      query ($condition: ProductStockWhereInput) {
        allProductStocks(where: $condition) {
          id
          quantity
        }
      }
    `,
    { variables: { condition: { ...ProductStockWhereInput } } }
  );
  if (loading || error) return <Loading />;
  const { allProductStocks } = data;
  var quantity = 0;
  data?.allProductStocks.map(stock => {
    quantity += stock?.quantity || 0;
  });
  onLoad(data);
  return allProductStocks.length
    ? quantity
      ? `Còn sản ${quantity} phẩm`
      : `Hết hàng`
    : `Số lượng chưa cập nhật`;
};

export default ProductStock;
