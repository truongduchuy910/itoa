import { gql, useQuery } from "@apollo/client";
import React, { Fragment } from "react";
import MiniCenteredFooter from "./MiniCenteredFooter";

const Footer = ({ UI }) => {
  const { loading, error, data, previousData } = useQuery(gql`
    query {
      allPages {
        store
        slogan
        intro
        phone
        address
        logo {
          publicUrl
        }
        intro
        banners {
          image {
            publicUrl
          }
        }
      }
      allPostHashtags {
        id
        name
        url
      }
    }
  `);

  if ((loading || error) && !previousData) return "";
  const {
    allPages: [page],
    allPostHashtags,
  } = data || previousData;
  const Render = UI ? UI : MiniCenteredFooter;
  return (
    <Fragment>
      <Render page={page} allPostHashtags={allPostHashtags} />
      <title>
        {page.store} | {page.slogan}
      </title>
    </Fragment>
  );
};
export default Footer;
