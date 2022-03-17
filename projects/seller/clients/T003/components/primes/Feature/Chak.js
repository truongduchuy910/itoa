import { ReactElement } from "react";
import {
  Box,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  Flex,
  Link,
  Container,
} from "@chakra-ui/react";
import { PhoneIcon, AddIcon, WarningIcon } from "@chakra-ui/icons";

const Feature = ({ title, text, src, href }) => {
  return (
    <Stack alignItems={"center"} justifyContent={"center"}>
      <Flex
        w={89}
        h={89}
        p={5}
        align={"center"}
        justify={"center"}
        
        rounded={"full"}
        
        mb={1}
      >
        {/* {icon} */}
        <img src={src} />
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text  textAlign={"center"}>
        {text}
      </Text>
    </Stack>
  );
};

export default function SimpleThreeColumns({
  allFeatures,
  onclickFeature = (feature) => {},
}) {
  return (
    <section>
      <Container maxW="container.xl">
        <Box py={12}>
          <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={10}>
            {allFeatures?.map((feature) => {
              return (
                <Link
                  key={feature.id}
                  onClick={() => {
                    onclickFeature(feature);
                  }}
                >
                  <Feature
                    key={feature.id}
                    // icon={<Icon as={WarningIcon} w={10} h={10} />}
                    title={feature.name}
                    src={feature?.image?.publicUrl}
                    href={feature?.post?.url}
                    // text={
                    //   "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
                    // }
                  />
                </Link>
              );
            })}
          </SimpleGrid>
        </Box>
      </Container>
    </section>
  );
}
