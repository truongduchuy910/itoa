import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
function condition(fields = [], keywords = []) {
  var OR = [];
  fields.map((f) => {
    var AND = [];
    keywords.map((k) => {
      if (k)
        AND.push({
          [`${f}_contains_i`]: k,
        });
    });
    OR.push({ AND });
  });
  return { OR };
}
export const SEARCH = gql`
  query Search($product: ProductWhereInput, $post: PostWhereInput) {
    allProducts(first: 3, where: $product) {
      id
      name
      price
      categories {
        url
        name
      }
      url
    }
    allPosts(first: 3, where: $post) {
      id
      title
      hashtags {
        url
        name
      }
      url
    }
  }
`;
export default function ({ UI, ...props }) {
  const [value, setValue] = useState("");
  const [time, setTime] = useState();
  const [search, { loading, error, data = {}, called }] = useLazyQuery(SEARCH);
  const changeInput = (e) => {
    setValue((value) => {
      return e.target.value;
    });
  };
  useEffect(() => {
    if (!value) return;
    const _time = setTime((time) => {
      if (time) clearTimeout(time);
      const keywords = value.split(" ");
      const product = condition(["name", "url"], keywords);
      const post = condition(["title", "url"], keywords);
      console.log(product);
      return setTimeout(() => {
        /** ON SEARCH */
        search({
          variables: { product, post },
        });
      }, 1500);
    });
    return () => {
      clearTimeout(_time);
    };
  }, [value]);

  const { allProducts = [], allPosts = [] } = data;
  return (
    <UI
      changeInput={changeInput}
      allProducts={allProducts}
      allPosts={allPosts}
      called={called}
      loading={loading}
      {...props}
    />
  );
}
