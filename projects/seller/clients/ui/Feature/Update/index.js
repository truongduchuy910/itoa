import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: FeatureUpdateInput) {
    updateFeature(id: $id, data: $data) {
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

export default function FeatureUpdate({ UI, children, feature }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateFeature } = data;
  return (
    <UI feature={feature} on={on} updateFeature={updateFeature} /> ||
    children({ feature, on, updateFeature })
  );
}
