import { Container, Divider, Input, Text } from "@chakra-ui/react";
import { ColorPalettes } from "@itoa/ui/Page/Item/ColorPalette";
import { useState } from "react";
export default function Brand() {
  const [text, setText] = useState("");
  return (
    <Container maxW="container.xl" minH="60vh">
      <ColorPalettes color="brand" />
      <Input
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Divider w={200} my={2} />
      <Text
        textTransform="uppercase"
        fontSize={`${(200 * 1.5) / text.length}px`}
      >
        {text}
      </Text>
    </Container>
  );
}
