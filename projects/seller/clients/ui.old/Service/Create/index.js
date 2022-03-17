import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: ServiceCreateInput) {
    createService(data: $data) {
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

export default function ServiceCreate({ UI, children, service }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createService } = data;
  return (
    <UI service={service} on={on} createService={createService} /> ||
    children({ service, on, createService })
  );
}
