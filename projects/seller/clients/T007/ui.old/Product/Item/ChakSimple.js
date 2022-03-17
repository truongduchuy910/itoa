import { Box, Center, Heading, Text, Stack, Link } from "@chakra-ui/react";
import Image from "next/image";
import { Fragment } from "react";
import Field from "@itoa/ui/Field";

export default function ProductSimple({
  product: { name, price, sale, image, brand },
  onClick,
  withPrice = true,
  detailButton = false,
  moreButton = true,
}) {
  return (
    <Center h={"full"}>
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
        onClick={onClick}
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
            top: 3,
            left: 0,
            // backgroundImage: `url(${encodeURI(
            //   image?.publicUrl?.replace(/\/md/g, "/sm"),
            // )})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Box
            transition={"all 0.3s ease"}
            _hover={{ transform: "scale(1.15) translateY(-20px)" }}
          >
            <Image
              width={1920}
              height={1920}
              layout="responsive"
              objectFit="contain"
              src={image?.publicUrl || "/assets/img/no-image.png"}
            />
          </Box>
        </Box>
        <Stack pt={10} align={"center"} px={{ base: 2, md: 3 }}>
          {/* <Text fontSize={"sm"} textTransform={"uppercase"} color={"gray.50"}>
            {brand?.name}
          </Text> */}
          <Heading fontSize={"sm"} fontFamily={"body"} fontWeight={500}>
            {name}
          </Heading>
          {withPrice && (
            <Stack align={"center"}>
              {sale ? (
                <Fragment>
                  <Text fontWeight={800} fontSize={"sm"} color={"brand.500"}>
                    {<Field>{sale}</Field>} ₫
                  </Text>
                  <Text textDecoration={"line-through"}>
                    {<Field>{price}</Field>} ₫
                  </Text>
                </Fragment>
              ) : (
                <Text fontWeight={800} fontSize={"sm"} color={"brand.500"}>
                  {<Field>{price}</Field>} ₫
                </Text>
              )}
            </Stack>
          )}
        </Stack>
      </Box>
    </Center>
  );
}
