import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: BannerUpdateInput) {
    updateBanner(id: $id, data: $data) {
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

export default function BannerUpdate({ UI, children, banner }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updateBanner } = data;
  return (
    <UI banner={banner} on={on} updateBanner={updateBanner} /> ||
    children({ banner, on, updateBanner })
  );
}
