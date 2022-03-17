import { gql, NetworkStatus, useQuery } from "@apollo/client";
import { useMemo, useState } from "react";

export default function Address({ onChangeAddress = (address) => {}, UI }) {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [stress, setStress] = useState("");
  const {
    data = {},
    error,
    loading,
    previousData,
    refetch,
    variables,
    networkStatus,
  } = useQuery(
    gql`
      query Address($province: String, $district: String) {
        allGhnProvinces {
          name
          key
        }
        allGhnDistricts(code: $province) {
          name
          key
        }
        allGhnWards(code: $district) {
          name
          key
        }
      }
    `,
    { variables: { province: null, district: null } }
  );
  const { allGhnProvinces = [], allGhnDistricts = [], allGhnWards = [] } = data;
  const changeProvince = ({ name, key }) => {
    refetch({ ...variables, province: key });
    // refetch({ ...variables, district: null });
    setProvince(name);
    // setDistrict("");
    // setWard("");
  };
  const changeDistrict = ({ name, key }) => {
    refetch({ ...variables, district: key });
    setDistrict(name);
    // setWard("");
  };
  const changeWard = ({ name: ward, key }) => {
    setWard(ward);
    onChangeAddress(`${ward} ${district} ${province} ${stress}`);
  };
  const changeStress = (value) => {
    setStress(value);
    onChangeAddress(`${ward} ${district} ${province} ${value}`);
  };
  return useMemo(
    () => (
      <UI
        allGhnProvinces={allGhnProvinces}
        allGhnDistricts={allGhnDistricts}
        allGhnWards={allGhnWards}
        changeProvince={changeProvince}
        changeDistrict={changeDistrict}
        changeWard={changeWard}
        changeStress={changeStress}
        loading={loading}
      />
    ),
    [UI.name, allGhnProvinces, allGhnDistricts, allGhnWards]
  );
}
