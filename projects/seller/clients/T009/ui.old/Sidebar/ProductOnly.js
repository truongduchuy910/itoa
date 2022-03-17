import ProductCategoryList from "../Product/Category/List";

export default function SidebarForProductOnly() {
  return <ProductCategoryList UI={UI} />;
}
function UI() {
  return "ok";
}
