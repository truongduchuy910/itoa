import { useRouter } from "next/router";
import ProductItem, {
  QUERY_PRODUCT,
} from "../.././../components/primes/Product/Item/index";
import ProductItemSimple from "../../../components/primes/Product/Item/Simple";
import { executeServerSide } from "../../../components/UIProvider";
import { FAQS_QUERY } from "../../../components/primes/FAQ";
const Product = () => {
  const router = useRouter();
  const {
    query: { product: url },
  } = router;
  return <ProductItem UI={ProductItemSimple} ProductWhereInput={{ url }} />;
};
export default Product;

export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59",
  );
  const { product: url } = context.query;
  return await executeServerSide(context, [
    { query: QUERY_PRODUCT, variables: { product: { url }, stock: {} } },
    { query: FAQS_QUERY },
  ]);
}
