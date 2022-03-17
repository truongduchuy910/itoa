import { Button, HStack, Input, Stack } from "@chakra-ui/react";
import { createIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function CommentCreateUI({ on }) {
  const [content, setContent] = useState("");
  const changeInput = (e) => {
    const content = e.target.value;
    setContent(content);
  };
  const clickCreate = (e) => {
    on({ variables: { data: { content } } });
  };
  return (
    <HStack>
      <Input onChange={changeInput} />
      <Button leftIcon={<createIcon />} onClick={clickCreate}>
        Create
      </Button>
    </HStack>
  );
}
