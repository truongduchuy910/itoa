import React from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Avatar,
  InputRightElement,
} from "@chakra-ui/react";
import Picker from "emoji-picker-react";
import { CheckIcon } from "@chakra-ui/icons";

export default function App() {
  const [chosenEmoji, setChosenEmoji] = React.useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };
  const [click, setClick] = React.useState(false);
  const handleClickEmoj = () => setClick(!click);
  return (
    <InputGroup d="flex" alignItems="center">
      <Avatar name="Dan Abrahmov" mr="2" src="https://bit.ly/dan-abramov" />
      <Input
        borderRadius="50"
        type="email"
        placeholder="Email Address"
        value={chosenEmoji.emoji}
      />
      <InputRightElement mt="1" width="3rem">
        <Button
          borderRadius="50"
          size="sm"
          bg="transparent"
          onClick={handleClickEmoj}
        >
          {click ? (
            <Box pos="absolute" right="0" top="38">
              <Picker onEmojiClick={onEmojiClick} />
            </Box>
          ) : (
            <CheckIcon />
          )}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
}
