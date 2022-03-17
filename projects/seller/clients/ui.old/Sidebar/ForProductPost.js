import { Fragment } from "react";
import ProductCategoryList from "../Product/Category/List";
import PostHashtagList from "../Post/Hashtag/List";
import SidebarItemSimple from "./Item/Simple";
import { AiOutlineTags, AiOutlineUnorderedList } from "react-icons/ai";

export default function SidebarForProductPost() {
  return (
    <Fragment>
      <ProductCategoryList
        UI={({
          allProductCategories,
          _allProductCategoriesMeta,
          clickToggle,
          first,
        }) => (
          <SidebarItemSimple
            label="Sản phẩm"
            icon={AiOutlineUnorderedList}
            all={allProductCategories}
            _all={_allProductCategoriesMeta}
            getLink={getProductCategoryLink}
            clickToggle={clickToggle}
            first={first}
          />
        )}
      />
      <PostHashtagList
        UI={({ allPostHashtags, _allPostHashtagsMeta, clickToggle, first }) => (
          <SidebarItemSimple
            label="Bài viết"
            icon={AiOutlineTags}
            all={allPostHashtags}
            _all={_allPostHashtagsMeta}
            getLink={getProductCategoryLink}
            clickToggle={clickToggle}
            first={first}
          />
        )}
      />
    </Fragment>
  );
}
export function getProductCategoryLink(category = {}) {
  const { url } = category;
  return {
    href: url ? `/san-pham/${url}` : `/san-pham/`,
    // href: { pathname: "/san-pham/[category]", query: { category: url } },
    // as: `/san-pham/${url}`,
  };
}
export function getPostHashtagLink(hashtag = {}) {
  const { url } = hashtag;
  return {
    href: url ? `/bai-viet` : `/bai-viet/${url}`,
    // href: { pathname: "/bai-viet/[hashtag]", query: { hastag: url } },
    // as: `/bai-viet/${url}`,
  };
}
