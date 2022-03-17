import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Loading from "../../elements/Loading";
const SERVICES_QUERY = gql`
  query {
    allServices {
      id
      name
      image {
        publicUrl
      }
      description
      post {
        url
      }
    }
  }
`;
const Service = ({ UI }) => {
  const router = useRouter();
  const onClickService = (service) => {
    router.push(
      `/bai-viet/chi-tiet/[...id]`,
      `/bai-viet/chi-tiet/${service?.post?.url}`
    );
  };
  const { loading, error, data } = useQuery(SERVICES_QUERY);
  if (loading || error) return <Loading />;
  const { allServices } = data;
  return <UI allServices={allServices} onClickService={onClickService} />;
};

export default Service;
