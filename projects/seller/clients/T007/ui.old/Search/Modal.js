import { Fragment } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Translate from "../Translate";
import trans from "../Translate/trans";
import { Search2Icon } from "@chakra-ui/icons";
import ProductListSearch from "@itoa/ui/Product/List/Search";
import PostListSearch from "@itoa/ui/Post/List/Search";
export default function SearchModal({
  isOpen,
  onClose = () => {},
  changeInput,
  loading,
  allProducts = [],
  allPosts = [],
  called,
}) {
  return (
    <Fragment>
      <Modal onClose={onClose} size={"xl"} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader p={2}>
            <InputGroup variant="flushed" colorScheme="brand">
              <InputLeftElement
                pointerEvents="none"
                children={
                  loading ? (
                    <Spinner colorScheme="brand" />
                  ) : (
                    <Search2Icon color="gray.300" />
                  )
                }
              />
              <Input
                colorScheme="brand"
                type="search"
                placeholder={trans("Tìm kiếm") + "..."}
                onChange={changeInput}
              />
            </InputGroup>
          </ModalHeader>
          {/* <ModalCloseButton /> */}
          {called && (
            <ModalBody>
              <ProductListSearch allProducts={allProducts} />
              <PostListSearch allPosts={allPosts} />
              {!loading && !allProducts?.length && (
                <Text color="gray.400">
                  <Translate content="Không có kết quả" />
                </Text>
              )}
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
}
