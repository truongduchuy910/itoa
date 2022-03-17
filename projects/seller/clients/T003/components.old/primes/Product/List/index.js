import { gql, useMutation, useQuery } from '@apollo/client';
import Loading from '../../../elements/Loading';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { cart, cartErrorSolve } from '../../../state/UseCart';
export const PRODUCTS_QUERY = gql`
  query ($first: Int, $skip: Int, $condition: ProductWhereInput) {
    allProducts(first: $first, skip: $skip, where: $condition) {
      id
      name
      price
      sale
      url
      brand {
        name
      }
      image {
        publicUrl
      }
      images {
        file {
          publicUrl
        }
      }
      categories {
        id
        url
      }
    }
    _allProductsMeta(where: $condition) {
      count
    }
  }
`;
export const PRODUCTS_VARS = { first: 8, skip: 0, condition: {} };
const Products = ({
  first = PRODUCTS_VARS.first,
  skip = PRODUCTS_VARS.skip,
  ProductWhereInput = PRODUCTS_VARS.condition,
  UI,
}) => {
  const { data, error, loading, previousData, fetchMore } = useQuery(PRODUCTS_QUERY, {
    variables: {
      first,
      skip,
      condition: ProductWhereInput,
    },
  });
  if (loading || error) return <Loading variant={{ height: 300 }} />;
  return data?.allProducts?.length ? (
    <Option loading={loading} data={data || previousData} UI={UI} fetchMore={fetchMore} />
  ) : (
    <div className="col-6 col-md-4 col-lg-3 mb-5">Không có kết quả</div>
  );
};
export default Products;
const Option = ({ UI, data, fetchMore, loading }) => {
  //
  const [createProductCartItem] = useMutation(
    gql`
      mutation ($data: ProductCartItemCreateInput) {
        createProductCartItem(data: $data) {
          id
        }
      }
    `
  );
  const [creating, setCreating] = useState(false);
  const addToCart = async ({ product }) => {
    if (!creating) {
      setCreating(true);
      try {
        const { data, error } = await createProductCartItem({
          variables: {
            data: {
              cart: { connect: { id: cart() } },
              product: { connect: { id: product.id } },
              quantity: 1,
            },
          },
        });
        if (error) {
          return <Loading />;
        } // RELOAD
      } catch (e) {
        cartErrorSolve();
        router.reload();
      }
      setCreating(false);
    }
  };
  //
  const [loadingMore, setLoadingMore] = useState(false);
  const onClickMore = e => {
    setLoadingMore(true);
    if (!loading)
      fetchMore({
        variables: { skip: data.allProducts.length },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          setLoadingMore(false);
          return {
            ...previousResult,
            allProducts: [...previousResult.allProducts, ...fetchMoreResult.allProducts],
          };
        },
      });
  };
  const router = useRouter();
  const onClickProduct = product => {
    router.push(
      `/san-pham/[category]/[product]`,
      `/san-pham/${product?.categories[0]?.url}/${product.url}`
    );
  };
  const onClickCart = () => {
    router.push(`/gio-hang`);
  };
  return (
    <UI
      {...(data || previousData)}
      onClickMore={onClickMore}
      loadingMore={loadingMore}
      onClickProduct={onClickProduct}
      addToCart={addToCart}
      onClickCart={onClickCart}
    />
  );
};
