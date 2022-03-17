import { Box, Heading, useToast, Text, Stack } from "@chakra-ui/react";
export default function useToastSimple() {
  const toast = useToast();
  return ({ title, description }) => {
    toast({
      position: "bottom",
      render: () => (
        <Stack bg="rgba(0, 0, 0, 0.8)" rounded="xl" shadow="lg" p={2}>
          {title && (
            <Heading color="white" size="sm" textAlign="center">
              {title}
            </Heading>
          )}
          {description && (
            <Text color="white" textAlign="center">
              {description}
            </Text>
          )}
        </Stack>
      ),
    });
  };
}
