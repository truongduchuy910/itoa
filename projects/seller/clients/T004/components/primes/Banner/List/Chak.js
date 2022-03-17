import { Stack, Flex, VStack, useBreakpointValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function WithBackgroundImage({ allBanners }) {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const time = setTimeout(() => {
      setCurrent((current) => {
        {
          return current === allBanners.length - 1 ? 0 : ++current;
        }
      });
    }, 5000);
    return () => {
      clearTimeout(time);
    };
  });
  return (
    <section>
      <Flex
        w={"full"}
        h={"80vh"}
        backgroundImage={`url(${

          (allBanners[current]?.image?.publicUrl || "/assets/img/no-image.png")
        })`}
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={{ base: 4, md: 8 }}
          // bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} align={"flex-start"} spacing={6}>
            {/* <Text

            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
          >
            {allBanners[current].name}
          </Text> */}
            <Stack direction={"row"}>
              {/* <Button
              rounded={"full"}

              _hover={{ bg: "blue.500" }}
            >
              Show me more
            </Button>
            <Button
              whiteAlpha.300"}
              rounded={"full"}

              _hover={{ bg: "whiteAlpha.500" }}
            >
              Show me more
            </Button> */}
            </Stack>
          </Stack>
        </VStack>
      </Flex>
    </section>
  );
}
