import React from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, MoonIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/react";
const Comment = () => {
  return (
    <>
      <InputGroup size="sm">
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" mr="2" />
        <Input placeholder="Viết bình luận..." borderRadius="50" />
        <InputRightElement width="5.5rem">
          <MoonIcon w={4} h={4} m="1" color="yellow.500" />
          <CheckIcon w={4} h={4} m="1" color="green.500" />
          <DeleteIcon w={4} h={4} m="1" color="black.500" />
        </InputRightElement>
      </InputGroup>
    </>
  );
};
