import Action from "action";
import Network from "middleware/helper/Network";

export const login = (data) => ({ 
    type: Action.LOGIN_SUCCESS,
    payload:data
});

/**
 * <Function: save user to redux for easy way to use>
 * @param data of user
 */
export const saveUserToRedux = data => ({
    type: Action.SAVE_DATA_USER,
    payload: data
});