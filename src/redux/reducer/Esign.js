import Action from "action";

//currentStep
//1:Tóm tắt
//2:Xem hợp đồng
//3:Xác nhận
//4:Hoàn tất

// UPDATE_ESIGN_STATUS_MONTHLY_DUE: "UPDATE_ESIGN_STATUS_MONTHLY_DUE",
//   UPDATE_ESIGN_STATUS_CHASSIS: "UPDATE_ESIGN_STATUS_CHASSIS",
//   UPDATE_ESIGN_STATUS_ENGINER: "UPDATE_ESIGN_STATUS_ENGINER",
//   UPDATE_ESIGN_STATUS_BANK_USER: "UPDATE_ESIGN_STATUS_BANK_USER",
//   UPDATE_ESIGN_STATUS_BANK_ACCOUNT: "UPDATE_ESIGN_STATUS_BANK_ACCOUNT",
//   UPDATE_ESIGN_STATUS_BANK_NAME: "UPDATE_ESIGN_STATUS_BANK_NAME",

export default function (
  state = {
    currentStep: 1,
    emptyMonthlyDue: false,
    emptyChassis: false,
    emptyEnginer: false,
    emptyBankUser: false,
    emptyBankAccount: false,
    emptyBankName: false,
    contractBase64: null,
    userAgreement: false,

    data: undefined
  },
  action
) {
  switch (action.type) {
    case Action.UPDATE_ESIGN_OBJECT:
      return { ...state, data: { ...state.data, ...action.payload } };
    case Action.UPDATE_ESIGN_STEP:
      return { ...state, currentStep: action.payload }

    case Action.UPDATE_ESIGN_STATUS_MONTHLY_DUE:
      return { ...state, emptyMonthlyDue: action.payload }

    case Action.UPDATE_ESIGN_STATUS_CHASSIS:
      return { ...state, emptyChassis: action.payload }

    case Action.UPDATE_ESIGN_STATUS_ENGINER:
      return { ...state, emptyEnginer: action.payload }

    case Action.UPDATE_ESIGN_STATUS_BANK_USER:
      return { ...state, emptyBankUser: action.payload }

    case Action.UPDATE_ESIGN_STATUS_BANK_ACCOUNT:
      return { ...state, emptyBankAccount: action.payload }

    case Action.UPDATE_ESIGN_STATUS_BANK_NAME:
      return { ...state, emptyBankName: action.payload }

    case Action.UPDATE_ESIGN_BASE64_FILE:
      return { ...state, contractBase64: action.payload }

      case Action.UPDATE_ESIGN_USER_AGREEMENT:
        return { ...state, userAgreement: action.payload }
      
    default:
      return state;
  }
}
