import { Heading, Text, Link } from "@primer/components";
import {
  executeServerSide,
  mergePageProps,
  pagePropsVar,
} from "components/SellerProvider/Controller";
import { useMemo } from "react";

export default function Home(props) {
  const { seller } = useMemo(pagePropsVar, [props]);

  return (
    <section>
      <Heading fontSize={40}>Itoa Seller</Heading>
      <Text>
        Đến trang{" "}
        <Link sx={{ mb: 1 }} href="/admin">
          Quản lý
        </Link>
      </Text>
    </section>
  );
}
export async function getServerSideProps(context) {
  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=59"
  );
  const apolloProps = await executeServerSide(context, ({ seller }) => []);
  const page = {
    props: {},
  };
  return { props: mergePageProps(page.props, apolloProps.props) };
}
