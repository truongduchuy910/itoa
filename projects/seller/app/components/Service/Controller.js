import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
const SERVICES_QUERY = gql`
  query Service(
    $first: Int
    $skip: Int
    $serviceWhereInput: ServiceWhereInput
  ) {
    allServices(first: $first, skip: $skip, where: $serviceWhereInput) {
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
const Service = ({ UI, serviceWhereInput, first, skip }) => {
  const router = useRouter();
  const onClickService = (service) => {
    router.push(
      `/bai-viet/chi-tiet/[...id]`,
      `/bai-viet/chi-tiet/${service?.post?.url}`
    );
  };
  const {
    loading,
    error,
    data = {},
  } = useQuery(SERVICES_QUERY, {
    variables: {
      first,
      skip,
      serviceWhereInput,
    },
  });
  const { allServices } = data;
  return (
    <UI
      error={error}
      loading={loading}
      allServices={allServices}
      onClickService={onClickService}
    />
  );
};

export default Service;
