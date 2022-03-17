import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: BannerCreateInput) {
    createBanner(data: $data) {
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

export default function BannerCreate({ UI, children, banner }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createBanner } = data;
  return (
    <UI banner={banner} on={on} createBanner={createBanner} /> ||
    children({ banner, on, createBanner })
  );
}
