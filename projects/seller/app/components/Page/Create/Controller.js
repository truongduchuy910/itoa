import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation($data: PageCreateInput) {
    createPage(data: $data) {
      id
      logo {
        publicUrl
      }
      store
      slogan
      address
      intro
      phone
      email
      contact
      twitter
      instagram
      pinterest
      youtube
      googlePlus
      googleMap
      zalo
      embed
      transfer
      shipMoneySupport
      ship
      pageId
      pixelId
      gtag
      mode
      blocks
    }
  }
`;

export default function PageCreate({ UI, children, page }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { createPage } = data;
  return (
    <UI page={page} on={on} createPage={createPage} /> ||
    children({ page, on, createPage })
  );
}
