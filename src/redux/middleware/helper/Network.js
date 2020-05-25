import NetworkRequest from "./NetworkRequest";
import Config from "config";
import LocalStorage from "./LocalStorage";
// const Method = NetworkRequest.Method;

const netRequest = new NetworkRequest(Config.HOST);
const request = netRequest.request;

const getMessageFromCode = (code, type) => {
  if (code == 400) return "Bad request!";
  if (code == 401) return "Unauthorized!";
  if (code == 403) return "Not found!";
  if (code == 406) return "Not acceptable!";
  if (code == 409) return "Conflict!";
  if (code == 417)
    return "The server cannot meet the requirements of the Expect request-header field";
  if (code == 423)
    return "Mật khẩu tài khoản của quý khách đã quá cũ. Vui lòng cập nhật mật khẩu mới";
  if (code == 500) return "Đã có lỗi xảy ra. Vui lòng thử lại!";

  if (code == 501) return "Mạng Internet đang chậm. Cảm phiền bạn đăng nhập lại lần nữa.";

  if (code == 1100) return "Tên quá dài";
  if (code == 1101) return "Email không hợp lệ.";
  if (code == 1102) return "Số điện thoại không hợp lệ.";
  if (code == 1103) return "Địa chỉ thường trú quá dài";
  if (code == 1104) return "Ngôn ngữ không hợp lệ";
  if (code == 1105) return "Email đã tồn tại";
  if (code == 1106) return "ID khách hàng không hợp lệ";
  if (code == 1107) return "Không tìm thấy khách hàng"; //"Customer not found";
  if (code == 1108) return "Mã thông báo email không hợp lệ";
  if (code == 1109) return "Yêu cầu thay đổi mật khẩu";
  if (code == 1110) return "Tên đăng nhập hoặc mật khẩu không hợp lệ."; //"invalid username or password";

  if (code == 1111) return "Mật khẩu hiện tại không đúng.";
  if (code == 1112) return "Quý khách đã đăng ký tài khoản, vui lòng đăng nhập tài khoản.";
  if (code == 1113) return "Điều kiện lọc khách hàng đang để trống";
  if (code == 1114) return "Mã loại so sánh đang để trống";
  if (code == 1115) return "Tài khoản khách hàng đã bị khóa"; //"Customer has blocked";
  if (code == 1116) return "Email đã tồn tại";
  if (code == 1117) return "Ưu đãi không tồn tại";
  if (code == 1118) return "Dữ liệu khách hàng không tồn tại.";
  if (code == 1119) return "File dữ liệu không tồn tại.";
  if (code == 1120) return "Khóa đăng nhập"; //"locked login"

  if (code == 1121) return "Mã hợp đồng bị rỗng";
  if (code == 1122) return "CMND bị rỗng";
  if (code == 1123) return "Mật khẩu bị rỗng";
  if (code == 1124) return "Mật khẩu mới không chính xác";
  if (code == 1125) return "Không thể tải file lên được";
  if (code == 1126) return "Mã thông báo không hợp lệ";
  if (code == 1127) return "Môi trường mã thông báo không hợp lệ";
  if (code == 1128) return "Không tìm thấy thông tin khách hàng trong hệ thống.";

  if (code == 1200) return "Định danh duy nhất không có nội dung";
  if (code == 1201) return "Nội dung không có";
  if (code == 1202) return "Danh sách rỗng";
  if (code == 1203) return "Tên không có";
  if (code == 1204) return "Vai trò không hợp lệ";
  if (code == 1205) return "Vai trò không tồn tại";
  if (code == 1206) return "Định danh duy nhất không tồn tại";
  if (code == 1207) return "Mật khẩu không có nội dung";
  if (code == 1208) return "invalid ou";
  if (code == 1209) return "Mã số dịch vụ không hợp lệ";
  if (code == 1210) return "Số trang không hợp lệ";

  if (code == 1211) return "Kích thước trang không hợp lệ";
  if (code == 1212) return "Mã thông báo không có nội dung";
  if (code == 1213) return "Mã vai trò không có";
  if (code == 1214) return "Tên vai trò không có";
  if (code == 1215) return "Biểu mẫu SMS không có";
  if (code == 1216) return "Kiểu không hợp lệ";
  if (code == 1217) return "Số điện thoại không hợp lệ.";
  if (code == 1218) return "Vui lòng nhập Mã xác thực."; //"Code otp is null";
  if (code == 1219) return "Nội dung request không có";
  if (code == 1220) return "Thông báo không tồn tại";
  if (code == 1221) return "Mã hợp đồng bị rỗng."; //"empty key";
  if (code == 1222) return "CMND bị rỗng"; //"empty code";

  if (code == 1223) return "Tài liệu kiểm tra không hợp lệ";
  if (code == 1224) return "Tài liệu điều chỉnh không hợp lệ";
  if (code == 1225) return "Email bị rỗng";
  if (code == 1226) return "Lỗi tải tập tin lên";
  if (code == 1227) return "Loại hợp đồng đang rỗng";
  if (code == 1228) return "Tên hợp đồng bị rỗng";
  if (code == 1229) return "Tập tin eSign đang bị rỗng";

  if (code == 1230) return "Loại OTP không tồn tại";
  if (code == 1231) return "Loại OTP trống";
  if (code == 1232) return "Lấy giá trị OTP lỗi";
  if (code == 1233) return "Mã xác thực không chính xác.\nVui lòng nhập lại.";
  if (code == 1234) return "Mã xác thực không chính xác.\nVui lòng nhập lại.";
  if (code == 1235) return "Số lần nhận mã xác thực vượt quá giới hạn";
  if (code == 1236) return "Số điện thoại không tồn tại.";
  if (code == 1237) return "Số điện thoại không tồn tại.";

  if (code == 1243) return "Vượt số lần yêu cầu gửi Mã xác thực trong 1 giờ.";
  if (code == 1244) return "Vượt số lần yêu cầu gửi Mã xác thực trong 1 ngày.";

  if (code == 1245) return "Insert log customer error";
  if (code == 1246) return "Update ConfigContractTypeBackground error";
  if (code == 1247) return "Send sms error";
  if (code == 1248) return "Invalid params";
  if (code == 1249) return "Get contract type error";
  if (code == 1250) return "Get contract info error";
  if (code == 1251) return "Role exists";

  if (code == 1300) return "empty title";
  if (code == 1301) return "title too long";
  if (code == 1302) return "empty content_brief";
  if (code == 1303) return "content_brief too long";
  if (code == 1304) return "empty content";
  if (code == 1305) return "content too long";
  if (code == 1306) return "News is not exits";

  if (code == 1400)
    return "Số CMND/CCCD hoặc số hợp đồng không chính xác. Vui lòng kiểm tra và nhập lại thông tin.";
  if (code == 1401)
    return "Số hợp đồng không chính xác. \n Vui lòng kiểm tra và nhập lại thông tin.";
  if (code == 1402)
    return "Số hợp đồng không được trống. \n Vui lòng nhập đầy đủ thông tin"; //"Contract code is null or empty";
  if (code == 1403)
    return "Số CMND/ CCCD không được trống. \n Vui lòng nhập đầy đủ thông tin"; //"IdentifyId code is null or empty";
  if (code == 1404) return "Đã có lỗi xảy ra. Vui lòng thử lại."; //"Insert customer error";
  if (code == 1405) return "Đã có lỗi xảy ra. Vui lòng thử lại."; //"Insert contract error";
  if (code == 1406) return "Hợp đồng không tồn tại"; //"Contract is does not exits";
  if (code == 1407) return "Customer uuid is null or empty";
  if (code == 1408) return "FirstName too long";
  if (code == 1409) return "MiddleName too long";
  if (code == 1410) return "lastName too long";
  if (code == 1411) return "ContractAdjustmentInfo not exits";
  if (code == 1412) return "ContractDisbursementInfo not exits";
  if (code == 1413) return "BankName too long";
  if (code == 1414) return "AccountNumber too long";
  if (code == 1415) return "BrandName too long";
  if (code == 1416) return "AccountName too long";
  if (code == 1417) return "Invalid esigned Phone";
  if (code == 1418) return "ContractLoan not exits";
  if (code == 1419) return "IcontractEsignedId is empty";
  if (code == 1420) return "ContractFileId is empty";

  if (code == 1421)
    return "Số CMND/ CCCD không chính xác. \n Vui lòng kiểm tra và nhập lại thông tin."; //"IdentifyId does not exits";
  if (code == 1422) return "Status is null or empty";
  if (code == 1423) return "CreatedBy is null or empty";
  if (code == 1424) return "Contract file not found";
  if (code == 1425) return "Invalid page";
  if (code == 1426) return "File template not found";
  if (code == 1427) return "Contract file not found";
  if (code == 1428) return "Can not create contract file";
  if (code == 1429) return "FilePathtoo long";
  if (code == 1430) return "Description too long";
  if (code == 1431) return "ContractAdjustmentUploadFile not found";
  if (code == 1432)
    return "can not delete ContractAdjustmentUploadFile was send";
  if (code == 1433) return "CreatedName too long";
  //if (code == 1434) return "Contract already exists";
  if (code == 1434) return "Hợp đồng đã tồn tại trong hệ thống.";
  //if (code == 1435) return "Số chứng minh nhân dân khác lúc đăng ký";
  if (code == 1435) {
    if (type == 0) {
      // Nhập 12 chữ số nhưng trước kia đăng ký 9 chữ số
      return "Số CMND/CCCD Quý khách đã đăng ký với\nHD SAISON trước đây có 9 số, Quý khách vui lòng\nnhập số CMND/CCCD có 9 số."
    } else if (type == 1) {
      // Nhập 9 chữ số nhưng trước kia đăng ký 12 chữ số
      return "Số CMND/CCCD Quý khách đã đăng ký với\nHD SAISON trước đây có 12 số, Quý khách vui lòng\nnhập số CMND/CCCD có 12 số."
    }
  }
  if (code == 1436) return "Chưa đăng ký sử dụng dịch vụ điện tử";
  if (code == 1437) return "Hợp đồng ký điện tử không được quyền xóa";
  if (code == 1438) return "Vui lòng nhập số tiền.";

  if (code == 1439) return "Invalid signType send contract file to email";
  if (code == 1440) return "Contract template file không tồn tại";
  if (code == 1441) return "Chua suy nghi ra nội dung";
  if (code == 1442) return "Số điện thoại đã được đăng ký";
  if (code == 1443) return "Số điện thoại chưa được đăng ký";
  	
  return "Đã có lỗi xảy ra. Vui lòng thử lại.";
};

