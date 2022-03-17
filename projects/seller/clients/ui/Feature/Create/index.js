import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($data: FeatureCreateInput) {
    createFeature(data: $data) {
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

export default function FeatureCreate({ UI, children, feature }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createFeature } = data;
  return (
    <UI feature={feature} on={on} createFeature={createFeature} /> ||
    children({ feature, on, createFeature })
  );
}
