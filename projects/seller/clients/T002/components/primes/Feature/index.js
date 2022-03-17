<<<<<<< HEAD
import Loading from '../../elements/Loading';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
=======
import Loading from "../../elements/Loading";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
>>>>>>> 8e151249fe35c5fd5ec0c04802df8794aff5caa7
export const FEATURES_QUERY = gql`
  query {
    allFeatures {
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
export default function Feature({ UI }) {
  const router = useRouter();
  const onclickFeature = (feature) => {
    router.push(
      `/bai-viet/chi-tiet/[...id]`,
      `/bai-viet/chi-tiet/${feature?.post?.url}`
    );
  };
  const { loading, error, data } = useQuery(FEATURES_QUERY);
  if (loading || error) return <Loading />;
  return <UI allFeatures={data.allFeatures} onclickFeature={onclickFeature} />;
}
