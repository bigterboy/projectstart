import Action from "action";

/**Refresh param expiredPassword 
 * Dùng để refresh lại state expired password
*/
export const refreshExpiredPass = (value) => ({
  type: Action.ERROR_PASSWORD_EXPIRED,
  payload: value
})
export const saveUserToRedux = data => ({
  type: Action.SAVE_DATA_USER,
  payload: data
});

/**
 * <Function: dispatch action logout>
 */
export const logout = () => ({
  type: Action.LOGOUT
});

/**
 * <Function: clean data user when logout>
 */
export const cleanDataUserRedux = () => ({
  type: Action.CLEAN_DATA_ALL_USER_REDUX
},
{
  type: Action.UPDATE_READ_ALL_NOTIFICATION,
  payload: false
},
{
  type: Action.CLEAR_DATA_USER,
}
);
