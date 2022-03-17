const { default: axios } = require("axios");

const token = "c804e1a4-7da2-11eb-8be2-c21e19fc6803";
const GhnProvinceType =
  "type GhnProvince { key: String, name: String, code: String }";
const allGhnProvinces = "allGhnProvinces: [GhnProvince]";
const GhnDistrictType =
  "type GhnDistrict { key: String, name: String, code: String }";
const allGhnDistricts = "allGhnDistricts(code: String): [GhnDistrict]";
const GhnWardType = "type GhnWard { key: String, name: String, code: String }";
const allGhnWards = "allGhnWards(code: String): [GhnWard]";
var provinces = [];
async function getProvince() {
  if (!provinces || !provinces.length) {
    const {
      data: { data },
    } = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province`,
      { headers: { token: token } },
    );
    provinces = data.map((province) => ({
      key: province.ProvinceID,
      name: province.ProvinceName,
      code: province.Code,
    }));
  }
  return provinces;
}
async function getDistrict({ province_id }) {
  const {
    data: { data },
  } = await axios.get(
    `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district`,
    {
      params: { province_id },
      headers: { token: token },
    },
  );

  const result = data.map((province) => ({
    key: province.DistrictID,
    name: province.DistrictName,
    code: province.Code,
  }));
  return result;
}
async function getWard({ district_id }) {
  const {
    data: { data },
  } = await axios.get(
    `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward`,
    {
      params: { district_id },
      headers: { token: token },
    },
  );

  const result = data.map((province) => ({
    key: province.WardID,
    name: province.WardName,
    code: province.WardCode,
  }));
  return result;
}

module.exports = {
  types: [
    {
      type: GhnProvinceType,
    },
    {
      type: GhnDistrictType,
    },
    {
      type: GhnWardType,
    },
  ],
  queries: [
    {
      schema: allGhnProvinces,
      resolver: async (item, variables, context, info, { query, access }) => {
        return await getProvince();
      },
    },
    {
      schema: allGhnDistricts,
      resolver: async (item, variables, context, info, { query, access }) => {
        return variables.code
          ? await getDistrict({ province_id: variables.code })
          : [];
      },
    },
    {
      schema: allGhnWards,
      resolver: async (item, variables, context, info, { query, access }) => {
        return variables.code
          ? await getWard({ district_id: variables.code })
          : [];
      },
    },
  ],
};