const getHeaders = token => {
  let header = {
    "x-api-key": "aa86719bb53d3a8fc470210d7e7a1b4388da4fa2",
    "x-environment": "APP",
    "Content-Type": "application/json",
    "Accept-Language": "vi"
  };
  if (token) header["Authorization"] = "Bearer " + token;
  return header;
};

netRequest.setHandleResponse(response => {
  return response;
});
netRequest.setHandleError((status, message) => {
  let code = message ? (message.payload ? message.payload.code : 500) : 500;
  if (status == 501) code = 501;
  if (status == 500) code = 500;
  return { message: getMessageFromCode(code) };
});

const getToken = async () => {
  try {
    return (value = await LocalStorage.getToken());
  } catch (e) {
    return JSON.stringify(e);
  }
};

//LOGIN-LOGOUT
const login = async (userName, password, isEncrypted) => {
  return request("customer/sign_in", getHeaders(), {
    payload: {
      username: userName,
      password: password,
      encryptPassword: isEncrypted
    }
  });
};

const logout = async cusID => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("customer/sign_out", header, {
    payload: {
      id: cusID
    }
  });
};

const checkPasswordExpired = async cusID => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("customer/check_password", header, {
    payload: {
      id: cusID
    }
  });
};

/**
 * Get Customer Encrypted Password
 * @param {*} cusID Customer UUID
 */
