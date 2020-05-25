import Action from "action";
export default function(
  state = {
    result: [],
    error: "",
  },
  action
) {
  switch (action.type) {
    case Action.UPDATE_SUCCESS:
      return { ...state, result:  action.payload};
    case Action.UPDATE_ERROR:
      return { ...state, error: "401" };
    default:
      return state;
  }
}
