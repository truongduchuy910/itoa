import { gql, useQuery } from '@apollo/client';
import Loading from '../../../Loading';
export const POSTHASHTAGS_QUERY = gql`
  query ($condition: PostHashtagWhereInput) {
    allPostHashtags(where: $condition) {
      id
      name
      url
    }
  }
`;
const PostHashtag = ({ PostHashtagWhereInput, UI }) => {
  const { data, error, loading } = useQuery(POSTHASHTAGS_QUERY, {
    variables: { condition: PostHashtagWhereInput },
  });
  if (loading || error) return <Loading />;
  const { allPostHashtags } = data;
  return <UI allPostHashtags={allPostHashtags} />;
};
export default PostHashtag;
