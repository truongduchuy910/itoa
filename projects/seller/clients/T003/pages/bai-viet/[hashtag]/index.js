import { Container, Heading } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import React, { Fragment, useContext, useState } from "react";
import Posts from "@itoa/ui/Post/List";
import PostsChak from "@itoa/ui/Post/List/Chak";
// import Breadcrumb from "@itoa/ui/Breadcrumb";
// import BreadcrumbChak from "@itoa/ui/Breadcrumb/Chak";
import { gql, useQuery } from "@apollo/client";
import Translate from "@itoa/ui/Translate";
// import Loading from "@itoa/ui/Loading";
const Categories = () => {
  const router = useRouter();
  const {
    query: { hashtag: activeUrls },
  } = router;
  const {
    loading,
    error,
    data = {},
    previousData = {},
  } = useQuery(
    gql`
      query ($hashtag: PostHashtagWhereInput) {
        allPostHashtags(where: $hashtag) {
          id
          name
          url
        }
      }
    `,
    { variables: { hashtag: { url_in: activeUrls } } },
  );
  // if (loading || error) return <Loading />;
  const { allPostHashtags = [] } = data || previousData;
  const [hashtag] = allPostHashtags;
  return (
    <Fragment>
      <Container maxW={"container.xl"}>
        <Heading as="h1">
          <Translate content="Bài viết" />
        </Heading>
        {/* <Breadcrumb
          UI={BreadcrumbChak}
          items={[
            { label: "Trang chủ", href: "/" },
            {
              label: "Chủ đề",
              href: "/chu-de",
            },
            { label: hashtag?.name, isCurrentPage: true },
          ]}
        /> */}

        <Posts
          UI={PostsChak}
          PostWhereInput={{ hashtags_some: { url_in: activeUrls } }}
        />
      </Container>
    </Fragment>
  );
};

export default Categories;
