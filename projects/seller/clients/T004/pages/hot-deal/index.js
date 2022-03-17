import ProductList, {
  PRODUCTS_QUERY,
} from "../../components/primes/Product/List";
import ProductListLak from "../../components/primes/Product/List/Lak";
import { useRouter } from "next/router";
import Title from "../../components/elements/Title";
import TitleLak from "../../components/elements/Title/Lak";
import { executeServerSide } from "@itoa/ui/UIProvider";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ paddingTop: 15, minHeight: "50vh" }} className="container">
      <section className="container" style={{ minHeight: "50vh" }}>
        <Title UI={TitleLak} title={`Hot Deal`} />
        <ProductList
          UI={ProductListLak}
          ProductWhereInput={{ status: "hotDeal" }}
          skip={0}
          first={99}
          onClickMore={() => {
            router.push(`/hot-deal`);
          }}
        />
      </section>
    </div>
  );
}
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59",
  );
  return await executeServerSide(context, [
    {
      disableLocale: true,
      query: PRODUCTS_QUERY,
      variables: {
        first: 99,
        skip: 0,
        condition: {
          status: "hotDeal",
        },
      },
    },
  ]);
}
