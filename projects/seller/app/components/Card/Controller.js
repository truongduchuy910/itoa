import { Box, useStyleConfig } from "@chakra-ui/react";

export default function Card(props) {
  const { children, variant, ...rest } = props;

  const styles = useStyleConfig("Card", { variant });

  return (
    <Box __css={styles} {...rest}>
      {children}
    </Box>
  );
}
