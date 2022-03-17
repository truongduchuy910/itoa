import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

export const query = gql`
  query ($id: ID!) {
    ProductAttributeValue(where: { id: $id }) {
      id
      value
      file {
        publicUrl
      }
    }
  }
`;

export default function ProductAttributeValueItem({ id, UI, children }) {
  const router = useRouter();
  const { locale } = router;
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { ProductAttributeValue: productattributevalue } = data;
  return (
    <UI productattributevalue={productattributevalue} /> ||
    children({ productattributevalue })
  );
}
