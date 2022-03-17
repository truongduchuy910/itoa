import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!, $data: PageUpdateInput) {
    updatePage(id: $id, data: $data) {
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

export default function PageUpdate({ UI, children, page }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { updatePage } = data;
  return (
    <UI page={page} on={on} updatePage={updatePage} /> ||
    children({ page, on, updatePage })
  );
}