const getEncryptedPassword = async (cusID) => {
  const token = await getToken();
  return request("customer/enable_finger_login", getHeaders(token), {
    payload: {
     id:cusID
    }
  });
};

///////////////////////////////////////////////////////////////////////////

//Register
const register = async (contractCode, identifyId) => {
  return request("contract/register", getHeaders(), {
    payload: {
      contractCode: contractCode,
      identifyId: identifyId
    }
  });
};

//Register update password
const registerPassword = async (cusID, newPass, renewPass) => {
  return request("customer/create_password", getHeaders(), {
    payload: {
      uuid: cusID,
      newPassword: newPass,
      newPasswordRewrite: renewPass
    }
  });
};
////////////////////////////////////////////////////////////////////////////////////////

// //Update User: email, fullName
const updateInforUser = async (uuid, fullName, email, objectVersion) => {
  const token = await getToken();
  if (fullName !== null && email !== null) {
    return request("customer/update", getHeaders(token), {
      payload: {
        uuid: uuid,
        fullName: fullName,
        email: email,
        objectVersion: objectVersion
      }
    });
  }
};

////////////////////////////////////////////////////////////////////////////////////////

// //Get information Customer
const getInforUser = async uuid => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/getInformationCustomer", header, {
    payload: {
      id: uuid,
    }
  });
};

