import { Button } from "@chakra-ui/button";
import { GridItem, Heading, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { Fragment, useState } from "react";

const ProductAttributeItemSimple = ({
  id,
  name,
  label,
  values,
  onChange = (current) => {},
}) => {
  const [current, setCurrent] = useState();
  return (
    <Fragment>
      <Heading size={"sm"} mb={3}>
        {label}
      </Heading>
      <Wrap mb={5} spacing={2}>
        {values?.map((value) => {
          const clickValue = (e) => {
            setCurrent(value);
            onChange(value);
          };
          return (
            <Button
              key={value.id}
              size={"sm"}
              as={WrapItem}
              isActive={current?.id === value.id}
              onClick={clickValue}
            >
              {value.value}
            </Button>
          );
        })}
      </Wrap>
    </Fragment>
  );
};
export default ProductAttributeItemSimple;
