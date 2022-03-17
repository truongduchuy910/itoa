import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteService(id: $id) {
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

export default function ServiceDelete({ UI, children, service }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteService } = data;
  return (
    <UI service={service} on={on} deleteService={deleteService} /> ||
    children({ service, on, deleteService })
  );
}