////////////////////////////////////////////////////////////////////////////////////////

//Update password
const updateNewPassword = async (
  uuid,
  currentPassword,
  newPassword,
  newPasswordRewrite
) => {
  const token = await getToken();
  return request("customer/update_new_password", getHeaders(token), {
    payload: {
      uuid: uuid,
      currentPassword: currentPassword,
      newPassword: newPassword,
      newPasswordRewrite: newPasswordRewrite
    }
  });
};

////////////////////////////////////////////////////////////////////////////////////////

//Update user avatar
const uploadImageFile = async (contentType, strBase64) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("customer/upload_file", header, {
    payload: {
      files: [
        {
          contentType: contentType,
          data: strBase64
        }
      ]
    }
  });
};

const updateUserAvatar = async (cusID, fileName) => {
  const token = await getToken();
  const header = getHeaders(token);
  // console.log("Network-header: " + JSON.stringify(header))
  return request("customer/image", header, {
    payload: {
      uuid: cusID,
      fileName: fileName,
      type: 1
    }
  });
};

////////////////////////////////////////////////////////////////////////////////////////
//Forgot Password
const confirmID = async identifyID => {
  return request("customer/verify_identity_number", getHeaders(), {
    payload: {
      identityNumber: identifyID
    }
  });
};

const confirmContract = async (identityID, contractCode) => {
  return request(
    "customer/verify_identity_number_and_contract_code",
    getHeaders(),
    {
      payload: {
        identityNumber: identityID,
        contractCode: contractCode
      }
    }
  );
};

const generateNewPassword = async (cusID, phone, newPass, renewPass) => {
  return request("customer/generate_new_password", getHeaders(), {
    payload: {
      customerUUID: cusID,
      phoneNumber: phone,
      newPassword: newPass,
      newPasswordRewrite: renewPass
    }
  });
};
////////////////////////////////////////////////////////////////////

//Get all Provinces
const getProvinces = async () => {
  const token = await getToken();
  return request("province/list", getHeaders(token), {});
};

//Get all districts follow Provinces
const districts = async id => {
  return request("district/list", getHeaders(), {
    payload: {
      id: id
    }
  });
};

//Contract List
const contractList = async uuid => {
  const token = await getToken();
  const header = getHeaders(token);
  // console.log("Network-header: " + JSON.stringify(header))
  return request("contract/listContractByCustomer", header, {
    payload: {
      id: uuid
    }
  });
};

const contractDetail = async contractCode => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/detail_mobile", header, {
    payload: {
      id: contractCode
    }
  });
};

const contractCheckPayNotify = async (cusID, contractCode) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/checkIsPaymentNotification", header, {
    payload: {
      customerUuid: cusID,
      contractCode: contractCode
    }
  });
};

const contractUpdatePayNotify = async (cusID, contractCode, isNotification) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/updatePaymentNotification", header, {
    payload: {
      customerUuid: cusID,
      contractCode: contractCode,
      isNotification: isNotification
    }
  });
};

const historyByContract = async (
  customerUuid,
  contractCode = "",
  latestPaymentDate = "",
  loanType = ""
) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/historyPayment", header, {
    payload: {
      customerUuid: customerUuid,
      contractCode: contractCode,
      latestPaymentDate: latestPaymentDate,
      loanType: loanType
    }
  });
};

const contractSendFile = async (contractID, cusID, email, signType) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/send_file", header, {
    payload: {
      contractUuid: contractID,
      customerUuid: cusID,
      email: email,
      signType: signType
    }
  });
};

//Add Loan - Confirm contract No
const loanConfirmContract = async (contractCode, identifyId, cusID) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/addLoan", header, {
    payload: {
      contractCode: contractCode,
      identifyId: identifyId,
      customerUuid: cusID
    }
  });
};

