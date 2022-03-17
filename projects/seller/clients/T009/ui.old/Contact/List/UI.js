import {
  Box,
  SimpleGrid,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorMode,
  LinkBox,
  Button,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";

export default function ContactListUI({
  allContacts,
  _allContactsMeta,
  clickMore,
}) {
  return (
    <SimpleGrid
      columns={{ base: 2, md: 2, lg: 3 }}
      gap={{ base: 2, md: 2, lg: 3 }}
    >
      {allContacts.map((contact) => {
        return <Ma id={contact.id} contact={contact} />;
      })}
    </SimpleGrid>
  );
}

const Ma = ({ contact }) => {
  const { id, phone, name, address, email, message, isDefault } = contact;

  return (
    <Flex
      direction="column"
      borderWidth="1px"
      borderColor="gray.300"
      p={2}
      pos="relative"
      shadow="md"
    >
      <Box>
        <Text fontSize="xs" fontWeight="bold" mb={2}>
          {name}
        </Text>
        <Text color="gray.500">{phone}</Text>
        <Text fontSize="xs">{address}</Text>
      </Box>
      <Spacer />
      <Box mt={1}>
        <Button rounded="none" variant="solid" size="xs" colorScheme="brand">
          Chọn
        </Button>
      </Box>
    </Flex>
  );
};
