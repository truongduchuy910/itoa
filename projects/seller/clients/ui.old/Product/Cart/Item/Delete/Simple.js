import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton, Spinner } from "@chakra-ui/react";

export default function ProductCartItemDeleteSimple({ clickDelete, loading }) {
  return (
    <IconButton
      icon={loading ? <Spinner size="xs" /> : <DeleteIcon />}
      size={"xs"}
      float={"right"}
      colorScheme={"brand"}
      onClick={(e) => {
        clickDelete();
      }}
      rounded="md"
    />
  );
}
