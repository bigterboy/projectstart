import Action from "action";
const INIT_STATE = {
  language: "vi"
};

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case Action.CHANGE_LANGUAGE:
      return { ...state, language: action.payload };
    default:
      return state;
  }
}
