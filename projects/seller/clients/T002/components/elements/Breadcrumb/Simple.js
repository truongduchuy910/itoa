import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/breadcrumb";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { Container } from "@chakra-ui/layout";
import NextLink from "next/link";
export default function BreadcrumbSimple() {
  return (
    <Container maxW={"container.xl"}>
      <Breadcrumb
        spacing="8px"
        px={2}
        mb={4}
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink>Trang chủ</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <NextLink href="/san-pham">
            <BreadcrumbLink href="">Danh mục sản phẩm</BreadcrumbLink>
          </NextLink>
        </BreadcrumbItem>
      </Breadcrumb>
    </Container>
  );
}