//Add Loan save from promotion screen
const loanSavePromotion = async (
  fullName,
  phone,
  provinceCode,
  districtCode,
  promotionCode,
  promotionType,
  promotionId,
  title,
  customerUuid
) => {
  return request("signUpPromotion/save", getHeaders(), {
    payload: {
      fullName: fullName,
      phone: phone,
      provinceCode: provinceCode,
      districtCode: districtCode,
      promotionCode: promotionCode,
      promotionType: promotionType,
      promotionId: promotionId,
      title: title,
      customerUuid: customerUuid
    }
  });
};

//Add sign up Loan don't need sign in
const signUpLoanSave = async (
  fullName,
  phone,
  nationalId,
  provinceCode,
  districtCode,
  loanType,
  productionCode,
  loanAmount,
  tenor,
  interestRate,
  percentPrepaid,
  monthlyInstallmentAmount,
  customerUuid
) => {
  return request("signUpLoan/save", getHeaders(), {
    payload: {
      fullName: fullName,
      phone: phone,
      nationalId: nationalId,
      provinceName: provinceCode,
      districtName: districtCode,
      loanType: loanType,
      productionName: productionCode,
      loanAmount: loanAmount,
      tenor: tenor,
      interestRate: interestRate,
      percentPrepaid: percentPrepaid,
      monthlyInstallmentAmount: monthlyInstallmentAmount,
      customerUuid: customerUuid
    }
  });
};




//Get interest rate
const interestRate = async () => {
  return request(
    "config_contract_type_background/interest_rate",
    getHeaders(),
    {
      payload: {}
    }
  );
};


//api/v1/production/list get list production
const productionList = async id => {
  return request("production/list", getHeaders(), {
    payload: {
      id: id
    }
  });
};

//Add Loan - Save Loan
const loanSaveLoan = async (contractCode, identifyId, cusID) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/saveLoan", header, {
    payload: {
      contractCode: contractCode,
      identifyId: identifyId,
      customerUuid: cusID
    }
  });
};

//Add Loan - Remove contract
const loanRemoveContract = async (contractID, cusID) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/remove", header, {
    payload: {
      contractUuid: contractID,
      customerUuid: cusID
    }
  });
};

///////////////////////////////////////////////////////////////////////////////////

/**
 * API GET OTP
 * @param {*} cusID Customer UUID
 * @param {*} contractID ContractID
 * @param {*} phone phoneNumber
 * @param {*} otpType otpType
 * @param {*} contractCode ContractCode
 * @param {*} resend if resend OTP set it to 1
 */
const getOTP = async (cusID, contractID, phone, otpType, contractCode = "", resend = 0) => {
  return request("sms/get_otp", getHeaders(), {
    payload: {
      customerUUID: cusID,
      contractUUID: contractID,
      phoneNumber: phone,
      otpType: otpType,
      contractCode: contractCode,
      resend: resend
    }
  });
};

const verifyOTP = async (
  cusID,
  contractID,
  codeOTP,
  otpType,
  contractCode = ""
) => {
  return request("sms/verify_otp", getHeaders(), {
    payload: {
      customerUUID: cusID,
      contractUUID: contractID,
      codeOTP: codeOTP,
      otpType: otpType,
      contractCode: contractCode
    }
  });
};

const getOTPByPhone = async (phone, otpType, deviceId) => {
  return request("sms/get_otp_by_register_phone", getHeaders(), {
    payload: {
      phoneNumber: phone,
      otpType: otpType,
      deviceId: deviceId
    }
  });
};

const verifyOTPByPhone = async (codeOTP,otpType) => {
  return request("sms/verify_otp_by_register_phone", getHeaders(), {
    payload: {
      codeOTP: codeOTP,
      otpType: otpType
    }
  });
};
///////////////////////////////////////////////////////////////////////////////////////
//HOME EVENT LIST
const promotionList = async (
  type = "",
  access = 1,
  keyWord = "",
  pageNum = 1,
  pageSize = 3
) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("promotion/list", header, {
    payload: {
      type: type,
      access: access,
      keyWord: keyWord,
      oderBy: "createdAt",
      direction: "asc",
      pageNum: pageNum,
      pageSize: pageSize
    }
  });
};

