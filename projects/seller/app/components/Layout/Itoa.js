import { Box } from "@primer/components";
import { Header } from "@primer/components/lib/ActionList/Header";
import { Fragment } from "react";
export default function LayoutItoa({ children }) {
  return (
    <Fragment>
      {/* <Header>
        <Header.Item>Item 1</Header.Item>
        <Header.Item full border={1} borderStyle="solid">
          Item 2
        </Header.Item>
        <Header.Item mr={0}>Item 3</Header.Item>
      </Header> */}
      <Box px={5}>{children}</Box>
    </Fragment>
  );
}
