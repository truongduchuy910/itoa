import { gql, useQuery } from "@apollo/client";
import React from "react";
import FullWidthWithImage from "./FullWidthWithImage";

const Hero = ({ UI }) => {
  const { loading, error, data } = useQuery(gql`
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
      }
      allBanners {
        image {
          publicUrl
        }
      }
      allPostHashtags {
        id
        name
        url
      }
    }
  `);

  if (loading) return "Loading...";
  if (error) return JSON.stringify(error);
  const {
    allPages: [page],
    allPostHashtags,
    allBanners,
  } = data;
  const Render = UI ? UI : FullWidthWithImage;
  return (
    <Render
      page={page}
      allPostHashtags={allPostHashtags}
      allBanners={allBanners}
    />
  );
};
export default Hero;
