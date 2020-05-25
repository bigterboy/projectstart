import Action from "action";
export default function(
  state = {
    startLogin: false,
    userName: "",
    password: "",
    result: undefined,
    error: undefined
  },
  action
) {
  switch (action.type) {
    case Action.LOGIN_SUCCESS:
      return { ...state, result: action.payload };
    case Action.LOGIN_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
