import Action from "action";
import Network from "middleware/helper/Network";

export const cleanData = () => ({
  type: Action.CLEAN_DATA_SCREEN,
  payload: null
});
