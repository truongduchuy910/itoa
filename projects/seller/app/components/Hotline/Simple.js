import { Button, Link, useBreakpointValue, IconButton } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import Translate from "../Translate";
import { Fragment } from "react";
import Controller from './Controller'

export default function HotlineSimple({
  page = {},
  withPhone = false,
  ...props
}) {
  return (
    <Fragment>
      <Link href={`tel:${page.phone}`}>
        <Button
          {...props}
          display={{ base: "none", md: "inline" }}
          href={`tel:${page.phone}`}
          leftIcon={<PhoneIcon />}
          colorScheme="brand"
        >
          {!withPhone && <Translate content="Gọi ngay" />}
          {withPhone && page.phone}
        </Button>
        <IconButton
          {...props}
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
