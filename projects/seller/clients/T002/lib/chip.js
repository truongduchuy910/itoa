import { useRouter } from 'next/router';
import { useApollo } from '../apollo/client';
import { USER } from '../apollo/action';

export function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

export function removeItemAll(arr, value) {
  var i = 0;
  while (i < arr.length) {
    if (arr[i] === value) {
      arr.splice(i, 1);
    } else {
      ++i;
    }
  }
  return arr;
}

export function toAttributeGourpWhereInput(attributes) {
  if (attributes.length) return { attributes_some: { url_in: attributes } };
  else return null;
}
export function <Field>{amount, decimalCount = 0, decimal = '.', thousands = ',') {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? '-' : '';
    let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
    let j = i.length > 3 ? i.length % 3 : 0;
    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '') +
      ' đ'
    );
  } catch (e) {}
}
export function toSlug(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/ /g, '-')
    .toLocaleLowerCase();
}
export function getErrorMessage(error) {
  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (graphQLError.extensions && graphQLError.extensions.code === 'BAD_USER_INPUT') {
        return graphQLError.message;
      }
    }
  }
  switch (error.message.slice(0, 20)) {
    case 'E11000 duplicate key':
      return 'Tên đăng nhập bị trùng.';
  }
  switch (error.message) {
    case `ketQua validation failed: ketQua: Cast to Array failed for value "Bạn đã đạt đến giới hạn truy cập." at path "ketQua"`:
      return `Bạn không đủ lượt truy cập, liên hệ để nhận thêm`;
    case `Response not successful: Received status code 400`:
      return `Dữ liệu nhập vào không hợp lệ.`;
    case `You do not have access to this resource`:
      const token = localStorage.getItem('token');
      return token
        ? `Đã xảy ra lỗi, truy cập bị từ chối, hãy thử đăng nhập lại!`
        : `Vui lòng đăng nhập để tiếp tục!`;
    case `NetworkError when attempting to fetch resource.`:
      return `Lỗi kết nối, đợi 5 phút và thử lại!`;
    case `[passwordAuth:identity:notFound] The email provided didn't identify any undefined`:
      return `Sai Tên Đăng Nhập`;
    case `[passwordAuth:secret:mismatch] The password provided is incorrect`:
      return `Sai Mật Khẩu`;
    default:
      return error.message;
  }
}
