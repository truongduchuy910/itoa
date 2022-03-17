import React from "react";
// import Order from "./Order";
import { Fragment } from "react";
import { CreateItem } from "@itoa/app-admin-ui/components";
// import Stock from "./Stock";
import {
  // ChecklistIcon,
  // ContainerIcon,
  PersonIcon,
  // UploadIcon,
  // PackageDependenciesIcon,
} from "@primer/octicons-react";
// import logoSrc from "@itoa/fields/components/Logo/logo.svg";
// import Home from "./Home";
// import Board from "./Board";
// import BatchsFlow from "./BatchFlow";
function listHeaderActions() {
  return (
    <Fragment>
      <CreateItem />
    </Fragment>
  );
}
export default {
  listHeaderActions,
  logo: () => {
    return (
      <Fragment>
        {/* <div style={{ textAlign: "end", color: "#6c757d" }}>
          <img src={logoSrc} style={{ maxWidth: 300 }} />
          <p style={{ maxWidth: 400 }}>
            Nghiên cứu và phát triển bởi sinh viên Đại học Bách Khoa Đà Nẵng.
          </p>
          <a style={{ maxWidth: 400, color: "#094a5a" }} href="tel:0372672048">
            Liên hệ Trần Ngọc Huy: 0332813077.
          </a>
        </div> */}
      </Fragment>
    );
  },
  pages: () => {
    return [
      // { label: "# Tổng quan", path: "", component: Home },
      // {
      //   label: (
      //     <label>
      //       <ChecklistIcon /> Tiến độ
      //     </label>
      //   ),
      //   children: [
      //     { label: "# Dự án", listKey: "Project" },
      //     { label: "# Vấn đề", listKey: "Issue" },
      //     { label: "# Công việc", listKey: "Work" },
      //   ],
      // },
      // { label: "# Tổng quan", path: "bashsflow", component: BatchsFlow },
      // {
      //   label: (
      //     <label>
      //       <ContainerIcon /> Sản xuất
      //     </label>
      //   ),
      //   children: [
      //     { listKey: "IngredientImport", label: "# Nhập nguyên liệu" },
      //     { listKey: "IngredientProvider", label: "# Nhà cung cấp" },
      //     { listKey: "IngredientType", label: "# Loại nguyên liệu" },
      //     { listKey: "ManufactureBatch", label: "# Lô sản xuất" },
      //     { listKey: "ManufactureReview", label: "# Giám sát" },
      //   ],
      // },
      {
        label: (
          <label>
            <PersonIcon /> Chung
          </label>
        ),
        children: [
          { listKey: "User", label: "# Nhân sự" },
          { listKey: "UserRequest", label: "# Quyền của bạn" },
          { listKey: "UserPermission", label: "# Danh sách quyền" },
          { listKey: "UserAccessList", label: "# Danh sách truy cập" },
          { listKey: "UserSchema", label: "# Danh sách bảng" },
        ],
      },
    ];
  },
};
