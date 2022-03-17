import { Text, Link } from "@chakra-ui/react";
import { Fragment } from "react";

export default function CopyrightSimple() {
  return (
    <Fragment>
      <Text fontSize={12} textAlign="center">
        <Link href="https://itoa.vn">
          Proudly made in 🇻🇳 Vietnamese by itoa.vn.
        </Link>{" "}
        <Link href="https://www.freepik.com/photos/food">
          Photo created by lifeforstock - www.freepik.com
        </Link>
      </Text>
    </Fragment>
  );
}
