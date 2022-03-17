import { Link, HStack, Input, Stack } from "@chakra-ui/react";
import { createIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function CommentUpdateUI({ changeInput, clickUpdate, comment }) {
  return (
    <HStack>
      <Input defaultValue={comment.content} onChange={changeInput} />
      <Link leftIcon={<updateIcon />} onClick={clickUpdate}>
        Update
      </Link>
    </HStack>
  );
}
