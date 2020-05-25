const contractType = {
  LIVE: "LIVE",
  MATURED: "MATURED",
  DUE: "DUE",
  OVERDUE_PAYMENT: "OVERDUE_PAYMENT",
  CONTRACT_PRINTING: "CONTRACT_PRINTING",
  WAITING_FOR_APPROVAL: "WAITING_FOR_APPROVAL"
};

const OTP_TYPE = {
  REGISTER: "AccVeri",
  REGISTER_PHONE:"AccVeriPhone",
  FORGOT: "AccResPass",
  ESIGN: "SignOTP",
  ADJUSTMENT: "Sign.OTP.Appendix"
};

const LOAN_TYPE = {
  CL: "CL", //Cash
  MC: "MC", //Motorbike
  ED: "ED", //Elictric
  MB: "MB", // Mobile
  PL: "PL",
  CLO: "CLO"  
};

const INTEREST_RATE = { CL: 0.2426, MC: 0.1929, ED: 0.1238, MB: 0.1238 }

const LIST_DUE_DATE = [{ code: 5 }, { code: 15 }, { code: 20 }, { code: 25 }];

const TIME_OUT_TIME = 30;
const TIME_OUT_TIME_REGISTER = 120;
const PROMO_LIMIT_ITEM_HORIZONTAL = 5;

const PHONE_CENTER_NUMBER = "1900558854"

const LINK_DEFAULT_MODAL_TICKET = "https://www.vietjetair.com/Sites/Web/vi-VN/Home"

const TYPE_WEB_DETAIL = {
  PROMOTION: "PROMOTION",
  EVENT: "EVENT",
  NEW: "NEW",
  STATIC: "STATIC"
}

//Using for getting type of popup to show
const POPUP_TYPE = {
  PROVINCE: "PROVINCE",
  DISTRICT: "DISTRICT",
  PERCENT_PAY_FIRST: "PERCENT_PAY_FIRST",
  PRODUCTION_LOAN: "PRODUCTION_LOAN",
}


/**Using for check log user action */
const CHECK_LOG_ACTION = {
  READ_AGREE: "confirm_read_and_agree",
  SET_FINGER: "register_set_fingerprint",
  SET_FACE: "register_set_faceid",
  CONFIRM_SIGN_CONTRACT: "confirm_sign_contract",
}

/**Using for show popup warning or expired password */
const WARNING_PASSWORD_TYPE = {
  WARNING: 1,
  EXPIRED: 2
}

const SEND_MAIL_TYPE = {
  ESIGN: 1,
  ADJUSTMENT: 2,
  DETAIL: 3
}

/**
 * NOTIFICATION LIST RESPONSE TYPE 
 */
const NOTIFICATION_TYPE = {
  ALL: 0,
  NEWS: 1,          //Tin tức
  PROMO: 2,         //Ưu đãi
  ESIGNED: 3,     
  ADJUSTMENT: 4,
  REMIND_PAY: 5,
  EVENT: 6         //Khuyến mãi
}

/**
 * ACCOUNT TAB POLICY
 */
const POLICY_RULE_TYPE = {
  ESIGN: "P1",
  GENERAL: "P2"
}

/**Loại TextInput (Số hợp đồng...)*/
const INPUT_REGEX_TYPE = {
  CONTRACT: "Contract"
}

/**Độ dài TextInput hợp đồng */
const INPUT_CONTRACT_LENGTH = 20

/**Độ dài TextInput CMND/CCCD */
const INPUT_IDENTITY_LENGTH = 20

/**Độ dài TextInput Password*/
const INPUT_PASSWORD_LENGTH = 20

/**Page Size phân trang notification list */
const NOTIFICATION_LIST_PAGE_SIZE = 10

/**Độ dài TextInput Họ Tên*/
const INPUT_FULL_NAME_LENGTH = 100

/**Độ dài TextInput PhoneNumber*/
const INPUT_PHONE_NUMBER_LENGTH = 10

/**Độ dài TextInput BankNo */
const INPUT_BANK_NO_LENGTH = 30

/**Type để phân biệt khi load danh sách hợp đồng */
const LIST_CONTRACT_TYPE = {
  ESIGN: 1,
  ADJUSTMENT: 2
}

/** Loại ký hợp đồng Esign hay Adjustment(Dùng khi tạo file contract)*/
const CONTRACT_FILE_TYPE = {
  ESIGN: 1,
  ADJUSTMENT: 2
} 

//
const TYPE_INPUT_TEXT ={
  PHONE: "PHONE",
  IDENTITY_CARD: "IDENTITY_CARD"
}

/**Copy right App */
const COPY_RIGHT_APP = "Copyright © 2019 HD SAISON" 

/**
 * Number of API loading when app load 
 * Please increase if you add an other api when loading 
 */
const NUMBER_API_APP_LOADING = 4

export {
  contractType,
  OTP_TYPE,
  TIME_OUT_TIME,
  TIME_OUT_TIME_REGISTER,
  LOAN_TYPE,
  LIST_DUE_DATE,
  PROMO_LIMIT_ITEM_HORIZONTAL,
  PHONE_CENTER_NUMBER,
  LINK_DEFAULT_MODAL_TICKET,
  INTEREST_RATE,
  CHECK_LOG_ACTION,
  POPUP_TYPE,
  WARNING_PASSWORD_TYPE,
  SEND_MAIL_TYPE,
  NOTIFICATION_TYPE,
  POLICY_RULE_TYPE,
  INPUT_REGEX_TYPE,
  INPUT_CONTRACT_LENGTH,
  INPUT_IDENTITY_LENGTH,
  INPUT_PASSWORD_LENGTH,
  NOTIFICATION_LIST_PAGE_SIZE,
  LIST_CONTRACT_TYPE,
  CONTRACT_FILE_TYPE,
  COPY_RIGHT_APP,
  INPUT_FULL_NAME_LENGTH,
  INPUT_PHONE_NUMBER_LENGTH,
  TYPE_INPUT_TEXT,
  INPUT_BANK_NO_LENGTH,
  TYPE_WEB_DETAIL,
  NUMBER_API_APP_LOADING
};
