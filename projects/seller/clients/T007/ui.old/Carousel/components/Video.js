import {
  AspectRatio,
  Button,
  chakra,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Heading,
} from "@chakra-ui/react";
import { AiFillPlayCircle } from "react-icons/ai";
import Translate from "@itoa/ui/Translate";

export default function Video({ title = "", src = "" }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        shadow="md"
        display="flex"
        alignItems="center"
        justifyContent="center"
        border="solid 1px transparent"
        mx={{ base: "auto", md: 0 }}
        fontSize={{ base: "md", md: "lg" }}
        rounded="md"
        color="white"
        bg="brand.500"
        colorScheme="brand"
        px={{ base: 8, md: 10 }}
        py={{ base: 3, md: 4 }}
        cursor="pointer"
        size="lg"
        leftIcon={<AiFillPlayCircle />}
        onClick={onOpen}
      >
        <Translate content="Xem video" />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader>
            <Heading colorScheme="brand" color="brand.500" size="md">
              {title}
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody w="full">
            <AspectRatio ratio={16 / 9}>
              <div dangerouslySetInnerHTML={{ __html: src }} />
            </AspectRatio>
          </ModalBody>

          <ModalFooter>
            <Text size="xs" fontStyle="italic" mr={4}>
              Nhấn đúp bên trái hoặc phải video để tua
            </Text>
            <Button colorScheme="brand" onClick={onClose}>
              <Translate content="Đóng" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
} // This video will have equal sides
