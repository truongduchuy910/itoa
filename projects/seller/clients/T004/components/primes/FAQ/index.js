import { gql, useQuery } from "@apollo/client";
import Loading from "../../elements/Loading";
export const FAQS_QUERY = gql`
  query {
    allFAQS {
      id
      title
      body
    }
  }
`;
const FAQ = ({ UI }) => {
  const { loading, error, data = {} } = useQuery(FAQS_QUERY);
  const { allFAQS = {} } = data;
  if (loading || error) return <Loading />;
  return <UI allFAQS={allFAQS} />;
};
export default FAQ;