//PROMOTION INVIDUAL
//cusID: user uuid
//access: 1 all / 2 for you have 2 api except to you
//api: 1
// const promotionIndividual = async (cusID, access = 2) => {
//   const token = await getToken();
//   const header = getHeaders(token);
//   return request("promotion/individual", header, {
//     payload: {
//       customerUuid: cusID,
//       access: access
//     }
//   });
// };
//api: 2
const promotionIndividual = async (cusID, limit, access) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("promotion/home_logged", header, {
    payload: {
      customerUuid: cusID,
      limit: limit,
      access: access
    }
  });
};

//Get promotion for all althout without login  (have 2 api except to you)
//Api 1
// const promotionGeneral = async () => {
//   return request("promotion/general", getHeaders(), {});
// };
//Api 2
const promotionGeneral = async limit => {
  return request("promotion/home", getHeaders(), {
    payload: {
      limit: limit
    }
  });
};

//Get promotion detail without login
const promotionDetailGeneral = async promoID => {
  return request("promotion/detail_general", getHeaders(), {
    payload: {
      id: promoID
    }
  });
};

//Get promotion detail user login
const promotionDetailIndividual = async promoID => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("promotion/detail", header, {
    payload: {
      id: promoID
    }
  });
};
///////////////////////////////////////////////////////////////////////////////////////
// Get contract policy
const contractGetPolicy = async ID => {
  // const token = await getToken();
  // const header = getHeaders(token);
  return request("contract/getPolicy", getHeaders(), {
    payload: {
      id: ID
    }
  });
};

///////////////////////////////////////////////////////////////////////////////////////
////FILE HANDLER
const fileDownload = async fileURI => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("filehandler/download", header, {
    payload: {
      uri: fileURI
    }
  });
};

//////////////////////////////////////////////////////////////////////////////////////

////ESIGNED
const esignUpdateDueDate = async (code, numDate) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/updateMonthlyDueDate", header, {
    payload: {
      contractCode: code,
      monthlyDueDate: numDate
    }
  });
};

const esignUpdateEngineerNo = async (code, chassis, engineer) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/contractupdateChassisNoAndEngineerNo", header, {
    payload: {
      contractCode: code,
      chassisNo: chassis,
      engineerNo: engineer
    }
  });
};

const esignUpdateBank = async (
  code,
  cusID,
  bankName,
  accountNumber,
  brandName,
  accountName,
  isSent = 1
) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/updateBankInformation", header, {
    payload: {
      contractCode: code,
      customerUuid: cusID,
      bankName: bankName,
      accountNumber: accountNumber,
      brandName: brandName,
      accountName: accountName,
      isSent: isSent
    }
  });
};

const esignUpdateInfo = async (disInfo, chassis, due) => {
  const token = await getToken();
  const header = getHeaders(token);
  const disbursementInfo = {
    accountName: disInfo ? disInfo.accountName : "",
    accountNumber: disInfo ? disInfo.accountNumber : "",
    bankName: disInfo ? disInfo.bankName : "",
    brandName: disInfo ? disInfo.brandName : "",
    contractCode: disInfo ? disInfo.contractCode : "",
    customerUuid: disInfo ? disInfo.customerUuid : "",
    isSent: 0
  };
  const chassisNoAndEnginerNo = {
    chassisNo: chassis ? chassis.chassisNo : "",
    contractCode: chassis ? chassis.contractCode : "",
    engineerNo: chassis ? chassis.engineerNo : ""
  };
  const monthlyDue = {
    contractCode: due ? due.contractCode : "",
    monthlyDueDate: due ? due.monthlyDueDate : 0,
    firstDate: due ? due.firstDate : "",
    endDate: due ? due.endDate : ""
  };

  let payload = {};
  if (disInfo) payload.disbursementInfo = disbursementInfo;
  if (chassis) payload.updateChassisNoAndEnginerNo = chassisNoAndEnginerNo;
  if (due) payload.updateMonthlyDueDate = monthlyDue;


  console.log("confirmEsignContract: " + JSON.stringify(payload))
  return request("contract/confirmEsignContract", header, {
    payload: payload
  });
};

/** Create File Contract For ESign and Adjustment
 * contractCode
 * cusID
 * signType: 1:Esigne - 2:Adjustment
 */
const esignCreateFile = async (contractCode, cusID, signType = 1) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/contract_file/create", header, {
    payload: {
      contractCode: contractCode,
      customerUuid: cusID,
      signType: signType
    }
  });
};

