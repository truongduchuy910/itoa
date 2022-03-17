import React from 'react';
import Order from './Order';
import { Fragment } from 'react';
import { CreateItem } from '@itoa/app-admin-ui/components';
import Stock from './Stock';
import Dashboard from './Dashboard';
import { BrowserIcon, PackageIcon, RepoPushIcon, UploadIcon } from '@primer/octicons-react';
import logoSrc from '@itoa/fields/components/Logo/logo.svg';
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
        <div style={{ textAlign: 'end', color: '#6c757d' }}>
          <img src={logoSrc} style={{ maxWidth: 300 }} />
          <p style={{ maxWidth: 400 }}>
            Nghiên cứu và phát triển bởi sinh viên Đại học Bách Khoa Đà Nẵng.
          </p>
          <a style={{ maxWidth: 400, color: '#094a5a' }} href="tel:0372672048">
            Liên hệ Trần Ngọc Huy: 0332813077.
          </a>
        </div>
      </Fragment>
    );
  },
  pages: () => {
    return [
      {
        label: '# Trang chủ',
        path: '',
        component: Dashboard,
      },
      {
        label: '# Xuất Đơn Hàng',
        path: 'orders',
        component: Order,
      },
      { label: '# Kho', path: 'stocks', component: Stock },
      {
        label: (
          <label>
            <PackageIcon /> Sản phẩm
          </label>
        ),
        children: [
          { listKey: 'Product', label: '# Tất cả sản phẩm' },
          { listKey: 'ProductCategory', label: '# Phân loại sản phẩm' },
          { listKey: 'ProductDiscount', label: '# Khuyến mãi' },
          { listKey: 'ProductAttribute', label: '# Nhóm thuộc tính' },
        ],
      },
      {
        label: (
          <label>
            <RepoPushIcon /> Bài viết
          </label>
        ),
        children: [
          { listKey: 'Post', label: '# Tất cả bài viết' },
          {
            listKey: 'PostHashtag',
            label: '# Phân loại bài viết',
          },
        ],
      },
      {
        label: (
          <label>
            <BrowserIcon /> Cửa hàng
          </label>
        ),
        children: [
          { listKey: 'Service', label: '# Dịch vụ' },
          { listKey: 'Feature', label: '# Đặc trưng' },
          { listKey: 'FAQ', label: '# Câu hỏi' },
          { listKey: 'Testimonial', label: '# Đánh giá' },
          { listKey: 'Page', label: '# Page' },
        ],
      },
      {
        label: (
          <label>
            <UploadIcon /> Tải lên
          </label>
        ),
        children: [
          { listKey: 'UploadFile', label: '# Tệp' },
          { listKey: 'UploadImage', label: '# Kho ảnh' },
        ],
      },
    ];
  },
};
