import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteFeature(id: $id) {
      id
      name
      image {
        publicUrl
      }
      description
      content
    }
  }
`;

export default function FeatureDelete({ UI, children, feature }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteFeature } = data;
  return (
    <UI feature={feature} on={on} deleteFeature={deleteFeature} /> ||
    children({ feature, on, deleteFeature })
  );
}
