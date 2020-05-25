import Action from "action";
import LocalStorage from "middleware/helper/LocalStorage";

const INIT_STATE = {
  isLogin: false,
  isTest: false,
  isFalse: false,
  firstTimeUseContract: true,
  // isReadAllNotification: false
};

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case Action.LOGIN_SUCCESS:
      if (action.payload.code === 200) {
        //To save user name after login and still there for login again
        LocalStorage.saveUserName(action.payload.payload.customer.username);
        return { ...state, isLogin: true };
      } else {
        return { ...state, isLogin: false };
      }
    case Action.LOGOUT:
      return { ...state, isLogin: false };
    case Action.UPDATE_PROFILE_SUCCESS:
      return { ...state, isTest: true };
    case Action.UPDATE_PROFILE_FAIL:
      return { ...state, isTest: true };
    case Action.UPDATE_FIRST_TIME_CONTRACT:
      return { ...state, firstTimeUseContract: false };
    // case Action.UPDATE_READ_ALL_NOTIFICATION:
    //   return { ...state, isReadAllNotification: action.payload };
    default:
      return state;
  }
}
