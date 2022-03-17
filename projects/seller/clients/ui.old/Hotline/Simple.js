import { Button, Link, useBreakpointValue, IconButton } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import Translate from "../Translate";
import { Fragment } from "react";

export default function HotlineSimple({ page = {} }) {
  return (
    <Fragment>
      <Link href={`tel:${page.phone}`}>
        <Button
          display={{ base: "none", md: "inline" }}
          href={`tel:${page.phone}`}
          leftIcon={<PhoneIcon />}
          colorScheme="brand"
        >
          <Translate content="Gọi ngay" />
        </Button>
        <IconButton
          display={{ base: "inline-block", md: "none" }}
          icon={<PhoneIcon />}
          colorScheme="brand"
          isRound
          rounded="full"
        ></IconButton>
      </Link>
    </Fragment>
  );
}
