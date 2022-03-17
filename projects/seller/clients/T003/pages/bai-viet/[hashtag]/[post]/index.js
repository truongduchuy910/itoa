import { useRouter } from "next/router";
import Posts, { POST_QUERY } from "@itoa/ui/Post/Item";
import PostsChak from "@itoa/ui/Post/Item/Chak";
import { Container } from "@chakra-ui/react";
// import {
//   addApolloState,
//   initializeApollo,
// } from "../../../../components/state/apollo";
export default function Post() {
  const router = useRouter();
  const {
    query: { post, hashtag },
  } = router;
  return (
    <Container maxW="container.xl">
      <Posts UI={PostsChak} PostWhereInput={{ url: post }} />
    </Container>
  );
}
// export async function getServerSideProps(context) {
//   const { headers } = context.req ?? { host: window.location.host };
//   const {
//     query: { post },
//   } = context;
//   const apolloClient = initializeApollo(null, headers);
//   await apolloClient.query({
//     query: POST_QUERY,
//     variables: {
//       condition: { url: post },
//     },
//   });
//   return addApolloState(apolloClient);
// }
// export default Post;
