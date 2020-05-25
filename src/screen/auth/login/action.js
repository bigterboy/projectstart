import Action from "action";
import Network from "middleware/helper/Network";

/**
 * <Function: save user to redux for easy way to use>
 * @param data of user
 */
export const saveUserToRedux = data => ({
  type: Action.SAVE_DATA_USER,
  payload: data
});

/**
 * <Function: dispatch for start login>
 */
export const loginStart = () => ({ type: Action.LOGIN_START });

/**
 * <Function: dispatch action when login successfull>
 * @param data login
 */
export const loginSuccess = data => ({
  type: Action.LOGIN_SUCCESS,
  payload: data
});

/**
 * <Function: dispatch action when login error>
 * @param error title of tab.
 */
export const loginError = error => ({
  type: Action.LOGIN_ERROR,
  payload: { error: error }
});
