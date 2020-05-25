import Action from "action";
const INIT_STATE = {
  user: null,
  avatarBase64: null,
  isReadAllNotification: false
};

export default function (state = INIT_STATE, action) {
  switch (action.type) {
    case Action.SAVE_DATA_USER:
      return { ...state, user: action.payload };
    case Action.SAVE_AVATAR_BASE_64:
      return { ...state, avatarBase64: action.payload };
    case Action.CLEAN_DATA_ALL_USER_REDUX:
      return { ...state, user: [], avatarBase64: null };
    case Action.UPDATE_READ_ALL_NOTIFICATION:
      return { ...state, isReadAllNotification: action.payload };

    case Action.CLEAR_DATA_USER:
      return {
        user: null,
        avatarBase64: null,
        isReadAllNotification: false
      }
    default:
      return state;
  }
}
