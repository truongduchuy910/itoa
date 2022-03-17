import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import Header, {
  LogoLink,
  NavLinks,
  NavLink as NavLinkBase,
} from "../headers/light.js";
import { Link } from "react-router-dom";

const StyledHeader = styled(Header)`
  ${tw`justify-between`}
  ${LogoLink} {
    ${tw`mr-8 pb-0`}
  }
`;

const NavLink = tw(NavLinkBase)`
  sm:text-sm sm:mx-6
`;

const Container = tw.div`relative -mx-8 -mt-8`;
const TwoColumn = tw.div`flex flex-col lg:flex-row bg-gray-100`;
const LeftColumn = tw.div`ml-8 mr-8 xl:pl-10 py-8`;

const Content = tw.div`mt-24 lg:mt-24 lg:mb-24 flex flex-col sm:items-center lg:items-stretch`;
const Heading = tw.h1`text-3xl sm:text-5xl md:text-6xl lg:text-5xl font-black leading-none`;
const Paragraph = tw.p`max-w-md my-8 lg:my-5 lg:my-8 sm:text-lg lg:text-base xl:text-lg leading-loose`;

const Actions = styled.div`
  ${tw`mb-8 lg:mb-0`}
  .action {
    ${tw`text-center inline-block w-full sm:w-48 py-4 font-semibold tracking-wide rounded hocus:outline-none focus:shadow-outline transition duration-300`}
  }
  .primaryAction {
    ${tw`bg-primary-500 text-gray-100 hover:bg-primary-700`}
  }
  .secondaryAction {
    ${tw`mt-4 sm:mt-0 sm:ml-4 bg-gray-300 text-gray-700 hover:bg-gray-400 hover:text-gray-800`}
  }
`;

export default ({
  page: { store, slogan, intro, phone, logo },
  allPostHashtags,
  allBanners: banners,
  primaryActionText = "Gọi ngay",
  secondaryActionUrl = "#",
  secondaryActionText = "Search Hotels",
}) => {
  const items = allPostHashtags?.map((hashtag) => {
    return (
      <NavLink href={`/bai-viet/${hashtag.url}`} key={hashtag.id}>
        {hashtag.name}
      </NavLink>
    );
  });
  const navLinks = <NavLinks key={1}>{items}</NavLinks>;

  const primaryActionUrl = `tel:${phone}`;
  const description = intro;
  const heading = (
    <>
      {slogan}
      <wbr />
      <br />
      <span tw="text-primary-500">{store}.</span>
    </>
  );
  const logoLink = (
    <LogoLink href="/">
      <img src={`https://ecom.itoa.vn` + logo?.publicUrl} alt="logo" />
      {/* {store} */}
    </LogoLink>
  );
  console.log(banners);
  const RightColumn = banners
    ? styled.div`
        background-image: url("${"https://ecom.itoa.vn"}${banners[0]?.image
          ?.publicUrl}");
        ${tw`bg-green-500 bg-cover bg-left xl:ml-24 h-96 lg:h-auto lg:w-1/2 lg:flex-1`}
      `
    : false;
  return (
    <Container>
      <TwoColumn>
        <LeftColumn>
          <StyledHeader
            links={navLinks}
            collapseBreakpointClass="sm"
            logoLink={logoLink}
          />
          <Content>
            <Heading>{heading}</Heading>
            <Paragraph>{description}</Paragraph>
            <Actions>
              <a href={primaryActionUrl} className="action primaryAction">
                {primaryActionText}
              </a>
              {/* <a href={secondaryActionUrl} className="action secondaryAction">
                {secondaryActionText}
              </a> */}
            </Actions>
          </Content>
        </LeftColumn>
        <RightColumn></RightColumn>
      </TwoColumn>
    </Container>
  );
};
