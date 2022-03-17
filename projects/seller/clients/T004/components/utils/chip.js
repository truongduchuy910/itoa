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
export function formatMoney(
  amount,
  decimalCount = 0,
  decimal = ".",
  thousands = ","
) {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    const negativeSign = amount < 0 ? "-" : "";
    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;
    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
      // +      " đ"
    );
  } catch (e) {}
}
export function toSlug(str) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/ /g, "-")
    .toLocaleLowerCase();
}
export function getErrorMessage(error) {
  if (error.graphQLErrors) {
    for (const graphQLError of error.graphQLErrors) {
      if (
        graphQLError.extensions &&
        graphQLError.extensions.code === "BAD_USER_INPUT"
      ) {
        return graphQLError.message;
      }
    }
  }
  switch (error.message.slice(0, 20)) {
    case "E11000 duplicate key":
      return "Tên đăng nhập bị trùng.";
  }
  switch (error.message) {
    case `ketQua validation failed: ketQua: Cast to Array failed for value "Bạn đã đạt đến giới hạn truy cập." at path "ketQua"`:
      return `Bạn không đủ lượt truy cập, liên hệ để nhận thêm`;
    case `Response not successful: Received status code 400`:
      return `Dữ liệu nhập vào không hợp lệ.`;
    case `You do not have access to this resource`:
      const token = localStorage.getItem("token");
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

module.exports.formatTime = (time) => {
  const timeOption = {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(Date.parse(time)).toLocaleString("zh-HK", timeOption);
};

export function convertViToEn(str, toUpperCase = false) {
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư

  return toUpperCase ? str.toUpperCase() : str;
}
