import {
  chakra,
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  VisuallyHidden,
  useColorModeValue,
} from "@chakra-ui/react";

import { MdHeadset, MdEmail, MdLocationOn } from "react-icons/md";
import { BsFillBriefcaseFill } from "react-icons/bs";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function UserListUI({ allUsers, _allUsersMeta, clickMore }) {
  return allUsers.slice(0, 1).map((user) => {
    return <SocialProfileWithImage user={user} />;
  });
}

function SocialProfileWithImage({ user }) {
  const { name, phone, email } = user;
  return (
    <Center py={6}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        overflow={"hidden"}
        borderWidth="1px"
      >
        {/* <Image
          h={"120px"}
          w={"full"}
          src={cover.image?.publicUrl}
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            bg="transparent"
            src={logo?.publicUrl}
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex> */}

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {name}
            </Heading>
            <Text color={"gray.500"}>{email}</Text>
          </Stack>
          <Heading size="xs">Tên đăng nhập</Heading>
          <Text> {phone}</Text>
        </Box>
      </Box>
    </Center>
  );
}

function SocialButton({ children, label, href }) {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
}
