import Action from "action";
import Network from "middleware/helper/Network";

/**
 * <Function: save data for screen>
 */
export const saveData = data => ({
  type: Action.SAVE_DATA_SCREEN,
  payload: data
});

/**
 * <Function: clean data screen>
 */
export const cleanData = () => ({
  type: Action.CLEAN_DATA_SCREEN,
  payload: null
});