/** Create File Contract For ESign and Adjustment
 * contractCode
 * cusID
 * signType: 1:Esigne - 2:Adjustment
 */
const esignCreateFileB64 = async (contractCode, cusID, signType = 1) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/contract_file/create_b64", header, {
    payload: {
      contractCode: contractCode,
      customerUuid: cusID,
      signType: signType
    }
  });
};



//files => array urls
const esignDownFile = async files => {
  const token = await getToken();
  const header = getHeaders(token);

  return request("filehandler/contract/download", header, {
    payload: {
      files: files
    }
  });
};

/**
 * 
 * @param {*} userName 
 * @param {*} password 
 * @param {*} isEncrypted 
 */
const esignValidateSignIn = async (userName, password, isEncrypted) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("customer/validate_sign_in", header, {
    payload: {
      username: userName,
      password: password,
      encryptPassword: isEncrypted
    }
  });
};

/**
 * API check user action
 * -User turn on biometric
 * -User agree esign contract
 * @param {*} cusID
 * @param {*} contractCode
 * @param {*} action Using Util.Constant.CHECK_LOG_ACTION
 */
const checkLogAction = async (cusID, contractCode, action) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("customer/log_action/create", header, {
    payload: {
      customerId: cusID,
      contractCode: contractCode,
      action: action
    }
  });
};

/**Check time available for sign */
const esignAvailabeSign = async () => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("config_staff/check_time_register_esign", header, {
    payload: {
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////

/**
 * API load Event or New with no login
 * @param {*} limit 0: all  other: number of item
 * @param {*} type 0: all  1:Event  2:New
 */
const newHome = async (limit, type) => {
  return request("news/home", getHeaders(), {
    payload: {
      limit: limit,
      type: type
    }
  });
};

/**
 * API load Event or New with user logged
 * @param {*} cusID customer UUID
 * @param {*} limit 0:load all  other: load number
 * @param {*} access 0:all  1: General  2: Invidual
 * @param {*} type  0:all   1:Event   2:New
 */
const newHomeLogged = async (cusID, limit, access, type) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("news/home_logged", header, {
    payload: {
      customerUuid: cusID,
      limit: limit,
      access: access,
      type: type
    }
  });
};

const newDetail = async newID => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("news/detail", header, {
    payload: {
      id: newID
    }
  });
};

/**
 * API Use for View News Detail with no login
 * @param {*} newID
 */
const newDetailGeneral = async newID => {
  return request("news/detail_general", getHeaders(), {
    payload: {
      id: newID
    }
  });
};
//////////////////////////////////////////////////////////////////////////////////////

//Get Link VietjetAir
const getLinkFromAPI = async newID => {
  return request("config_staff/get_value", getHeaders(), {
    payload: {
      key: "link_vietjectair"
    }
  });
};
//Home waiting sign contract
const contractWaiting = async cusID => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/getListWaitingForSigningContract", header, {
    payload: {
      id: cusID
    }
  });
};

//Home current contract
const contractCurrent = async cusID => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/getListCurrentContract", header, {
    payload: {
      id: cusID
    }
  });
};

//Home List sub Esign Contract (PLHD)
const contractWaitingAdjust = async cusID => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/getListWaitingAdjustment", header, {
    payload: {
      id: cusID
    }
  });
};

const contractAdjustDetail = async contractCode => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/getDetailContractAdjustmentInfoMobile", header, {
    payload: {
      id: contractCode
    }
  });
};

const contractRemindPay = async cusID => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("contract/popupNotification", header, {
    payload: {
      id: cusID
    }
  });
};


//Notification (Cloud Message)
const followNotification = async (cusID, fcmToken) => {
  return request("customer/device", getHeaders(), {
    payload: {
      uuid: cusID,
      fcmToken: fcmToken
    }
  });
};

/**
 * API GET LIST NOTIFICATION
 * @param {*} cusID 
 * 
 */
const getListNotification = async (cusID, pageNum, pageSize) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("notification/list", header, {
    payload: {
      customerUuid: cusID,
      isSent: 1,
      type: 0,
      keyWord: "",
      // pageNum: -1,
      // pageSize: -1,
      pageNum: pageNum,
      pageSize: pageSize,
      orderBy: "",
      direction: ""
    }
  });
};

/**
 * API Delete Notification
 * @param {*} notificationID 
 */
