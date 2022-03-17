import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading } from "components/misc/Headings.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";

const Row = tw.div`flex flex-col lg:flex-row -mb-10`;
const Heading = tw(SectionHeading)`text-left lg:text-4xl xl:text-5xl`;

const PopularPostsContainer = tw.div`lg:w-2/3`;
const PostsContainer = tw.div`mt-12 flex flex-col sm:flex-row sm:justify-between lg:justify-start`;
const Post = tw(
  motion.a
)`block sm:max-w-sm cursor-pointer mb-16 last:mb-0 sm:mb-0 sm:odd:mr-8 lg:mr-8 xl:mr-16`;
const Image = styled(motion.div)((props) => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-64 bg-cover bg-no-repeat bg-center rounded`,
]);
const Title = tw.h5`mt-6 text-xl font-bold transition duration-300 group-hover:text-primary-500`;
const Description = tw.p`mt-2 font-medium text-secondary-100 leading-loose text-sm`;
const AuthorInfo = tw.div`mt-6 flex items-center`;
const AuthorImage = tw.img`w-12 h-12 rounded-full`;
const AuthorNameAndProfession = tw.div`ml-4`;
const AuthorName = tw.h6`font-semibold text-lg`;
const AuthorProfile = tw.p`text-secondary-100 text-sm`;

const RecentPostsContainer = styled.div`
  ${tw`mt-24 lg:mt-0 lg:w-1/3`}
  ${PostsContainer} {
    ${tw`flex flex-wrap lg:flex-col`}
  }
  ${Post} {
    ${tw`flex justify-between mb-10 max-w-none w-full sm:w-1/2 lg:w-auto sm:odd:pr-12 lg:odd:pr-0 mr-0`}
  }
  ${Title} {
    ${tw`text-base xl:text-lg mt-0 mr-4 lg:max-w-xs`}
  }
  ${AuthorName} {
    ${tw`mt-3 text-sm text-secondary-100 font-normal leading-none`}
  }
  ${Image} {
    ${tw`h-20 w-20 flex-shrink-0`}
  }
`;
const PostTextContainer = tw.div``;

export default ({ allPosts, variants: { title = `Bài viết mới` } }) => {
  // This setting is for animating the post background image on hover
  const postBackgroundSizeAnimation = {
    rest: {
      backgroundSize: "100%",
    },
    hover: {
      backgroundSize: "110%",
    },
  };

  //Recommended: Only 2 Items
  const popularPosts = allPosts?.slice(0, 2).map((post) => {
    return {
      postImageSrc: "https://ecom.itoa.vn" + post?.thumbnail?.publicUrl,
      authorImageSrc: "https://ecom.itoa.vn" + post?.thumbnail?.publicUrl,
      title: post.title,
      description: post.description,
      authorName: "Charlotte Delos",
      authorProfile: "Travel Advocate",
      url:
        "/bai-viet/" +
        (post.hashtags?.length ? post.hashtags[0]?.url + "/" : "_/") +
        post.url,
      updatedAt: post.updatedAt,
    };
  });

  const recentPosts = allPosts?.slice(2).map((post) => {
    return {
      postImageSrc: "https://ecom.itoa.vn" + post?.thumbnail?.publicUrl,
      title: post.title,
      authorName: post.description?.slice(0, 40) + "...",
      url:
        "/bai-viet/" +
        (post.hashtags?.length ? post.hashtags[0]?.url + "/" : "_/") +
        post.url,
    };
  });
  return (
    <Container>
      <ContentWithPaddingXl>
        <Row>
          <PopularPostsContainer>
            <Heading>{title}.</Heading>
            <PostsContainer>
              {popularPosts?.length ? (
                popularPosts.map((post, index) => (
                  <Post
                    key={index}
                    href={post.url}
                    className="group"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <Image
                      transition={{ duration: 0.3 }}
                      variants={postBackgroundSizeAnimation}
                      imageSrc={post.postImageSrc}
                    />
                    <Title>{post.title}</Title>
                    <Description>{post.description.slice(0, 80)}</Description>
                    {new Date(post.updatedAt).toLocaleString()}
                    {/* <AuthorInfo>
                    <AuthorImage src={post.authorImageSrc} />
                    <AuthorNameAndProfession>
                      <AuthorName>{post.authorName}</AuthorName>
                      <AuthorProfile>{post.authorProfile}</AuthorProfile>
                    </AuthorNameAndProfession>
                  </AuthorInfo> */}
                  </Post>
                ))
              ) : (
                <p>Không có kết quả...</p>
              )}
            </PostsContainer>
          </PopularPostsContainer>
          <RecentPostsContainer>
            <Heading>Xem thêm.</Heading>
            <PostsContainer>
              {recentPosts.map((post, index) => (
                <Post key={index} href={post.url} className="group">
                  <PostTextContainer>
                    <Title>{post.title}</Title>
                    <AuthorName>{post.authorName}</AuthorName>
                  </PostTextContainer>
                  <Image imageSrc={post.postImageSrc} />
                </Post>
              ))}
            </PostsContainer>
          </RecentPostsContainer>
        </Row>
      </ContentWithPaddingXl>
    </Container>
  );
};
