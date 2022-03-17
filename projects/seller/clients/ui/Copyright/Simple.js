import { Text } from "@chakra-ui/react";
import { Fragment } from "react";

export default function CopyrightSimple() {
  return (
    <Fragment>
      <Text pt={6} fontSize={"sm"} textAlign={"center"}>
        Cung cấp bởi itoa.vn
      </Text>
      <Text fontSize={"xs"} textAlign={"center"}>
        Proudly made in 🇻🇳 Vietnamese
      </Text>
    </Fragment>
  );
}
