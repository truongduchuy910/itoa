import {
  Flex,
  SimpleGrid,
  Stack,
  VStack,
  Text,
  Link,
  Container,
} from "@chakra-ui/layout";
import { Button, Image, useBreakpointValue } from "@chakra-ui/react";
const ChakSImple = ({ allServices, onClickService = (service) => {} }) => {
  return (
    <section>
      <Container maxW="container.xl" pb={24}>
        <SimpleGrid
          columns={useBreakpointValue({ base: 1, md: 2, lg: 2 })}
          spacing={8}
        >
          {allServices?.map((service) => {
            return (
              <Link
                key={service.id}
                onClick={() => {
                  onClickService(service);
                }}
              >
                <Flex
                  w={"full"}
                  backgroundImage={`url(${encodeURI(
                    service?.image?.publicUrl,
                  )})`}
                  backgroundSize={"cover"}
                  backgroundPosition={"center center"}
                  paddingBottom={"100%"}
                  position={"relative"}
                  borderRadius={13}
                >
                  <VStack
                    position={"absolute"}
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    w={"full"}
                    justify={"flex-end"}
                    px={useBreakpointValue({ base: 4, md: 8 })}
                    bgGradient={"linear(to-t, blackAlpha.500, transparent)"}
                    borderRadius={13}
                  >
                    <Stack maxW={"2xl"} align={"flex-end"} spacing={6}>
                      <Text
                        color={"white"}
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={useBreakpointValue({
                          base: "2xl",
                          md: "3xl",
                        })}
                        marginBottom={7}
                      >
                        {service.name}
                      </Text>
                    </Stack>
                  </VStack>
                </Flex>
              </Link>
            );
          })}
        </SimpleGrid>
      </Container>
    </section>
  );
};
export default ChakSImple;
