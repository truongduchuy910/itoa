import { Container, Heading } from '@chakra-ui/layout';
import { useRouter } from 'next/router';
import React, { Fragment, useContext, useState } from 'react';
import Posts from '../../../components/primes/Post/List';
import PostsChak from '../../../components/primes/Post/List/Chak';
import Breadcrumb from '../../../components/elements/Breadcrumb';
import BreadcrumbChak from '../../../components/elements/Breadcrumb/Chak';
import { gql, useQuery } from '@apollo/client';
import Loading from '../../../components/elements/Loading';
const Categories = () => {
  const router = useRouter();
  const {
    query: { hashtag: activeUrls },
  } = router;
  const { loading, error, data, previousData } = useQuery(
    gql`
      query ($hashtag: PostHashtagWhereInput) {
        allPostHashtags(where: $hashtag) {
          id
          name
          url
        }
      }
    `,
    { variables: { hashtag: { url_in: activeUrls } } }
  );
  if (loading || error) return <Loading />;
  const { allPostHashtags } = data || previousData;
  const [hashtag] = allPostHashtags;
  return (
    <Fragment>
      <Container maxW={'7xl'} p={12}>
        <Heading as="h1">Bài viết</Heading>
        <Breadcrumb
          UI={BreadcrumbChak}
          items={[
            { label: 'Trang chủ', href: '/' },
            {
              label: 'Chủ đề',
              href: '/chu-de',
            },
            { label: hashtag?.name, isCurrentPage: true },
          ]}
        />
      </Container>

      <Posts UI={PostsChak} PostWhereInput={{ hashtags_some: { url_in: activeUrls } }} />
    </Fragment>
  );
};

export default Categories;
