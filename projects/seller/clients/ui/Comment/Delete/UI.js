import { Link, HStack, Input, Stack } from "@chakra-ui/react";
import { createIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function CommentDeleteUI({clickDelete }) {
  return (
    <HStack>
      <Link leftIcon={<updateIcon />} onClick={clickDelete}>
        Delete
      </Link>
    </HStack>
  );
}