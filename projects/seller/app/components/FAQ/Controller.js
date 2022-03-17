import { gql, useQuery } from "@apollo/client";
export const FAQS_QUERY = gql`
  query FAQ($first: Int, $skip: Int, $FAQWhereInput: FAQWhereInput) {
    allFAQS(first: $first, skip: $skip, where: $FAQWhereInput) {
      id
      title
      body
    }
  }
`;
const FAQ = ({ UI, first, skip, FAQWhereInput }) => {
  const {
    loading,
    error,
    data = {},
  } = useQuery(FAQS_QUERY, {
    variables: {
      first,
      skip,
      FAQWhereInput,
    },
  });
  const { allFAQS = [] } = data;
  return <UI error={error} loading={loading} allFAQS={allFAQS} />;
};
export default FAQ;
