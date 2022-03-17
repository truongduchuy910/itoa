import { Box, Heading, Stack } from "@chakra-ui/react";
import Card from "../../Card";
import Field from "../../Field";

export default function TitleOnly({ post = {} }) {
  return (
    <Card variant="dark">
      <Heading mb={6}>{post?.title}</Heading>
      <Box textAlign="justify">
        <Field>{post?.content}</Field>
      </Box>
    </Card>
  );
}
