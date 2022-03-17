import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Link,
} from "@chakra-ui/react";
import { Fragment } from "react";

import { formatMoney } from "../../../utils/chip";

export default function ProductSimple({
  product: { name, price, sale, image, brand },
  onClick,
}) {
  return (
    <Center h={"full"}>
      <Link
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
            src={image?.publicUrl?.replace(/img/g, "img-sm")}
            transition={"all 0.3s ease"}
            _hover={{ transform: "scale(1.15) translateY(-20px)" }}
          />
        </Box>
        <Stack pt={10} align={"center"} px={{ base: 1, md: 3 }}>
          <Text fontSize={"sm"} textTransform={"uppercase"} color={"gray.50"}>
            {brand?.name}
          </Text>
          <Heading fontSize={"sm"} fontFamily={"body"} fontWeight={500}>
            {name}
          </Heading>
          {price && (
            <Stack align={"center"}>
              {sale ? (
                <Fragment>
                  <Text fontWeight={800} fontSize={"sm"} color={"brand.500"}>
                    {formatMoney(sale)} ₫
                  </Text>
                  <Text textDecoration={"line-through"}>
                    {formatMoney(price)} ₫
                  </Text>
                </Fragment>
              ) : (
                <Text fontWeight={800} fontSize={"sm"} color={"brand.500"}>
                  {formatMoney(price)} ₫
                </Text>
              )}
            </Stack>
          )}
        </Stack>
      </Link>
    </Center>
  );
}
