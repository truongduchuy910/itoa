import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Badge,
  HStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
const num = Intl.NumberFormat();

export default function ProductItemSimple({ product, getLink }) {
  const { name, price, sale, image, brand, num, percent, as, href } = product;

  return (
    <Center h={"full"}>
      <NextLink href={href} >
        <Box
          h={"full"}
          borderWidth="1px"
          borderRadius="lg"
          rounded={"lg"}
          role={"group"}
          maxW={"330px"}
          w={"full"}
          boxShadow={"2xl"}
          pos={"relative"}
          zIndex={1}
          p={2}
        >
          <Box
            rounded={"lg"}
            pos={"relative"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 0,
              left: 0,
              backgroundImage: `url(${image?.publicUrl?.replace(
                /img/g,
                "img-sm",
              )})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"md"}
              objectFit={"cover"}
              src={image?.publicUrl?.replace(/img/g, "img-sm") || "/logo.svg"}
              transition={"all 0.3s ease"}
              _hover={{ transform: "scale(1.1) translateY(-20px)" }}
            />
          </Box>
          <Stack align={"center"} px={{ base: 2, md: 3 }}>
            <Text
              fontSize={"sm"}
              textTransform={"uppercase"}
              colorScheme={"brand"}
            >
              {brand?.name}
            </Text>
            <Heading fontSize={"sm"} fontFamily={"body"} fontWeight={500}>
              {name}
            </Heading>
            <HStack align={"center"}>
              <Text fontWeight={800} fontSize={"sm"} colorScheme={"brand"}>
                {num.format(sale ?? price)} ₫
              </Text>
              {sale && (
                <Badge colorScheme={percent > 30 ? "red" : "orange"}>
                  -{percent}%
                </Badge>
              )}
            </HStack>
          </Stack>
        </Box>
      </NextLink>
    </Center>
  );
}
