import {
  Heading,
  Input,
  Progress,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Fragment } from "react";

export default function AdressSimple({
  loading,
  allGhnProvinces,
  allGhnDistricts,
  allGhnWards,
  changeProvince,
  changeDistrict,
  changeWard,
  changeStress,
}) {
  return (
    <Stack spacing={3}>
      <Heading size="xs">
        Tỉnh/Thành{" "}
        <Text as={"span"} color={"red"}>
          *
        </Text>
      </Heading>
      <Select
        placeholder="Tỉnh/Thành"
        onChange={(e) => {
          changeProvince({
            name: e.target.options[e.target.selectedIndex].innerText,
            key: e.target.value,
          });
        }}
      >
        {allGhnProvinces?.map((province, index) => {
          return (
            <option key={index} value={province.key} onClick={(e) => {}}>
              {province.name}
            </option>
          );
        })}
      </Select>

      {allGhnDistricts.length && (
        <Fragment>
          <Heading size="xs">
            Quận/Huyện{" "}
            <Text as={"span"} color={"red"}>
              *
            </Text>
          </Heading>
          <Select
            placeholder="Quận/Huyện"
            onChange={(e) => {
              changeDistrict({
                name: e.target.options[e.target.selectedIndex].innerText,
                key: e.target.value,
              });
            }}
          >
            {allGhnDistricts?.map((district, index) => {
              return (
                <option key={index} value={district.key}>
                  {district.name}
                </option>
              );
            })}
          </Select>
        </Fragment>
      )}
      {allGhnWards.length && (
        <Fragment>
          <Heading size="xs">
            Phường/Xã{" "}
            <Text as={"span"} color={"red"}>
              *
            </Text>
          </Heading>
          <Select
            placeholder="Phường/Xã"
            onChange={(e) => {
              changeWard({
                name: e.target.options[e.target.selectedIndex].innerText,
                key: e.target.value,
              });
            }}
          >
            {allGhnWards?.map((ward, index) => {
              return (
                <option key={index} value={ward.key}>
                  {ward.name}
                </option>
              );
            })}
          </Select>
        </Fragment>
      )}
      {loading && <Progress size="xs" isIndeterminate colorScheme="brand" />}
      <Heading size="xs">Tên đường, số nhà, thôn,...</Heading>
      <Input
        option="Text"
        placeholder="Tên đường, số nhà, thôn,..."
        onChange={(e) => {
          changeStress(e.target.value);
        }}
      />
    </Stack>
  );
}
