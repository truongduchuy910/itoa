import { gql, useQuery } from "@apollo/client";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Loading from "../../elements/Loading";
const Page = ({ open = true, UI, first, skip, ProductCategoryWhereInput }) => {
  const router = useRouter();
  //
  var { data, error, loading } = useQuery(
    gql`
      query ($first: Int, $skip: Int, $condition: ProductCategoryWhereInput) {
        allProductCategories(first: $first, skip: $skip, where: $condition) {
          name
          url
          id
          prioritize
        }
        allPages {
          id
          logo {
            publicUrl
          }
          store
          slogan
          address
          intro
          phone
          email
          contact
          prices
          facebook
          domain
          transfer
          ship
          user {
            id
          }
        }
      }
    `,
    {
      variables: {
        first: open ? 99 : first,
        skip,
        condition: {
          ...ProductCategoryWhereInput,
          parent_is_null: true,
        },
      },
    },
  );
  //
  if (loading || error)
    return <Loading style={{ marginTop: 13, marginBottom: 13 }} />;

  return (
    <Fragment>
      <Head>
        <link
          rel="icon"
          href={
            
            data?.allPages[0]?.logo?.publicUrl.replace(/\/md/g, "sm")
          }
          type="image/jpg"
        ></link>
        <title>{data?.allPages[0]?.store}</title>
      </Head>
      <UI {...data} />
    </Fragment>
  );
};
export default Page;
