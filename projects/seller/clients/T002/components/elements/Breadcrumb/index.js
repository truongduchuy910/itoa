import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Loading from "../Loading";
const Breadcrumb = ({ UI, items = [] }) => {
  const router = useRouter();
  const onClickItem = (item) => {
    router.push(item.href);
  };
  return <UI items={items} onClickItem={onClickItem} />;
};
export default Breadcrumb;
