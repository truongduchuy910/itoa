import React, { Fragment } from "react";

import BannerList from "@itoa/ui/Banner/List";
import BannerListUI from "@itoa/ui/Banner/List/UI.js";
import BannerListChak from "@itoa/ui/Banner/List/Chak";
import ContactList from "@itoa/ui/Contact/List";
import ContactListUI from "@itoa/ui/Contact/List/UI.js";
import FAQList from "@itoa/ui/FAQ/List";
import FAQListUI from "@itoa/ui/FAQ/List/UI.js";
import FeatureList from "@itoa/ui/Feature/List";
import FeatureListUI from "@itoa/ui/Feature/List/UI.js";
import PageList from "@itoa/ui/Page/List";
import PageListUI from "@itoa/ui/Page/List/UI.js";
import PostHashtagList from "@itoa/ui/Post/Hashtag/List";
import PostHashtagListUI from "@itoa/ui/Post/Hashtag/List/UI.js";
import PostList from "@itoa/ui/Post/List";
import PostListUI from "@itoa/ui/Post/List/UI.js";
import ProductAttributeValueList from "@itoa/ui/Product/Attribute/Value/List";
import ProductAttributeValueListUI from "@itoa/ui/Product/Attribute/Value/List/UI.js";
import ProductAttributeList from "@itoa/ui/Product/Attribute/List";
import ProductAttributeListUI from "@itoa/ui/Product/Attribute/List/UI.js";
import ProductBrandList from "@itoa/ui/Product/Brand/List";
import ProductBrandListUI from "@itoa/ui/Product/Brand/List/UI.js";
import ProductCategoryList from "@itoa/ui/Product/Category/List";
import ProductCategoryListUI from "@itoa/ui/Product/Category/List/UI.js";
import ProductDiscountList from "@itoa/ui/Product/Discount/List";
import ProductDiscountListUI from "@itoa/ui/Product/Discount/List/UI.js";
import ProductHashtagList from "@itoa/ui/Product/Hashtag/List";
import ProductHashtagListUI from "@itoa/ui/Product/Hashtag/List/UI.js";
import ProductOrderStatusList from "@itoa/ui/Product/Order/Status/List";
import ProductOrderStatusListUI from "@itoa/ui/Product/Order/Status/List/UI.js";
import ProductOrderList from "@itoa/ui/Product/Order/List";
import ProductOrderListUI from "@itoa/ui/Product/Order/List/UI.js";
import ProductStockList from "@itoa/ui/Product/Stock/List";
import ProductStockListUI from "@itoa/ui/Product/Stock/List/UI.js";
import ProductList from "@itoa/ui/Product/List";
import ProductListUI from "@itoa/ui/Product/List/UI.js";
import ServiceList from "@itoa/ui/Service/List";
import ServiceListUI from "@itoa/ui/Service/List/UI.js";
import TeamList from "@itoa/ui/Team/List";
import TeamListUI from "@itoa/ui/Team/List/UI.js";
import TestimonialList from "@itoa/ui/Testimonial/List";
import TestimonialListUI from "@itoa/ui/Testimonial/List/UI.js";

export default function TestComponents() {
  return (
    <Fragment>
      <h5>Banner</h5>
      <BannerList UI={BannerListUI} />
      <BannerList UI={BannerListChak} />
      <h5>Contact</h5>
      <ContactList UI={ContactListUI} />
      <h5>FAQ</h5>
      <FAQList UI={FAQListUI} />
      <h5>Feature</h5>
      <FeatureList UI={FeatureListUI} />
      <h5>Page</h5>
      <PageList UI={PageListUI} />
      <h5>PostHashtag</h5>
      <PostHashtagList UI={PostHashtagListUI} />
      <h5>Post</h5>
      <PostList UI={PostListUI} />
      <h5>ProductAttributeValue</h5>
      <ProductAttributeValueList UI={ProductAttributeValueListUI} />
      <h5>ProductAttribute</h5>
      <ProductAttributeList UI={ProductAttributeListUI} />
      <h5>ProductBrand</h5>
      <ProductBrandList UI={ProductBrandListUI} />
      <h5>ProductCategory</h5>
      <ProductCategoryList UI={ProductCategoryListUI} />
      <h5>ProductDiscount</h5>
      <ProductDiscountList UI={ProductDiscountListUI} />
      <h5>ProductHashtag</h5>
      <ProductHashtagList UI={ProductHashtagListUI} />
      <h5>ProductOrderStatus</h5>
      <ProductOrderStatusList UI={ProductOrderStatusListUI} />
      <h5>ProductOrder</h5>
      <ProductOrderList UI={ProductOrderListUI} />
      <h5>ProductStock</h5>
      <ProductStockList UI={ProductStockListUI} />
      <h5>Product</h5>
      <ProductList UI={ProductListUI} />
      <h5>Service</h5>
      <ServiceList UI={ServiceListUI} />
      <h5>Team</h5>
      <TeamList UI={TeamListUI} />
      <h5>Testimonial</h5>
      <TestimonialList UI={TestimonialListUI} />
    </Fragment>
  );
}
