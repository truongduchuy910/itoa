import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { IconButton, Spinner, Text } from "@chakra-ui/react";
import { Fragment } from "react";

export default function ProductCartItemUpdateSimple({
  onClickRemove,
  clickMinus,
  quantity,
  clickPlus,
  loading,
  delay,
}) {
  return (
    <Fragment>
      <IconButton
        icon={<MinusIcon />}
        size={"xs"}
        onClick={clickMinus}
        rounded="md"
      />

      {loading ? (
        <Spinner size="xs" mx={1} />
      ) : (
        <Text mx={2} display={"inline-block"}>
          {quantity}
        </Text>
      )}

      <IconButton
        icon={<AddIcon />}
        size={"xs"}
        onClick={clickPlus}
        rounded="md"
      />
      {delay && !loading && <Spinner size="xs" mx={2} />}
    </Fragment>
  );
}
