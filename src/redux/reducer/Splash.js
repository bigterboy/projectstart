import Action from "action";
export default function (
  state = {
    isLogin: false,
    isWarnedPassword: false,  //Đã show cảnh báo change password
    biometricType: -1,
    base64PolicyEsign: null,
    base64Policy: null
  },
  action
) {
  switch (action.type) {
    case Action.BIOMETRIC_TYPE:
      return {
        ...state,
        biometricType: action.payload
      }
    case Action.WARNED_WILL_EXPIRED_PASSWORD:
      return {
        ...state,
        isWarnedPassword: action.payload
      }
    case Action.SPLASH_SAVE_BASE64_POLICY:
      return { ...state, base64Policy: action.payload }

    case Action.SPLASH_SAVE_BASE64_POLICY_ESIGN:
      return { ...state, base64PolicyEsign: action.payload }
    default:
      return state;
  }
}
