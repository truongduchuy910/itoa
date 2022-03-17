import { useState } from 'react';
import ProductList from '../../components/primes/Product/List';
import ProductListLak from '../../components/primes/Product/List/Lak';
import { useRouter } from 'next/router';
import Title from '../../components/elements/Title';
import TitleLak from '../../components/elements/Title/Lak';
import { gql, useQuery } from '@apollo/client';
import Loading from '../../components/elements/Loading';
export default function Home() {
  const router = useRouter();
  const {
    query: { id: activeUrls, from, to },
  } = router;
  const [categories, setCategories] = useState([]);
  var { data, error, loading } = useQuery(
    gql`
      query {
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
    `
  );
  if (loading || error) return <Loading />;

  const [page] = data.allPages;
  const choosedItem = items => {
    setCategories(items);
    router.push(
      `/san-pham/[danh-muc]`,
      `/san-pham/${items.map(item => encodeURIComponent(item.url)).join('/')}`
    );
  };
  return (
    <div style={{ paddingTop: 15 }} className="container">
      <section className="container">
        <Title UI={TitleLak} title={`Hot Deal`} />
        <ProductList
          UI={ProductListLak}
          ProductWhereInput={{ status: 'hotDeal' }}
          first={6}
          onClickMore={() => {
            router.push(`/hot-deal`);
          }}
        />
      </section>
    </div>
  );
}