const deleteNotification = async (notificationID) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("notification/delete", header, {
    payload: {
      id: notificationID
    }
  });
};

/**
 * API check Notification Read or no read
 * @param {*} notificationID 
 */
const readNotification = async (notificationID) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("notification/read", header, {
    payload: {
      id: notificationID
    }
  });
};

/**
 * API Read All notification
 * @param {*} customerUuid
 */
const readAllNotification = async (customerUuid) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("notification/readAll", header, {
    payload: {
      id: customerUuid
    }
  });
};

/**
 * API Check Read All Notification
 * @param {*} customerUuid
 */
const checkReadAllNotification = async (customerUuid) => {
  const token = await getToken();
  const header = getHeaders(token);
  return request("notification/checkReadAllNotification", header, {
    payload: {
      id: customerUuid
    }
  });
};



/**
 * API Get Banks List
 */
const getBanksList = async () => {
  return request("bank/list", getHeaders(), {
    payload: {}
  });
};

/**
 * API Get Stores List
 * Cửa hàng gần bạn
 */
const getStoresList = async () => {
  return request("store/list", getHeaders(), {
    payload: {}
  });
};

export default {
  login: login,
  logout: logout,
  checkPasswordExpired: checkPasswordExpired,
  getEncryptedPassword:getEncryptedPassword,
  register: register,
  registerPassword: registerPassword,
  confirmID: confirmID,
  confirmContract: confirmContract,
  generateNewPassword: generateNewPassword,
  getOTP: getOTP,
  verifyOTP: verifyOTP,
  getOTPByPhone: getOTPByPhone,
  verifyOTPByPhone: verifyOTPByPhone,
  getLinkFromAPI: getLinkFromAPI,
  contractGetPolicy: contractGetPolicy,
  getProvinces: getProvinces,
  districts: districts,
  contractList: contractList,
  contractDetail: contractDetail,
  contractCheckPayNotify: contractCheckPayNotify,
  contractUpdatePayNotify: contractUpdatePayNotify,

  historyByContract: historyByContract,
  loanConfirmContract: loanConfirmContract,
  signUpLoanSave: signUpLoanSave,
  loanSaveLoan: loanSaveLoan,
  loanSavePromotion: loanSavePromotion,
  loanRemoveContract: loanRemoveContract,
  contractSendFile: contractSendFile,
  fileDownload: fileDownload,
  productionList: productionList,
  getMessageFromCode: getMessageFromCode,
  promotionList: promotionList,
  promotionIndividual: promotionIndividual,
  promotionGeneral: promotionGeneral,
  promotionDetailGeneral: promotionDetailGeneral,
  promotionDetailIndividual: promotionDetailIndividual,
  updateInforUser: updateInforUser,
  updateNewPassword: updateNewPassword,
  uploadImageFile: uploadImageFile, //Hai API này dùng update avatar//
  updateUserAvatar: updateUserAvatar, //Hai API này dùng update avatar//
  getInforUser: getInforUser,

  esignUpdateDueDate: esignUpdateDueDate,
  esignUpdateEngineerNo: esignUpdateEngineerNo,
  esignUpdateBank: esignUpdateBank,
  esignUpdateInfo: esignUpdateInfo,
  esignCreateFile: esignCreateFile,
  esignCreateFileB64: esignCreateFileB64,
  esignDownFile: esignDownFile,
  esignValidateSignIn: esignValidateSignIn,
  esignAvailabeSign: esignAvailabeSign,
  checkLogAction: checkLogAction,

  // newList: newList,
  newHome: newHome,
  newHomeLogged: newHomeLogged,
  newDetail: newDetail,
  newDetailGeneral: newDetailGeneral,
  interestRate: interestRate,
  contractWaiting: contractWaiting,
  contractCurrent: contractCurrent,
  contractWaitingAdjust: contractWaitingAdjust,
  contractAdjustDetail: contractAdjustDetail, //Chi tiết Phụ lục hợp đồng
  contractRemindPay: contractRemindPay, //Hợp đồng đến hạn thanh toán

  //Notification
  followNotification: followNotification,
  getListNotification: getListNotification,
  deleteNotification: deleteNotification,
  readNotification: readNotification,
  readAllNotification: readAllNotification,
  checkReadAllNotification: checkReadAllNotification,

  getBanksList: getBanksList,
  getStoresList: getStoresList
};
