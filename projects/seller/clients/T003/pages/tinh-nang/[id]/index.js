import { useRouter } from "next/router";
import PostList from "@itoa/ui/Post/List";
import FeatureList from "@itoa/ui/Feature/List";
import PostListChak from "@itoa/ui/Post/List/Chak";
import PostItemChak from "@itoa/ui/Post/Item/Chak";
import { Container } from "@chakra-ui/react";

const Post = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  return (
    <Container maxW="container.xl">
      <FeatureList
        UI={({ allFeatures, _allFeaturesMeta, clickMore }) => {
          const [feature] = allFeatures;
          const post = {
            ...feature,
            body: feature.content,
            thumbnail: feature.image,
            title: feature.name,
          };
          return <PostItemChak post={post} />;
        }}
        where={{ id }}
      />
      <PostList UI={PostListChak} PostWhereInput={{ id: id }} />
    </Container>
  );
};
export default Post;
