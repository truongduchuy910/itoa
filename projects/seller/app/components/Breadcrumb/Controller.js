import { useRouter } from "next/router";
const Breadcrumb = ({ UI, items = [] }) => {
  const router = useRouter();
  const onClickItem = (item) => {
    router.push(item.href);
  };
  return <UI items={items} onClickItem={onClickItem} />;
};
export default Breadcrumb;
