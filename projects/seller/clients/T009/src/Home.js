import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import Hero from "./components/hero";
import PopularAndRecentBlogPosts from "components/blogs/PopularAndRecentBlogPosts.js";
import Blogs from "./components/blogs";
import GridWithFeaturedPost from "./components/blogs/GridWithFeaturedPost";

export default () => (
  <AnimationRevealPage>
    <Hero />
    <Blogs UI={PopularAndRecentBlogPosts} first={7} sortBy="updatedAt_DESC" />
    <Blogs UI={GridWithFeaturedPost} first={5} skip={7} />
  </AnimationRevealPage>
);
