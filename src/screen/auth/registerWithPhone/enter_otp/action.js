import Action from "action";
import Network from "middleware/helper/Network";

export const loginPhoneSuccess = phone => ({
    type: Action.REGISTER_BY_PHONE_LOGIN_SUCCESS,
    payload: phone
});

/**
 * <Function: save user to redux for easy way to use>
 * @param data of user
 */
export const saveUserToRedux = data => ({
    type: Action.SAVE_DATA_USER,
    payload: data
});