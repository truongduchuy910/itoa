import { Box, Flex, SimpleGrid, Stack, VStack, Text, Link, Container } from '@chakra-ui/layout';
import { useBreakpointValue } from '@chakra-ui/react';
const ServiceChak = ({ allServices, onClickService = service => {}, ServiceLink }) => {
  return (
    <section>
      <Container maxW="container.xl" pb={24}>
        <SimpleGrid columns={{ base: 2, md: 2, lg: 2 }} spacing={8}>
          {allServices?.map(service => {
            return (
              <ServiceLink key={service.id} service={service}>
                <Flex
                  w={'full'}
                  backgroundImage={`url(${service?.image?.publicUrl})`}
                  backgroundSize={'cover'}
                  backgroundPosition={'center center'}
                  paddingBottom={'100%'}
                  position={'relative'}
                  borderRadius={13}
                >
                  <VStack
                    position={'absolute'}
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    w={'full'}
                    justify={'flex-end'}
                    px={useBreakpointValue({ base: 4, md: 8 })}
                    bgGradient={'linear(to-t, blackAlpha.500, transparent)'}
                    borderRadius={13}
                  >
                    {/* <Stack maxW={"2xl"} align={"flex-end"} spacing={6}>
                      <Text
                        fontWeight={700}
                        lineHeight={1.2}
                        fontSize={{
                          base: "2xl",
                          md: "3xl",
                        }}
                        marginBottom={7}
                      >
                        {service.name}
                      </Text>
                    </Stack> */}
                  </VStack>
                </Flex>
                <Text
                  mt={3}
                  mb={55}
                  fontWeight={700}
                  lineHeight={1.2}
                  fontSize={{
                    base: '2xl',
                    md: '3xl',
                  }}
                >
                  {service.name}
                </Text>
              </ServiceLink>
            );
          })}
        </SimpleGrid>
      </Container>
    </section>
  );
};
export default ServiceChak;
