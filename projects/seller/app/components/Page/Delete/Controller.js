import { gql, useMutation } from "@apollo/client";

export const mutation = gql`
  mutation ($id: ID!) {
    deletePage(id: $id) {
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
      facebook
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

export default function PageDelete({ UI, children, page }) {
  const [on, { loading, error, data = {} }] = useMutation(mutation);
  if (loading) return "...";
  if (error) return error.message;
  const { deletePage } = data;
  return (
    <UI page={page} on={on} deletePage={deletePage} /> ||
    children({ page, on, deletePage })
  );
}
