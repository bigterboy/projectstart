import Action from "action";
// USE FOR SAVE DATA WHEN YOU CHANGE SCREEN AND COMEBACK
const INIT_STATE = {
  contentScreen: null
};

export default function(state = INIT_STATE, action) {
  switch (action.type) {
    case Action.SAVE_DATA_SCREEN:
      return { ...state, contentScreen: action.payload };
    case Action.CLEAN_DATA_SCREEN:
      return { ...state, contentScreen: null };
    default:
      return state;
  }
}
