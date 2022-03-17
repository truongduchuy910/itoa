import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: ServiceUpdateInput) {
    updateService(id: $id, data: $data) {
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

export default function ServiceUpdate({ UI, children, service }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateService } = data;
  return (
    <UI service={service} on={on} updateService={updateService} /> ||
    children({ service, on, updateService })
  );
}
