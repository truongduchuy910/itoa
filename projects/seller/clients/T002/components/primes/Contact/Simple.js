import {
  Box,
  Divider,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Address from "../Address";
import AddressSimple from "../Address/Simple";

export default function ContactSimple({ onChange = () => {} }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [address, setAddress] = useState("");
  useEffect(() => {
    onChange({
      phone,
      name,
      address: address && address + ". Ghi chú: " + note,
    });
  }, [phone, name, address, note]);

  return (
    <Stack
      spacing={3}
      borderWidth={"1px"}
      borderRadius={"lg"}
      boxShadow={"sm"}
      p={3}
    >
      <Heading size={"md"}>Thông tin nhận hàng</Heading>
      <Divider />

      <Heading size="xs">
        Họ tên{" "}
        <Text as={"span"} color={"red"}>
          *
        </Text>
      </Heading>
      <Input
        placeholder="Họ tên"
        name="name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        mb={3}
      />

      <Heading size="xs">
        Số điện thoại{" "}
        <Text as={"span"} color={"red"}>
          *
        </Text>
      </Heading>
      <Input
        option="Text"
        placeholder="Số điện thoại"
        name="phone"
        onChange={(e) => {
          setPhone(e.target.value);
        }}
        mb={3}
      />

      <Address
        onChangeAddress={(address) => setAddress(address)}
        UI={AddressSimple}
      />

      <Heading size="xs">
        Ghi chú & Thông tin thêm{" "}
        <Text as={"span"} color={"red"}>
          *
        </Text>
      </Heading>
      <Text size={"xs"} color={"gray.500"} mb={3}>
        Vui lòng cung cấp thêm thông tin khi không thể liên hệ bạn bằng điện
        thoại. Ví dụ: Instagram, Facebook, Gmail,...
      </Text>

      <Textarea
        option="TextArea"
        label="Ghi chú"
        onChange={(e) => {
          setNote(e.target.value);
        }}
      />

      <Text color={"gray"}>
        <Text as={"span"} color={"red"}>
          *
        </Text>{" "}
        Thông tin bắt buộc
      </Text>
    </Stack>
  );
}
