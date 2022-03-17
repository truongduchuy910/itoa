import { gql, useQuery } from "@apollo/client";
import React from "react";
import Light from "./light";

const Headers = ({ UI }) => {
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
  const Render = UI ? UI : Light;
  return <Render page={page || {}} allPostHashtags={allPostHashtags} />;
};
export default Headers;
