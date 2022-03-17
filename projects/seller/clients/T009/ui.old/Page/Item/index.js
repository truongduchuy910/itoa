import { gql, useQuery } from "@apollo/client";

export const query = gql`
  query ($id: ID!) {
    Page(where: { id: $id }) {
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

      pageId
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
      pixelId
      gtag
      domain
      mode
      blocks
    }
  }
`;

export default function PageItem({ id, UI, children }) {
  if (!id) return "id required";
  const { loading, error, data = {} } = useQuery(query, { variables: { id } });
  if (loading) return "...";
  if (error) return error.message;
  const { Page: page } = data;
  return <UI page={page} /> || children({ page });
}
