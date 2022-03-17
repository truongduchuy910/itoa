import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Fragment, useMemo, useState } from "react";
import trans from "@itoa/ui/utils/trans";
import ProductCategoryListLoading from "./Loading";

export const PRODUCT_CATEGORIES_QUERY = gql`
  query (
    $locale: String
    $first: Int
    $skip: Int
    $condition: ProductCategoryWhereInput
  ) {
    allProductCategories(first: $first, skip: $skip, where: $condition) {
      # translate
      _trans: translations(where: { lang: $locale }) {
        fieldName
        content
      }
      name
      url
      id
      prioritize
      file {
        publicUrl
      }
      _childsMeta {
        count
      }
      _productsMeta {
        count
      }
      childs {
        # translate
        _trans: translations(where: { lang: $locale }) {
          fieldName
          content
        }
        file {
          publicUrl
        }
        name
        url
        id
        _childsMeta {
          count
        }
        _productsMeta {
          count
        }
        childs {
          # translate
          _trans: translations(where: { lang: $locale }) {
            fieldName
            content
          }
          file {
            publicUrl
          }
          name
          url
          id
          _childsMeta {
            count
          }
          _productsMeta {
            count
          }
          childs {
            # translate
            _trans: translations(where: { lang: $locale }) {
              fieldName
              content
            }
            file {
              publicUrl
            }
            name
            url
            id
            _childsMeta {
              count
            }
            _productsMeta {
              count
            }
          }
        }
      }
    }
  }
`;
const ProductCategoryList = ({
  first = 12,
  skip = 0,
  ProductCategoryWhereInput,
  UI,
  currentUrl,
  ...props
}) => {
  const router = useRouter();
  const { locale } = router;
  const [open, setOpen] = useState(false);
  var { data, error, loading, variables } = useQuery(PRODUCT_CATEGORIES_QUERY, {
    variables: {
      first: open ? 99 : first,
      skip,
      condition: ProductCategoryWhereInput,
      locale,
    },
  });
  data = useMemo(() => trans(data), [data]);
  if (loading || error) return <ProductCategoryListLoading />;
  const {
    query: { id: activeUrls },
  } = router;

  var categories = data?.allProductCategories?.slice()?.sort((a, b) => {
    return a.prioritize > b.prioritize ? 1 : -1;
  });
  const Render = UI ? UI : Default;
  return (
    <Fragment>
      <Render
        {...props}
        allProductCategories={categories}
        activeUrls={activeUrls}
        currentUrl={currentUrl}
        open={open}
        setOpen={setOpen}
      />
    </Fragment>
  );
};
export default ProductCategoryList;
