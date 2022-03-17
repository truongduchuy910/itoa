import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deleteBanner(id: $id) {
      id
      name
      slogan
      image {
        publicUrl
      }
      description
      url
    }
  }
`;

export default function BannerDelete({ UI, children, banner }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deleteBanner } = data;
  return (
    <UI banner={banner} on={on} deleteBanner={deleteBanner} /> ||
    children({ banner, on, deleteBanner })
  );
}
